const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./database')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001
const SECRET = process.env.JWT_SECRET || 'cyberoqu_secret_key'

app.use(cors())
app.use(express.json())

// ═══ MIDDLEWARE: проверка токена ═══
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Нет токена' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Токен недействителен' })
  }
}

// ═══ РЕГИСТРАЦИЯ ═══
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Заполните все поля' })
  }
  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) return res.status(400).json({ error: 'Email уже зарегистрирован' })

    const hash = await bcrypt.hash(password, 10)
    const result = db.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    ).run(name, email, hash)

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '30d' })

    res.json({ token, user: sanitizeUser(user) })
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ═══ ВХОД ═══
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Заполните все поля' })

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(400).json({ error: 'Неверный пароль' })

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '30d' })
    res.json({ token, user: sanitizeUser(user) })
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// ═══ ПОЛУЧИТЬ ПРОФИЛЬ ═══
app.get('/api/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
  res.json(sanitizeUser(user))
})

// ═══ ОБНОВИТЬ ПРОФИЛЬ (энергия, кристаллы, очки и т.д.) ═══
app.patch('/api/me', authMiddleware, (req, res) => {
  const { energy, crystals, points, streak, level, avatar, notifications } = req.body
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Не найден' })

  db.prepare(`
    UPDATE users SET
      energy = COALESCE(?, energy),
      crystals = COALESCE(?, crystals),
      points = COALESCE(?, points),
      streak = COALESCE(?, streak),
      level = COALESCE(?, level),
      avatar = COALESCE(?, avatar),
      notifications = COALESCE(?, notifications)
    WHERE id = ?
  `).run(
    energy ?? null,
    crystals ?? null,
    points ?? null,
    streak ?? null,
    level ?? null,
    avatar ?? null,
    notifications !== undefined ? (notifications ? 1 : 0) : null,
    req.user.id
  )

  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  res.json(sanitizeUser(updated))
})

// ═══ ПОЛУЧИТЬ ПРОГРЕСС ═══
app.get('/api/progress', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT module_id, level_id FROM progress WHERE user_id = ?').all(req.user.id)
  const progress = {}
  rows.forEach(row => { progress[`${row.module_id}-${row.level_id}`] = true })
  res.json(progress)
})

// ═══ СОХРАНИТЬ ПРОГРЕСС ═══
app.post('/api/progress', authMiddleware, (req, res) => {
  const { moduleId, levelId } = req.body
  if (!moduleId || !levelId) return res.status(400).json({ error: 'Нет данных' })

  const existing = db.prepare(
    'SELECT id FROM progress WHERE user_id = ? AND module_id = ? AND level_id = ?'
  ).get(req.user.id, moduleId, levelId)

  if (!existing) {
    db.prepare('INSERT INTO progress (user_id, module_id, level_id) VALUES (?, ?, ?)').run(req.user.id, moduleId, levelId)
  }

  res.json({ ok: true })
})

// ═══ СБРОСИТЬ ПРОГРЕСС ═══
app.delete('/api/progress', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM progress WHERE user_id = ?').run(req.user.id)
  res.json({ ok: true })
})

// ═══ ПРОВЕРКА ═══
app.get('/', (req, res) => res.json({ status: 'Cyber Oqu API работает ✅' }))

// Убираем пароль из ответа
function sanitizeUser(user) {
  const { password_hash, ...safe } = user
  return safe
}

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT} 🚀`))