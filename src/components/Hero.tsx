export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0D4A2F 0%, #1B6B42 45%, #0A3522 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(247,201,75,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: '30%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,58,30,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Photo panel */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '42%',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=900&h=1100&fit=crop&auto=format"
          alt="Ciudad colombiana colorida con arquitectura tradicional"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #0D4A2F 0%, transparent 60%)',
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 32px 80px', position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 20,
            background: 'rgba(247,201,75,0.18)',
            border: '1px solid rgba(247,201,75,0.35)',
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 12 }}>🎮</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 500,
              color: '#F7C94B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Videojuego de Realidad Virtual — Fonoaudiología
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 900,
            lineHeight: 0.95,
            color: '#FDF8EE',
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            Recorriendo<br />
            <em style={{ fontStyle: 'italic', color: '#F7C94B' }}>Colombia</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'rgba(253,248,238,0.78)',
            marginBottom: 48,
            maxWidth: 520,
          }}>
            Un videojuego de realidad virtual diseñado para estimular las habilidades semánticas de adultos mayores de 60 años, mediante actividades gamificadas inspiradas en las ciudades representativas de Colombia.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#objetivo" style={{
              padding: '14px 28px', borderRadius: 28,
              background: '#F7C94B', color: '#1A1008',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(247,201,75,0.4)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(247,201,75,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(247,201,75,0.4)' }}
            >
              Ver diseño del proyecto
            </a>
            <a href="#requerimientos" style={{
              padding: '14px 28px', borderRadius: 28,
              background: 'transparent',
              border: '1.5px solid rgba(253,248,238,0.35)',
              color: '#FDF8EE',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(253,248,238,0.7)'; e.currentTarget.style.background = 'rgba(253,248,238,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253,248,238,0.35)'; e.currentTarget.style.background = 'transparent' }}
            >
              Requerimientos RF
            </a>
          </div>

          {/* Stats strip */}
          <div style={{
            display: 'flex', gap: 40, marginTop: 72,
            paddingTop: 40,
            borderTop: '1px solid rgba(253,248,238,0.12)',
          }}>
            {[
              { value: '60+', label: 'Años, público objetivo' },
              { value: '14', label: 'Requerimientos funcionales' },
              { value: '5+', label: 'Ciudades de Colombia' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 36, fontWeight: 700,
                  color: '#F7C94B', lineHeight: 1,
                  marginBottom: 6,
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12, color: 'rgba(253,248,238,0.55)',
                  fontWeight: 500, letterSpacing: '0.02em',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'rgba(253,248,238,0.4)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        <span>Desplazar</span>
        <div style={{
          width: 1, height: 32,
          background: 'linear-gradient(to bottom, rgba(253,248,238,0.4), transparent)',
        }} />
      </div>
    </section>
  )
}
