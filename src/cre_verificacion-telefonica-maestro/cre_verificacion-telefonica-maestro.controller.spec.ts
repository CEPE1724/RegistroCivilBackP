import { Test, TestingModule } from '@nestjs/testing';
import { CreVerificacionTelefonicaMaestroController } from './cre_verificacion-telefonica-maestro.controller';
import { CreVerificacionTelefonicaMaestroService } from './cre_verificacion-telefonica-maestro.service';

describe('CreVerificacionTelefonicaMaestroController', () => {
  let controller: CreVerificacionTelefonicaMaestroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreVerificacionTelefonicaMaestroController],
      providers: [CreVerificacionTelefonicaMaestroService],
    }).compile();

    controller = module.get<CreVerificacionTelefonicaMaestroController>(CreVerificacionTelefonicaMaestroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
