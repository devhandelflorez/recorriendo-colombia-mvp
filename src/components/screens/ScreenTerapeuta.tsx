import { useState } from 'react'
import { exportClinicalReportPDF } from '../../utils/pdfGenerator'

const SESSIONS = [
  { date: '01 Jul', level: 2, time: '18 min', attempts: 4, activities: 5, energy: 60 },
  { date: '03 Jul', level: 2, time: '14 min', attempts: 2, activities: 5, energy: 70 },
  { date: '05 Jul', level: 3, time: '11 min', attempts: 1, activities: 5, energy: 80 },
]

const PATIENTS = ['María López', 'Carlos Ruiz', 'Rosa Vega']

export default function ScreenTerapeuta() {
  const [tab, setTab] = useState<'resumen' | 'sesiones' | 'pacientes'>('resumen')
  const [patient, setPatient] = useState(0)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F2EDE4', color: '#1A1008', paddingTop: 28, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', background: '#0D4A2F', color: '#FDF8EE', flexShrink: 0 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', marginBottom: 3 }}>Panel del terapeuta</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 700 }}>{PATIENTS[patient]}</div>
          <select
            value={patient}
            onChange={e => setPatient(Number(e.target.value))}
            style={{
              padding: '4px 8px', borderRadius: 8,
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#FDF8EE', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11,
              cursor: 'pointer', outline: 'none',
            }}
          >
            {PATIENTS.map((p, i) => <option key={i} value={i} style={{ color: '#1A1008', background: '#FDF8EE' }}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#E8E2D8', borderBottom: '1px solid rgba(26,16,8,0.1)', flexShrink: 0 }}>
        {([['resumen', 'Resumen'], ['sesiones', 'Sesiones'], ['pacientes', 'Progreso']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: '10px 4px', border: 'none', cursor: 'pointer',
            background: tab === id ? '#F2EDE4' : 'transparent',
            borderBottom: tab === id ? '2px solid #0D4A2F' : '2px solid transparent',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: tab === id ? 700 : 500,
            color: tab === id ? '#0D4A2F' : 'rgba(26,16,8,0.5)',
            transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'resumen' && (
          <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Nivel actual', value: '3', icon: '📈', color: '#0D4A2F', sub: 'de 5 disponibles' },
                { label: 'Prom. intentos', value: '2.3', icon: '🔁', color: '#B83A1E', sub: 'por actividad' },
                { label: 'Prom. tiempo', value: '14 min', icon: '⏱️', color: '#1A6B8A', sub: 'por sesión' },
                { label: 'Act. completadas', value: '15', icon: '✅', color: '#5B2D8E', sub: 'total acumulado' },
              ].map(c => (
                <div key={c.label} style={{ padding: '12px', borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(26,16,8,0.08)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{c.icon}</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: '#0D4A2F', fontWeight: 600, marginTop: 3 }}>{c.label}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(26,16,8,0.4)', marginTop: 1 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Trend bar chart */}
            <div style={{ padding: '12px', borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(26,16,8,0.08)' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.4)', marginBottom: 10 }}>
                Tendencia de intentos · sesiones
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 56 }}>
                {SESSIONS.map((s, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: '#0D4A2F', fontWeight: 600 }}>{s.attempts}</div>
                    <div style={{
                      width: '100%', borderRadius: '4px 4px 0 0',
                      height: s.attempts * 12, minHeight: 8,
                      background: i === SESSIONS.length - 1 ? '#0D4A2F' : '#C5DDC9',
                    }} />
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, color: 'rgba(26,16,8,0.35)' }}>{s.date}</div>
                  </div>
                ))}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: '#B83A1E' }}>↓ meta</div>
                  <div style={{ width: '100%', borderRadius: '4px 4px 0 0', height: 4, background: '#FEE2E2' }} />
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, color: '#B83A1E' }}>objetivo</div>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div style={{ padding: '12px', borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(26,16,8,0.08)' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.4)', marginBottom: 8 }}>Última sesión · 05 Jul</div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ label: 'Tiempo', v: '11 min' }, { label: 'Intentos', v: '1' }, { label: 'Ciudad', v: 'Bogotá' }].map(x => (
                  <div key={x.label}>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#0D4A2F' }}>{x.v}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(26,16,8,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{x.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download clinical report */}
            <button
              onClick={() => {
                const patientName = PATIENTS[patient]
                exportClinicalReportPDF({
                  patientName,
                  cityName: 'Bogotá D.C.',
                  correct: 4,
                  attempts: 5,
                  hints: 1,
                  coins: 40,
                  completed: true,
                })
              }}
              style={{
                padding: '10px 14px', borderRadius: 10,
                background: '#0D4A2F', color: '#FDF8EE',
                border: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: '0 2px 8px rgba(13,74,47,0.2)',
              }}
            >
              📄 Descargar reporte para historia clínica (PDF)
            </button>
          </div>
        )}

        {tab === 'sesiones' && (
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.4)', padding: '4px 0' }}>Historial completo</div>
            {SESSIONS.map((s, i) => (
              <div key={i} style={{ borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(26,16,8,0.08)', overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', background: '#0D4A2F', color: '#FDF8EE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 700 }}>Sesión {i + 1} · {s.date}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#F7C94B' }}>Nv. {s.level}</div>
                </div>
                <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {[
                    { label: 'Tiempo', value: s.time, icon: '⏱️' },
                    { label: 'Intentos', value: String(s.attempts), icon: '🔁' },
                    { label: 'Act.', value: `${s.activities}/5`, icon: '✅' },
                  ].map(x => (
                    <div key={x.label} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 8, background: '#F8F4EE' }}>
                      <div style={{ fontSize: 14, marginBottom: 2 }}>{x.icon}</div>
                      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700, color: '#0D4A2F' }}>{x.value}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 8, color: 'rgba(26,16,8,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{x.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '6px 14px 10px' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(26,16,8,0.4)', marginBottom: 4 }}>Energía al finalizar</div>
                  <div style={{ height: 5, borderRadius: 3, background: 'rgba(26,16,8,0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${s.energy}%`, height: '100%', background: 'linear-gradient(to right, #4ADE80, #22C55E)', borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'pacientes' && (
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.4)', padding: '4px 0' }}>Indicadores de mejora</div>
            {[
              { icon: '📈', label: 'Avance por niveles', value: 'Nv. 1 → 3', trend: '+2 niveles', up: true },
              { icon: '⏱️', label: 'Tiempo por actividad', value: '18 → 11 min', trend: '−7 min', up: true },
              { icon: '🔁', label: 'Intentos promedio', value: '4 → 1', trend: '−3 intentos', up: true },
              { icon: '✅', label: 'Act. completadas', value: '15 total', trend: '+5 esta semana', up: true },
            ].map(item => (
              <div key={item.label} style={{
                padding: '12px 14px', borderRadius: 12,
                background: '#FFFFFF', border: '1px solid rgba(26,16,8,0.08)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0F9F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: '#0D4A2F' }}>{item.label}</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700, color: '#1A1008', marginTop: 1 }}>{item.value}</div>
                </div>
                <div style={{
                  padding: '3px 8px', borderRadius: 6,
                  background: item.up ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)',
                  fontFamily: 'DM Mono, monospace', fontSize: 10, fontWeight: 600,
                  color: item.up ? '#16A34A' : '#DC2626',
                }}>{item.trend}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
