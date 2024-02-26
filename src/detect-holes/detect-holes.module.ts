import { Module } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { DetectHolesController } from './detect-holes.controller';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { ImageOperationsService } from './services/image-operations-service/image-operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patalogia } from './entities/detect-hole.entity';
import { NotificationServiceService } from 'src/notification-service/notification-service.service';

@Module({
  controllers: [DetectHolesController],
  providers: [DetectHolesService, ApiDetectHoleService, ImageOperationsService, NotificationServiceService],
  imports: [TypeOrmModule.forFeature([Patalogia])]
})
export class DetectHolesModule { }
