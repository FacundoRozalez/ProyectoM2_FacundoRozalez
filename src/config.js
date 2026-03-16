import fs from 'fs';
import process from 'node:process';
import pg from 'pg';

// Solo carga el .env si estás en local (desarrollo)
if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

export const pool = new pg.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  // CONFIGURACIÓN PARA RAILWAY (IMPORTANTE)
  ssl: process.env.DBHOST !== 'localhost' ? { rejectUnauthorized: false } : false
});