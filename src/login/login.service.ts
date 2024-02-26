import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ValidateDto } from './dto/validate-login.dto';
import { Response } from 'express';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';
import { Endereco } from './entities/endereco.entity';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(Usuario) private login: Repository<Usuario>,
    @InjectRepository(Endereco) private endereco: Repository<Endereco>
    , private token: TokenGenerateService) { }

  async create(createLoginDto: CreateLoginDto) {
    const newUser = {
      ...createLoginDto,
      rank: 0,
      idPerfil: 1 //por default set como 1 para sempre os novos cadastrados serem users
    }
    const created_user = await this.login.insert({
      ...newUser
    });
    await this.createAddress(createLoginDto, created_user.raw.insertId)
    if (!created_user.raw.affectedRows) throw new HttpException('Nao foi possivel cadastrar o usuario', 400)
    return
  }

  private async createAddress(createLoginDto: CreateLoginDto, iduser: number) {
    await this.endereco.insert({
      ...createLoginDto,
      idUsuario: iduser
    })
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
