import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'minha_api_db',
  password: process.env.DB_PASSWORD || 'password',
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on('connect', () => {
  console.log('🔥 Conectado ao banco de dados PostgreSQL');
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
