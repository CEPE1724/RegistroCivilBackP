import { Test, TestingModule } from '@nestjs/testing';
import { CreTipocontratoController } from './cre_tipocontrato.controller';
import { CreTipocontratoService } from './cre_tipocontrato.service';

describe('CreTipocontratoController', () => {
  let controller: CreTipocontratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreTipocontratoController],
      providers: [CreTipocontratoService],
    }).compile();

    controller = module.get<CreTipocontratoController>(CreTipocontratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
