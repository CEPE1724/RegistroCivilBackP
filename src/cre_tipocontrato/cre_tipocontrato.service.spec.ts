import { Test, TestingModule } from '@nestjs/testing';
import { CreTipocontratoService } from './cre_tipocontrato.service';

describe('CreTipocontratoService', () => {
  let service: CreTipocontratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreTipocontratoService],
    }).compile();

    service = module.get<CreTipocontratoService>(CreTipocontratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
