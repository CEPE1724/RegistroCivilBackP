import { Test, TestingModule } from '@nestjs/testing';
import { CreCiudadinmuebleController } from './cre_ciudadinmueble.controller';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';

describe('CreCiudadinmuebleController', () => {
  let controller: CreCiudadinmuebleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreCiudadinmuebleController],
      providers: [CreCiudadinmuebleService],
    }).compile();

    controller = module.get<CreCiudadinmuebleController>(CreCiudadinmuebleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
