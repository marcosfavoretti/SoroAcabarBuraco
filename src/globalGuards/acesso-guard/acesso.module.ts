import { Module } from '@nestjs/common';
import { AcessoGuard } from './acesso.guard';
import { CheckRoleService } from './check-role/check-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessoLiberacao } from 'src/login/entities/acessosLiberacao.entiy';
import { Pagina } from 'src/login/entities/pagina.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AcessoLiberacao,
            Pagina
        ])
    ],
    providers: [AcessoGuard, CheckRoleService],
    exports: [AcessoGuard, CheckRoleService], // Apenas exporte os serviços necessários
})
export class AcessoModule { }
