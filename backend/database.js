const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'cyberoqu.db'))

// Создаём таблицы если их нет
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    crystals INTEGER DEFAULT 20,
    energy INTEGER DEFAULT 15,
    max_energy INTEGER DEFAULT 15,
    points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 1,
    level INTEGER DEFAULT 1,
    avatar TEXT DEFAULT 'cat',
    notifications INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    module_id INTEGER NOT NULL,
    level_id INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`)

console.log('База данных готова ✅')

module.exports = db