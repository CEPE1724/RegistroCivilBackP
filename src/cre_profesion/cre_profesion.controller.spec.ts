import { Test, TestingModule } from '@nestjs/testing';
import { CreProfesionController } from './cre_profesion.controller';
import { CreProfesionService } from './cre_profesion.service';

describe('CreProfesionController', () => {
  let controller: CreProfesionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreProfesionController],
      providers: [CreProfesionService],
    }).compile();

    controller = module.get<CreProfesionController>(CreProfesionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
