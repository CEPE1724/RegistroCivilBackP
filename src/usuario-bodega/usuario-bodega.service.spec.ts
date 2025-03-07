import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBodegaService } from './usuario-bodega.service';

describe('UsuarioBodegaService', () => {
  let service: UsuarioBodegaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioBodegaService],
    }).compile();

    service = module.get<UsuarioBodegaService>(UsuarioBodegaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
