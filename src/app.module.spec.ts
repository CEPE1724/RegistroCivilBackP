import { Test, TestingModule } from "@nestjs/testing";
import { before } from "node:test"
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppModule } from "./app.module";

describe('AppNodule', () => {
  let appController: AppController;
    let appService: AppService;
    beforeEach(async () => {
         const moduleRef: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
        appController = moduleRef.get<AppController>(AppController);
        appService = moduleRef.get<AppService>(AppService);
      }
    );
    
     it(' shoule be defined with proper elemnets', () =>{
        expect(appController).toBeDefined();
        expect(appService).toBeDefined();
     })
}
)
