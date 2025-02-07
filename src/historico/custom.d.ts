// custom.d.ts
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Aquí puedes definir el tipo exacto de tu usuario (ej. { username: string; id: number; ... })
  }
}
