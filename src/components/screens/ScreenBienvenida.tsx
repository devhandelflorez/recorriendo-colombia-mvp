export default function ScreenBienvenida() {
  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(175deg, #0A2E1C 0%, #0D4A2F 50%, #1A1008 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: 28,
    }}>
      {/* Background texture circles */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,201,75,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,58,30,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Flag stripe top */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 3, display: 'flex' }}>
        <div style={{ flex: 2, background: '#F7C94B' }} />
        <div style={{ flex: 1, background: '#B83A1E' }} />
        <div style={{ flex: 1, background: '#0D4A2F' }} />
      </div>

      {/* Map illustration placeholder */}
      <div style={{
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle at 45% 40%, rgba(247,201,75,0.2) 0%, rgba(13,74,47,0.6) 60%, transparent 100%)',
        border: '1.5px solid rgba(247,201,75,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 0 60px rgba(247,201,75,0.12)',
        fontSize: 72,
      }}>
        🌎
      </div>

      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', marginBottom: 10 }}>
        Videojuego VR · Fonoaudiología
      </div>

      <h1 style={{
        fontFamily: 'Fraunces, serif', fontWeight: 900,
        fontSize: 34, lineHeight: 1.0, textAlign: 'center',
        letterSpacing: '-0.03em', color: '#FDF8EE',
        marginBottom: 6,
      }}>
        Recorriendo
      </h1>
      <h1 style={{
        fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 700,
        fontSize: 34, lineHeight: 1.0, textAlign: 'center',
        letterSpacing: '-0.03em', color: '#F7C94B',
        marginBottom: 24,
      }}>
        Colombia
      </h1>

      <p style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13,
        lineHeight: 1.6, color: 'rgba(253,248,238,0.6)',
        textAlign: 'center', maxWidth: 280, marginBottom: 40,
        padding: '0 24px',
      }}>
        Un viaje por las ciudades de Colombia para estimular tu memoria y lenguaje.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', padding: '0 28px' }}>
        <button style={{
          padding: '14px', borderRadius: 14, border: 'none',
          background: '#F7C94B', color: '#1A1008',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 4px 24px rgba(247,201,75,0.35)',
        }}>
          ¡Comenzar viaje! 🗺️
        </button>
        <button style={{
          padding: '13px', borderRadius: 14, border: '1.5px solid rgba(253,248,238,0.15)',
          background: 'rgba(255,255,255,0.05)', color: 'rgba(253,248,238,0.7)',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600,
          cursor: 'pointer',
        }}>
          Continuar partida
        </button>
      </div>

      {/* Version */}
      <div style={{ position: 'absolute', bottom: 20, fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.2)', letterSpacing: '0.06em' }}>
        v1.0.0 · Sprint 1
      </div>
    </div>
  )
}
