import { Gauge, Histogram, register } from 'prom-client';

// ===========================
// MÉTRICAS DE MEMORIA
// ===========================
export const memoryUsageGauge = new Gauge({
  name: 'nodejs_memory_usage_bytes',
  help: 'Memory usage of the Node.js process',
  labelNames: ['type'],
  registers: [register],
});

// MÉTRICAS CPU
export const cpuUsageGauge = new Gauge({
  name: 'nodejs_cpu_usage_seconds',
  help: 'CPU usage of the Node.js process',
  registers: [register],
});

// EVENT LOOP LAG
export const eventLoopLagHistogram = new Histogram({
  name: 'nodejs_event_loop_lag_seconds',
  help: 'Event loop lag in seconds',
  buckets: [0.001, 0.005, 0.01, 0.05],
  registers: [register],
});

// Función para medir event loop lag
function measureEventLoopLag() {
  const start = process.hrtime.bigint();
  setImmediate(() => {
    const end = process.hrtime.bigint();
    const lag = Number(end - start) / 1e9;
    eventLoopLagHistogram.observe(lag);
  });
}

// ACTUALIZAR MÉTRICAS CADA 1 SEGUNDO
setInterval(() => {
  // CPU usage del proceso
  const cpu = process.cpuUsage();
  cpuUsageGauge.set((cpu.user + cpu.system) / 1e6);

  // Memory usage del proceso
  const mem = process.memoryUsage();
  Object.entries(mem).forEach(([key, value]) => {
    memoryUsageGauge.labels(key).set(value);
  });

  // Event loop lag
  measureEventLoopLag();

}, 1000);
