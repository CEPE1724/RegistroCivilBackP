import { Test, TestingModule } from '@nestjs/testing';
import { IngresoCobradorController } from './ingreso-cobrador.controller';
import { IngresoCobradorService } from './ingreso-cobrador.service';

describe('IngresoCobradorController', () => {
  let controller: IngresoCobradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresoCobradorController],
      providers: [IngresoCobradorService],
    }).compile();

    controller = module.get<IngresoCobradorController>(IngresoCobradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
