import { Test, TestingModule } from '@nestjs/testing';
import { ComAsignacionDeVendedoresController } from './com_asignacion-de-vendedores.controller';
import { ComAsignacionDeVendedoresService } from './com_asignacion-de-vendedores.service';

describe('ComAsignacionDeVendedoresController', () => {
  let controller: ComAsignacionDeVendedoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComAsignacionDeVendedoresController],
      providers: [ComAsignacionDeVendedoresService],
    }).compile();

    controller = module.get<ComAsignacionDeVendedoresController>(ComAsignacionDeVendedoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
