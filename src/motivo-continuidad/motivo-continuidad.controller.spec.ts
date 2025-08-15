import { Test, TestingModule } from '@nestjs/testing';
import { MotivoContinuidadController } from './motivo-continuidad.controller';
import { MotivoContinuidadService } from './motivo-continuidad.service';

describe('MotivoContinuidadController', () => {
  let controller: MotivoContinuidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotivoContinuidadController],
      providers: [MotivoContinuidadService],
    }).compile();

    controller = module.get<MotivoContinuidadController>(MotivoContinuidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
