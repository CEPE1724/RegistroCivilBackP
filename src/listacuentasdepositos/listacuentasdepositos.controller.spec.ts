import { Test, TestingModule } from '@nestjs/testing';
import { ListacuentasdepositosController } from './listacuentasdepositos.controller';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';

describe('ListacuentasdepositosController', () => {
  let controller: ListacuentasdepositosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListacuentasdepositosController],
      providers: [ListacuentasdepositosService],
    }).compile();

    controller = module.get<ListacuentasdepositosController>(ListacuentasdepositosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
