import { useState, useRef, useEffect } from 'react'

export default function SanaMascot({
  message = '',
  size = 100,
  accent = '#4f46e5',
  floating = false,
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [bounce, setBounce] = useState(false)
  const ref = useRef(null)

  // Поворот к курсору
  useEffect(() => {
    const handleMove = (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      setTilt({
        x: Math.max(-12, Math.min(12, -dy * 30)),
        y: Math.max(-20, Math.min(20, dx * 45)),
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Подпрыгивание при клике
  const handleClick = () => {
    setBounce(true)
    setTimeout(() => setBounce(false), 600)
  }

  const wrapperStyle = floating
    ? { position: 'fixed', right: '16px', bottom: '90px', zIndex: 200 }
    : { position: 'relative' }

  return (
    <>
      <style>{`
        @keyframes sanaFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
        }
        @keyframes sanaShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(0.78); opacity: 0.22; }
        }
        @keyframes sanaJump {
          0% { transform: translateY(0) scale(1); }
          35% { transform: translateY(-22px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes sanaBubblePop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{
        ...wrapperStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}>
        {/* Облачко с текстом */}
        {message && (
          <div style={{
            background: '#1a1a2e',
            border: `2px solid ${accent}`,
            borderRadius: '12px',
            borderBottomRightRadius: '4px',
            padding: '8px 12px',
            maxWidth: floating ? '170px' : '260px',
            animation: 'sanaBubblePop 0.3s ease',
          }}>
            <p style={{
              color: '#fff',
              fontSize: floating ? '11px' : '13px',
              lineHeight: '1.4',
              margin: 0,
              textAlign: 'center',
            }}>{message}</p>
          </div>
        )}

        {/* Сцена с перспективой — кот парит и дышит */}
        <div style={{
          perspective: '600px',
          animation: 'sanaFloat 3.5s ease-in-out infinite',
        }}>
          <img
            ref={ref}
            src="/sana_mascot.png"
            alt="Сана"
            onClick={handleClick}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              objectFit: 'contain',
              cursor: 'pointer',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              animation: bounce ? 'sanaJump 0.6s ease' : 'none',
              filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.45))',
            }}
          />
        </div>

        {/* Тень под котом — для ощущения глубины */}
        <div style={{
          width: `${size * 0.6}px`,
          height: `${size * 0.12}px`,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
          borderRadius: '50%',
          marginTop: '-4px',
          animation: 'sanaShadow 3.5s ease-in-out infinite',
        }} />

        <p style={{ color: '#555', fontSize: '10px', margin: 0, fontWeight: '600' }}>Сана</p>
      </div>
    </>
  )
}