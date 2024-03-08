import { Test, TestingModule } from '@nestjs/testing';
import { FactoryPosActionsService } from './factory-pos-actions.service';

describe('FactoryPosActionsService', () => {
  let service: FactoryPosActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactoryPosActionsService],
    }).compile();

    service = module.get<FactoryPosActionsService>(FactoryPosActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
