import { Test, TestingModule } from '@nestjs/testing';
import { CreInmuebleController } from './cre_inmueble.controller';
import { CreInmuebleService } from './cre_inmueble.service';

describe('CreInmuebleController', () => {
  let controller: CreInmuebleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreInmuebleController],
      providers: [CreInmuebleService],
    }).compile();

    controller = module.get<CreInmuebleController>(CreInmuebleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
