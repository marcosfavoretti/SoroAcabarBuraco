import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';
import { Usuario } from './entities/user.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService, TokenGenerateService],
  imports: [TypeOrmModule.forFeature([Usuario, ])]
})
export class LoginModule { }
