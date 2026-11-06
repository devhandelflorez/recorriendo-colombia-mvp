export default function Mecanica() {
  const steps = [
    {
      num: '01',
      title: 'El jugador recorre una ciudad',
      body: 'Selecciona una ciudad representativa de Colombia y comienza su recorrido en un entorno inmersivo de realidad virtual.',
      color: '#F7C94B',
    },
    {
      num: '02',
      title: 'Encuentra una actividad cognitiva',
      body: 'Se le presenta una actividad semántica: debe identificar la respuesta correcta entre varias opciones presentadas visualmente.',
      color: '#0D4A2F',
    },
    {
      num: '03',
      title: 'Responde correctamente',
      body: 'Al seleccionar la respuesta correcta, obtiene una pieza del monumento representativo de la ciudad y avanza.',
      color: '#1B6B42',
    },
    {
      num: '04',
      title: 'Retroalimentación positiva',
      body: 'Si falla, el sistema entrega retroalimentación positiva. Las opciones se reordenan aleatoriamente en cada intento.',
      color: '#B83A1E',
    },
  ]

  return (
    <section id="mecanica" style={{ background: '#F4EFE4', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#B83A1E', fontWeight: 500, marginBottom: 16,
          }}>
            Funcionamiento del juego
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 54px)',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#0D4A2F',
          }}>
            Mecánica general
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          marginBottom: 80,
        }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid rgba(26,16,8,0.07)',
                boxShadow: '0 2px 12px rgba(13,74,47,0.05)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: 6, background: s.color }} />
              <div style={{ padding: '28px 24px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 48, fontWeight: 900,
                  color: s.color === '#F7C94B' ? '#F7C94B' : s.color,
                  opacity: s.color === '#F7C94B' ? 1 : 0.15,
                  lineHeight: 1, marginBottom: 16,
                  letterSpacing: '-0.04em',
                }}>
                  {s.num}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15, fontWeight: 700,
                  color: '#0D4A2F', marginBottom: 10, lineHeight: 1.35,
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13.5, lineHeight: 1.65,
                  color: '#6B5F4A',
                }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{
            padding: '40px',
            borderRadius: 20,
            background: '#0D4A2F',
            color: '#FDF8EE',
          }}>
            <div style={{
              fontSize: 32, marginBottom: 20,
            }}>✅</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26, fontWeight: 700,
              marginBottom: 14, letterSpacing: '-0.02em',
            }}>Respuesta correcta</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Selección exitosa de imagen o respuesta.', 'Obtención de una pieza del monumento.', 'Avance a la siguiente actividad.'].map(t => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#F7C94B',
                    flexShrink: 0, marginTop: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11,
                  }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.5, opacity: 0.9 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            padding: '40px',
            borderRadius: 20,
            background: '#FFFFFF',
            border: '1px solid rgba(26,16,8,0.08)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 20 }}>🔄</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26, fontWeight: 700,
              marginBottom: 14, letterSpacing: '-0.02em',
              color: '#0D4A2F',
            }}>Respuesta incorrecta</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Retroalimentación positiva y motivadora.',
                'Posibilidad de reintentar la actividad.',
                'Las opciones cambian de posición aleatoriamente.',
              ].map(t => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#B83A1E',
                    flexShrink: 0, marginTop: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#FDF8EE',
                  }}>↩</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.5, color: '#4A3F2F' }}>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 24, padding: '14px 16px', borderRadius: 10,
              background: '#FFF8E6', border: '1px solid rgba(247,201,75,0.4)',
              fontFamily: 'var(--font-sans)', fontSize: 13, color: '#7A5A10',
              lineHeight: 1.5,
            }}>
              <strong>Nota:</strong> Las opciones se reordenan aleatoriamente para evitar respuestas por memoria visual.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
