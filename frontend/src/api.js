const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  try { return JSON.parse(localStorage.getItem('cyberOquToken')) } catch { return null }
}

function saveToken(token) {
  localStorage.setItem('cyberOquToken', JSON.stringify(token))
}

function clearToken() {
  localStorage.removeItem('cyberOquToken')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Ошибка')
  return data
}

export const api = {
  // Регистрация
  register: async (name, email, password) => {
    const data = await request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    })
    saveToken(data.token)
    return data.user
  },

  // Вход
  login: async (email, password) => {
    const data = await request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    saveToken(data.token)
    return data.user
  },

  // Выход
  logout: () => {
    clearToken()
    localStorage.clear()
  },

  // Получить профиль
  getMe: () => request('/me'),

  // Обновить профиль
  updateMe: (updates) => request('/me', {
    method: 'PATCH',
    body: JSON.stringify(updates)
  }),

  // Получить прогресс
  getProgress: () => request('/progress'),

  // Сохранить прогресс
  saveProgress: (moduleId, levelId) => request('/progress', {
    method: 'POST',
    body: JSON.stringify({ moduleId, levelId })
  }),

  // Сбросить прогресс
  resetProgress: () => request('/progress', { method: 'DELETE' }),

  // Проверить авторизован ли
  hasToken: () => !!getToken(),
}