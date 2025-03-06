import { Test, TestingModule } from '@nestjs/testing';
import { CreNiveleducacionController } from './cre_niveleducacion.controller';
import { CreNiveleducacionService } from './cre_niveleducacion.service';

describe('CreNiveleducacionController', () => {
  let controller: CreNiveleducacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreNiveleducacionController],
      providers: [CreNiveleducacionService],
    }).compile();

    controller = module.get<CreNiveleducacionController>(CreNiveleducacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
