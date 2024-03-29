import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './login/entities/user.entity';
import { TokenGenerateService } from '../globalServices/token-generate-service/token-generate.service';
import { DetectHolesModule } from './detect-holes/detect-holes.module';
import { PerfilAcesso } from './login/entities/perfildeacesso.entity';
import { Pagina } from './login/entities/pagina.entity';
import { Endereco } from './login/entities/endereco.entity';
import { AcessoLiberacao } from './login/entities/acessosLiberacao.entiy';
import { Patalogia } from './detect-holes/entities/detect-hole.entity';
import { ServeStaticModule } from "@nestjs/serve-static"
import { CheckRoleService } from './globalGuards/acesso-guard/check-role/check-role.service';
@Module({
  imports: [LoginModule,
    DetectHolesModule,
    ServeStaticModule.forRoot({
      rootPath: "C:\\HoleDetector",

    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.user,
      password: process.env.password,
      database: 'HoleDetector',
      entities: [Patalogia, Usuario, PerfilAcesso, Pagina, Endereco, AcessoLiberacao],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [TokenGenerateService],
})
export class AppModule { }
