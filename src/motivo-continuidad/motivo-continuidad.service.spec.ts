import { Test, TestingModule } from '@nestjs/testing';
import { MotivoContinuidadService } from './motivo-continuidad.service';

describe('MotivoContinuidadService', () => {
  let service: MotivoContinuidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotivoContinuidadService],
    }).compile();

    service = module.get<MotivoContinuidadService>(MotivoContinuidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
