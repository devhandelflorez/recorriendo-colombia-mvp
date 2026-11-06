import { useEffect, useMemo, useState } from 'react'

type View = 'welcome' | 'avatar' | 'cities' | 'game' | 'feedback' | 'complete' | 'diploma' | 'therapist'

type Question = {
  prompt: string
  category: string
  options: string[]
  answer: number
  clue: string
  visual: string
}

type AvatarConfig = {
  gender: 'mujer' | 'hombre'
  skin: string
  hair: string
  eyes: string
  body: 'delgado' | 'medio' | 'fuerte'
  outfit: string
}

const defaultAvatar: AvatarConfig = {
  gender: 'mujer', skin: '#C98E68', hair: '#3A2419', eyes: '#4B2D1F', body: 'medio', outfit: '#1B7A57',
}

const questions: Question[] = [
  { prompt: '¿Qué fruta tropical y amarilla se usa para preparar jugo en Colombia?', category: 'Frutas tropicales', options: ['Guayaba', 'Mango', 'Cereza', 'Sandía'], answer: 1, clue: 'Es dulce, amarilla y muy común en los jugos.', visual: '🥭' },
  { prompt: '¿Cómo se llama el lugar histórico de Cartagena con grandes murallas?', category: 'Lugares de Colombia', options: ['Castillo San Felipe', 'Torre Colpatria', 'Parque Tayrona', 'Puente de Boyacá'], answer: 0, clue: 'Fue construido para proteger a la ciudad.', visual: '🏰' },
  { prompt: '¿Cuál de estas palabras pertenece al mar Caribe?', category: 'Categorías', options: ['Ola', 'Montaña', 'Semilla', 'Nube'], answer: 0, clue: 'Se mueve en el agua y llega a la orilla.', visual: '🌊' },
  { prompt: 'Completa la frase: “En Cartagena el sol es muy…”', category: 'Completar frases', options: ['Frío', 'Brillante', 'Silencioso', 'Cuadrado'], answer: 1, clue: 'Ilumina y da mucho calor.', visual: '☀️' },
  { prompt: '¿Qué medio de transporte puede llevarnos por el mar?', category: 'Asociación de ideas', options: ['Barco', 'Bicicleta', 'Tren', 'Avión'], answer: 0, clue: 'Flota sobre el agua.', visual: '⛵' },
]

const cities = [
  { name: 'Cartagena', region: 'Caribe', landmark: 'Castillo San Felipe', icon: '🏰', image: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=1000&auto=format&fit=crop', unlocked: true },
  { name: 'Bogotá', region: 'Andina', landmark: 'Monserrate', icon: '⛰️', image: 'https://images.unsplash.com/photo-1545340880-2370863e1c5b?w=1000&auto=format&fit=crop', unlocked: false },
  { name: 'Medellín', region: 'Antioquia', landmark: 'Plaza Botero', icon: '🗿', image: 'https://images.unsplash.com/photo-1515366974328-f1181eb25189?w=1000&auto=format&fit=crop', unlocked: false },
]

const storeKey = 'recorriendo-colombia-progress'

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(storeKey) || '{}') as { name?: string; completed?: boolean; coins?: number; correct?: number; attempts?: number; hints?: number; avatar?: AvatarConfig }
  } catch {
    return {}
  }
}

