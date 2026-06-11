import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import { api } from './api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Если есть токен — загружаем профиль
    if (api.hasToken()) {
      api.getMe()
        .then(u => setUser(u))
        .catch(() => setLoading(false))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const updateUser = async (updates) => {
    try {
      const updated = await api.updateMe(updates)
      setUser(updated)
    } catch {
      setUser(prev => ({ ...prev, ...updates }))
    }
  }

  const handleLogout = () => {
    api.logout()
    setUser(null)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#4f46e5', fontSize: '18px', fontWeight: '700' }}>Загрузка... 🛡️</p>
    </div>
  )

  if (!user) return <AuthPage setUser={setUser} />

  return <MainPage user={user} setUser={handleLogout} updateUser={updateUser} />
}

export default App