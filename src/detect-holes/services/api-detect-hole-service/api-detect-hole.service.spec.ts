import { Test, TestingModule } from '@nestjs/testing';
import { ApiDetectHoleService } from './api-detect-hole.service';

describe('ApiDetectHoleService', () => {
  let service: ApiDetectHoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiDetectHoleService],
    }).compile();

    service = module.get<ApiDetectHoleService>(ApiDetectHoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
