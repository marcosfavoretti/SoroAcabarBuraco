import { HttpException, Injectable } from '@nestjs/common';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { ValidHolesDto } from './dto/validHole-post';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { Between, Repository } from 'typeorm';
import { Patalogia } from './entities/detect-hole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/login/entities/user.entity';
import { FactoryPosActionsService } from './PosDetectionActions/services/factory-pos-actions/factory-pos-actions.service';

@Injectable()
export class DetectHolesService {
  constructor(private api: ApiDetectHoleService,
    @InjectRepository(Patalogia) private holes: Repository<Patalogia>,
    @InjectRepository(Usuario) private user: Repository<Usuario>,
    private posDetectActions: FactoryPosActionsService,
  ) { }

  async validHole(hole: ValidHolesDto, user: Usuario) {

    if (!(await this.outofRange(hole))) throw new HttpException("Buraco no perimetro ja registrado", 405)

    const pictureInfo = await this.api.callApiDetectHole(hole.x64)
    //
    const { nHoles, fileName } = pictureInfo

    const { quarter, road } = await this.api.localeInformation(hole.latitude, hole.longitude)

    const newHole = {
      aprovacao: nHoles ? true : false,
      dataCadastro: new Date(),
      dataCorrecao: null,
      foto: fileName,
      descricao: hole.desc,
      latitude: hole.latitude,
      longitude: hole.longitude,
      bairro: quarter ?? "?", //caso nao tenha nome de bairro registrado no maps
      rua: road ?? "?", //caso nao tiver nome da rua registrado no maps
    }
    this.holes.insert({
      ...newHole,
      idUsuario: user
    })
    if (nHoles) {
      await this.posDetectAction(user, newHole as Patalogia)
    }
    // delete newHole.idUsuario //fiz isso para nao voltar meu usuario junto com meu objeto no json

    //func para salvar no banco para salvar o obj
    return newHole
  }

  private async posDetectAction(user: Usuario, hole: Patalogia) {
    for (const action of this.posDetectActions.getPosActions()) {
      await action.functionPosDetect(user, hole) //esse metodos sao assincros para uma melhor performace eu nao vou esperalos
    }
  }

  async findAll() {
    // return await this.holes.find({ relations: ['idUsuario'] }); //deixei comentando par anao enviar no json info dos usuarios juntas
    return await this.holes.find();
  }

  async userHoleLog(user: Usuario) {
    console.log(user)
    return await this.holes.createQueryBuilder('hole')
      .where('hole.idUsuario= :idUsuario', { idUsuario: user.iduser })
      .getMany();
  }

  update(id: number, updateDetectHoleDto: UpdateDetectHoleDto) {
    return `This action updates a #${id} detectHole`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} detectHole`;
  // }

  private async outofRange(hole: ValidHolesDto): Promise<boolean> {
    const holesonRange = await this.findPerimeterHoles(hole.latitude, hole.longitude)
    if (!holesonRange) return true
    return false
  }

  private async findPerimeterHoles(latitute: number, longitude: number): Promise<Patalogia> {
    const range = 0.00002 //range de 2 metros da cordenada
    const holesonRange = await this.holes.findOne({
      where: {//range de 2 metros 
        latitude: Between(latitute - range, latitute + range),
        longitude: Between(longitude - range, longitude + range)
      }
    })
    console.log('existe buraco no perimetro?', holesonRange ? 'existe' : 'nao existe')
    return holesonRange
  }


}
