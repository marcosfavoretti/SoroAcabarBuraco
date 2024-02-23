import { Module } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { DetectHolesController } from './detect-holes.controller';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { ImageOperationsService } from './services/image-operations-service/image-operations.service';

@Module({
  controllers: [DetectHolesController],
  providers: [DetectHolesService, ApiDetectHoleService, ImageOperationsService],
})
export class DetectHolesModule { }
