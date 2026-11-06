export default function Footer() {
  return (
    <footer style={{
      background: '#0D4A2F',
      color: '#FDF8EE',
      padding: '60px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24, fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}>
            Recorriendo Colombia 🇨🇴
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 14,
            opacity: 0.55, lineHeight: 1.6,
          }}>
            Videojuego de Realidad Virtual para estimulación semántica<br />
            en adultos mayores — Proyecto de Fonoaudiología
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            opacity: 0.45,
          }}>Sprint activo · Scrum</div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 13,
            opacity: 0.6,
          }}>Reuniones cualquier día excepto miércoles</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            opacity: 0.35, marginTop: 8,
          }}>v1.0 — Julio 2026</div>
        </div>
      </div>
    </footer>
  )
}
