import { useState } from 'react'
import { api } from '../api'

const translations = {
  ru: {
    login: 'Войти',
    register: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    name: 'Имя',
    confirmPassword: 'Подтвердите пароль',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Уже есть аккаунт?',
    signUp: 'Зарегистрироваться',
    signIn: 'Войти',
    tagline: 'Учись кибербезопасности играя',
    welcome: 'Добро пожаловать!',
    welcomeBack: 'С возвращением!',
  },
  kz: {
    login: 'Кіру',
    register: 'Тіркелу',
    email: 'Электрондық пошта',
    password: 'Құпия сөз',
    name: 'Аты',
    confirmPassword: 'Құпия сөзді растаңыз',
    noAccount: 'Аккаунт жоқ па?',
    hasAccount: 'Аккаунт бар ма?',
    signUp: 'Тіркелу',
    signIn: 'Кіру',
    tagline: 'Ойнай отырып киберқауіпсіздікті үйрен',
    welcome: 'Қош келдіңіз!',
    welcomeBack: 'Қайта оралдыңыз!',
  },
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    tagline: 'Learn cybersecurity through play',
    welcome: 'Welcome!',
    welcomeBack: 'Welcome back!',
  }
}

const validatePassword = (password) => ({
  length: password.length >= 8,
  upper: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[!@#$%^&*_=+-/,)(№"!)]/.test(password),
})

function EyeIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true)
  const [lang, setLang] = useState('ru')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const t = translations[lang]
  const checks = validatePassword(form.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Заполните все поля!')
      return
    }

    if (!isLogin) {
      if (!checks.length) { setError('Пароль должен быть минимум 8 символов!'); return }
      if (!checks.upper) { setError('Пароль должен содержать заглавную букву!'); return }
      if (!checks.number) { setError('Пароль должен содержать цифру!'); return }
      if (!checks.special) { setError('Пароль должен содержать спецсимвол (!@#$%^&*)!'); return }
      if (form.password !== form.confirmPassword) { setError('Пароли не совпадают!'); return }
    }

    setLoading(true)
    try {
      let userData
      if (isLogin) {
        userData = await api.login(form.email, form.password)
      } else {
        userData = await api.register(form.name || 'Пользователь', form.email, form.password)
      }
      // Добавляем max_energy если нет
      if (!userData.max_energy) userData.max_energy = 15
      if (!userData.maxEnergy) userData.maxEnergy = userData.max_energy
      setUser(userData)
    } catch (err) {
      setError(err.message || 'Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.circle1} />
      <div style={styles.circle2} />

      {/* Выбор языка */}
      <div style={styles.langBar}>
        {['ru', 'kz', 'en'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              ...styles.langBtn,
              background: lang === l ? '#4f46e5' : 'transparent',
              color: lang === l ? '#fff' : '#888',
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Карточка */}
      <div style={styles.card}>
        {/* Логотип */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🛡️</div>
          <h1 style={styles.logoText}>Cyber <span style={styles.logoAccent}>Oqu</span></h1>
        </div>
        <p style={styles.tagline}>{t.tagline}</p>

        <h2 style={styles.title}>{isLogin ? t.welcomeBack : t.welcome}</h2>

        {/* Переключатель */}
        <div style={styles.toggle}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              ...styles.toggleBtn,
              background: isLogin ? '#4f46e5' : 'transparent',
              color: isLogin ? '#fff' : '#888'
            }}
          >
            {t.login}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              ...styles.toggleBtn,
              background: !isLogin ? '#4f46e5' : 'transparent',
              color: !isLogin ? '#fff' : '#888'
            }}
          >
            {t.register}
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              style={styles.input}
              type="text"
              placeholder={t.name}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            style={styles.input}
            type="email"
            placeholder={t.email}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          {/* Поле пароля */}
          <div style={styles.passwordWrap}>
            <input
              style={styles.passwordInput}
              type={showPassword ? 'text' : 'password'}
              placeholder={t.password}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          {/* Подсказки пароля */}
          {!isLogin && form.password.length > 0 && (
            <div style={styles.passwordHints}>
              <span style={{ color: checks.length ? '#22c55e' : '#ef4444' }}>
                {checks.length ? '✓' : '✗'} Минимум 8 символов
              </span>
              <span style={{ color: checks.upper ? '#22c55e' : '#ef4444' }}>
                {checks.upper ? '✓' : '✗'} Заглавная латинская буква (A-Z)
              </span>
              <span style={{ color: checks.number ? '#22c55e' : '#ef4444' }}>
                {checks.number ? '✓' : '✗'} Цифра (0-9)
              </span>
              <span style={{ color: checks.special ? '#22c55e' : '#ef4444' }}>
                {checks.special ? '✓' : '✗'} Спецсимвол (!@#$%^&*)
              </span>
            </div>
          )}

          {/* Подтверждение пароля */}
          {!isLogin && (
            <div style={styles.passwordWrap}>
              <input
                style={styles.passwordInput}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t.confirmPassword}
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeBtn}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading
              ? (lang === 'ru' ? 'Загрузка...' : lang === 'kz' ? 'Жүктелуде...' : 'Loading...')
              : isLogin ? t.signIn : t.signUp
            }
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin ? t.noAccount : t.hasAccount}{' '}
          <span
            style={styles.switchLink}
            onClick={() => { setIsLogin(!isLogin); setError('') }}
          >
            {isLogin ? t.signUp : t.signIn}
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f0f1a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  circle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
  },
  circle2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
    bottom: '-50px',
    left: '-50px',
  },
  langBar: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '8px',
  },
  langBtn: {
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  card: {
    background: '#1a1a2e',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #2a2a4a',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  logoIcon: { fontSize: '32px' },
  logoText: { fontSize: '28px', fontWeight: '800', color: '#fff' },
  logoAccent: { color: '#4f46e5' },
  tagline: { textAlign: 'center', color: '#666', fontSize: '13px', marginBottom: '24px' },
  title: { textAlign: 'center', fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#fff' },
  toggle: {
    display: 'flex',
    background: '#0f0f1a',
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '24px',
  },
  toggleBtn: {
    flex: 1,
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    background: '#0f0f1a',
    border: '1px solid #2a2a4a',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
  },
  passwordWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  passwordInput: {
    background: '#0f0f1a',
    border: '1px solid #2a2a4a',
    borderRadius: '12px',
    padding: '14px 48px 14px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
  },
  passwordHints: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '10px 14px',
    background: '#0f0f1a',
    borderRadius: '10px',
    fontSize: '12px',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: { color: '#ef4444', fontSize: '13px', textAlign: 'center' },
  switchText: { textAlign: 'center', color: '#666', fontSize: '13px', marginTop: '20px' },
  switchLink: { color: '#4f46e5', cursor: 'pointer', fontWeight: '600' },
}