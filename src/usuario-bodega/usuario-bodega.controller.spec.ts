import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBodegaController } from './usuario-bodega.controller';
import { UsuarioBodegaService } from './usuario-bodega.service';

describe('UsuarioBodegaController', () => {
  let controller: UsuarioBodegaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioBodegaController],
      providers: [UsuarioBodegaService],
    }).compile();

    controller = module.get<UsuarioBodegaController>(UsuarioBodegaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
