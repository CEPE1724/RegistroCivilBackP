import { Test, TestingModule } from '@nestjs/testing';
import { CreTiempoviviendaController } from './cre_tiempovivienda.controller';
import { CreTiempoviviendaService } from './cre_tiempovivienda.service';

describe('CreTiempoviviendaController', () => {
  let controller: CreTiempoviviendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreTiempoviviendaController],
      providers: [CreTiempoviviendaService],
    }).compile();

    controller = module.get<CreTiempoviviendaController>(CreTiempoviviendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
