import { useState } from 'react'

const OPTIONS = [
  { label: 'Sandía',  emoji: '🍉' },
  { label: 'Mango',   emoji: '🥭' },
  { label: 'Guayaba', emoji: '🍈' },
  { label: 'Cereza',  emoji: '🍒' },
]

export default function ScreenRetroFail() {
  const [retry, setRetry] = useState(false)

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #1A0A08 0%, #2D1008 100%)',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,58,30,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* HUD */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(247,201,75,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Cartagena · Nv.2 · Act. 3/5</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(253,248,238,0.5)' }}>⏱ 00:28</div>
          <div style={{
            padding: '2px 8px', borderRadius: 8, background: 'rgba(248,113,113,0.2)',
            fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#F87171',
          }}>Intento #2</div>
        </div>
      </div>

      {retry ? (
        /* Retry view — reordered options */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, padding: '14px 16px 14px', gap: 10 }}>
          <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(247,201,75,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>🧠 Frutas tropicales</div>
            <p style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: '#FDF8EE' }}>¿Qué fruta tropical y amarilla se usa para hacer jugo en Colombia?</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1 }}>
            {OPTIONS.map((opt, i) => (
              <button key={i} style={{
                borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.06)', color: '#FDF8EE',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 6, padding: '12px 8px', cursor: 'pointer',
              }}>
                <span style={{ fontSize: 34 }}>{opt.emoji}</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Feedback view */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', position: 'relative', zIndex: 2, gap: 0 }}>
          <div style={{ fontSize: 70, marginBottom: 16 }}>💪</div>

          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F7C94B', marginBottom: 8, opacity: 0.8 }}>¡Casi lo logras!</div>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 900, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 10 }}>
            Seleccionaste: Sandía 🍉
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, lineHeight: 1.65, color: 'rgba(253,248,238,0.65)', textAlign: 'center', marginBottom: 28 }}>
            No te preocupes, ¡puedes intentarlo de nuevo! Las opciones se han reordenado para ayudarte.
          </p>

          {/* Hint */}
          <div style={{
            width: '100%', padding: '12px 16px', borderRadius: 12,
            background: 'rgba(247,201,75,0.1)', border: '1px solid rgba(247,201,75,0.25)',
            marginBottom: 24,
          }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F7C94B', opacity: 0.7, marginBottom: 4 }}>Pista 💡</div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, lineHeight: 1.5, color: 'rgba(253,248,238,0.7)' }}>
              Es una fruta de color <strong style={{ color: '#F7C94B' }}>amarillo</strong>, de pulpa jugosa, muy popular en los mercados del Caribe colombiano.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <button onClick={() => setRetry(true)} style={{
              flex: 1, padding: '13px', borderRadius: 12, border: 'none',
              background: '#F7C94B', color: '#1A1008',
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>
              🔁 Intentar de nuevo
            </button>
            <button style={{
              padding: '13px 14px', borderRadius: 12,
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'transparent', color: 'rgba(253,248,238,0.5)',
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              Saltar
            </button>
          </div>
        </div>
      )}

      {/* Energy */}
      <div style={{ padding: '0 16px 14px', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11 }}>⚡</span>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ width: '55%', height: '100%', background: 'linear-gradient(to right, #FBBF24, #F59E0B)', borderRadius: 3 }} />
        </div>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.35)' }}>55%</span>
      </div>
    </div>
  )
}
