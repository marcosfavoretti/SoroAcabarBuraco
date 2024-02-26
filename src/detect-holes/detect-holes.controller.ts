import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { TokenGuardGuard } from 'src/token-guard/token-guard.guard';
import { ValidHolesDto } from './dto/validHole-post';
import { Response } from 'express';
import { NotificationServiceService } from 'src/notification-service/notification-service.service';

@Controller('detectholes')
export class DetectHolesController {
  constructor(private email: NotificationServiceService, private readonly detectHolesService: DetectHolesService) { }
  @Post("/tombelli")
  async sendEmal(@Body() body: any) {
    return await this.email.notification(body)
  }
  //@UseGuards(TokenGuardGuard)
  @Post('/process')
  async processImgHoles(@Body(new ValidationPipe({ whitelist: true })) hole: ValidHolesDto, @Res() response: Response) {
    const n_holes = await this.detectHolesService.predict(hole);
    const date = new Date()
    return response.status(HttpStatus.OK).send({
      accepted: n_holes === 0 ? false : true, //caso o valor for 0 ele nao foi aceito o buraco
      nHoles: n_holes,
      accepted_time: `${date.toLocaleDateString("pt-br")} ${date.toTimeString()}`
    })
  }

  @Get()
  findAll() {
    return this.detectHolesService.findAll();
  }

  @Get(':id')
  findUserHoles(@Param('id') id: string) {
    return this.detectHolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetectHoleDto: UpdateDetectHoleDto) {
    return this.detectHolesService.update(+id, updateDetectHoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detectHolesService.remove(+id);
  }
}
