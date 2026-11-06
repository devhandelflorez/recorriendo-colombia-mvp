const userMetrics = [
  { label: 'Avance por niveles', icon: '📈', desc: 'Se registra cada nivel completado y el progreso acumulado del recorrido.' },
  { label: 'Tiempo por actividad', icon: '⏱️', desc: 'El sistema mide el tiempo empleado en completar cada tarea semántica.' },
  { label: 'Intentos realizados', icon: '🔁', desc: 'Se cuenta el número de intentos antes de responder correctamente.' },
  { label: 'Actividades completadas', icon: '✅', desc: 'Registro detallado de cada actividad superada en la sesión.' },
]

const therapistViews = [
  { label: 'Tiempo por actividad', icon: '⏱️' },
  { label: 'Número de intentos', icon: '🔁' },
  { label: 'Progreso general', icon: '📊' },
  { label: 'Niveles completados', icon: '🏆' },
]

export default function Progreso() {
  return (
    <section id="progreso" style={{ background: '#FDF8EE', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#B83A1E', fontWeight: 500, marginBottom: 16,
          }}>
            Seguimiento del progreso
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 54px)',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#0D4A2F',
          }}>
            Indicadores de mejora
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          {/* User metrics */}
          <div style={{
            borderRadius: 24, overflow: 'hidden',
            border: '1px solid rgba(26,16,8,0.07)',
            background: '#FFFFFF',
            boxShadow: '0 4px 24px rgba(13,74,47,0.06)',
          }}>
            <div style={{
              padding: '28px 32px',
              background: 'linear-gradient(135deg, #0D4A2F 0%, #1B6B42 100%)',
              color: '#FDF8EE',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>Por sesión — Jugador</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Datos registrados</h3>
            </div>
            <div>
              {userMetrics.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, padding: '22px 32px',
                  borderBottom: i < userMetrics.length - 1 ? '1px solid rgba(26,16,8,0.06)' : 'none',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: '#F0F9F4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>{m.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
                      color: '#0D4A2F', marginBottom: 4,
                    }}>{m.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.6,
                      color: '#6B5F4A',
                    }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Therapist view + mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
              borderRadius: 24,
              border: '1px solid rgba(26,16,8,0.07)',
              background: '#FFFFFF',
              boxShadow: '0 4px 24px rgba(13,74,47,0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '28px 32px',
                background: 'linear-gradient(135deg, #B83A1E 0%, #D14E2A 100%)',
                color: '#FDF8EE',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>Vista del terapeuta</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Reportes disponibles</h3>
              </div>
              <div style={{ padding: '8px 0' }}>
                {therapistViews.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 32px',
                    borderBottom: i < therapistViews.length - 1 ? '1px solid rgba(26,16,8,0.05)' : 'none',
                  }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: '#2A1F10' }}>{t.label}</span>
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: '#B83A1E', fontWeight: 500,
                      padding: '3px 8px', borderRadius: 5,
                      background: 'rgba(184,58,30,0.08)',
                    }}>RF-13</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup progress card */}
            <div style={{
              borderRadius: 24, padding: '28px 32px',
              background: '#F7C94B',
              boxShadow: '0 4px 24px rgba(247,201,75,0.35)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12, color: '#5A3E00' }}>Ejemplo de sesión</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { label: 'Nivel', value: '3 / 5' },
                  { label: 'Tiempo', value: '14 min' },
                  { label: 'Intentos', value: '6' },
                  { label: 'Completadas', value: '8 act.' },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
                      color: '#1A1008', lineHeight: 1,
                    }}>{m.value}</div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                      color: 'rgba(26,16,8,0.55)', marginTop: 4,
                    }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
