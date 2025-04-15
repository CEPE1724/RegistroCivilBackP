import { Test, TestingModule } from '@nestjs/testing';
import { IngresoCobradorService } from './ingreso-cobrador.service';

describe('IngresoCobradorService', () => {
  let service: IngresoCobradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresoCobradorService],
    }).compile();

    service = module.get<IngresoCobradorService>(IngresoCobradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
