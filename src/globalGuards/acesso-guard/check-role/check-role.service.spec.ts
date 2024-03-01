import { Test, TestingModule } from '@nestjs/testing';
import { CheckRoleService } from './check-role.service';

describe('CheckRoleService', () => {
  let service: CheckRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckRoleService],
    }).compile();

    service = module.get<CheckRoleService>(CheckRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
