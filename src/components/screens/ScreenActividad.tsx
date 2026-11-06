import { useState } from 'react'

const OPTIONS = [
  { label: 'Guayaba',  emoji: '🍈', correct: false },
  { label: 'Mango',    emoji: '🥭', correct: true  },
  { label: 'Cereza',   emoji: '🍒', correct: false },
  { label: 'Sandía',   emoji: '🍉', correct: false },
]

export default function ScreenActividad() {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0A1A12 0%, #0E2A1C 100%)',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
    }}>
      {/* BG image */}
      <img src="https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=500&h=700&fit=crop&auto=format" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08, pointerEvents: 'none' }} />

      {/* HUD */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(247,201,75,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Cartagena · Nv.2</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#F7C94B' }}>Actividad 3 / 5</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(253,248,238,0.55)' }}>⏱ 00:28</div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#F7C94B' }}>🪙 240</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', zIndex: 2, height: 3, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ width: '60%', height: '100%', background: 'linear-gradient(to right, #F7C94B, #B83A1E)' }} />
      </div>

      {/* Question card */}
      <div style={{ position: 'relative', zIndex: 2, margin: '14px 16px 10px', padding: '16px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', marginBottom: 6 }}>
          🧠 Frutas tropicales
        </div>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 700, lineHeight: 1.3, color: '#FDF8EE' }}>
          ¿Qué fruta tropical y amarilla se usa para hacer jugo en Colombia?
        </p>
      </div>

      {/* Options grid */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px 12px' }}>
        {OPTIONS.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.07)'
          let border = '1.5px solid rgba(255,255,255,0.1)'
          let glow = 'none'
          if (answered && selected === i) {
            bg = opt.correct ? 'rgba(22,101,52,0.8)' : 'rgba(153,27,27,0.8)'
            border = opt.correct ? '1.5px solid #4ADE80' : '1.5px solid #F87171'
            glow = opt.correct ? '0 0 20px rgba(74,222,128,0.3)' : '0 0 20px rgba(248,113,113,0.3)'
          } else if (answered && opt.correct) {
            bg = 'rgba(22,101,52,0.8)'
            border = '1.5px solid #4ADE80'
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              style={{
                borderRadius: 14, border, cursor: answered ? 'default' : 'pointer',
                background: bg, color: '#FDF8EE',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 6, padding: '14px 8px',
                transition: 'all 0.2s',
                boxShadow: glow,
              }}
            >
              <span style={{ fontSize: 38 }}>{opt.emoji}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600 }}>{opt.label}</span>
              {answered && selected === i && (
                <span style={{ fontSize: 10, color: opt.correct ? '#86EFAC' : '#FCA5A5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {opt.correct ? '✓ ¡Correcto!' : '✗ Incorrecto'}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Energy bar bottom */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 16px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12 }}>⚡</span>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
          <div style={{ width: '70%', height: '100%', background: 'linear-gradient(to right, #4ADE80, #F7C94B)', borderRadius: 3 }} />
        </div>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(253,248,238,0.5)' }}>70%</span>
      </div>
    </div>
  )
}
