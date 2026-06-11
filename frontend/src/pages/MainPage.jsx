import { useState } from 'react'
import { Home, Trophy, Medal, User, Lock, ChevronDown, ChevronUp, Shield, Key, Fish, Smartphone, ArrowRight, Star, Flame, Gem, Globe, LogOut, Check, Circle, Play, Zap, Bell, BellOff, X } from 'lucide-react'
import LessonPage from './LessonPage'

const translations = {
  ru: {
    home: 'Главная', achievements: 'Достижения', leaderboard: 'Рейтинг', profile: 'Профиль',
    streak: 'Дней подряд', points: 'Очки', level: 'Уровень', module: 'Модуль', energy: 'Энергия',
    locked: 'Заблокировано', completed: 'Пройдено', current: 'Текущий',
    start: 'Начать', continue: 'Продолжить', language: 'Язык', logout: 'Выйти', hi: 'Привет',
    chooseAvatar: 'Выбери аватар', notifications: 'Уведомления', settings: 'Настройки',
    notifOn: 'Включены', notifOff: 'Выключены', resetProgress: 'Сбросить прогресс',
    saveAvatar: 'Сохранить', cancel: 'Отмена', crystals: 'Кристаллы',
    buyEnergy: 'Восстановить энергию', buy1: '1 энергия', buyAll: 'Вся энергия (15)',
    notEnough: 'Недостаточно кристаллов!', energyFull: 'Энергия полная!',
    streakTitle: 'Твоя серия', streakDays: 'дней подряд',
    pointsTitle: 'Твои очки', nextLevel: 'до следующего уровня',
    energyTitle: 'Энергия', energyDesc: 'Восстанавливается 1 раз в час',
    crystalTitle: 'Кристаллы', crystalDesc: 'Используй для покупки энергии',
    perHour: 'в час бесплатно', cost: 'стоит', close: 'Закрыть',
  },
  kz: {
    home: 'Басты', achievements: 'Жетістіктер', leaderboard: 'Рейтинг', profile: 'Профиль',
    streak: 'Күн қатарынан', points: 'Ұпайлар', level: 'Деңгей', module: 'Модуль', energy: 'Энергия',
    locked: 'Жабық', completed: 'Аяқталды', current: 'Ағымдағы',
    start: 'Бастау', continue: 'Жалғастыру', language: 'Тіл', logout: 'Шығу', hi: 'Сәлем',
    chooseAvatar: 'Аватар таңда', notifications: 'Хабарландырулар', settings: 'Параметрлер',
    notifOn: 'Қосулы', notifOff: 'Өшірулі', resetProgress: 'Прогрессті тазалау',
    saveAvatar: 'Сақтау', cancel: 'Болдырмау', crystals: 'Кристалдар',
    buyEnergy: 'Энергияны қалпына келтіру', buy1: '1 энергия', buyAll: 'Барлық энергия (15)',
    notEnough: 'Кристалдар жеткіліксіз!', energyFull: 'Энергия толық!',
    streakTitle: 'Сериаңыз', streakDays: 'күн қатарынан',
    pointsTitle: 'Ұпайларың', nextLevel: 'келесі деңгейге дейін',
    energyTitle: 'Энергия', energyDesc: 'Сағатына 1 рет қалпына келеді',
    crystalTitle: 'Кристалдар', crystalDesc: 'Энергия сатып алу үшін пайдалан',
    perHour: 'сағатына тегін', cost: 'тұрады', close: 'Жабу',
  },
  en: {
    home: 'Home', achievements: 'Achievements', leaderboard: 'Leaderboard', profile: 'Profile',
    streak: 'Day streak', points: 'Points', level: 'Level', module: 'Module', energy: 'Energy',
    locked: 'Locked', completed: 'Completed', current: 'Current',
    start: 'Start', continue: 'Continue', language: 'Language', logout: 'Logout', hi: 'Hi',
    chooseAvatar: 'Choose avatar', notifications: 'Notifications', settings: 'Settings',
    notifOn: 'Enabled', notifOff: 'Disabled', resetProgress: 'Reset progress',
    saveAvatar: 'Save', cancel: 'Cancel', crystals: 'Crystals',
    buyEnergy: 'Restore energy', buy1: '1 energy', buyAll: 'Full energy (15)',
    notEnough: 'Not enough crystals!', energyFull: 'Energy is full!',
    streakTitle: 'Your streak', streakDays: 'days in a row',
    pointsTitle: 'Your points', nextLevel: 'to next level',
    energyTitle: 'Energy', energyDesc: 'Restores 1 per hour for free',
    crystalTitle: 'Crystals', crystalDesc: 'Use to buy energy',
    perHour: 'per hour free', cost: 'costs', close: 'Close',
  }
}

