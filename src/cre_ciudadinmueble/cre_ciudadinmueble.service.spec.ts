import { Test, TestingModule } from '@nestjs/testing';
import { CreCiudadinmuebleService } from './cre_ciudadinmueble.service';

describe('CreCiudadinmuebleService', () => {
  let service: CreCiudadinmuebleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreCiudadinmuebleService],
    }).compile();

    service = module.get<CreCiudadinmuebleService>(CreCiudadinmuebleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
