// @types/env.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URI: string;
    SECRET_KEY: string;
    PORT?: string;
  }
}
