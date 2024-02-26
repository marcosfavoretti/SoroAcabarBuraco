import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './login/entities/user.entity';
import { TokenGenerateService } from './token-generate-service/token-generate.service';
import { DetectHolesModule } from './detect-holes/detect-holes.module';
import { PerfilAcesso } from './login/entities/perfildeacesso.entity';
import { Pagina } from './login/entities/pagina.entity';
import { Endereco } from './login/entities/endereco.entity';
import { AcessoLiberacao } from './login/entities/acessosLiberacao.entiy';
import { Patalogia } from './detect-holes/entities/detect-hole.entity';
import { NotificationServiceService } from './notification-service/notification-service.service';
@Module({
  imports: [LoginModule,
    DetectHolesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.user,
      password: process.env.pass,
      database: 'HoleDetector',
      entities: [Patalogia, Usuario, PerfilAcesso, Pagina, Endereco, AcessoLiberacao],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TokenGenerateService, NotificationServiceService],
})
export class AppModule { }
