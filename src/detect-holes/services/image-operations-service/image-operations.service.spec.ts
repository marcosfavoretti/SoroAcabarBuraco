import { Test, TestingModule } from '@nestjs/testing';
import { ImageOperationsService } from './image-operations.service';

describe('ImageOperationsService', () => {
  let service: ImageOperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageOperationsService],
    }).compile();

    service = module.get<ImageOperationsService>(ImageOperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
