import { Test, TestingModule } from '@nestjs/testing';
import { CreTiempoviviendaService } from './cre_tiempovivienda.service';

describe('CreTiempoviviendaService', () => {
  let service: CreTiempoviviendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreTiempoviviendaService],
    }).compile();

    service = module.get<CreTiempoviviendaService>(CreTiempoviviendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
