import { useState } from 'react'

const SKINS = ['#FDDBB4', '#E8B98A', '#C68642', '#8D5524', '#4A2310']
const REGIONS = ['Andina', 'Caribe', 'Pacífica', 'Orinoquía', 'Amazónica']
const REGION_ICONS = ['🏔️', '🌴', '🌊', '🌾', '🌿']
const ACCESSORIES = ['👒', '🧢', '🎩', '—']

export default function ScreenAvatar() {
  const [name, setName] = useState('Abuela Rosa')
  const [gender, setGender] = useState<'F' | 'M'>('F')
  const [skin, setSkin] = useState(1)
  const [region, setRegion] = useState(0)
  const [acc, setAcc] = useState(0)

  return (
    <div style={{
      height: '100%', background: 'linear-gradient(160deg, #0D4A2F 0%, #194D35 60%, #1A1008 100%)',
      display: 'flex', flexDirection: 'column', color: '#FDF8EE', paddingTop: 28, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 10px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,201,75,0.6)', marginBottom: 4 }}>Paso 1 de 2</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700 }}>Crea tu viajero</div>
      </div>

      {/* Avatar preview */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: SKINS[skin],
            border: '3px solid #F7C94B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 52,
            boxShadow: '0 0 32px rgba(247,201,75,0.25)',
          }}>
            {gender === 'F' ? '👩' : '👨'}
          </div>
          {/* Accessory badge */}
          {ACCESSORIES[acc] !== '—' && (
            <div style={{
              position: 'absolute', top: -10, right: -6,
              fontSize: 22,
            }}>{ACCESSORIES[acc]}</div>
          )}
          {/* Region badge */}
          <div style={{
            position: 'absolute', bottom: -4, right: -8,
            width: 28, height: 28, borderRadius: '50%',
            background: '#F7C94B', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, border: '2px solid #0D4A2F',
          }}>{REGION_ICONS[region]}</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#F7C94B' }}>{name || 'Sin nombre'}</div>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(253,248,238,0.5)' }}>Región {REGIONS[region]}</div>
      </div>

      {/* Controls scroll area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 12px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Name */}
        <Field label="Nombre">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%', padding: '9px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
              color: '#FDF8EE', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13,
              outline: 'none',
            }}
          />
        </Field>

        {/* Gender */}
        <Field label="Género">
          <div style={{ display: 'flex', gap: 8 }}>
            {(['F', 'M'] as const).map(g => (
              <button key={g} onClick={() => setGender(g)} style={{
                flex: 1, padding: '9px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: gender === g ? '#F7C94B' : 'rgba(255,255,255,0.1)',
                color: gender === g ? '#1A1008' : 'rgba(253,248,238,0.65)',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600,
                transition: 'all 0.15s',
              }}>
                {g === 'F' ? '👩 Femenino' : '👨 Masculino'}
              </button>
            ))}
          </div>
        </Field>

        {/* Skin */}
        <Field label="Tono de piel">
          <div style={{ display: 'flex', gap: 10 }}>
            {SKINS.map((t, i) => (
              <button key={i} onClick={() => setSkin(i)} style={{
                width: 34, height: 34, borderRadius: '50%', border: skin === i ? '3px solid #F7C94B' : '2px solid transparent',
                background: t, cursor: 'pointer',
                boxShadow: skin === i ? '0 0 12px rgba(247,201,75,0.5)' : 'none',
                transition: 'all 0.15s',
              }} />
            ))}
          </div>
        </Field>

        {/* Region */}
        <Field label="Región de Colombia">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {REGIONS.map((r, i) => (
              <button key={i} onClick={() => setRegion(i)} style={{
                padding: '6px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: region === i ? '#F7C94B' : 'rgba(255,255,255,0.1)',
                color: region === i ? '#1A1008' : 'rgba(253,248,238,0.7)',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 600,
                transition: 'all 0.15s',
              }}>
                {REGION_ICONS[i]} {r}
              </button>
            ))}
          </div>
        </Field>

        {/* Accessory */}
        <Field label="Accesorio (monedas)">
          <div style={{ display: 'flex', gap: 8 }}>
            {ACCESSORIES.map((a, i) => (
              <button key={i} onClick={() => setAcc(i)} style={{
                width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: acc === i ? '#F7C94B' : 'rgba(255,255,255,0.1)',
                fontSize: 20, transition: 'all 0.15s',
              }}>
                {a}
              </button>
            ))}
          </div>
        </Field>

        <button style={{
          padding: '13px', borderRadius: 12, border: 'none',
          background: '#F7C94B', color: '#1A1008',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(247,201,75,0.3)',
          marginTop: 4,
        }}>
          ¡Listo, a viajar! 🗺️
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,248,238,0.4)', marginBottom: 7 }}>{label}</div>
      {children}
    </div>
  )
}
