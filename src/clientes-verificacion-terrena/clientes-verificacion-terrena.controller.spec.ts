import { Test, TestingModule } from '@nestjs/testing';
import { ClientesVerificacionTerrenaController } from './clientes-verificacion-terrena.controller';
import { ClientesVerificacionTerrenaService } from './clientes-verificacion-terrena.service';

describe('ClientesVerificacionTerrenaController', () => {
  let controller: ClientesVerificacionTerrenaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesVerificacionTerrenaController],
      providers: [ClientesVerificacionTerrenaService],
    }).compile();

    controller = module.get<ClientesVerificacionTerrenaController>(ClientesVerificacionTerrenaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
