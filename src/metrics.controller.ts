import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { register } from 'prom-client';
import { MetricsAuthGuard } from './metrics/metrics-auth.guard';
@Controller()
export class MetricsController {
  @Get('metrics')
  @Header('Content-Type', register.contentType)
  @UseGuards(MetricsAuthGuard)
  async metrics() {
    return register.metrics();
  }
}
    