// ═══ SVG АВАТАРЫ ═══
const AVATARS = [
  {
    id: 'wolf', name: { ru: 'Волк', kz: 'Қасқыр', en: 'Wolf' }, color: '#6366f1',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#6366f1"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#a5b4fc"/><ellipse cx="30" cy="28" rx="12" ry="11" fill="#e0e7ff"/><polygon points="18,20 22,8 26,20" fill="#6366f1"/><polygon points="42,20 38,8 34,20" fill="#6366f1"/><polygon points="19,20 22,10 25,20" fill="#e0e7ff"/><polygon points="41,20 38,10 35,20" fill="#e0e7ff"/><ellipse cx="24" cy="27" rx="3" ry="3.5" fill="white"/><ellipse cx="36" cy="27" rx="3" ry="3.5" fill="white"/><circle cx="24.5" cy="27.5" r="2" fill="#1e1b4b"/><circle cx="36.5" cy="27.5" r="2" fill="#1e1b4b"/><circle cx="25" cy="27" r="0.7" fill="white"/><circle cx="37" cy="27" r="0.7" fill="white"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeLinecap="round"/><line x1="20" y1="31" x2="14" y2="30" stroke="#a5b4fc" strokeWidth="1"/><line x1="20" y1="33" x2="14" y2="34" stroke="#a5b4fc" strokeWidth="1"/><line x1="40" y1="31" x2="46" y2="30" stroke="#a5b4fc" strokeWidth="1"/><line x1="40" y1="33" x2="46" y2="34" stroke="#a5b4fc" strokeWidth="1"/></svg>)
  },
  {
    id: 'fox', name: { ru: 'Лиса', kz: 'Түлкі', en: 'Fox' }, color: '#f97316',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#f97316"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#fed7aa"/><ellipse cx="30" cy="28" rx="12" ry="11" fill="#ffedd5"/><polygon points="16,22 14,6 24,18" fill="#f97316"/><polygon points="44,22 46,6 36,18" fill="#f97316"/><polygon points="17,21 15,8 23,18" fill="#ffedd5"/><polygon points="43,21 45,8 37,18" fill="#ffedd5"/><ellipse cx="24" cy="27" rx="3" ry="3.5" fill="white"/><ellipse cx="36" cy="27" rx="3" ry="3.5" fill="white"/><circle cx="24.5" cy="27.5" r="2" fill="#431407"/><circle cx="36.5" cy="27.5" r="2" fill="#431407"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
  {
    id: 'panda', name: { ru: 'Панда', kz: 'Панда', en: 'Panda' }, color: '#64748b',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#f1f5f9"/><ellipse cx="30" cy="35" rx="14" ry="10" fill="white"/><ellipse cx="30" cy="28" rx="12" ry="11" fill="white"/><circle cx="18" cy="22" r="7" fill="#1e293b"/><circle cx="42" cy="22" r="7" fill="#1e293b"/><ellipse cx="24" cy="27" rx="4" ry="4.5" fill="#1e293b"/><ellipse cx="36" cy="27" rx="4" ry="4.5" fill="#1e293b"/><ellipse cx="24" cy="27" rx="2.5" ry="3" fill="white"/><ellipse cx="36" cy="27" rx="2.5" ry="3" fill="white"/><circle cx="24.5" cy="27.5" r="1.8" fill="#0f172a"/><circle cx="36.5" cy="27.5" r="1.8" fill="#0f172a"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#64748b" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
  {
    id: 'tiger', name: { ru: 'Тигр', kz: 'Жолбарыс', en: 'Tiger' }, color: '#eab308',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#eab308"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#fef3c7"/><ellipse cx="30" cy="28" rx="12" ry="11" fill="#fef9c3"/><polygon points="19,21 22,9 25,21" fill="#eab308"/><polygon points="41,21 38,9 35,21" fill="#eab308"/><ellipse cx="24" cy="27" rx="3" ry="3.5" fill="white"/><ellipse cx="36" cy="27" rx="3" ry="3.5" fill="white"/><circle cx="24.5" cy="27.5" r="2" fill="#1c1917"/><circle cx="36.5" cy="27.5" r="2" fill="#1c1917"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#eab308" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
  {
    id: 'owl', name: { ru: 'Сова', kz: 'Үкі', en: 'Owl' }, color: '#8b5cf6',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#8b5cf6"/><ellipse cx="30" cy="36" rx="14" ry="11" fill="#ddd6fe"/><ellipse cx="30" cy="28" rx="12" ry="12" fill="#ede9fe"/><polygon points="18,16 22,6 28,18" fill="#7c3aed"/><polygon points="42,16 38,6 32,18" fill="#7c3aed"/><circle cx="24" cy="27" r="6" fill="white"/><circle cx="36" cy="27" r="6" fill="white"/><circle cx="24" cy="27" r="4" fill="#1e1b4b"/><circle cx="36" cy="27" r="4" fill="#1e1b4b"/><circle cx="25" cy="26" r="1" fill="white"/><circle cx="37" cy="26" r="1" fill="white"/><polygon points="27,32 30,36 33,32" fill="#f59e0b"/></svg>)
  },
  {
    id: 'cat', name: { ru: 'Кот', kz: 'Мысық', en: 'Cat' }, color: '#ec4899',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#ec4899"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#fce7f3"/><ellipse cx="30" cy="28" rx="12" ry="11" fill="#fdf2f8"/><polygon points="17,21 20,8 25,21" fill="#ec4899"/><polygon points="43,21 40,8 35,21" fill="#ec4899"/><ellipse cx="24" cy="27" rx="3" ry="3.5" fill="white"/><ellipse cx="36" cy="27" rx="3" ry="3.5" fill="white"/><circle cx="24.5" cy="27.5" r="2" fill="#500724"/><circle cx="36.5" cy="27.5" r="2" fill="#500724"/><ellipse cx="30" cy="32" rx="2.5" ry="1.5" fill="#fda4af"/><path d="M27.5 34 Q30 36.5 32.5 34" stroke="#ec4899" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
  {
    id: 'bear', name: { ru: 'Медведь', kz: 'Аю', en: 'Bear' }, color: '#92400e',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#92400e"/><circle cx="18" cy="20" r="7" fill="#78350f"/><circle cx="42" cy="20" r="7" fill="#78350f"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#d97706"/><ellipse cx="30" cy="27" rx="12" ry="12" fill="#fbbf24"/><ellipse cx="24" cy="26" rx="3" ry="3.5" fill="white"/><ellipse cx="36" cy="26" rx="3" ry="3.5" fill="white"/><circle cx="24.5" cy="26.5" r="2" fill="#1c0a00"/><circle cx="36.5" cy="26.5" r="2" fill="#1c0a00"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
  {
    id: 'dragon', name: { ru: 'Дракон', kz: 'Айдаhар', en: 'Dragon' }, color: '#059669',
    svg: (<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#059669"/><ellipse cx="30" cy="36" rx="14" ry="10" fill="#a7f3d0"/><ellipse cx="30" cy="27" rx="12" ry="12" fill="#d1fae5"/><polygon points="16,19 14,5 24,17" fill="#065f46"/><polygon points="44,19 46,5 36,17" fill="#065f46"/><ellipse cx="24" cy="26" rx="3.5" ry="4" fill="white"/><ellipse cx="36" cy="26" rx="3.5" ry="4" fill="white"/><circle cx="24.5" cy="26.5" r="2.2" fill="#064e3b"/><circle cx="36.5" cy="26.5" r="2.2" fill="#064e3b"/><ellipse cx="30" cy="32" rx="3" ry="2" fill="#fda4af"/><path d="M27 34 Q30 37 33 34" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>)
  },
]

// ═══ САНА — PNG С CSS АНИМАЦИЯМИ ═══
function SanaMascot({ mood }) {
  const getAnimation = () => {
    switch(mood) {
      case 'excited': return 'sanaJump 0.6s ease-in-out infinite'
      case 'sad': return 'sanaSad 1.5s ease-in-out infinite'
      case 'serious': return 'sanaBob 3s ease-in-out infinite'
      default: return 'sanaBob 2s ease-in-out infinite'
    }
  }

  const getFilter = () => {
    switch(mood) {
      case 'excited': return 'drop-shadow(0 0 12px #f59e0b) brightness(1.1)'
      case 'sad': return 'drop-shadow(0 0 8px #6366f1) brightness(0.85) saturate(0.7)'
      case 'serious': return 'drop-shadow(0 0 8px #059669) brightness(1.0)'
      default: return 'drop-shadow(0 0 10px #4f46e5aa) brightness(1.05)'
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Частицы для excited */}
      {mood === 'excited' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {['✨','⭐','💫','✨','⭐'].map((star, i) => (
            <span key={i} style={{
              position: 'absolute',
              fontSize: '16px',
              animation: `particle${i} 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              top: `${[10, 5, 15, 8, 20][i]}%`,
              left: `${[5, 80, 90, 45, 15][i]}%`,
            }}>{star}</span>
          ))}
        </div>
      )}
      {/* Грустные капли */}
      {mood === 'sad' && (
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <span style={{ fontSize: '18px', animation: 'dropFall 1s ease-in infinite', display: 'block' }}>💧</span>
        </div>
      )}
      <img
        src="/sana_mascot.png"
        alt="Сана"
        style={{
          width: '140px',
          height: '140px',
          objectFit: 'contain',
          animation: getAnimation(),
          filter: getFilter(),
          transition: 'filter 0.5s ease',
        }}
      />
    </div>
  )
}

const modules = [
  {
    id: 1, title: { ru: 'Основы паролей', kz: 'Құпия сөз негіздері', en: 'Password Basics' },
    Icon: Key, color: '#4f46e5',
    levels: [
      { id: 1, title: { ru: 'Реальность угроз', kz: 'Қауіп шындығы', en: 'Reality of threats' } },
      { id: 2, title: { ru: 'Как думает хакер', kz: 'Хакер қалай ойлайды', en: 'How a hacker thinks' } },
      { id: 3, title: { ru: 'Создай надёжный пароль', kz: 'Сенімді құпия сөз жаса', en: 'Create a strong password' } },
      { id: 4, title: { ru: 'Менеджер паролей', kz: 'Құпия сөз менеджері', en: 'Password manager' } },
      { id: 5, title: { ru: 'Финальный тест', kz: 'Қорытынды тест', en: 'Final test' } },
    ]
  },
  {
    id: 2, title: { ru: 'Фишинг и мошенничество', kz: 'Фишинг және алаяқтық', en: 'Phishing & Scams' },
    Icon: Fish, color: '#dc2626', unlocksAfter: { moduleId: 1, levelId: 5 },
    levels: [
      { id: 1, title: { ru: 'Что такое фишинг?', kz: 'Фишинг дегеніміз не?', en: 'What is phishing?' } },
      { id: 2, title: { ru: 'Признаки фишинга', kz: 'Фишинг белгілері', en: 'Signs of phishing' } },
      { id: 3, title: { ru: 'Симулятор фишинга', kz: 'Фишинг симуляторы', en: 'Phishing simulator' } },
      { id: 4, title: { ru: 'Финальный тест', kz: 'Қорытынды тест', en: 'Final test' } },
    ]
  },
  {
    id: 3, title: { ru: 'Безопасность в соцсетях', kz: 'Әлеуметтік желілердегі қауіпсіздік', en: 'Social Media Safety' },
    Icon: Smartphone, color: '#7c3aed', unlocksAfter: { moduleId: 2, levelId: 4 },
    levels: [
      { id: 1, title: { ru: 'Что опасно публиковать', kz: 'Не жариялау қауіпті', en: 'What is dangerous to publish' } },
      { id: 2, title: { ru: 'Настройки приватности', kz: 'Құпиялылық параметрлері', en: 'Privacy settings' } },
      { id: 3, title: { ru: 'Кибербуллинг', kz: 'Кибербуллинг', en: 'Cyberbullying' } },
      { id: 4, title: { ru: 'Финальный тест', kz: 'Қорытынды тест', en: 'Final test' } },
    ]
  },
  {
    id: 4, title: { ru: 'Двухфакторная защита', kz: 'Екі факторлы қорғаныс', en: 'Two-Factor Auth' },
    Icon: Shield, color: '#059669', unlocksAfter: { moduleId: 3, levelId: 4 },
    levels: [
      { id: 1, title: { ru: 'Что такое 2FA?', kz: '2FA дегеніміз не?', en: 'What is 2FA?' } },
      { id: 2, title: { ru: 'Виды 2FA', kz: '2FA түрлері', en: 'Types of 2FA' } },
      { id: 3, title: { ru: 'Как включить 2FA', kz: '2FA қосу', en: 'How to enable 2FA' } },
      { id: 4, title: { ru: 'Финальный тест', kz: 'Қорытынды тест', en: 'Final test' } },
    ]
  },
]

const badges = [
  { Icon: Key, name: { ru: 'Мастер паролей', kz: 'Құпия сөз шебері', en: 'Password Master' }, earned: true, color: '#4f46e5' },
  { Icon: Star, name: { ru: 'Первый урок', kz: 'Бірінші сабақ', en: 'First Lesson' }, earned: true, color: '#f59e0b' },
  { Icon: Flame, name: { ru: '7 дней подряд', kz: '7 күн қатарынан', en: '7 Day Streak' }, earned: false, color: '#ef4444' },
  { Icon: Shield, name: { ru: 'Защитник', kz: 'Қорғаушы', en: 'Defender' }, earned: false, color: '#059669' },
  { Icon: Play, name: { ru: 'Быстрый старт', kz: 'Жылдам старт', en: 'Quick Start' }, earned: false, color: '#7c3aed' },
  { Icon: Trophy, name: { ru: 'Все модули', kz: 'Барлық модульдер', en: 'All Modules' }, earned: false, color: '#dc2626' },
]

const leaderboardData = [
  { name: 'Айгерим К.', points: 1240 },
  { name: 'Данияр М.', points: 980 },
  { name: 'Самира Т.', points: 450 },
  { name: 'Нурлан А.', points: 320 },
]

export default function MainPage({ user, setUser, updateUser }) {
  const [lang, setLang] = useState('ru')
  const [activePage, setActivePage] = useState('home')
  const [expandedModule, setExpandedModule] = useState(1)
  const [activeLesson, setActiveLesson] = useState(null)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [activePopup, setActivePopup] = useState(null)
  const [popupMsg, setPopupMsg] = useState('')
  const [notifications, setNotifications] = useState(() => localStorage.getItem('cyberOquNotif') !== 'false')
  const [selectedAvatar, setSelectedAvatar] = useState(() => localStorage.getItem('cyberOquAvatar') || 'cat')
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar)
  const [crystals, setCrystals] = useState(() => {
    const saved = localStorage.getItem('cyberOquCrystals')
    return saved ? parseInt(saved) : 20
  })
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cyberOquProgress') || '{}') } catch { return {} }
  })

  const t = translations[lang]
  const update = updateUser || ((updates) => setUser(prev => ({ ...prev, ...updates })))
  const currentAvatar = AVATARS.find(a => a.id === selectedAvatar) || AVATARS[5]
  const maxEnergy = user.maxEnergy || 15
  const pointsPerLevel = 500
  const pointsInLevel = user.points % pointsPerLevel
  const progressToNext = Math.round((pointsInLevel / pointsPerLevel) * 100)

  const sanaMood = activePage === 'achievements' ? 'excited' : activePage === 'leaderboard' ? 'serious' : activePage === 'profile' ? 'happy' : 'happy'

  const sanaMessages = {
    home: { ru: `Привет, ${user.name}! Продолжим учиться? 🛡️`, kz: `Сәлем, ${user.name}! Жалғастырайық! 🛡️`, en: `Hi, ${user.name}! Ready to learn? 🛡️` },
    achievements: { ru: 'Собирай бейджи и стань мастером! 🏆', kz: 'Бейдждер жина және шебер бол! 🏆', en: 'Collect badges and become a master! 🏆' },
    leaderboard: { ru: 'Учись больше — поднимайся выше! 📈', kz: 'Көбірек оқы — жоғары көтеріл! 📈', en: 'Learn more — climb higher! 📈' },
    profile: { ru: `Ты молодец, ${user.name}! ⭐`, kz: `Сен керемет, ${user.name}! ⭐`, en: `Great job, ${user.name}! ⭐` },
  }

  const isModuleLocked = (mod) => {
    if (!mod.unlocksAfter) return false
    return !progress[`${mod.unlocksAfter.moduleId}-${mod.unlocksAfter.levelId}`]
  }

  const markComplete = (m, l) => {
    setProgress(prev => {
      const next = { ...prev, [`${m}-${l}`]: true }
      try { localStorage.setItem('cyberOquProgress', JSON.stringify(next)) } catch {}
      return next
    })
    const mod = modules.find(mod => mod.id === m)
    if (mod) {
      const isLastLevel = l === mod.levels[mod.levels.length - 1].id
      if (isLastLevel) {
        const newCrystals = crystals + 5
        setCrystals(newCrystals)
        localStorage.setItem('cyberOquCrystals', newCrystals.toString())
      }
    }
    const nextMod = modules.find(mod => mod.unlocksAfter?.moduleId === m && mod.unlocksAfter?.levelId === l)
    if (nextMod) setExpandedModule(nextMod.id)
  }

  const resetProgress = () => {
    try { localStorage.removeItem('cyberOquProgress') } catch {}
    setProgress({})
    setExpandedModule(1)
  }

  const saveAvatar = () => {
    setSelectedAvatar(tempAvatar)
    localStorage.setItem('cyberOquAvatar', tempAvatar)
    setShowAvatarPicker(false)
  }

  const toggleNotifications = () => {
    const newVal = !notifications
    setNotifications(newVal)
    localStorage.setItem('cyberOquNotif', newVal.toString())
  }

  const buyEnergy = (amount) => {
    if (user.energy >= maxEnergy) { setPopupMsg(t.energyFull); setTimeout(() => setPopupMsg(''), 2000); return }
    if (crystals < amount) { setPopupMsg(t.notEnough); setTimeout(() => setPopupMsg(''), 2000); return }
    const newEnergy = Math.min(user.energy + amount, maxEnergy)
    const spent = newEnergy - user.energy
    const newCrystals = crystals - spent
    update({ energy: newEnergy })
    setCrystals(newCrystals)
    localStorage.setItem('cyberOquCrystals', newCrystals.toString())
    setPopupMsg(`+${spent} ⚡`)
    setTimeout(() => setPopupMsg(''), 2000)
  }

  const allPlayers = [...leaderboardData, { name: user.name, points: user.points, isMe: true }].sort((a, b) => b.points - a.points)

  if (activeLesson) {
    return (
      <LessonPage
        user={user} updateUser={update}
        onBack={() => setActiveLesson(null)}
        onComplete={markComplete}
        lang={lang}
        moduleId={activeLesson.moduleId}
        levelId={activeLesson.levelId}
      />
    )
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes sanaBob {
          0%,100%{ transform: translateY(0px) rotate(0deg); }
          25%{ transform: translateY(-8px) rotate(-2deg); }
          75%{ transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes sanaJump {
          0%,100%{ transform: translateY(0px) scale(1); }
          40%{ transform: translateY(-20px) scale(1.05); }
          60%{ transform: translateY(-15px) scale(1.05); }
        }
        @keyframes sanaSad {
          0%,100%{ transform: translateY(0px) rotate(0deg); }
          50%{ transform: translateY(4px) rotate(-3deg); }
        }
        @keyframes bubblePop {
          from{ opacity:0; transform:scale(0.8) translateY(10px); }
          to{ opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from{ opacity:0; transform:translateY(20px); }
          to{ opacity:1; transform:translateY(0); }
        }
        @keyframes popupIn {
          from{ opacity:0; transform:scale(0.9) translateY(-10px); }
          to{ opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes msgPop {
          0%{ opacity:0; transform:translateY(0); }
          20%{ opacity:1; transform:translateY(-10px); }
          80%{ opacity:1; transform:translateY(-10px); }
          100%{ opacity:0; transform:translateY(-20px); }
        }
        @keyframes dropFall {
          0%{ opacity:1; transform:translateY(0); }
          100%{ opacity:0; transform:translateY(30px); }
        }
        @keyframes glowPulse {
          0%,100%{ box-shadow: 0 0 20px #4f46e566; }
          50%{ box-shadow: 0 0 35px #4f46e5aa, 0 0 60px #7c3aed44; }
        }
        @keyframes shadowPulse {
          0%,100%{ transform: scaleX(1); opacity: 0.3; }
          50%{ transform: scaleX(0.7); opacity: 0.15; }
        }
      `}</style>

      {/* ═══ ШАПКА ═══ */}
      <div style={styles.topBar}>
        <div style={styles.logoWrap}>
          <Shield size={22} color="#4f46e5" />
          <span style={styles.logoText}>Cyber <span style={styles.logoAccent}>Oqu</span></span>
        </div>
        <div style={styles.stats}>
          <button onClick={() => setActivePopup(activePopup === 'streak' ? null : 'streak')} style={styles.statBtn}>
            <Flame size={16} color="#f97316" /><span style={styles.statValue}>{user.streak}</span>
          </button>
          <button onClick={() => setActivePopup(activePopup === 'energy' ? null : 'energy')} style={styles.statBtn}>
            <Zap size={16} color={user.energy < 5 ? '#ef4444' : '#f97316'} />
            <span style={{ ...styles.statValue, color: user.energy < 5 ? '#ef4444' : '#f97316' }}>{user.energy}</span>
          </button>
          <button onClick={() => setActivePopup(activePopup === 'points' ? null : 'points')} style={styles.statBtn}>
            <Star size={16} color="#f59e0b" /><span style={styles.statValue}>{user.points}</span>
          </button>
          <button onClick={() => setActivePopup(activePopup === 'crystals' ? null : 'crystals')} style={styles.statBtn}>
            <Gem size={16} color="#06b6d4" /><span style={{ ...styles.statValue, color: '#06b6d4' }}>{crystals}</span>
          </button>
        </div>
        <div style={styles.langBar}>
          {['ru', 'kz', 'en'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ ...styles.langBtn, background: lang === l ? '#4f46e5' : 'transparent', color: lang === l ? '#fff' : '#666' }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* ═══ ПОПАПЫ ═══ */}
      {activePopup && (
        <div style={styles.popupOverlay} onClick={() => setActivePopup(null)}>
          <div style={styles.popupCard} onClick={e => e.stopPropagation()}>
            <button onClick={() => setActivePopup(null)} style={styles.popupClose}><X size={16} /></button>
            {activePopup === 'streak' && (
              <div style={styles.popupContent}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔥</div>
                <h3 style={styles.popupTitle}>{t.streakTitle}</h3>
                <div style={styles.popupBig}>{user.streak}</div>
                <p style={styles.popupSub}>{t.streakDays}</p>
                <div style={styles.streakCalendar}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{ ...styles.streakDay, background: i < user.streak % 7 ? '#f97316' : '#2a2a4a' }}>
                      {i < user.streak % 7 ? '🔥' : '○'}
                    </div>
                  ))}
                </div>
                <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>{lang === 'ru' ? 'Последние 7 дней' : lang === 'kz' ? 'Соңғы 7 күн' : 'Last 7 days'}</p>
              </div>
            )}
            {activePopup === 'points' && (
              <div style={styles.popupContent}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>⭐</div>
                <h3 style={styles.popupTitle}>{t.pointsTitle}</h3>
                <div style={styles.popupBig}>{user.points}</div>
                <p style={styles.popupSub}>{t.level} {user.level}</p>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${progressToNext}%` }} />
                </div>
                <p style={{ color: '#aaa', fontSize: '12px', marginTop: '6px' }}>{pointsPerLevel - pointsInLevel} {t.nextLevel}</p>
              </div>
            )}
            {activePopup === 'energy' && (
              <div style={styles.popupContent}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>⚡</div>
                <h3 style={styles.popupTitle}>{t.energyTitle}</h3>
                <div style={styles.popupBig}>{user.energy}<span style={{ fontSize: '18px', color: '#555' }}>/{maxEnergy}</span></div>
                <div style={styles.energyBar}>
                  {[...Array(maxEnergy)].map((_, i) => (
                    <div key={i} style={{ ...styles.energyDot, background: i < user.energy ? '#f97316' : '#2a2a4a' }} />
                  ))}
                </div>
                <p style={{ color: '#555', fontSize: '12px', margin: '8px 0 16px' }}>1 {t.perHour}</p>
                {popupMsg && <div style={styles.popupMsg}>{popupMsg}</div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <button onClick={() => buyEnergy(1)} style={styles.buyBtn}>⚡ +1 — 1 💎</button>
                  <button onClick={() => buyEnergy(maxEnergy - user.energy)} style={{ ...styles.buyBtn, background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                    ⚡ +{maxEnergy - user.energy} — {maxEnergy - user.energy} 💎
                  </button>
                </div>
                <p style={{ color: '#555', fontSize: '11px', marginTop: '8px' }}>💎 {t.crystals}: {crystals}</p>
              </div>
            )}
            {activePopup === 'crystals' && (
              <div style={styles.popupContent}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>💎</div>
                <h3 style={styles.popupTitle}>{t.crystalTitle}</h3>
                <div style={{ ...styles.popupBig, color: '#06b6d4' }}>{crystals}</div>
                <p style={styles.popupSub}>{t.crystalDesc}</p>
                <div style={styles.crystalInfo}>
                  <div style={styles.crystalRow}><span>🎯 {lang === 'ru' ? 'За модуль' : lang === 'kz' ? 'Модуль үшін' : 'Per module'}</span><span style={{ color: '#06b6d4', fontWeight: '700' }}>+5 💎</span></div>
                  <div style={styles.crystalRow}><span>⚡ 1 {lang === 'ru' ? 'энергия' : 'energy'}</span><span style={{ color: '#f97316', fontWeight: '700' }}>1 💎</span></div>
                </div>
                {popupMsg && <div style={styles.popupMsg}>{popupMsg}</div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '8px' }}>
                  <button onClick={() => buyEnergy(1)} style={styles.buyBtn}>⚡ +1 за 1 💎</button>
                  <button onClick={() => buyEnergy(maxEnergy - user.energy)} style={{ ...styles.buyBtn, background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>⚡ Всё за {maxEnergy - user.energy} 💎</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ САНА — БОЛЬШАЯ И ЖИВАЯ ═══ */}
      <div style={{
        position: 'fixed',
        right: '12px',
        bottom: '75px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}>
        {/* Пузырь речи */}
        <div style={{
          background: '#1a1a2e',
          border: '2px solid #4f46e5',
          borderRadius: '14px',
          borderBottomRightRadius: '4px',
          padding: '10px 14px',
          maxWidth: '170px',
          animation: 'bubblePop 0.4s ease',
          boxShadow: '0 4px 20px rgba(79,70,229,0.3)',
        }}>
          <p style={{ color: '#e0e7ff', fontSize: '11px', lineHeight: '1.5', margin: 0, textAlign: 'center', fontWeight: '500' }}>
            {sanaMessages[activePage][lang]}
          </p>
          {/* Хвостик пузыря */}
          <div style={{ position: 'absolute', bottom: '-8px', right: '16px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '0px solid transparent', borderTop: '8px solid #4f46e5' }} />
        </div>

        {/* Сана с тенью */}
        <div style={{ position: 'relative' }}>
          <SanaMascot mood={sanaMood} />
          {/* Тень под Саной */}
          <div style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '12px',
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.4) 0%, transparent 70%)',
            animation: 'shadowPulse 2s ease-in-out infinite',
          }} />
        </div>

        {/* Имя */}
        <p style={{
          color: '#a5b4fc',
          fontSize: '12px',
          margin: 0,
          fontWeight: '700',
          letterSpacing: '2px',
          textShadow: '0 0 10px #4f46e5',
        }}>САНА</p>
      </div>

      {/* ═══ МОДАЛЬНОЕ ОКНО АВАТАРА ═══ */}
      {showAvatarPicker && (
        <div style={styles.modalOverlay} onClick={() => setShowAvatarPicker(false)}>
          <div style={styles.modalCard} onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>{t.chooseAvatar}</h3>
            <div style={styles.avatarGrid}>
              {AVATARS.map(av => (
                <div key={av.id} onClick={() => setTempAvatar(av.id)} style={{ ...styles.avatarOption, border: tempAvatar === av.id ? `3px solid ${av.color}` : '3px solid transparent', boxShadow: tempAvatar === av.id ? `0 0 16px ${av.color}66` : 'none', transform: tempAvatar === av.id ? 'scale(1.08)' : 'scale(1)' }}>
                  <div style={{ width: '56px', height: '56px' }}>{av.svg}</div>
                  <p style={{ color: tempAvatar === av.id ? av.color : '#aaa', fontSize: '11px', margin: '6px 0 0 0', fontWeight: '600' }}>{av.name[lang]}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setShowAvatarPicker(false)} style={styles.cancelBtn}>{t.cancel}</button>
              <button onClick={saveAvatar} style={styles.saveBtn}>{t.saveAvatar}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ КОНТЕНТ ═══ */}
      <div style={styles.content}>

        {/* ГЛАВНАЯ */}
        {activePage === 'home' && (
          <div style={styles.modulesWrap}>
            <h2 style={styles.pageTitle}>{t.hi}, {user.name}!</h2>
            {modules.map((mod) => {
              const ModIcon = mod.Icon
              const isExpanded = expandedModule === mod.id
              const locked = isModuleLocked(mod)
              const firstUndone = mod.levels.find(lv => !progress[`${mod.id}-${lv.id}`])
              const currentLevelId = firstUndone ? firstUndone.id : null
              return (
                <div key={mod.id} style={styles.moduleCard}>
                  <div style={{ ...styles.moduleHeader, borderLeft: `4px solid ${locked ? '#333' : mod.color}`, opacity: locked ? 0.5 : 1, cursor: locked ? 'default' : 'pointer' }}
                    onClick={() => !locked && setExpandedModule(isExpanded ? null : mod.id)}>
                    <div style={styles.moduleLeft}>
                      <div style={{ ...styles.moduleIconWrap, background: `${mod.color}22` }}>
                        <ModIcon size={22} color={locked ? '#555' : mod.color} />
                      </div>
                      <div>
                        <div style={styles.moduleLabel}>{t.module} {mod.id}</div>
                        <div style={styles.moduleTitle}>{mod.title[lang]}</div>
                      </div>
                    </div>
                    <div>{locked ? <Lock size={18} color="#555" /> : isExpanded ? <ChevronUp size={18} color="#666" /> : <ChevronDown size={18} color="#666" />}</div>
                  </div>
                  {isExpanded && !locked && (
                    <div style={styles.levels}>
                      {mod.levels.map((level, index) => {
                        const done = !!progress[`${mod.id}-${level.id}`]
                        const isCurrent = level.id === currentLevelId
                        return (
                          <div key={level.id} style={{ ...styles.levelRow, cursor: 'pointer' }} onClick={() => setActiveLesson({ moduleId: mod.id, levelId: level.id })}>
                            {index < mod.levels.length - 1 && <div style={{ ...styles.connector, background: done ? mod.color : '#2a2a4a' }} />}
                            <div style={{ ...styles.levelCircle, background: done ? mod.color : isCurrent ? `linear-gradient(135deg, ${mod.color}, #7c3aed)` : '#1a1a2e', border: isCurrent ? `3px solid ${mod.color}` : '2px solid #2a2a4a', boxShadow: isCurrent ? `0 0 20px ${mod.color}66` : 'none', transform: isCurrent ? 'scale(1.15)' : 'scale(1)' }}>
                              {done ? <Check size={16} color="#fff" /> : isCurrent ? <Play size={14} color="#fff" /> : <Circle size={14} color="#333" />}
                            </div>
                            <div style={{ ...styles.levelTitle, color: done || isCurrent ? '#fff' : '#888', fontWeight: isCurrent ? '700' : '400' }}>
                              {level.title[lang]}
                              {isCurrent && (
                                <button onClick={(e) => { e.stopPropagation(); setActiveLesson({ moduleId: mod.id, levelId: level.id }) }} style={{ ...styles.startBtn, background: mod.color }}>
                                  {t.continue} <ArrowRight size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ДОСТИЖЕНИЯ */}
        {activePage === 'achievements' && (
          <div style={styles.pageContent}>
            <h2 style={styles.pageTitle}>{t.achievements}</h2>
            <div style={styles.badgesGrid}>
              {badges.map((badge, i) => {
                const BadgeIcon = badge.Icon
                return (
                  <div key={i} style={{ ...styles.badge, opacity: badge.earned ? 1 : 0.35 }}>
                    <div style={{ ...styles.badgeIconWrap, background: `${badge.color}22` }}><BadgeIcon size={28} color={badge.color} /></div>
                    <div style={styles.badgeName}>{badge.name[lang]}</div>
                    {badge.earned && <div style={styles.earnedTag}><Check size={10} color="#fff" /></div>}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* РЕЙТИНГ */}
        {activePage === 'leaderboard' && (
          <div style={styles.pageContent}>
            <h2 style={styles.pageTitle}>{t.leaderboard}</h2>
            {allPlayers.map((player, i) => (
              <div key={i} style={{ ...styles.leaderRow, background: player.isMe ? 'rgba(79,70,229,0.15)' : '#1a1a2e', border: player.isMe ? '1px solid #4f46e5' : '1px solid #2a2a4a' }}>
                <div style={styles.rankWrap}>
                  {i === 0 ? <Trophy size={20} color="#f59e0b" /> : i === 1 ? <Medal size={20} color="#94a3b8" /> : i === 2 ? <Medal size={20} color="#b45309" /> : <span style={styles.rankNum}>{i + 1}</span>}
                </div>
                <div style={styles.playerAvatar}><User size={18} color="#666" /></div>
                <span style={styles.playerName}>{player.name} {player.isMe && <span style={styles.meTag}>{lang === 'ru' ? 'вы' : lang === 'kz' ? 'сіз' : 'you'}</span>}</span>
                <div style={styles.playerPoints}><Star size={14} color="#f59e0b" /><span>{player.points}</span></div>
              </div>
            ))}
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {activePage === 'profile' && (
          <div style={styles.pageContent}>
            <h2 style={styles.pageTitle}>{t.profile}</h2>
            <div style={styles.profileCard}>
              <div style={styles.avatarWrap} onClick={() => { setTempAvatar(selectedAvatar); setShowAvatarPicker(true) }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${currentAvatar.color}`, boxShadow: `0 0 20px ${currentAvatar.color}55` }}>
                  {currentAvatar.svg}
                </div>
                <div style={styles.editBadge}>✏️</div>
              </div>
              <div style={styles.profileName}>{user.name}</div>
              <div style={styles.profileEmail}>{user.email}</div>
              <div style={styles.profileStats}>
                <div style={styles.profileStat}><Flame size={20} color="#f97316" /><div style={styles.profileStatValue}>{user.streak}</div><div style={styles.profileStatLabel}>{t.streak}</div></div>
                <div style={styles.profileStat}><Zap size={20} color="#f97316" /><div style={styles.profileStatValue}>{user.energy}</div><div style={styles.profileStatLabel}>{t.energy}</div></div>
                <div style={styles.profileStat}><Star size={20} color="#f59e0b" /><div style={styles.profileStatValue}>{user.points}</div><div style={styles.profileStatLabel}>{t.points}</div></div>
                <div style={styles.profileStat}><Gem size={20} color="#06b6d4" /><div style={styles.profileStatValue}>{crystals}</div><div style={styles.profileStatLabel}>{t.crystals}</div></div>
              </div>
              <div style={styles.settingsBlock}>
                <p style={styles.settingsTitle}>{t.settings}</p>
                <div style={styles.settingRow}>
                  <div style={styles.settingLeft}><Globe size={16} color="#666" /><span>{t.language}</span></div>
                  <div style={styles.langBar}>
                    {['ru', 'kz', 'en'].map(l => (
                      <button key={l} onClick={() => setLang(l)} style={{ ...styles.langBtn, background: lang === l ? '#4f46e5' : 'transparent', color: lang === l ? '#fff' : '#666' }}>{l.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div style={styles.settingRow}>
                  <div style={styles.settingLeft}>
                    {notifications ? <Bell size={16} color="#666" /> : <BellOff size={16} color="#666" />}
                    <span>{t.notifications}</span>
                  </div>
                  <button onClick={toggleNotifications} style={{ ...styles.toggleSwitch, background: notifications ? '#4f46e5' : '#2a2a4a' }}>
                    <div style={{ ...styles.toggleCircle, left: notifications ? '22px' : '3px' }} />
                  </button>
                </div>
                <div style={styles.settingRow}>
                  <div style={styles.settingLeft}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', overflow: 'hidden' }}>{currentAvatar.svg}</div>
                    <span>{t.chooseAvatar}</span>
                  </div>
                  <button onClick={() => { setTempAvatar(selectedAvatar); setShowAvatarPicker(true) }} style={styles.changeBtn}>
                    {currentAvatar.name[lang]} →
                  </button>
                </div>
              </div>
              <button onClick={resetProgress} style={styles.resetBtn}>🔄 {t.resetProgress}</button>
              <button onClick={() => setUser(null)} style={styles.logoutBtn}><LogOut size={16} />{t.logout}</button>
            </div>
          </div>
        )}
      </div>

      {/* ═══ НИЖНЯЯ НАВИГАЦИЯ ═══ */}
      <div style={styles.bottomNav}>
        {[
          { id: 'home', Icon: Home, label: t.home },
          { id: 'achievements', Icon: Trophy, label: t.achievements },
          { id: 'leaderboard', Icon: Medal, label: t.leaderboard },
          { id: 'profile', Icon: User, label: t.profile },
        ].map(item => {
          const NavIcon = item.Icon
          const active = activePage === item.id
          return (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{ ...styles.navBtn, color: active ? '#4f46e5' : '#555', borderTop: active ? '2px solid #4f46e5' : '2px solid transparent' }}>
              <NavIcon size={20} color={active ? '#4f46e5' : '#555'} />
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', flexDirection: 'column', color: '#fff', paddingBottom: '70px' },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: '#1a1a2e', borderBottom: '1px solid #2a2a4a', position: 'sticky', top: 0, zIndex: 100 },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoText: { fontSize: '18px', fontWeight: '800' },
  logoAccent: { color: '#4f46e5' },
  stats: { display: 'flex', gap: '6px' },
  statBtn: { display: 'flex', alignItems: 'center', gap: '3px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer' },
  statValue: { fontWeight: '700', fontSize: '13px', color: '#fff' },
  langBar: { display: 'flex', gap: '4px' },
  langBtn: { border: '1px solid #2a2a4a', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px' },
  content: { flex: 1, overflowY: 'auto', padding: '20px' },
  modulesWrap: { maxWidth: '600px', margin: '0 auto' },
  pageTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '20px' },
  moduleCard: { marginBottom: '12px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a4a' },
  moduleHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#1a1a2e' },
  moduleLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  moduleIconWrap: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  moduleLabel: { fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' },
  moduleTitle: { fontSize: '15px', fontWeight: '700', marginTop: '2px' },
  levels: { padding: '20px 16px', background: '#13131f' },
  levelRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', position: 'relative' },
  connector: { position: 'absolute', left: '19px', top: '42px', width: '2px', height: '28px' },
  levelCircle: { width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' },
  levelTitle: { fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' },
  startBtn: { border: 'none', borderRadius: '8px', padding: '6px 14px', color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '4px' },
  pageContent: { maxWidth: '600px', margin: '0 auto' },
  badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  badge: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', padding: '20px 12px', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  badgeIconWrap: { width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badgeName: { fontSize: '11px', color: '#aaa', lineHeight: '1.3' },
  earnedTag: { position: 'absolute', top: '8px', right: '8px', background: '#22c55e', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  leaderRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', marginBottom: '8px' },
  rankWrap: { width: '28px', display: 'flex', justifyContent: 'center' },
  rankNum: { color: '#555', fontWeight: '700', fontSize: '14px' },
  playerAvatar: { width: '36px', height: '36px', borderRadius: '50%', background: '#2a2a4a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  playerName: { flex: 1, fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  meTag: { background: '#4f46e5', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: '700' },
  playerPoints: { display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#f59e0b' },
  profileCard: { background: '#1a1a2e', borderRadius: '20px', padding: '30px', border: '1px solid #2a2a4a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' },
  avatarWrap: { position: 'relative', cursor: 'pointer' },
  editBadge: { position: 'absolute', bottom: '0', right: '0', background: '#4f46e5', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid #0f0f1a' },
  profileName: { fontSize: '20px', fontWeight: '700' },
  profileEmail: { fontSize: '13px', color: '#555' },
  profileStats: { display: 'flex', gap: '20px', margin: '4px 0', flexWrap: 'wrap', justifyContent: 'center' },
  profileStat: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  profileStatValue: { fontSize: '18px', fontWeight: '700' },
  profileStatLabel: { fontSize: '11px', color: '#555' },
  settingsBlock: { width: '100%', background: '#0f0f1a', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  settingsTitle: { color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' },
  settingRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a2e', fontSize: '14px', color: '#aaa' },
  settingLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  toggleSwitch: { position: 'relative', width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'background 0.3s' },
  toggleCircle: { position: 'absolute', top: '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.3s' },
  changeBtn: { background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '8px', padding: '6px 12px', color: '#a5b4fc', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  resetBtn: { background: 'transparent', border: '1px solid #f59e0b', borderRadius: '10px', padding: '10px 24px', color: '#f59e0b', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', width: '100%', justifyContent: 'center' },
  logoutBtn: { background: 'transparent', border: '1px solid #ef4444', borderRadius: '10px', padding: '10px 24px', color: '#ef4444', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' },
  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', background: '#1a1a2e', borderTop: '1px solid #2a2a4a', zIndex: 100 },
  navBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 0', background: 'transparent', border: 'none', cursor: 'pointer', gap: '4px' },
  navLabel: { fontSize: '10px', fontWeight: '600' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modalCard: { background: '#1a1a2e', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '400px', border: '1px solid #2a2a4a', animation: 'fadeIn 0.2s ease' },
  modalTitle: { fontSize: '18px', fontWeight: '700', textAlign: 'center', marginBottom: '20px' },
  avatarGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' },
  avatarOption: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 6px', borderRadius: '14px', background: '#0f0f1a', cursor: 'pointer', transition: 'all 0.2s' },
  cancelBtn: { flex: 1, background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '12px', color: '#aaa', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  saveBtn: { flex: 1, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', borderRadius: '10px', padding: '12px', color: '#fff', cursor: 'pointer', fontWeight: '700', fontSize: '14px' },
  popupOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '70px' },
  popupCard: { background: '#1a1a2e', borderRadius: '20px', padding: '24px', width: '90%', maxWidth: '320px', border: '1px solid #2a2a4a', position: 'relative', animation: 'popupIn 0.2s ease' },
  popupClose: { position: 'absolute', top: '12px', right: '12px', background: '#2a2a4a', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#aaa' },
  popupContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  popupTitle: { fontSize: '16px', fontWeight: '700', margin: 0, color: '#fff' },
  popupBig: { fontSize: '48px', fontWeight: '800', color: '#fff', lineHeight: 1 },
  popupSub: { color: '#666', fontSize: '13px', margin: 0 },
  streakCalendar: { display: 'flex', gap: '6px', marginTop: '8px' },
  streakDay: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' },
  progressBar: { width: '100%', height: '8px', background: '#2a2a4a', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #f59e0b, #f97316)', borderRadius: '4px', transition: 'width 0.4s ease' },
  energyBar: { display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' },
  energyDot: { width: '14px', height: '14px', borderRadius: '3px' },
  buyBtn: { background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '10px', padding: '12px', color: '#fff', cursor: 'pointer', fontWeight: '700', fontSize: '13px', width: '100%' },
  crystalInfo: { width: '100%', background: '#0f0f1a', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' },
  crystalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#aaa' },
  popupMsg: { background: '#22c55e', borderRadius: '8px', padding: '6px 14px', color: '#fff', fontWeight: '700', fontSize: '14px', animation: 'msgPop 2s ease forwards' },
}