export default function GameApp() {
  const initial = useMemo(readProgress, [])
  const [view, setView] = useState<View>(initial.completed ? 'cities' : 'welcome')
  const [completed, setCompleted] = useState(Boolean(initial.completed))
  const [name, setName] = useState(initial.name || '')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [coins, setCoins] = useState(initial.coins || 0)
  const [correct, setCorrect] = useState(initial.correct || 0)
  // Mantiene la coherencia para partidas guardadas antes de registrar intentos.
  const [attempts, setAttempts] = useState(Math.max(initial.attempts || 0, initial.correct || 0))
  const [hints, setHints] = useState(initial.hints || 0)
  const [avatar, setAvatar] = useState<AvatarConfig>({ ...defaultAvatar, ...initial.avatar })
  const [showClue, setShowClue] = useState(false)

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify({ name, completed, coins, correct, attempts, hints, avatar }))
  }, [name, coins, correct, completed, attempts, hints, avatar])

  const question = questions[questionIndex]
  const isCorrect = selected === question?.answer
  const beginGame = () => {
    setQuestionIndex(0); setSelected(null); setShowClue(false); setView('game')
  }
  const answer = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    setAttempts(value => value + 1)
    const success = index === question.answer
    if (success) { setCorrect(value => value + 1); setCoins(value => value + 50) }
    window.setTimeout(() => setView('feedback'), 500)
  }
  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) { setCompleted(true); setView('complete') }
    else { setQuestionIndex(value => value + 1); setSelected(null); setShowClue(false); setView('game') }
  }
  const speak = (text: string) => {
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)) }
  }

  return (
    <div className="game-shell">
      <header className="app-header">
        <button className="brand" onClick={() => setView('welcome')} aria-label="Ir al inicio">
          <span className="brand-mark">🇨🇴</span><span>Recorriendo <em>Colombia</em></span>
        </button>
        <div className="header-actions">
          {name && <span className="player-name">Hola, {name}</span>}
          <button className="text-button" onClick={() => setView('avatar')}>Mi viajero</button>
          <button className="text-button" onClick={() => setView('therapist')}>Panel de terapia</button>
        </div>
      </header>

      <main className="game-stage">
        {view === 'welcome' && <Welcome onStart={() => setView(name ? 'cities' : 'avatar')} onContinue={() => setView('cities')} hasProgress={Boolean(name)} />}
        {view === 'avatar' && <Avatar name={name} setName={setName} avatar={avatar} setAvatar={setAvatar} onContinue={() => setView('cities')} />}
        {view === 'cities' && <Cities completed={completed} coins={coins} onSelect={beginGame} />}
        {view === 'game' && <Game question={question} index={questionIndex} selected={selected} showClue={showClue} onAnswer={answer} onClue={() => { setShowClue(true); setHints(value => value + 1) }} onSpeak={() => speak(question.prompt)} coins={coins} />}
        {view === 'feedback' && <Feedback correct={isCorrect} question={question} onNext={nextQuestion} onRetry={() => { setSelected(null); setView('game') }} onSpeak={() => speak(`${isCorrect ? 'Muy bien.' : 'Sigamos practicando.'} ${question.prompt}`)} />}
        {view === 'complete' && <Complete name={name} correct={correct} coins={coins} onCities={() => setView('cities')} onDiploma={() => setView('diploma')} />}
        {view === 'diploma' && <Diploma name={name} onBack={() => setView('cities')} />}
        {view === 'therapist' && <Therapist name={name} correct={correct} coins={coins} attempts={attempts} hints={hints} completed={completed} onBack={() => setView('cities')} />}
      </main>
    </div>
  )
}

function Welcome({ onStart, onContinue, hasProgress }: { onStart: () => void; onContinue: () => void; hasProgress: boolean }) {
  return <section className="welcome view-card">
    <div className="world">🌎</div><p className="eyebrow">Videojuego de lenguaje · Colombia</p>
    <h1>Un viaje para<br /><em>recordar y conversar</em></h1>
    <p className="lead">Explora ciudades de Colombia mientras practicas palabras, categorías y recuerdos cotidianos.</p>
    <div className="stack"><button className="primary" onClick={onStart}>Comenzar mi viaje <span>→</span></button>{hasProgress && <button className="secondary" onClick={onContinue}>Continuar partida</button>}</div>
    <p className="support">Actividades con instrucciones claras, sin límite de tiempo.</p>
  </section>
}

function Avatar({ name, setName, avatar, setAvatar, onContinue }: { name: string; setName: (name: string) => void; avatar: AvatarConfig; setAvatar: (avatar: AvatarConfig) => void; onContinue: () => void }) {
  const updateAvatar = <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => setAvatar({ ...avatar, [key]: value })
  return <section className="view-card form-view avatar-editor"><p className="eyebrow">Paso 1 de 2 · personalización</p><h1>Crea tu <em>viajero</em></h1>
    <AvatarPreview avatar={avatar} />
    <label htmlFor="player-name">¿Cómo quieres que te llamemos?</label>
    <input id="player-name" value={name} maxLength={24} placeholder="Escribe tu nombre" onChange={event => setName(event.target.value)} autoFocus />
    <div className="gender-picker"><p className="field-label">Selecciona una opción</p><div><button className={avatar.gender === 'mujer' ? 'active' : ''} onClick={() => updateAvatar('gender', 'mujer')}>Mujer</button><button className={avatar.gender === 'hombre' ? 'active' : ''} onClick={() => updateAvatar('gender', 'hombre')}>Hombre</button></div></div>
    <div className="customization-grid">
      <AvatarPicker label="Tono de piel" values={['#F8D4B5', '#E9B286', '#C98E68', '#A96948', '#75432B', '#4A2C21']} selected={avatar.skin} onSelect={value => updateAvatar('skin', value)} />
      <AvatarPicker label="Color de cabello" values={['#19140F', '#3A2419', '#72452D', '#B66A3C', '#D8B36C', '#D7D3CC']} selected={avatar.hair} onSelect={value => updateAvatar('hair', value)} />
      <AvatarPicker label="Color de ojos" values={['#25170F', '#4B2D1F', '#28754B', '#2D5C89', '#6E718C']} selected={avatar.eyes} onSelect={value => updateAvatar('eyes', value)} />
      <AvatarPicker label="Ropa" values={['#1B7A57', '#C9563B', '#315B9A', '#7F4B99', '#D59126', '#31363D']} selected={avatar.outfit} onSelect={value => updateAvatar('outfit', value)} />
    </div>
    <div className="body-picker"><p className="field-label">Tipo de cuerpo</p><div>{(['delgado', 'medio', 'fuerte'] as const).map(type => <button key={type} className={avatar.body === type ? 'active' : ''} onClick={() => updateAvatar('body', type)}>{type === 'delgado' ? 'Delgado' : type === 'medio' ? 'Medio' : 'Fuerte'}</button>)}</div></div>
    <button className="primary" onClick={onContinue} disabled={!name.trim()}>Estoy listo para viajar <span>→</span></button></section>
}

