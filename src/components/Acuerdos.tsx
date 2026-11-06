const nextSteps = [
  'Nombre de la actividad cognitiva',
  'Objetivo terapéutico específico',
  'Nivel de dificultad',
  'Instrucciones para el jugador',
  'Número de opciones de respuesta',
  'Criterios de respuesta correcta e incorrecta',
  'Tipo de retroalimentación',
  'Recursos necesarios: imágenes, audio, modelos 3D',
]

export default function Acuerdos() {
  return (
    <section id="acuerdos" style={{ background: '#F4EFE4', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* Acuerdos de trabajo */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B83A1E', fontWeight: 500, marginBottom: 16,
            }}>
              Acuerdos de trabajo
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#0D4A2F',
              marginBottom: 40,
            }}>
              Scrum &amp;<br />metodología ágil
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#FFFFFF',
                border: '1px solid rgba(26,16,8,0.07)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: '#0D4A2F', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20,
                }}>🔄</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: '#0D4A2F', marginBottom: 6 }}>Metodología Scrum</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: '#6B5F4A' }}>Desarrollo iterativo con sprints regulares para entregas incrementales y retroalimentación continua del equipo terapéutico.</div>
                </div>
              </div>

              <div style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#FFFFFF',
                border: '1px solid rgba(26,16,8,0.07)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: '#F7C94B', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20,
                }}>📅</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: '#0D4A2F', marginBottom: 6 }}>Reuniones de sprint</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: '#6B5F4A' }}>Se realizan cualquier día de la semana, <strong>excepto los miércoles</strong>. La frecuencia y duración se acuerda al inicio de cada sprint.</div>
                </div>
              </div>

              <div style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#FFFFFF',
                border: '1px solid rgba(26,16,8,0.07)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: '#B83A1E', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20,
                }}>🎮</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: '#0D4A2F', marginBottom: 6 }}>Motor de desarrollo</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: '#6B5F4A' }}>Unity 3D para el entorno de realidad virtual, con integración de las fichas de actividad como base del diseño interactivo.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos pasos */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B83A1E', fontWeight: 500, marginBottom: 16,
            }}>
              Recomendación — próxima reunión
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#0D4A2F',
              marginBottom: 20,
            }}>
              Ficha por<br />actividad cognitiva
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7,
              color: '#4A3F2F', marginBottom: 32,
            }}>
              Antes de comenzar el desarrollo, es necesario definir el detalle de cada actividad. Se recomienda elaborar una ficha por actividad con los siguientes campos:
            </p>

            <div style={{
              borderRadius: 18, overflow: 'hidden',
              border: '1px solid rgba(26,16,8,0.08)',
              background: '#FFFFFF',
              boxShadow: '0 4px 20px rgba(13,74,47,0.07)',
            }}>
              <div style={{
                padding: '18px 24px',
                background: 'linear-gradient(135deg, #0D4A2F, #1B6B42)',
                color: '#FDF8EE',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.01em',
              }}>
                Campos recomendados para cada actividad
              </div>
              {nextSteps.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 24px',
                  borderBottom: i < nextSteps.length - 1 ? '1px solid rgba(26,16,8,0.05)' : 'none',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: i % 2 === 0 ? '#F0F9F4' : '#FFF8E6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                    color: '#0D4A2F',
                  }}>
                    {i + 1}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 14,
                    color: '#2A1F10', lineHeight: 1.4,
                  }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, padding: '16px 20px', borderRadius: 12,
              background: 'rgba(247,201,75,0.2)',
              border: '1px solid rgba(247,201,75,0.5)',
              fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6,
              color: '#5A3E00',
            }}>
              💡 Con estas fichas tendrán una base sólida para diseñar los mockups y comenzar el desarrollo en Unity.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
