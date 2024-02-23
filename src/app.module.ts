import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './login/entities/login.entity';
import { TokenGenerateService } from './token-generate-service/token-generate.service';
import { DetectHolesModule } from './detect-holes/detect-holes.module';
@Module({
  imports: [LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.user,
      password: process.env.pass,
      database: 'HoleDetector',
      entities: [Login],
      synchronize: false,
    }), DetectHolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenGenerateService],
})
export class AppModule { }
