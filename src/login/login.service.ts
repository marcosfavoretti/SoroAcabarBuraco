import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { ValidateDto } from './dto/validate-login.dto';
import { Response } from 'express';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(Login) private login: Repository<Login>, private token: TokenGenerateService) { }

  async create(createLoginDto: CreateLoginDto) {
    const create = await this.login.insert({
      ...createLoginDto
    });
    if (!create.raw.affectedRows) throw new HttpException('Nao foi possivel cadastrar o usuario', 400)
    return
  }

  findAll() {
    return this.login.find();
  }

  private async findOne(id: number) {
    return await this.login.find({
      where: {
        iduser: id
      }
    })
  }

  async validate(validateDto: ValidateDto) {
    const user = await this.login.findOne({
      where: {
        name: validateDto.name,
        password: validateDto.password
      }
    })
    if (!user) throw new HttpException("Credenciais não encontradas", HttpStatus.NOT_FOUND)
    return this.token.getToken(user)
  }

  async update(id: number, updateLoginDto: UpdateLoginDto) {
    const find = await this.findOne(id)
    if (!find.length) throw new HttpException("Usuario nao encontrado", HttpStatus.NOT_FOUND)
    const update = await this.login.update(
      {
        iduser: id
      }, {
      ...updateLoginDto
    })
    return { old: find };
  }

  async remove(id: number) {
    await this.login.delete({
      iduser: id
    })
  }
}
