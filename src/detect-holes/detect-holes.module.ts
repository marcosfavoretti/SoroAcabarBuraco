import { Module } from '@nestjs/common';
import { DetectHolesService } from './detect-holes.service';
import { DetectHolesController } from './detect-holes.controller';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { ImageOperationsService } from './services/image-operations-service/image-operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patalogia } from './entities/detect-hole.entity';
import { TokenGenerateService } from 'globalServices/token-generate-service/token-generate.service';
import { Usuario } from 'src/login/entities/user.entity';
import { CheckRoleService } from 'src/globalGuards/acesso-guard/check-role/check-role.service';
import { AcessoModule } from 'src/globalGuards/acesso-guard/acesso.module';
import { AcessoLiberacao } from 'src/login/entities/acessosLiberacao.entiy';
import { Pagina } from 'src/login/entities/pagina.entity';
import { FactoryPosActionsService } from './PosDetectionActions/services/factory-pos-actions/factory-pos-actions.service';
import { EmailPosDetectHoleService } from './PosDetectionActions/services/email-pos-detect-hole/email-pos-detect-hole.service';
import { RankingUpdatePosDetectHoleService } from './PosDetectionActions/services/ranking-update-pos-detect-hole/ranking-update-pos-detect-hole.service';
import { NotificationService } from 'globalServices/notification-service/notification-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patalogia, Usuario, AcessoLiberacao, Pagina]),
  ],
  controllers: [DetectHolesController],
  providers: [FactoryPosActionsService, EmailPosDetectHoleService, RankingUpdatePosDetectHoleService, NotificationService,
    CheckRoleService, DetectHolesService, TokenGenerateService, ApiDetectHoleService, ImageOperationsService],
})
export class DetectHolesModule { }
