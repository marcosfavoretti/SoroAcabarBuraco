import { Test, TestingModule } from '@nestjs/testing';
import { DetectHolesService } from './detect-holes.service';

describe('DetectHolesService', () => {
  let service: DetectHolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetectHolesService],
    }).compile();

    service = module.get<DetectHolesService>(DetectHolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
