import { Test, TestingModule } from '@nestjs/testing';
import { CreTiposueldoController } from './cre_tiposueldo.controller';
import { CreTiposueldoService } from './cre_tiposueldo.service';

describe('CreTiposueldoController', () => {
  let controller: CreTiposueldoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreTiposueldoController],
      providers: [CreTiposueldoService],
    }).compile();

    controller = module.get<CreTiposueldoController>(CreTiposueldoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
