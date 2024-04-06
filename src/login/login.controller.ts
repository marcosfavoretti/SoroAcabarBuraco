import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ValidateDto } from './dto/validate-login.dto';
import { TokenGuardGuard } from 'src/globalGuards/token-guard/token-guard.guard';
import { Request, Response } from 'express';
import { TokenGenerateService } from 'globalServices/token-generate-service/token-generate.service';
import { CheckRoleService } from 'src/globalGuards/acesso-guard/check-role/check-role.service';
import { Usuario } from './entities/user.entity';
import { PerfilAcesso } from './entities/perfildeacesso.entity';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService, private token: TokenGenerateService,
    private role: CheckRoleService) { }

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true })) createLoginDto: CreateLoginDto) {
    return await this.loginService.create(createLoginDto);
  }


  @Post('/validate')
  async validate(@Body(new ValidationPipe({ whitelist: true })) validate: ValidateDto, @Res() response: Response) {
    const token = await this.loginService.validate(validate)
    return response.status(HttpStatus.OK).json(token)
  }


  @UseGuards(TokenGuardGuard)
  @Get()
  findAll(@Body() body: any) {
    return this.loginService.findAll();
  }

  @UseGuards(TokenGuardGuard)
  @Patch()
  async update(@Body(new ValidationPipe({whitelist: true})) updateLoginDto: CreateLoginDto, @Req() req: Request) {
    return await this.loginService.update(+req.headers.decodetoken['iduser'], updateLoginDto);
  }

  @UseGuards(TokenGuardGuard)
  @Delete()
  async remove(@Param('id') id: string) {
    return await this.loginService.remove(+id);
  }
}
