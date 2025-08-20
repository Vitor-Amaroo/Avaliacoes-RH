// server/api/db.ts
import Database from 'better-sqlite3';

// Define o caminho para o arquivo do banco de dados. Ele será criado se não existir.
const dbPath = 'database.db';

// Conecta ao banco de dados e habilita a opção 'readonly' para evitar
// que a base de dados seja corrompida se o arquivo for aberto por multiplos processos
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Cria a tabela 'feedbacks' se ela ainda não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Adiciona a nova tabela para armazenar usuários
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    sector TEXT,
    manager TEXT,
    birthdate TEXT
  );
`);

console.log('Banco de dados conectado e tabelas verificadas.');

// Exporta a instância do banco de dados para ser usada em outras rotas
export default db;
