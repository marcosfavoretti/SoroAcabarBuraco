import { Test, TestingModule } from '@nestjs/testing';
import { TokenGenerateService } from './token-generate.service';

describe('TokenGenerateService', () => {
  let service: TokenGenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenGenerateService],
    }).compile();

    service = module.get<TokenGenerateService>(TokenGenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
