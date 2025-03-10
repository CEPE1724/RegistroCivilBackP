import { Test, TestingModule } from '@nestjs/testing';
import { CreTipoviviendaService } from './cre_tipovivienda.service';

describe('CreTipoviviendaService', () => {
  let service: CreTipoviviendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreTipoviviendaService],
    }).compile();

    service = module.get<CreTipoviviendaService>(CreTipoviviendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
