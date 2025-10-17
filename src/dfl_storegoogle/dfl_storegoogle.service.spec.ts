import { Test, TestingModule } from '@nestjs/testing';
import { DflStoregoogleService } from './dfl_storegoogle.service';

describe('DflStoregoogleService', () => {
  let service: DflStoregoogleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DflStoregoogleService],
    }).compile();

    service = module.get<DflStoregoogleService>(DflStoregoogleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
