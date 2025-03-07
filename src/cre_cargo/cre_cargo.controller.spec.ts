import { Test, TestingModule } from '@nestjs/testing';
import { CreCargoController } from './cre_cargo.controller';
import { CreCargoService } from './cre_cargo.service';

describe('CreCargoController', () => {
  let controller: CreCargoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreCargoController],
      providers: [CreCargoService],
    }).compile();

    controller = module.get<CreCargoController>(CreCargoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
