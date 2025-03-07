import { Test, TestingModule } from '@nestjs/testing';
import { CreTipoempresaService } from './cre_tipoempresa.service';

describe('CreTipoempresaService', () => {
  let service: CreTipoempresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreTipoempresaService],
    }).compile();

    service = module.get<CreTipoempresaService>(CreTipoempresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
