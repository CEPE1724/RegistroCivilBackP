import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,} from '@nestjs/common';
import { DatacognoService } from './datacogno.service';
import { CreateDatacognoDto } from './dto/create-datacogno.dto';
import { UpdateDatacognoDto } from './dto/update-datacogno.dto';

@Controller('datacogno')
export class DatacognoController {
  constructor(private readonly datacognoService: DatacognoService) {}

  @Post()
  create(@Body() createDatacognoDto: CreateDatacognoDto) {
    return this.datacognoService.create(createDatacognoDto);
  }

  @Get()
  findAll() {
    return this.datacognoService.findAll();
  }

  @Get(':idDataCogno')
  findOne(@Param('idDataCogno', ParseIntPipe) idDataCogno: number) {
    return this.datacognoService.findOne(idDataCogno);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatacognoDto: UpdateDatacognoDto) {
    return this.datacognoService.update(+id, updateDatacognoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datacognoService.remove(+id);
  }
}
