import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ValidateDto } from './dto/validate-login.dto';
import { TokenGuardGuard } from 'src/token-guard/token-guard.guard';
import { Response } from 'express';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true })) createLoginDto: CreateLoginDto) {
    return await this.loginService.create(createLoginDto);
  }

  @UseGuards(TokenGuardGuard)
  @Get()
  findAll(@Body() body: any) {
    return this.loginService.findAll();
  }

  @UseGuards(TokenGuardGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return await this.loginService.update(+id, updateLoginDto);
  }

  // @UseGuards(TokenGuardGuard)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.loginService.remove(+id);
  // }

  @Post('/validate')
  async validate(@Body(new ValidationPipe({ whitelist: true })) validate: ValidateDto, @Res() response: Response) {
    const token = await this.loginService.validate(validate)
    return response.status(HttpStatus.OK).json(token)
  }
}
