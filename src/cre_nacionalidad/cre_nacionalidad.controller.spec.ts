import { Test, TestingModule } from '@nestjs/testing';
import { CreNacionalidadController } from './cre_nacionalidad.controller';
import { CreNacionalidadService } from './cre_nacionalidad.service';

describe('CreNacionalidadController', () => {
  let controller: CreNacionalidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreNacionalidadController],
      providers: [CreNacionalidadService],
    }).compile();

    controller = module.get<CreNacionalidadController>(CreNacionalidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
