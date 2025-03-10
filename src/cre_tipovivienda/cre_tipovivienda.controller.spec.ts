import { Test, TestingModule } from '@nestjs/testing';
import { CreTipoviviendaController } from './cre_tipovivienda.controller';
import { CreTipoviviendaService } from './cre_tipovivienda.service';

describe('CreTipoviviendaController', () => {
  let controller: CreTipoviviendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreTipoviviendaController],
      providers: [CreTipoviviendaService],
    }).compile();

    controller = module.get<CreTipoviviendaController>(CreTipoviviendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
