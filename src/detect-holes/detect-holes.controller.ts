import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Res, HttpStatus, Req, HttpException } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { TokenGuardGuard } from 'src/globalGuards/token-guard/token-guard.guard';
import { ValidHolesDto } from './dto/validHole-post';
import { Request, Response } from 'express';
import { NotificationServiceService } from 'globalServices/notification-service/notification-service.service';
import { TokenGenerateService } from 'globalServices/token-generate-service/token-generate.service';
import { Usuario } from 'src/login/entities/user.entity';
import { AcessoGuard } from 'src/globalGuards/acesso-guard/acesso.guard';

@Controller('detectholes')
export class DetectHolesController {
  constructor(private token: TokenGenerateService, private email: NotificationServiceService, private readonly detectHolesService: DetectHolesService) { }

  @Post("/tombelli")//rota de debug so para teste vai ser apagada pq vai ser um serviço apenas 
  async sendEmal(@Body() body: any) {
    return await this.email.notification(body)
  }

  @UseGuards(TokenGuardGuard)
  @Post('/process')
  async processImgHoles(@Body(new ValidationPipe({ whitelist: true })) hole: ValidHolesDto, @Res() response: Response, @Req() req: Request) {
    const n_holes = await this.detectHolesService.validHole(hole, { ...Object(req.headers.decodetoken) });
    return response.status(HttpStatus.OK).send({
      ...n_holes
    })
  }

  //o usuario pode usar sem login o aplicativo
  @Get()
  async findAll() {
    return await this.detectHolesService.findAll();
  }

  //log de usuario para pegar os buracos mandados por ele
  @UseGuards(TokenGuardGuard, AcessoGuard)
  @Get("/user")
  async findUserHoles(@Req() req: Request) {
    return await this.detectHolesService.userHoleLog({ ...Object(req.headers.decodetoken) })
  }


  @UseGuards(TokenGuardGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetectHoleDto: UpdateDetectHoleDto) {
    return this.detectHolesService.update(+id, updateDetectHoleDto);
  }

  //nao pode deletar nenhum buraco
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.detectHolesService.remove(+id);
  // }
}
