import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

// Configuração SSL para Neon (requer SSL por padrão)
const sslConfig =
  process.env.DB_USE_SSL === "true"
    ? {
        rejectUnauthorized: false, // Neon usa certificados auto-assinados
      }
    : undefined;

export const furnasPool = new Pool({
  host: process.env.DB_FURNAS_HOST,
  user: process.env.DB_FURNAS_USER,
  password: String(process.env.DB_FURNAS_PASSWORD),
  database: process.env.DB_FURNAS_NAME,
  port: Number(process.env.DB_FURNAS_PORT),
  ssl: sslConfig,
});

export const simaPool = new Pool({
  host: process.env.DB_SIMA_HOST,
  user: process.env.DB_SIMA_USER,
  password: String(process.env.DB_SIMA_PASSWORD),
  database: process.env.DB_SIMA_NAME,
  port: Number(process.env.DB_SIMA_PORT),
  ssl: sslConfig,
});

export const balcarPool = new Pool({
  host: process.env.DB_BALCAR_HOST,
  user: process.env.DB_BALCAR_USER,
  password: String(process.env.DB_BALCAR_PASSWORD),
  database: process.env.DB_BALCAR_NAME,
  port: Number(process.env.DB_BALCAR_PORT),
  ssl: sslConfig,
});
