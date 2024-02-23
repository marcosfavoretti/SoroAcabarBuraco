import { Test, TestingModule } from '@nestjs/testing';
import { DetectHolesController } from './detect-holes.controller';
import { DetectHolesService } from './detect-holes.service';

describe('DetectHolesController', () => {
  let controller: DetectHolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetectHolesController],
      providers: [DetectHolesService],
    }).compile();

    controller = module.get<DetectHolesController>(DetectHolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
