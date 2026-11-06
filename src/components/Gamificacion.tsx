const elements = [
  {
    icon: '🧑‍🎨',
    title: 'Creación de Avatar',
    desc: 'El jugador personaliza su personaje eligiendo nombre, género, tono de piel y región de Colombia.',
    rf: 'RF-01, RF-02',
  },
  {
    icon: '🗺️',
    title: 'Recorrido por Colombia',
    desc: 'Ciudades representativas de Colombia se desbloquean conforme el jugador avanza en su viaje terapéutico.',
    rf: 'RF-03',
  },
  {
    icon: '⚡',
    title: 'Sistema de Energía',
    desc: 'Barra de energía en reemplazo del sistema de vidas tradicional, diseñada para no generar frustración.',
    rf: 'RF-08',
  },
  {
    icon: '🪙',
    title: 'Monedas de Viaje',
    desc: 'Recompensa obtenida al completar actividades. Permite desbloquear accesorios para el avatar.',
    rf: 'RF-09, RF-10',
  },
  {
    icon: '🎁',
    title: 'Eventos Sorpresa',
    desc: 'Momentos especiales que aparecen durante el recorrido para mantener la motivación y el asombro.',
    rf: '—',
  },
  {
    icon: '🎓',
    title: 'Diploma del Viajero',
    desc: 'Al finalizar el recorrido completo, el usuario recibe un diploma como reconocimiento de su logro.',
    rf: 'RF-14',
  },
]

export default function Gamificacion() {
  return (
    <section id="gamificacion" style={{ background: '#FDF8EE', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left sticky header */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B83A1E', fontWeight: 500, marginBottom: 16,
            }}>
              Gamificación
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 3.5vw, 52px)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#0D4A2F',
              marginBottom: 24,
            }}>
              Elementos validados<br />para el juego
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16, lineHeight: 1.7, color: '#4A3F2F',
              marginBottom: 32,
            }}>
              Cada elemento de gamificación fue validado con criterios terapéuticos para asegurar motivación, autonomía y bienestar en el adulto mayor.
            </p>

            {/* Colombian city photo */}
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              aspectRatio: '4/3',
              background: '#D4EAD9',
              position: 'relative',
            }}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&auto=format"
                alt="Ciudad colombiana con arquitectura colorida"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 20px 20px',
                background: 'linear-gradient(to top, rgba(13,74,47,0.9), transparent)',
                color: '#FDF8EE',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>Ciudades de Colombia</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, opacity: 0.75, marginTop: 4 }}>Bogotá · Cartagena · Medellín · Cali · Barranquilla</div>
              </div>
            </div>
          </div>

          {/* Right: Grid of elements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {elements.map((el, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 26px',
                  borderRadius: 18,
                  background: '#FFFFFF',
                  border: '1px solid rgba(26,16,8,0.07)',
                  boxShadow: '0 2px 12px rgba(13,74,47,0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 30px rgba(13,74,47,0.12)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(13,74,47,0.05)'
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 14 }}>{el.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
                  color: '#0D4A2F', marginBottom: 8,
                }}>{el.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13.5,
                  lineHeight: 1.65, color: '#6B5F4A', marginBottom: 16,
                }}>{el.desc}</p>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: '#B83A1E', fontWeight: 500,
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(184,58,30,0.08)',
                  display: 'inline-block',
                  letterSpacing: '0.04em',
                }}>{el.rf}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
