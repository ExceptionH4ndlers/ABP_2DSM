import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

export const simaPool = new Pool({
  host: process.env.DB_SIMA_HOST,
  user: process.env.DB_SIMA_USER,
  password: String(process.env.DB_SIMA_PASSWORD),
  database: process.env.DB_SIMA_NAME,
  port: Number(process.env.DB_SIMA_PORT),
});
