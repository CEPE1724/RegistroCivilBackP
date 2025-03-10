import { Test, TestingModule } from '@nestjs/testing';
import { CreInmuebleService } from './cre_inmueble.service';

describe('CreInmuebleService', () => {
  let service: CreInmuebleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreInmuebleService],
    }).compile();

    service = module.get<CreInmuebleService>(CreInmuebleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
