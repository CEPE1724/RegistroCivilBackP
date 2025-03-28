import { Test, TestingModule } from '@nestjs/testing';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';

describe('ClientesVerificacionTerrenaService', () => {
  let service: ClientesVerificacionTerrenaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesVerificacionTerrenaService],
    }).compile();

    service = module.get<ClientesVerificacionTerrenaService>(ClientesVerificacionTerrenaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
