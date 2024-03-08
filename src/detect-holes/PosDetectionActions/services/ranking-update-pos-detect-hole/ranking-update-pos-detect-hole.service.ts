import { Injectable } from '@nestjs/common';
import { ISuccessPosDetect } from '../../ISuccessPosDetect';
import { Patalogia } from 'src/detect-holes/entities/detect-hole.entity';
import { Usuario } from 'src/login/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RankingUpdatePosDetectHoleService implements ISuccessPosDetect {
    constructor(@InjectRepository(Usuario) private user: Repository<Usuario>
    ) { }
    async functionPosDetect(user: Usuario, hole: Patalogia) {
        await this.incrementRank(user, 1)//isso aqui acho que iremos mudar...precisamos por no banco a quantidade de buracos por rua
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

}
