import { Test, TestingModule } from '@nestjs/testing';
import { CreCargoService } from './cre_cargo.service';

describe('CreCargoService', () => {
  let service: CreCargoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreCargoService],
    }).compile();

    service = module.get<CreCargoService>(CreCargoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
