import { Test, TestingModule } from '@nestjs/testing';
import { RankingUpdatePosDetectHoleService } from './ranking-update-pos-detect-hole.service';

describe('RankingUpdatePosDetectHoleService', () => {
  let service: RankingUpdatePosDetectHoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingUpdatePosDetectHoleService],
    }).compile();

    service = module.get<RankingUpdatePosDetectHoleService>(RankingUpdatePosDetectHoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
