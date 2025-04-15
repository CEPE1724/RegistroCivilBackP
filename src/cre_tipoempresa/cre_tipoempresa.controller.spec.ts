import { Test, TestingModule } from '@nestjs/testing';
import { CreTipoempresaController } from './cre_tipoempresa.controller';
import { CreTipoempresaService } from './cre_tipoempresa.service';

describe('CreTipoempresaController', () => {
  let controller: CreTipoempresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreTipoempresaController],
      providers: [CreTipoempresaService],
    }).compile();

    controller = module.get<CreTipoempresaController>(CreTipoempresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
