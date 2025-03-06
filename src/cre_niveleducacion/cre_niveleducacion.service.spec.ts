import { Test, TestingModule } from '@nestjs/testing';
import { CreNiveleducacionService } from './cre_niveleducacion.service';

describe('CreNiveleducacionService', () => {
  let service: CreNiveleducacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreNiveleducacionService],
    }).compile();

    service = module.get<CreNiveleducacionService>(CreNiveleducacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
