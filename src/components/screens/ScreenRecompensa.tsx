export default function ScreenRecompensa() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg, #0D4A2F 0%, #0A2E1C 60%, #1A1008 100%)',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Confetti particles */}
      {[
        { top: '12%', left: '18%', color: '#F7C94B', size: 8, rotate: 25 },
        { top: '8%', left: '72%', color: '#B83A1E', size: 6, rotate: -15 },
        { top: '22%', left: '85%', color: '#4ADE80', size: 7, rotate: 45 },
        { top: '18%', left: '8%', color: '#60A5FA', size: 5, rotate: -30 },
        { top: '75%', left: '14%', color: '#F472B6', size: 6, rotate: 20 },
        { top: '80%', left: '80%', color: '#F7C94B', size: 8, rotate: -45 },
      ].map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, width: p.size, height: p.size, borderRadius: 2, background: p.color, transform: `rotate(${p.rotate}deg)`, opacity: 0.7, pointerEvents: 'none' }} />
      ))}

      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,201,75,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', width: '100%' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', marginBottom: 10 }}>
          🎉 ¡Actividad completada!
        </div>

        {/* Monument */}
        <div style={{ fontSize: 70, marginBottom: 4, filter: 'drop-shadow(0 0 20px rgba(247,201,75,0.4))' }}>🏰</div>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 900, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Pieza del Castillo<br />
          <em style={{ color: '#F7C94B', fontStyle: 'italic' }}>San Felipe</em>
        </h2>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(253,248,238,0.5)', marginBottom: 18 }}>Cartagena de Indias</div>

        {/* Pieces progress */}
        <div style={{ marginBottom: 20, width: '100%' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>Progreso del monumento</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            {[true, true, true, false, false].map((f, i) => (
              <div key={i} style={{
                width: 44, height: 44, borderRadius: 10,
                background: f ? 'rgba(247,201,75,0.15)' : 'rgba(255,255,255,0.06)',
                border: f ? '1.5px solid rgba(247,201,75,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: f ? 22 : 14,
                color: f ? '#F7C94B' : 'rgba(255,255,255,0.15)',
                boxShadow: f ? '0 0 14px rgba(247,201,75,0.2)' : 'none',
              }}>
                {f ? '🧩' : '·'}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(253,248,238,0.35)', textAlign: 'center', marginTop: 6 }}>3 de 5 piezas</div>
        </div>

        {/* Rewards */}
        <div style={{
          display: 'flex', gap: 10, marginBottom: 22, width: '100%',
          padding: '12px 14px', borderRadius: 14,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          justifyContent: 'space-around',
        }}>
          {[
            { icon: '🪙', value: '+50', label: 'Monedas', color: '#F7C94B' },
            { icon: '⚡', value: '+2', label: 'Energía', color: '#4ADE80' },
            { icon: '⏱️', value: '28s', label: 'Tiempo', color: '#60A5FA' },
          ].map(r => (
            <div key={r.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{r.icon}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 800, color: r.color, lineHeight: 1 }}>{r.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.35)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <button style={{
            flex: 1, padding: '13px', borderRadius: 12, border: 'none',
            background: '#F7C94B', color: '#1A1008',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(247,201,75,0.3)',
          }}>
            Siguiente actividad →
          </button>
          <button style={{
            padding: '13px 14px', borderRadius: 12,
            border: '1.5px solid rgba(255,255,255,0.12)',
            background: 'transparent', color: 'rgba(253,248,238,0.55)',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, cursor: 'pointer',
          }}>
            🗺️ Mapa
          </button>
        </div>
      </div>
    </div>
  )
}
