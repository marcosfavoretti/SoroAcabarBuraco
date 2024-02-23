import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ValidateDto } from './dto/validate-login.dto';
import { Response } from 'express';
import { TokenGuardGuard } from 'src/token-guard/token-guard.guard';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true })) createLoginDto: CreateLoginDto) {
    return await this.loginService.create(createLoginDto);
  }

  //@UseGuards(TokenGuardGuard)
  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return await this.loginService.update(+id, updateLoginDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.loginService.remove(+id);
  }

  @Post('/validate')
  async validate(@Body(new ValidationPipe({ whitelist: true })) validate: ValidateDto, @Res() res: Response) {
    const token_of_use = await this.loginService.validate(validate)
    res.cookie('authToken', token_of_use, {
      maxAge: 3600 * 1000,
      sameSite: 'none',
    });
    // Envie a resposta com o status 200 e encerre a requisição
    return res.status(HttpStatus.OK).send();
  }
}
