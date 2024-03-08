import { Test, TestingModule } from '@nestjs/testing';
import { EmailPosDetectHoleService } from './email-pos-detect-hole.service';

describe('EmailPosDetectHoleService', () => {
  let service: EmailPosDetectHoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailPosDetectHoleService],
    }).compile();

    service = module.get<EmailPosDetectHoleService>(EmailPosDetectHoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
