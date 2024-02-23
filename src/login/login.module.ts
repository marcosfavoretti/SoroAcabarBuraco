import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, TokenGenerateService],
  imports: [TypeOrmModule.forFeature([Login])]
})
export class LoginModule { }
