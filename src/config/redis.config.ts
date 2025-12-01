import { registerAs } from '@nestjs/config';

export const redisConfig = {
  host: '192.168.1.88',
  port: 6379,
  password: 'Credito2024!Secure',
  db: 0,
};

export default registerAs('redis', () => redisConfig);