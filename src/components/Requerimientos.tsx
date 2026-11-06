import { useState } from 'react'

const reqs = [
  { id: 'RF-01', req: 'El sistema permitirá crear un avatar personalizado.', cat: 'Avatar' },
  { id: 'RF-02', req: 'El usuario podrá seleccionar nombre, género, tono de piel y región de Colombia.', cat: 'Avatar' },
  { id: 'RF-03', req: 'El sistema permitirá recorrer ciudades representativas de Colombia.', cat: 'Juego' },
  { id: 'RF-04', req: 'El jugador realizará actividades de estimulación semántica.', cat: 'Terapia' },
  { id: 'RF-05', req: 'El sistema validará respuestas correctas e incorrectas.', cat: 'Terapia' },
  { id: 'RF-06', req: 'El sistema mostrará retroalimentación positiva cuando el usuario falle.', cat: 'Terapia' },
  { id: 'RF-07', req: 'Las respuestas cambiarán de posición aleatoriamente en cada intento.', cat: 'Terapia' },
  { id: 'RF-08', req: 'El sistema utilizará una barra de energía en lugar de vidas.', cat: 'Juego' },
  { id: 'RF-09', req: 'El usuario obtendrá monedas de viaje como recompensa.', cat: 'Gamificación' },
  { id: 'RF-10', req: 'El sistema desbloqueará accesorios para el avatar mediante monedas.', cat: 'Gamificación' },
  { id: 'RF-11', req: 'El sistema registrará el tiempo empleado en cada actividad.', cat: 'Progreso' },
  { id: 'RF-12', req: 'El sistema almacenará el número de intentos realizados.', cat: 'Progreso' },
  { id: 'RF-13', req: 'El terapeuta podrá consultar el progreso del usuario mediante reportes.', cat: 'Progreso' },
  { id: 'RF-14', req: 'Al finalizar el recorrido se otorgará un Diploma de Viajero.', cat: 'Gamificación' },
]

const categories = ['Todos', 'Avatar', 'Juego', 'Terapia', 'Gamificación', 'Progreso']

const catColors: Record<string, { bg: string; text: string }> = {
  Avatar: { bg: '#EFF6FF', text: '#1D4ED8' },
  Juego: { bg: '#F0FFF4', text: '#166534' },
  Terapia: { bg: '#FFF7ED', text: '#C2410C' },
  Gamificación: { bg: '#FEF9C3', text: '#854D0E' },
  Progreso: { bg: '#F5F3FF', text: '#6D28D9' },
}

export default function Requerimientos() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos' ? reqs : reqs.filter(r => r.cat === active)

  return (
    <section id="requerimientos" style={{ background: '#F4EFE4', padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#B83A1E', fontWeight: 500, marginBottom: 16,
          }}>
            Especificación técnica
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#0D4A2F',
            }}>
              Requerimientos<br />funcionales
            </h2>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: '8px 16px', borderRadius: 20,
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    transition: 'all 0.18s',
                    background: active === cat ? '#0D4A2F' : '#FFFFFF',
                    color: active === cat ? '#FDF8EE' : '#4A3F2F',
                    boxShadow: active === cat ? '0 4px 16px rgba(13,74,47,0.25)' : '0 1px 4px rgba(0,0,0,0.08)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderRadius: 20,
          background: '#FFFFFF',
          border: '1px solid rgba(26,16,8,0.07)',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(13,74,47,0.08)',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '100px 1fr 120px',
            padding: '16px 28px',
            background: '#0D4A2F',
            color: '#FDF8EE',
          }}>
            {['ID', 'Requerimiento', 'Categoría'].map(h => (
              <div key={h} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                opacity: 0.75,
              }}>{h}</div>
            ))}
          </div>

          {filtered.map((r, i) => (
            <div
              key={r.id}
              style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 120px',
                padding: '20px 28px',
                borderBottom: i < filtered.length - 1 ? '1px solid rgba(26,16,8,0.06)' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8F5EE')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                color: '#0D4A2F',
              }}>{r.id}</div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55,
                color: '#2A1F10',
                paddingRight: 24,
              }}>{r.req}</div>
              <div>
                <span style={{
                  padding: '4px 12px', borderRadius: 8,
                  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                  background: catColors[r.cat]?.bg ?? '#F3F4F6',
                  color: catColors[r.cat]?.text ?? '#374151',
                }}>{r.cat}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, textAlign: 'right',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5F4A',
        }}>
          {filtered.length} de {reqs.length} requerimientos
        </div>
      </div>
    </section>
  )
}
