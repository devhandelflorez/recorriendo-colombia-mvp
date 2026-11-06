import { useState } from 'react'
import ScreenBienvenida from './screens/ScreenBienvenida'
import ScreenAvatar from './screens/ScreenAvatar'
import ScreenCiudades from './screens/ScreenCiudades'
import ScreenActividad from './screens/ScreenActividad'
import ScreenRetroOk from './screens/ScreenRetroOk'
import ScreenRetroFail from './screens/ScreenRetroFail'
import ScreenRecompensa from './screens/ScreenRecompensa'
import ScreenCiudadSuperada from './screens/ScreenCiudadSuperada'
import ScreenTerapeuta from './screens/ScreenTerapeuta'
import ScreenDiploma from './screens/ScreenDiploma'

const SCREENS = [
  { id: 'bienvenida',      label: 'Bienvenida',          icon: '🌅', group: 'Inicio' },
  { id: 'avatar',          label: 'Crear Avatar',         icon: '🧑‍🎨', group: 'Inicio' },
  { id: 'ciudades',        label: 'Selección de Ciudad',  icon: '🗺️',  group: 'Juego' },
  { id: 'actividad',       label: 'Actividad Semántica',  icon: '🧠',  group: 'Juego' },
  { id: 'retro-ok',        label: 'Respuesta Correcta',   icon: '✅',  group: 'Juego' },
  { id: 'retro-fail',      label: 'Respuesta Incorrecta', icon: '🔁',  group: 'Juego' },
  { id: 'recompensa',      label: 'Recompensa',           icon: '🏆',  group: 'Juego' },
  { id: 'ciudad-superada', label: 'Ciudad Superada',      icon: '🎉',  group: 'Juego' },
  { id: 'terapeuta',       label: 'Panel Terapeuta',      icon: '📊',  group: 'Terapeuta' },
  { id: 'diploma',         label: 'Diploma del Viajero',  icon: '🎓',  group: 'Final' },
]

const GROUPS = ['Inicio', 'Juego', 'Terapeuta', 'Final']

const SCREEN_MAP: Record<string, React.ReactNode> = {
  bienvenida:      <ScreenBienvenida />,
  avatar:          <ScreenAvatar />,
  ciudades:        <ScreenCiudades />,
  actividad:       <ScreenActividad />,
  'retro-ok':      <ScreenRetroOk />,
  'retro-fail':    <ScreenRetroFail />,
  recompensa:      <ScreenRecompensa />,
  'ciudad-superada': <ScreenCiudadSuperada />,
  terapeuta:       <ScreenTerapeuta />,
  diploma:         <ScreenDiploma />,
}

export default function Mockups() {
  const [active, setActive] = useState('bienvenida')
  const current = SCREENS.find(s => s.id === active)!
  const currentIdx = SCREENS.findIndex(s => s.id === active)

  const prev = currentIdx > 0 ? SCREENS[currentIdx - 1] : null
  const next = currentIdx < SCREENS.length - 1 ? SCREENS[currentIdx + 1] : null

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0E0B07' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        background: '#110E08',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'linear-gradient(135deg, #F7C94B 0%, #B83A1E 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>🇨🇴</div>
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, lineHeight: 1.1, color: '#FDF8EE' }}>Recorriendo</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, lineHeight: 1.1, color: '#F7C94B' }}>Colombia</div>
            </div>
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(253,248,238,0.3)', marginTop: 8, letterSpacing: '0.06em' }}>
            Mockups · v1.0
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          {GROUPS.map(group => {
            const items = SCREENS.filter(s => s.group === group)
            return (
              <div key={group} style={{ marginBottom: 4 }}>
                <div style={{
                  padding: '6px 16px 4px',
                  fontFamily: 'DM Mono, monospace', fontSize: 9,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(253,248,238,0.25)',
                }}>
                  {group}
                </div>
                {items.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '9px 16px',
                      display: 'flex', alignItems: 'center', gap: 9,
                      border: 'none', cursor: 'pointer',
                      background: active === s.id ? 'rgba(247,201,75,0.12)' : 'transparent',
                      borderLeft: active === s.id ? '2px solid #F7C94B' : '2px solid transparent',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                    onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{ fontSize: 14 }}>{s.icon}</span>
                    <span style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: active === s.id ? 600 : 400,
                      color: active === s.id ? '#F7C94B' : 'rgba(253,248,238,0.6)',
                    }}>{s.label}</span>
                  </button>
                ))}
              </div>
            )
          })}
        </nav>

        {/* Progress */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(253,248,238,0.3)', marginBottom: 6 }}>
            {currentIdx + 1} / {SCREENS.length} pantallas
          </div>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(to right, #F7C94B, #B83A1E)',
              width: `${((currentIdx + 1) / SCREENS.length) * 100}%`,
              transition: 'width 0.3s',
            }} />
          </div>
        </div>
      </aside>

      {/* ── Main canvas ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 48, flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>{current.icon}</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#FDF8EE' }}>
              {current.label}
            </span>
            <span style={{
              padding: '2px 8px', borderRadius: 4,
              fontFamily: 'DM Mono, monospace', fontSize: 10,
              background: 'rgba(255,255,255,0.07)', color: 'rgba(253,248,238,0.4)',
              letterSpacing: '0.04em',
            }}>{current.group}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NavBtn disabled={!prev} onClick={() => prev && setActive(prev.id)} label="← Anterior" />
            <NavBtn disabled={!next} onClick={() => next && setActive(next.id)} label="Siguiente →" primary />
          </div>
        </div>

        {/* Device frame area */}
        <div style={{
          flex: 1, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at 50% 60%, rgba(13,74,47,0.12) 0%, transparent 70%)',
          padding: '24px',
        }}>
          <div style={{
            width: 390, height: 680,
            borderRadius: 44,
            background: '#111',
            boxShadow: [
              '0 0 0 10px #1A1510',
              '0 0 0 12px #242018',
              '0 40px 100px rgba(0,0,0,0.7)',
              '0 0 80px rgba(247,201,75,0.06)',
            ].join(', '),
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 120, height: 28, borderRadius: '0 0 18px 18px',
              background: '#0E0B07', zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A1510' }} />
              <div style={{ width: 60, height: 4, borderRadius: 2, background: '#1A1510' }} />
            </div>
            {/* Screen */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 44 }}>
              {SCREEN_MAP[active]}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavBtn({ label, onClick, disabled, primary }: { label: string; onClick?: () => void; disabled: boolean; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 14px', borderRadius: 8, border: 'none', cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600,
        background: disabled ? 'rgba(255,255,255,0.04)' : primary ? '#F7C94B' : 'rgba(255,255,255,0.08)',
        color: disabled ? 'rgba(253,248,238,0.2)' : primary ? '#1A1008' : 'rgba(253,248,238,0.7)',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}
