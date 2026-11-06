import { useState, useEffect } from 'react'

const links = [
  { label: 'Objetivo', href: '#objetivo' },
  { label: 'Mecánica', href: '#mecanica' },
  { label: 'Gamificación', href: '#gamificacion' },
  { label: 'Mockups', href: '#mockups' },
  { label: 'Requerimientos', href: '#requerimientos' },
  { label: 'Progreso', href: '#progreso' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(13,74,47,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.18)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #F7C94B, #B83A1E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0
          }}>🇨🇴</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 18,
            color: scrolled ? '#FDF8EE' : '#0D4A2F',
            letterSpacing: '-0.02em'
          }}>
            Recorriendo Colombia
          </span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 500,
                color: scrolled ? '#FDF8EE' : '#0D4A2F',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#acuerdos"
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              background: '#F7C94B',
              color: '#1A1008',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Acuerdos
          </a>
        </div>
      </div>
    </nav>
  )
}
