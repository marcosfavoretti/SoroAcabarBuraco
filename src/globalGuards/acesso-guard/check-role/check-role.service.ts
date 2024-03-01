import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcessoLiberacao } from 'src/login/entities/acessosLiberacao.entiy';
import { Pagina } from 'src/login/entities/pagina.entity';
import { PerfilAcesso } from 'src/login/entities/perfildeacesso.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { methods } from '../method.enum';

@Injectable()
export class CheckRoleService {

    constructor(
        @InjectRepository(AcessoLiberacao) private acesso: Repository<AcessoLiberacao>,
        @InjectRepository(Pagina) private pagina: Repository<Pagina>,

    ) { }

    async hasPermission(perfil: PerfilAcesso, method: string): Promise<boolean> {
        const acesso = await this.acesso.findOne({
            where: {
                idPerfilAcesso: perfil
            }
        })
        if (!acesso) throw new HttpException("Usuario sem cargo", 403)
        
        const ableORnot = Object.keys(acesso).find(key=> key === method)
        console.log(ableORnot)
        return !!(ableORnot)
    }


}
