import { Test, TestingModule } from '@nestjs/testing';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';

describe('ListacuentasdepositosService', () => {
  let service: ListacuentasdepositosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListacuentasdepositosService],
    }).compile();

    service = module.get<ListacuentasdepositosService>(ListacuentasdepositosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