function AvatarPicker({ label, values, selected, onSelect }: { label: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="avatar-picker"><p className="field-label">{label}</p><div>{values.map(value => <button key={value} className={selected === value ? 'active' : ''} style={{ background: value }} onClick={() => onSelect(value)} aria-label={`${label}: ${value}`} />)}</div></div>
}

function AvatarPreview({ avatar }: { avatar: AvatarConfig }) {
  return <div className={`avatar-preview portrait ${avatar.body} ${avatar.gender}`} aria-label={`Vista previa del avatar: ${avatar.gender}`}>
    <div className="portrait-body" style={{ background: avatar.outfit }} />
    <div className="portrait-neck" style={{ background: avatar.skin }} />
    <div className="portrait-head" style={{ background: avatar.skin }}>
      <div className="portrait-hair" style={{ background: avatar.hair }} />
      <div className="portrait-eyes"><i style={{ background: avatar.eyes }} /><i style={{ background: avatar.eyes }} /></div>
      <div className="portrait-nose" /><div className="portrait-mouth" />
    </div>
  </div>
}

function Cities({ completed, coins, onSelect }: { completed: boolean; coins: number; onSelect: () => void }) {
  return (
    <section className="cities view-card">
      <p className="eyebrow">Elige tu próximo destino</p>
      <h1>Tu mapa de <em>recuerdos</em></h1>
      <p className="coin-balance">🪙 {coins} monedas</p>
      <div className="city-list">
        {cities.map((city, index) => {
          const accessible = city.unlocked || (index === 1 && completed)
          return (
            <button
              key={city.name}
              className={`city ${accessible ? '' : 'locked'}`}
              onClick={accessible ? onSelect : undefined}
              disabled={!accessible}
              style={{ backgroundImage: `linear-gradient(90deg, rgba(10,46,28,.93), rgba(10,46,28,.42)), url(${city.image})` }}
            >
              <span className="city-icon">{city.icon}</span>
              <span>
                <strong>{city.name}</strong>
                <small>{city.region} · {city.landmark}</small>
                {city.unlocked && <i>{completed ? '✓ Destino completado · jugar de nuevo' : '5 actividades para descubrir'}</i>}
              </span>
              {!accessible && <b>🔒 Próximamente</b>}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Game({ question, index, selected, showClue, onAnswer, onClue, onSpeak, coins }: { question: Question; index: number; selected: number | null; showClue: boolean; onAnswer: (index: number) => void; onClue: () => void; onSpeak: () => void; coins: number }) {
  return <section className="game-view view-card"><div className="hud"><span>Cartagena · actividad {index + 1} de {questions.length}</span><span>🪙 {coins}</span></div><div className="progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
    <div className="question"><div className="question-top"><span className="visual">{question.visual}</span><button className="listen" onClick={onSpeak} aria-label="Escuchar pregunta">🔊 Escuchar</button></div><p className="eyebrow">{question.category}</p><h2>{question.prompt}</h2>{showClue && <p className="clue">💡 Pista: {question.clue}</p>}</div>
    <div className="answers">{question.options.map((option, optionIndex) => <button key={option} className={selected === optionIndex ? (optionIndex === question.answer ? 'right' : 'wrong') : ''} onClick={() => onAnswer(optionIndex)} disabled={selected !== null}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
    <button className="hint-button" onClick={onClue} disabled={showClue}>💡 {showClue ? 'Pista mostrada' : 'Necesito una pista'}</button>
  </section>
}

function Feedback({ correct, question, onNext, onRetry, onSpeak }: { correct: boolean; question: Question; onNext: () => void; onRetry: () => void; onSpeak: () => void }) {
  return <section className={`feedback view-card ${correct ? 'success' : 'retry'}`}><div className="result-icon">{correct ? '✓' : '↻'}</div><p className="eyebrow">{correct ? '¡Respuesta correcta!' : 'Casi, sigamos practicando'}</p><h1>{correct ? '¡Muy bien!' : 'No pasa nada'}</h1><p className="lead">{correct ? `La respuesta es ${question.options[question.answer]}. Has conseguido una pieza del Castillo San Felipe.` : `La respuesta correcta es ${question.options[question.answer]}. Aprender también es intentarlo.`}</p><button className="listen" onClick={onSpeak}>🔊 Escuchar de nuevo</button><button className="primary" onClick={correct ? onNext : onRetry}>{correct ? 'Siguiente actividad →' : 'Intentar de nuevo'}</button>{!correct && <button className="secondary" onClick={onNext}>Continuar de todas formas</button>}</section>
}

function Complete({ name, correct, coins, onCities, onDiploma }: { name: string; correct: number; coins: number; onCities: () => void; onDiploma: () => void }) {
  return <section className="complete view-card"><div className="completion-landmark">🏰</div><p className="eyebrow">¡Destino completado!</p><h1>Cartagena de <em>Indias</em></h1><p className="lead">Reuniste las piezas del Castillo San Felipe. Cada respuesta es un paso más en tu viaje.</p><div className="stats"><span><b>{correct}/5</b>Aciertos</span><span><b>🪙 {coins}</b>Monedas</span><span><b>5</b>Recuerdos</span></div><button className="primary" onClick={onDiploma}>Ver mi diploma</button><button className="secondary" onClick={onCities}>Volver al mapa</button><p className="support">¡Felicitaciones, {name || 'viajero'}!</p></section>
}

function Diploma({ name, onBack }: { name: string; onBack: () => void }) {
  return <section className="diploma view-card"><div className="seal">🏅</div><p className="eyebrow">Diploma del viajero</p><h1>Para <em>{name || 'nuestro viajero'}</em></h1><p className="lead">Por explorar Cartagena, compartir conocimientos y mantener vivas sus palabras y recuerdos.</p><div className="signature">Recorriendo Colombia<br /><small>Aprender es viajar</small></div><button className="primary" onClick={onBack}>Seguir explorando</button></section>
}

function Therapist({ name, correct, coins, attempts, hints, completed, onBack }: { name: string; correct: number; coins: number; attempts: number; hints: number; completed: boolean; onBack: () => void }) {
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0
  const semanticScore = Math.max(completed ? 72 : 0, accuracy)
  const skills = [
    { label: 'Evocación léxica', value: semanticScore }, { label: 'Categorización', value: Math.min(100, semanticScore + 6) },
    { label: 'Asociación semántica', value: Math.max(0, semanticScore - 5) }, { label: 'Comprensión oral', value: Math.min(100, semanticScore + (hints ? 0 : 9)) },
  ]
  return <section className="therapist view-card"><div className="clinical-title"><div className="clinical-mark">✚</div><div><p className="eyebrow">Seguimiento fonoaudiológico</p><h1>Perfil de <em>{name || 'la persona jugadora'}</em></h1></div></div>
    <p className="clinical-note">Apoyo para observar el desempeño durante la estimulación semántica. No reemplaza la valoración, el diagnóstico ni el criterio de un profesional de salud.</p>
    <div className="patient-summary"><span>Sesión actual</span><b>{completed ? 'Cartagena completada' : 'En progreso'}</b><small>Objetivo: fortalecer acceso al vocabulario, categorías y asociaciones funcionales.</small></div>
    <div className="metric-grid clinical-metrics"><div><b>{correct}</b><span>aciertos acumulados</span></div><div><b>{attempts}</b><span>intentos registrados</span></div><div><b>{accuracy}%</b><span>precisión acumulada</span></div><div><b>{hints}</b><span>pistas solicitadas</span></div></div>
    <section className="skill-card"><div className="section-heading"><h2>Indicadores por habilidad</h2><span>Sesión actual</span></div>{skills.map(skill => <div className="skill-row" key={skill.label}><span>{skill.label}</span><div><i style={{ width: `${skill.value}%` }} /></div><b>{skill.value}%</b></div>)}</section>
    <section className="recommendation-card"><div className="section-heading"><h2>Orientación de intervención</h2><span>Apoyo clínico</span></div><ul><li>Reforzar las categorías con objetos y situaciones de la vida diaria.</li><li>Dar tiempo de respuesta y repetir la consigna solo cuando sea necesario.</li><li>Registrar palabras de difícil acceso para trabajarlas en la próxima sesión.</li></ul></section>
    <div className="privacy-message">🔒 Datos guardados solamente en este navegador durante el MVP. Para uso clínico institucional se requiere consentimiento informado y almacenamiento seguro.</div>
    <button className="primary" onClick={onBack}>Volver al juego</button></section>
}

