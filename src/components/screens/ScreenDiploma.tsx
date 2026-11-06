export default function ScreenDiploma() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg, #0D4A2F 0%, #1A1008 70%, #2D1A00 100%)',
      color: '#FDF8EE', paddingTop: 28, overflow: 'hidden', position: 'relative',
      alignItems: 'center',
    }}>
      {/* Decorative radial glow */}
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,201,75,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Sparkles */}
      {[
        { top: '10%', left: '12%', fontSize: 14 }, { top: '14%', left: '80%', fontSize: 10 },
        { top: '6%', left: '55%', fontSize: 12 }, { top: '20%', left: '88%', fontSize: 8 },
        { top: '80%', left: '8%', fontSize: 10 }, { top: '85%', left: '85%', fontSize: 12 },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.top, left: s.left, fontSize: s.fontSize, opacity: 0.6, pointerEvents: 'none' }}>✦</div>
      ))}

      {/* Flag stripe */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 3, display: 'flex', zIndex: 2 }}>
        <div style={{ flex: 2, background: '#F7C94B' }} />
        <div style={{ flex: 1, background: '#B83A1E' }} />
        <div style={{ flex: 1, background: '#0D4A2F' }} />
      </div>

      {/* Diploma card */}
      <div style={{
        position: 'relative', zIndex: 2,
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 22px', width: '100%',
      }}>
        {/* Certificate frame */}
        <div style={{
          width: '100%', borderRadius: 20,
          border: '2px solid rgba(247,201,75,0.4)',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)',
          padding: '24px 20px 20px',
          boxShadow: '0 0 40px rgba(247,201,75,0.12), inset 0 0 40px rgba(247,201,75,0.04)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Corner ornaments */}
          {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', ...pos,
              width: 16, height: 16, borderRadius: 2,
              borderTop: '2px solid rgba(247,201,75,0.5)',
              borderLeft: '2px solid rgba(247,201,75,0.5)',
              transform: i === 1 ? 'scaleX(-1)' : i === 2 ? 'scaleY(-1)' : i === 3 ? 'scale(-1)' : 'none',
            }} />
          ))}

          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', textAlign: 'center', marginBottom: 10 }}>
            República de Colombia
          </div>

          <div style={{ fontSize: 50, textAlign: 'center', marginBottom: 8 }}>🎓</div>

          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,248,238,0.4)', textAlign: 'center', marginBottom: 4 }}>
            Otorgado a
          </div>

          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, fontWeight: 700, color: '#F7C94B', textAlign: 'center', marginBottom: 6 }}>
            Abuela Rosa
          </div>

          <div style={{
            width: 60, height: 1.5, background: 'rgba(247,201,75,0.35)', margin: '0 auto 10px',
            borderRadius: 1,
          }} />

          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, lineHeight: 1.55, color: 'rgba(253,248,238,0.7)', textAlign: 'center', marginBottom: 14 }}>
            Por completar exitosamente el recorrido por las ciudades de Colombia, demostrando excelentes habilidades de lenguaje y memoria semántica.
          </p>

          {/* Cities visited */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
            {[
              { emoji: '🏰', name: 'Cartagena' },
              { emoji: '⛰️', name: 'Bogotá' },
              { emoji: '🗿', name: 'Medellín' },
              { emoji: '✝️', name: 'Cali' },
            ].map(c => (
              <div key={c.name} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{c.emoji}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, color: 'rgba(253,248,238,0.4)', marginTop: 2 }}>{c.name}</div>
              </div>
            ))}
          </div>

          {/* Seal */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center' }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(247,201,75,0.2)' }} />
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F7C94B, #B83A1E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: '0 0 16px rgba(247,201,75,0.4)',
            }}>🇨🇴</div>
            <div style={{ height: 1, flex: 1, background: 'rgba(247,201,75,0.2)' }} />
          </div>

          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.3)', textAlign: 'center', marginTop: 8 }}>
            Julio 2026 · Recorriendo Colombia VR
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 14 }}>
          <button style={{
            flex: 1, padding: '12px', borderRadius: 12, border: 'none',
            background: '#F7C94B', color: '#1A1008',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(247,201,75,0.3)',
          }}>
            📄 Descargar diploma
          </button>
          <button style={{
            padding: '12px 14px', borderRadius: 12,
            border: '1.5px solid rgba(255,255,255,0.12)',
            background: 'transparent', color: 'rgba(253,248,238,0.55)',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, cursor: 'pointer',
          }}>
            Compartir
          </button>
        </div>
      </div>
    </div>
  )
}
