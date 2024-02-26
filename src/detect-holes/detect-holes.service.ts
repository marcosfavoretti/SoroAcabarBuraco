import { Injectable } from '@nestjs/common';
import { CreateDetectHoleDto } from './dto/create-detect-hole.dto';
import { UpdateDetectHoleDto } from './dto/update-detect-hole.dto';
import { ValidHolesDto } from './dto/validHole-post';
import { ApiDetectHoleService } from './services/api-detect-hole-service/api-detect-hole.service';
import { Repository } from 'typeorm';
import { Patalogia } from './entities/detect-hole.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetectHolesService {
  constructor(private api: ApiDetectHoleService,
    @InjectRepository(Patalogia) private holes: Repository<Patalogia>
  ) {
  }

  private create(createDetectHoleDto: CreateDetectHoleDto) {
    return 'This action adds a new detectHole';
  }

  async predict(hole: ValidHolesDto) {
    const n_holes = await this.api.callApiDetectHole(hole.x64)
    //
      
    //func para salvar no banco para salvar o obj
    return n_holes
  }
  findAll() {
    return `This action returns all detectHoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detectHole`;
  }

  update(id: number, updateDetectHoleDto: UpdateDetectHoleDto) {
    return `This action updates a #${id} detectHole`;
  }

  remove(id: number) {
    return `This action removes a #${id} detectHole`;
  }
}
