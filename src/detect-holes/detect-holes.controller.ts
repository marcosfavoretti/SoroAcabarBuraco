import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Res, HttpStatus, Req, HttpException } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { TokenGuardGuard } from 'src/token-guard/token-guard.guard';
import { ValidHolesDto } from './dto/validHole-post';
import { Request, Response } from 'express';
import { NotificationServiceService } from 'src/notification-service/notification-service.service';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';

@Controller('detectholes')
export class DetectHolesController {
  constructor(private token: TokenGenerateService, private email: NotificationServiceService, private readonly detectHolesService: DetectHolesService) { }

  @Post("/tombelli")//rota de debug so para teste
  async sendEmal(@Body() body: any) {
    return await this.email.notification(body)
  }

  @UseGuards(TokenGuardGuard)
  @Post('/process')
  async processImgHoles(@Body(new ValidationPipe({ whitelist: true })) hole: ValidHolesDto, @Res() response: Response, @Req() req: Request) {
    const user = this.token.tokenVerify(req.headers.authorization.split(" ")[1])
    const n_holes = await this.detectHolesService.predict(hole, user);

    const date = new Date()
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
  @UseGuards(TokenGuardGuard)
  @Get("/user")
  async findUserHoles(@Req() req: Request) {
    const user = this.token.tokenVerify(req.headers.authorization.split(" ")[1])
    return await this.detectHolesService.userHoleLog(user)
  }

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
