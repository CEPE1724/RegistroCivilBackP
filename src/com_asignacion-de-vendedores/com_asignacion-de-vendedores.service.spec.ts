import { Test, TestingModule } from '@nestjs/testing';
import { ComAsignacionDeVendedoresService } from './com_asignacion-de-vendedores.service';

describe('ComAsignacionDeVendedoresService', () => {
  let service: ComAsignacionDeVendedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComAsignacionDeVendedoresService],
    }).compile();

    service = module.get<ComAsignacionDeVendedoresService>(ComAsignacionDeVendedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
