export default function Objetivo() {
  const cards = [
    {
      icon: '🧠',
      title: 'Estimulación Semántica',
      body: 'Actividades diseñadas para mantener y fortalecer las capacidades del lenguaje, reemplazando el material físico de terapia por un entorno inmersivo.',
    },
    {
      icon: '👴',
      title: 'Adultos Mayores Funcionales',
      body: 'Diseñado para personas de 60 años en adelante sin patologías motoras, visuales o auditivas de gran impacto que impidan el uso de VR.',
    },
    {
      icon: '🎯',
      title: 'Apoyo al Terapeuta',
      body: 'El sistema complementa las sesiones de fonoaudiología con datos de progreso detallados: tiempo, intentos y niveles completados.',
    },
  ]

  return (
    <section id="objetivo" style={{ background: '#FDF8EE', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: Text */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B83A1E', fontWeight: 500, marginBottom: 16,
            }}>
              Objetivo terapéutico
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#0D4A2F',
              marginBottom: 28,
            }}>
              Terapia del lenguaje<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>en realidad virtual</em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 17, lineHeight: 1.7,
              color: '#4A3F2F',
              marginBottom: 24,
            }}>
              Desarrollar un videojuego de realidad virtual que permita estimular las habilidades semánticas mediante actividades gamificadas, ofreciendo una alternativa tecnológica al material físico utilizado actualmente en las sesiones de fonoaudiología.
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15, lineHeight: 1.7,
              color: '#6B5F4A',
            }}>
              El jugador recorrerá ciudades representativas de Colombia, recuperando piezas de monumentos emblemáticos al completar cada actividad cognitiva exitosamente.
            </p>

            <div style={{
              marginTop: 40,
              padding: '24px 28px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #0D4A2F 0%, #1B6B42 100%)',
              color: '#FDF8EE',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>Metodología de desarrollo</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Scrum</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, opacity: 0.75, marginTop: 6 }}>
                Reuniones de sprint cualquier día de la semana, excepto los miércoles.
              </div>
            </div>
          </div>

          {/* Right: Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
            {cards.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 28px',
                  borderRadius: 16,
                  background: '#FFFFFF',
                  border: '1px solid rgba(26,16,8,0.08)',
                  boxShadow: '0 2px 16px rgba(13,74,47,0.06)',
                  display: 'flex',
                  gap: 20,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(13,74,47,0.12)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(13,74,47,0.06)'
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: '#F0F9F4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {c.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 16, fontWeight: 700,
                    color: '#0D4A2F', marginBottom: 8,
                  }}>{c.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14, lineHeight: 1.65,
                    color: '#6B5F4A',
                  }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
