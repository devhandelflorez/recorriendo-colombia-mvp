import { useState } from 'react'

const CITIES = [
  { name: 'Cartagena',  region: 'Caribe',    monument: 'Castillo San Felipe',  emoji: '🏰', unlocked: true,  pieces: 3, total: 5, color: '#B83A1E', img: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=400&h=220&fit=crop&auto=format' },
  { name: 'Bogotá',     region: 'Andina',    monument: 'Monserrate',           emoji: '⛰️', unlocked: true,  pieces: 1, total: 5, color: '#0D4A2F', img: 'https://images.unsplash.com/photo-1759375352933-c96abe2e4be7?w=400&h=220&fit=crop&auto=format' },
  { name: 'Medellín',   region: 'Antioquia', monument: 'Plaza Botero',         emoji: '🗿', unlocked: false, pieces: 0, total: 5, color: '#1A6B8A', img: 'https://images.unsplash.com/photo-1515366974328-f1181eb25189?w=400&h=220&fit=crop&auto=format' },
  { name: 'Cali',       region: 'Pacífica',  monument: 'Cristo Rey',           emoji: '✝️', unlocked: false, pieces: 0, total: 5, color: '#7B3F9E', img: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=400&h=220&fit=crop&auto=format' },
]

export default function ScreenCiudades() {
  const [selected, setSelected] = useState(0)

  return (
    <div style={{ height: '100%', background: '#0A1A12', display: 'flex', flexDirection: 'column', color: '#FDF8EE', paddingTop: 28, overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700 }}>🗺️ Destinos</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#F7C94B' }}>🪙 240</span>
          <EnergyBar pct={75} />
        </div>
      </div>

      {/* City list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,248,238,0.3)', marginBottom: 2 }}>
          Selecciona tu próximo destino
        </div>
        {CITIES.map((c, i) => (
          <button
            key={i}
            onClick={() => c.unlocked && setSelected(i)}
            style={{
              border: selected === i ? '2px solid #F7C94B' : '2px solid rgba(255,255,255,0.07)',
              borderRadius: 14, overflow: 'hidden', cursor: c.unlocked ? 'pointer' : 'not-allowed',
              padding: 0, textAlign: 'left', background: 'transparent',
              boxShadow: selected === i ? '0 0 20px rgba(247,201,75,0.2)' : 'none',
              transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            <div style={{ position: 'relative', height: 80 }}>
              <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: c.unlocked ? 'none' : 'grayscale(90%) brightness(0.4)' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${c.color}EE 0%, ${c.color}66 50%, transparent 100%)` }} />
              {!c.unlocked && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(0,0,0,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                    🔒 Bloqueado
                  </div>
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#FDF8EE', lineHeight: 1 }}>{c.name}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(253,248,238,0.65)', marginTop: 2 }}>{c.region} · {c.monument}</div>
                  </div>
                  <span style={{ fontSize: 20 }}>{c.emoji}</span>
                </div>
                {c.unlocked && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {Array.from({ length: c.total }).map((_, j) => (
                        <div key={j} style={{ width: 14, height: 5, borderRadius: 3, background: j < c.pieces ? '#F7C94B' : 'rgba(255,255,255,0.2)' }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(253,248,238,0.5)' }}>{c.pieces}/{c.total} piezas</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '10px 14px 16px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button style={{
          width: '100%', padding: '13px', borderRadius: 12, border: 'none',
          background: CITIES[selected].unlocked ? '#F7C94B' : 'rgba(255,255,255,0.1)',
          color: CITIES[selected].unlocked ? '#1A1008' : 'rgba(253,248,238,0.3)',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700,
          cursor: CITIES[selected].unlocked ? 'pointer' : 'default',
          transition: 'all 0.2s',
        }}>
          {CITIES[selected].unlocked ? `¡Ir a ${CITIES[selected].name}! →` : '🔒 Ciudad bloqueada'}
        </button>
      </div>
    </div>
  )
}

function EnergyBar({ pct }: { pct: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 11 }}>⚡</span>
      <div style={{ width: 50, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #F7C94B, #B83A1E)', borderRadius: 3 }} />
      </div>
    </div>
  )
}
