export default function ScreenRetroOk() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0A2E1C 0%, #0D4A2F 100%)',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* HUD */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(247,201,75,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Cartagena · Nv.2 · Act. 3/5</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(253,248,238,0.5)' }}>⏱ 00:28</div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', position: 'relative', zIndex: 2, gap: 0 }}>
        {/* Check icon */}
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'linear-gradient(135deg, #16A34A, #4ADE80)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44, marginBottom: 18,
          boxShadow: '0 0 40px rgba(74,222,128,0.4)',
        }}>✓</div>

        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ADE80', marginBottom: 8, opacity: 0.8 }}>¡Respuesta correcta!</div>

        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 900, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 6 }}>
          El Mango 🥭
        </h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, lineHeight: 1.6, color: 'rgba(253,248,238,0.65)', textAlign: 'center', marginBottom: 24 }}>
          El mango es una fruta tropical originaria de Colombia, muy usada para jugos naturales.
        </p>

        {/* Piece earned */}
        <div style={{
          padding: '14px 20px', borderRadius: 14,
          background: 'rgba(247,201,75,0.12)', border: '1px solid rgba(247,201,75,0.3)',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, width: '100%',
        }}>
          <div style={{ fontSize: 36 }}>🧩</div>
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Pieza obtenida</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 700, color: '#F7C94B' }}>Castillo San Felipe</div>
            <PiecesBar filled={3} total={5} />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          {[{ label: 'Monedas', value: '+50', icon: '🪙', color: '#F7C94B' }, { label: 'Tiempo', value: '28s', icon: '⏱️', color: '#60A5FA' }, { label: 'Energía', value: '+2', icon: '⚡', color: '#4ADE80' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 800, color: s.color }}>{s.icon} {s.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.4)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', padding: '13px', borderRadius: 12, border: 'none',
          background: '#F7C94B', color: '#1A1008',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(247,201,75,0.3)',
        }}>
          Siguiente actividad →
        </button>
      </div>
    </div>
  )
}

function PiecesBar({ filled, total }: { filled: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: 16, height: 5, borderRadius: 3, background: i < filled ? '#F7C94B' : 'rgba(255,255,255,0.2)' }} />
      ))}
    </div>
  )
}
