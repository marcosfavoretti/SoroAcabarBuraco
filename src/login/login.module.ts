import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';
import { Usuario } from './entities/user.entity';
import { Endereco } from './entities/endereco.entity';
import { Pagina } from './entities/pagina.entity';
import { AcessoLiberacao } from './entities/acessosLiberacao.entiy';
import { PerfilAcesso } from './entities/perfildeacesso.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService, TokenGenerateService],
  imports: [TypeOrmModule.forFeature([Usuario, Endereco, Pagina, AcessoLiberacao, PerfilAcesso])]
})
export class LoginModule { }
