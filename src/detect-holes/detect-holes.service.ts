import { HttpException, Injectable } from '@nestjs/common';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { ValidHolesDto } from './dto/validHole-post';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { Between, Repository } from 'typeorm';
import { Patalogia } from './entities/detect-hole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/login/entities/user.entity';

@Injectable()
export class DetectHolesService {
  constructor(private api: ApiDetectHoleService,
    @InjectRepository(Patalogia) private holes: Repository<Patalogia>,
    @InjectRepository(Usuario) private user: Repository<Usuario>

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
      bairro: quarter,
      rua: road,
    }
    this.holes.insert({
      ...newHole,
      idUsuario: user
    })
    if (nHoles) await this.incrementRank(user, nHoles)
    // delete newHole.idUsuario //fiz isso para nao voltar meu usuario junto com meu objeto no json

    //func para salvar no banco para salvar o obj
    return newHole
  }

  private async incrementRank(user: Usuario, numberofHoles: number) {
    this.user.findOne({
      where: {
        iduser: user.iduser
      }
    }).then(async (result) => {
      await this.user.update({
        iduser: result.iduser
      }, {
        rank: (0.1 * numberofHoles) + (+(result.rank))
      })
    })
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
