export default function ScreenCiudadSuperada() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0A1A12',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
    }}>
      {/* BG city photo */}
      <img src="https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=500&h=800&fit=crop&auto=format" alt="Cartagena" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A1A12 30%, rgba(10,26,18,0.6) 100%)', pointerEvents: 'none' }} />

      {/* Flag stripe */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 3, display: 'flex', zIndex: 2 }}>
        <div style={{ flex: 2, background: '#F7C94B' }} />
        <div style={{ flex: 1, background: '#B83A1E' }} />
        <div style={{ flex: 1, background: '#0D4A2F' }} />
      </div>

      {/* Content — bottom-anchored */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 22px 28px' }}>
        {/* Monument complete */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 68, filter: 'drop-shadow(0 0 24px rgba(247,201,75,0.5))', marginBottom: 8 }}>🏰</div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F7C94B', opacity: 0.7, marginBottom: 6 }}>¡Ciudad completada!</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
            Cartagena<br />
            <em style={{ fontStyle: 'italic', color: '#F7C94B', fontWeight: 700, fontSize: 24 }}>de Indias</em>
          </h2>
        </div>

        {/* All pieces */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              width: 46, height: 46, borderRadius: 10,
              background: 'rgba(247,201,75,0.15)',
              border: '1.5px solid rgba(247,201,75,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: '0 0 16px rgba(247,201,75,0.2)',
            }}>🧩</div>
          ))}
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(253,248,238,0.45)', textAlign: 'center', marginBottom: 20 }}>
          Todas las piezas del Castillo San Felipe reunidas
        </div>

        {/* Summary */}
        <div style={{
          padding: '14px', borderRadius: 14,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          marginBottom: 20,
        }}>
          {[
            { label: 'Actividades', value: '5', icon: '✅' },
            { label: 'Monedas', value: '250', icon: '🪙' },
            { label: 'Tiempo total', value: '22 min', icon: '⏱️' },
            { label: 'Intentos', value: '7', icon: '🔁' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 800, color: '#F7C94B', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, color: 'rgba(253,248,238,0.35)', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: '#F7C94B', color: '#1A1008',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(247,201,75,0.35)',
        }}>
          Siguiente ciudad 🗺️
        </button>
      </div>
    </div>
  )
}
