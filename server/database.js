import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));

export function setupDatabase() {
  // Criar tabelas
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'verifier')) NOT NULL,
      active BOOLEAN DEFAULT true,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      street TEXT NOT NULL,
      number TEXT NOT NULL,
      complement TEXT,
      neighborhood TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'Brasil',
      postal_code TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      status TEXT CHECK(status IN ('pending', 'verified', 'failed')) NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      verified_by TEXT REFERENCES users(id),
      notes TEXT,
      reference_points TEXT,
      facade_photo TEXT
    );
  `);

  // Criar usuário admin padrão se não existir
  const adminExists = db.prepare('SELECT 1 FROM users WHERE email = ?').get('admin@verificaendereco.com.br');
  
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'admin-' + Date.now(),
      'Administrador',
      'admin@verificaendereco.com.br',
      hashedPassword,
      'admin'
    );
  }
}

export { db };