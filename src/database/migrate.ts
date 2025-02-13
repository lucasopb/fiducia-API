import { query } from './database';
import fs from 'fs';
import path from 'path';

const migrationsPath = path.join(__dirname, 'migrations');

const runMigrations = async () => {
  // Cria a tabela de controle de migrations caso não exista
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Obtém as migrations já aplicadas
  const appliedMigrations = await query(`SELECT name FROM migrations`);
  const appliedSet = new Set(appliedMigrations.rows.map((m: any) => m.name));

  // Lê os arquivos na pasta de migrations
  const files = fs.readdirSync(migrationsPath).sort();

  for (const file of files) {
    if (!appliedSet.has(file)) {
      const sql = fs.readFileSync(path.join(migrationsPath, file), 'utf-8');
      console.log(`🔄 Aplicando migração: ${file}`);
      await query(sql);
      await query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);
      console.log(`✅ Migração aplicada: ${file}`);
    }
  }

  console.log('🚀 Todas as migrações estão aplicadas!');
};

runMigrations().catch((err) => console.error('Erro ao rodar migrações:', err));
