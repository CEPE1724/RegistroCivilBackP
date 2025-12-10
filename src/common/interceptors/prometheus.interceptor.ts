import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counter, Histogram, register } from 'prom-client';

@Injectable()
export class PrometheusInterceptor implements NestInterceptor {
  private readonly httpRequestDuration: Histogram<string>;
  private readonly httpRequestTotal: Counter<string>;
  private readonly httpRequestErrors: Counter<string>;

  constructor() {
    // Métrica: Duración de las peticiones HTTP
    this.httpRequestDuration = new Histogram({
      name: 'http_server_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      registers: [register],
    });

    // Métrica: Total de peticiones HTTP
    this.httpRequestTotal = new Counter({
      name: 'http_server_requests_seconds_count',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [register],
    });

    // Métrica: Total de errores HTTP
    this.httpRequestErrors = new Counter({
      name: 'http_server_request_errors_total',
      help: 'Total number of HTTP request errors',
      labelNames: ['method', 'route', 'status_code'],
      registers: [register],
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, route } = request;
    const path = route?.path || request.url;

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const duration = (Date.now() - startTime) / 1000;

          // Registrar duración
          this.httpRequestDuration.labels(method, path, statusCode.toString()).observe(duration);

          // Registrar total de peticiones
          this.httpRequestTotal.labels(method, path, statusCode.toString()).inc();
        },
        error: (error) => {
          const statusCode = error.status || 500;
          const duration = (Date.now() - startTime) / 1000;

          // Registrar duración de error
          this.httpRequestDuration.labels(method, path, statusCode.toString()).observe(duration);

          // Registrar total de peticiones con error
          this.httpRequestTotal.labels(method, path, statusCode.toString()).inc();

          // Registrar error específico
          this.httpRequestErrors.labels(method, path, statusCode.toString()).inc();
        },
      }),
    );
  }
}
