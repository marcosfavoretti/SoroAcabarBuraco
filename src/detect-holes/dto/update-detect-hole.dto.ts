import { PartialType } from '@nestjs/mapped-types';
import { CreateDetectHoleDto } from './create-detect-hole.dto';

export class UpdateDetectHoleDto extends PartialType(CreateDetectHoleDto) {}
