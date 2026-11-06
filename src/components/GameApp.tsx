import { useState, useEffect, useMemo, useCallback } from 'react'
import NiceAvatar, { genConfig } from 'react-nice-avatar'
import { exportClinicalReportPDF } from '../utils/pdfGenerator'

type View = 'welcome' | 'avatar' | 'cities' | 'game' | 'feedback' | 'complete' | 'diploma' | 'therapist'

type AvatarConfig = {
  skin: string
  hair: string
  eyes: string      // glasses: 'none' | 'round' | 'square'
  body: string      // shirtStyle: 'polo' | 'short' | 'hoody'
  outfit: string
  gender: 'masculino' | 'femenino'
  hairStyle: string // react-nice-avatar hair types
  facialHair?: 'none' | 'mustache' | 'stubble' | 'beard' | 'goatee'
  faceDetail?: 'glam' | 'blush' | 'earrings' | 'natural'
}

type CityId = 'cartagena' | 'bogota' | 'medellin'

type CityData = {
  id: CityId
  name: string
  region: string
  landmark: string
  icon: string
  image: string
  unlocked: boolean
  welcomeMsg: string
}

type QuestionData = {
  prompt: string
  category: string
  options: string[]
  answer: string
  clue: string
  visual: string
  image: string
}

// =============================================================================
// OPCIONES DE PERSONALIZACIÓN DEL AVATAR
// =============================================================================

const HAIR_OPTIONS_F = [
  { id: 'womanLong',  label: 'Largo liso',      icon: '👩‍🦰' },
  { id: 'womanShort', label: 'Recogido / Bob',  icon: '👩' },
  { id: 'normal',     label: 'Corto femenino',  icon: '👱‍♀️' },
  { id: 'thick',      label: 'Afro / Rizado',   icon: '👩‍🦱' },
] as const

const HAIR_OPTIONS_M = [
  { id: 'normal',    label: 'Corto clásico',   icon: '👦' },
  { id: 'thick',     label: 'Ondulado / Afro', icon: '👨‍🦱' },
  { id: 'mohawk',    label: 'Cresta moderna',  icon: '🤘' },
] as const

const FACIAL_HAIR_OPTIONS = [
  { id: 'mustache', label: 'Bigote paisa', icon: '👨🏻' },
  { id: 'stubble',  label: 'Sombra',       icon: '🧔' },
  { id: 'beard',    label: 'Barba tupida', icon: '🧔‍♂️' },
  { id: 'goatee',   label: 'Candado',      icon: '🧓' },
  { id: 'none',     label: 'Afeitado',     icon: '🪒' },
] as const

const FEMALE_DETAIL_OPTIONS = [
  { id: 'glam',     label: 'Glam (Completo)', icon: '💄' },
  { id: 'blush',    label: 'Rubor sonrosado', icon: '🌸' },
  { id: 'earrings', label: 'Aretes dorados',  icon: '✨' },
  { id: 'natural',  label: 'Al natural',      icon: '🌿' },
] as const

const GLASSES_OPTIONS = [
  { id: 'none',   label: 'Sin gafas', icon: '🚫' },
  { id: 'round',  label: 'Redondas',  icon: '🕶️' },
  { id: 'square', label: 'Cuadradas', icon: '👓' },
] as const

const SHIRT_OPTIONS = [
  { id: 'polo',  label: 'Polo clásica', icon: '👔' },
  { id: 'short', label: 'Camiseta',     icon: '👕' },
  { id: 'hoody', label: 'Sudadera',     icon: '🧥' },
] as const

const defaultAvatar: AvatarConfig = {
  skin: '#C98E68',
  hair: '#3A2419',
  eyes: 'none',
  body: 'polo',
  outfit: '#1B7A57',
  gender: 'femenino',
  hairStyle: 'womanLong',
  facialHair: 'none',
  faceDetail: 'glam',
}

const genderOptions = [
  { value: 'femenino',  label: 'Viajera (Mujer)', emoji: '👩', desc: 'Rasgos femeninos con pestañas y rubor' },
  { value: 'masculino', label: 'Viajero (Hombre)', emoji: '👨', desc: 'Rasgos masculinos con barba o bigote' },
] as const

// =============================================================================
// BANCO DE PREGUNTAS Y RESPUESTAS COHERENTES POR ESCENARIO
// =============================================================================

const CITIES: Record<CityId, { city: CityData; questions: QuestionData[] }> = {
  cartagena: {
    city: {
      id: 'cartagena',
      name: 'Cartagena de Indias',
      region: 'Región Caribe',
      landmark: 'Castillo San Felipe de Barajas',
      icon: '🏰',
      image: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=1000&auto=format&fit=crop',
      unlocked: true,
      welcomeMsg: '¡Tierra de murallas heroicas, brisa de mar y tambores alegres!',
    },
    questions: [
      {
        prompt: '¿Qué fruta tropical y jugosa, de pulpa dulce que a menudo se saborea con sal y limón en las playas de Cartagena, es muy apetecida en jugos?',
        category: 'Frutas y sabores costeños',
        options: ['Mango biche o maduro', 'Fresa de páramo', 'Manzana roja', 'Uva verde'],
        answer: 'Mango biche o maduro',
        clue: 'Es de árbol frondoso, pulpa dorada y se disfruta frío frente al mar.',
        visual: '🥭',
        image: '/images/estaciones/cartagena-mango.jpg',
      },
      {
        prompt: '¿Cómo se llama la imponente fortaleza militar de piedra construida sobre el cerro San Lázaro para defender a Cartagena de los piratas?',
        category: 'Monumentos históricos',
        options: ['Castillo San Felipe de Barajas', 'Torre Colpatria', 'Catedral de Sal de Zipaquirá', 'Monumento a los Lanceros'],
        answer: 'Castillo San Felipe de Barajas',
        clue: 'Sus gruesas murallas de roca y laberintos subterráneos resguardaban la bahía.',
        visual: '🏰',
        image: '/images/estaciones/cartagena-castillo.jpg',
      },
      {
        prompt: '¿Cómo se llaman las ondulaciones de agua marina que viajan impulsadas por la brisa y revientan con espuma blanca en las playas de Bocagrande?',
        category: 'Naturaleza del Caribe',
        options: ['Olas del mar', 'Arroyos de cordillera', 'Ríos de deshielo', 'Cataratas de nieve'],
        answer: 'Olas del mar',
        clue: 'Van y vienen sin parar, arrullan la orilla y mojan la arena dorada.',
        visual: '🌊',
        image: '/images/estaciones/cartagena-ola.jpg',
      },
      {
        prompt: '¿Cuál es la fritura tradicional cartagenera preparada con masa de maíz amarillo, rellena con un huevo entero y dorada en aceite caliente?',
        category: 'Cocina típica cartagenera',
        options: ['Arepa de huevo', 'Tamal tolimense', 'Pan de bono', 'Pandeyuca caliente'],
        answer: 'Arepa de huevo',
        clue: 'Se abre con destreza para introducir el huevo crudo antes de terminar de freírla.',
        visual: '🍳',
        image: '/images/estaciones/cartagena-arepa.jpg',
      },
      {
        prompt: '¿Cómo se les conoce a las alegres mujeres afrocolombianas que visten trajes multicolores y llevan palanganas con frutas frescas en la cabeza?',
        category: 'Cultura y personajes',
        options: ['Palenqueras', 'Silleteras', 'Chulavitas', 'Hilanderas de lana'],
        answer: 'Palenqueras',
        clue: 'Son símbolo de libertad, orgullo y alegría en el centro amurallado de Cartagena.',
        visual: '🍉',
        image: '/images/estaciones/cartagena-palenquera.jpg',
      },
    ],
  },
  bogota: {
    city: {
      id: 'bogota',
      name: 'Bogotá, Sabana',
      region: 'Región Andina',
      landmark: 'Santuario del Cerro de Monserrate',
      icon: '⛰️',
      image: '/images/estaciones/bogota-monserrate.jpg',
      unlocked: true,
      welcomeMsg: '¡La capital de los cerros orientales, la llovizna suave y el chocolate caliente!',
    },
    questions: [
      {
        prompt: '¿Qué emblemático cerro tutelar se alza sobre los cerros orientales de Bogotá, al cual se puede subir en funicular o teleférico para visitar su santuario?',
        category: 'Geografía y fe',
        options: ['Cerro de Monserrate', 'Piedra del Peñol', 'Nevado del Huila', 'Volcán Galeras'],
        answer: 'Cerro de Monserrate',
        clue: 'Tiene una iglesia blanca en la cumbre desde donde se divisa toda la sabana.',
        visual: '⛰️',
        image: '/images/estaciones/bogota-monserrate.jpg',
      },
      {
        prompt: '¿Cuál es la sopa típica santafereña preparada con pechuga desmechada, tres clases de papa, mazorca tierna y el aroma campestre de las guascas?',
        category: 'Cocina santafereña',
        options: ['Ajiaco santafereño', 'Mote de queso costeño', 'Bandeja paisa', 'Ceviche de camarón'],
        answer: 'Ajiaco santafereño',
        clue: 'Se sirve con crema de leche fresca, alcaparras y una buena tajada de aguacate.',
        visual: '🍲',
        image: '/images/estaciones/bogota-ajiaco.jpg',
      },
      {
        prompt: '¿En qué reconocido museo del centro de Bogotá se exhibe la colección de orfebrería indígena y piezas doradas prehispánicas más grande del mundo?',
        category: 'Patrimonio y orfebrería',
        options: ['Museo del Oro', 'Museo de Cera', 'Planetario Marino', 'Acuario Nacional'],
        answer: 'Museo del Oro',
        clue: 'Allí resplandece la mítica Balsa Muisca que inspiró la leyenda dorada.',
        visual: '✨',
        image: '/images/estaciones/bogota-museo-oro.jpg',
      },
      {
        prompt: 'Si en la sabana de Bogotá el día amanece frío, nublado y con llovizna, ¿qué prenda tradicional de lana virgen es perfecta para abrigar el pecho y los hombros?',
        category: 'Prendas tradicionales',
        options: ['Ruana de lana', 'Vestido de baño', 'Camisilla playera', 'Bermuda de lino'],
        answer: 'Ruana de lana',
        clue: 'Prenda campesina de cuatro puntas que abriga con el calor de la tierra andina.',
        visual: '🧣',
        image: '/images/estaciones/bogota-ruana.jpg',
      },
      {
        prompt: '¿Cómo se llama la plaza mayor de Bogotá donde se reúnen la Catedral Primada, el Congreso de la República y el Palacio de Justicia rodeados de palomas?',
        category: 'Centro histórico',
        options: ['Plaza de Bolívar', 'Plaza de las Esculturas', 'Plaza Mayor de Villa de Leyva', 'Parque de los Novios'],
        answer: 'Plaza de Bolívar',
        clue: 'Lleva el nombre del Libertador Simón Bolívar, cuya estatua de bronce preside el centro.',
        visual: '🏛️',
        image: '/images/estaciones/bogota-plaza-bolivar.jpg',
      },
    ],
  },
  medellin: {
    city: {
      id: 'medellin',
      name: 'Medellín, Antioquia',
      region: 'Valle de Aburrá',
      landmark: 'Plaza Botero y Pueblito Paisa',
      icon: '🌺',
      image: 'https://images.unsplash.com/photo-1515366974328-f1181eb25189?w=1000&auto=format&fit=crop',
      unlocked: true,
      welcomeMsg: '¡La ciudad de la eterna primavera, el aroma a café y los silleteros!',
    },
    questions: [
      {
        prompt: '¿Qué tradicional fiesta de Medellín rinde homenaje a los campesinos de Santa Elena que desfilan cargando monumentales arreglos de flores en su espalda?',
        category: 'Fiestas y tradiciones paisas',
        options: ['Feria de las Flores', 'Festival de la Leyenda Vallenata', 'Carnaval de Riosucio', 'Feria de Manizales'],
        answer: 'Feria de las Flores',
        clue: 'El Desfile de Silleteros llena las calles de claveles, orquídeas y girasoles.',
        visual: '💐',
        image: '/images/estaciones/medellin-feria-flores.jpg',
      },
      {
        prompt: '¿Quién fue el ilustre pintor y escultor antioqueño cuyas monumentales y robustas figuras de bronce engalanan la famosa plaza del centro de Medellín?',
        category: 'Arte y memoria',
        options: ['Fernando Botero', 'Gabriel García Márquez', 'Rafael Pombo', 'Jorge Isaacs'],
        answer: 'Fernando Botero',
        clue: 'Sus esculturas son reconocidas en el mundo entero por sus formas voluminosas y generosas.',
        visual: '🗿',
        image: '/images/estaciones/medellin-botero.jpg',
      },
      {
        prompt: '¿Qué innovador sistema de transporte por cabinas aéreas conectadas al metro permite a los viajeros sobrevolar las empinadas colinas y montañas de Medellín?',
        category: 'Transporte e innovación',
        options: ['Metrocable', 'Lancha de motor', 'Ferry fluvial', 'Tranvía subterráneo'],
        answer: 'Metrocable',
        clue: 'Va suspendido por cables aéreos y ofrece una hermosa panorámica de todo el valle.',
        visual: '🚡',
        image: '/images/estaciones/medellin-metrocable.jpg',
      },
      {
        prompt: '¿Cómo se llama el plato insignia de la gastronomía antioqueña servido con frijoles cargamanto, arroz blanco, chicharrón crocante, carne molida, huevo frito y arepa?',
        category: 'Gastronomía paisa',
        options: ['Bandeja paisa', 'Lechona tolimense', 'Arroz atollado valluno', 'Caldo de costilla'],
        answer: 'Bandeja paisa',
        clue: 'Se acompaña con tajada de plátano maduro, aguacate fresco y un vaso de mazamorra con leche.',
        visual: '🍛',
        image: '/images/estaciones/medellin-bandeja-paisa.jpg',
      },
      {
        prompt: '¿Qué bolso artesanal de cuero con múltiples bolsillos secretos es el símbolo de identidad inseparable del arriero campesino antioqueño?',
        category: 'Identidad y artesanía',
        options: ['Carriel jericoano', 'Mochila arhuaca', 'Maletín ejecutivo', 'Cesto de mimbre'],
        answer: 'Carriel jericoano',
        clue: 'Se fabrica en Jericó con cuero curtido y tiene compartimentos ocultos para llevar recuerdos.',
        visual: '👜',
        image: '/images/estaciones/arrieros-recuca.jpg',
      },
    ],
  },
}

// =============================================================================
// UTILIDADES: AUDIO FEEDBACK, BARAJADO Y PERSISTENCIA
// =============================================================================

function shuffleArray<T>(items: T[]): T[] {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function playAudioFeedback(type: 'success' | 'retry' | 'click') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.1)
        gain.gain.setValueAtTime(0.16, now + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.38)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.1)
        osc.stop(now + idx * 0.1 + 0.4)
      })
    } else if (type === 'retry') {
      const freqs = [392.0, 329.63]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.12)
        gain.gain.setValueAtTime(0.12, now + idx * 0.12)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.28)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.12)
        osc.stop(now + idx * 0.12 + 0.32)
      })
    } else if (type === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
    }
  } catch {}
}

const storeKey = 'recorriendo-colombia-progress'
const themeStoreKey = 'recorriendo-colombia-theme'
const voiceStoreKey = 'recorriendo-colombia-voice-uri'
const voiceSpeedStoreKey = 'recorriendo-colombia-voice-speed'

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(storeKey) || '{}') as {
      name?: string
      completed?: boolean
      coins?: number
      correct?: number
      attempts?: number
      hints?: number
      avatar?: AvatarConfig
      selectedCity?: CityId
    }
  } catch {
    return {}
  }
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export default function GameApp() {
  const initial = useMemo(readProgress, [])

  // Tema (Light / Dark) persistente
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem(themeStoreKey) as 'light' | 'dark') || 'light'
    } catch {
      return 'light'
    }
  })

  const toggleTheme = () => {
    playAudioFeedback('click')
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(themeStoreKey, next)
      } catch {}
      return next
    })
  }

  // ===========================================================================
  // SISTEMA ROBUSTO DE VOCES DEL SISTEMA
  // ===========================================================================
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(() => {
    try {
      return localStorage.getItem(voiceStoreKey) || ''
    } catch {
      return ''
    }
  })
  const [voiceSpeed, setVoiceSpeed] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(voiceSpeedStoreKey)
      return saved ? parseFloat(saved) : 0.88
    } catch {
      return 0.88
    }
  })
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)

  // Carga asíncrona y fiable de voces en el navegador
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices()
      // Filtramos las voces en español disponibles
      const spanish = all.filter(v => v.lang.toLowerCase().startsWith('es'))
      const list = spanish.length > 0 ? spanish : all
      setAvailableVoices(list)

      // Auto-selección inteligente de la voz de mayor calidad en español si no se ha elegido una
      setSelectedVoiceURI(current => {
        if (current && list.some(v => v.voiceURI === current)) return current

        // Priorizamos voces colombianas, latinoamericanas o naturales
        const best =
          list.find(v => v.lang.toLowerCase().includes('es-co')) ||
          list.find(v => v.lang.toLowerCase().includes('es-419')) ||
          list.find(v => v.lang.toLowerCase().includes('es-mx')) ||
          list.find(v => v.name.toLowerCase().includes('natural')) ||
          list.find(v => v.name.toLowerCase().includes('sabina') || v.name.toLowerCase().includes('helena')) ||
          list.find(v => v.lang.toLowerCase().startsWith('es')) ||
          list[0]

        const uri = best ? best.voiceURI : ''
        try {
          if (uri) localStorage.setItem(voiceStoreKey, uri)
        } catch {}
        return uri
      })
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  // Cambiar voz elegida
  const handleSelectVoice = (uri: string) => {
    setSelectedVoiceURI(uri)
    try {
      localStorage.setItem(voiceStoreKey, uri)
    } catch {}
  }

  // Cambiar velocidad de voz
  const handleSelectSpeed = (speed: number) => {
    setVoiceSpeed(speed)
    try {
      localStorage.setItem(voiceSpeedStoreKey, speed.toString())
    } catch {}
  }

  // Locución por voz natural con detección y control de estado
  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

      // Si ya está hablando, detener para que el usuario pueda pausar
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        return
      }

      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = voiceSpeed
      utterance.pitch = 1.0

      // Aplicar la voz seleccionada
      const chosen =
        availableVoices.find(v => v.voiceURI === selectedVoiceURI) ||
        availableVoices.find(v => v.lang.toLowerCase().startsWith('es')) ||
        null

      if (chosen) {
        utterance.voice = chosen
        utterance.lang = chosen.lang
      } else {
        utterance.lang = 'es-CO'
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    },
    [availableVoices, selectedVoiceURI, voiceSpeed]
  )

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // ===========================================================================
  // ESTADOS DEL JUEGO
  // ===========================================================================
  const [view, setView] = useState<View>('welcome')
  const [completed, setCompleted] = useState(Boolean(initial.completed))
  const [name, setName] = useState(initial.name || '')
  const [currentCityId, setCurrentCityId] = useState<CityId>(initial.selectedCity || 'cartagena')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const [roundScore, setRoundScore] = useState(0)
  const [coins, setCoins] = useState(initial.coins || 0)
  const [correct, setCorrect] = useState(initial.correct || 0)
  const [attempts, setAttempts] = useState(Math.max(initial.attempts || 0, initial.correct || 0))
  const [hints, setHints] = useState(initial.hints || 0)
  const [avatar, setAvatar] = useState<AvatarConfig>({ ...defaultAvatar, ...initial.avatar })
  const [showClue, setShowClue] = useState(false)

  const cityData = CITIES[currentCityId] || CITIES.cartagena
  const rawQuestion = cityData.questions[questionIndex] || cityData.questions[0]
  const [shuffledOptions, setShuffledOptions] = useState<string[]>(() => shuffleArray(rawQuestion.options))

  useEffect(() => {
    if (rawQuestion) {
      setShuffledOptions(shuffleArray(rawQuestion.options))
      setSelectedOption(null)
      setShowClue(false)
      stopSpeaking()
    }
  }, [questionIndex, currentCityId])

  useEffect(() => {
    try {
      localStorage.setItem(
        storeKey,
        JSON.stringify({
          name,
          completed,
          coins,
          correct,
          attempts,
          hints,
          avatar,
          selectedCity: currentCityId,
        })
      )
    } catch {}
  }, [name, coins, correct, completed, attempts, hints, avatar, currentCityId])

  const handleStartNewJourney = () => {
    playAudioFeedback('click')
    stopSpeaking()

    // Respaldo de la sesión anterior en el historial clínico local antes de reiniciar
    if (name || attempts > 0) {
      try {
        const historyKey = 'recorriendo-colombia-clinical-history'
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]')
        existingHistory.unshift({
          name: name || 'Participante previo',
          date: new Date().toISOString(),
          coins,
          correct,
          attempts,
          hints,
          completed,
          selectedCity: currentCityId,
        })
        localStorage.setItem(historyKey, JSON.stringify(existingHistory.slice(0, 10)))
      } catch {}
    }

    // Reiniciar estado completo a partida nueva desde cero
    setName('')
    setAvatar({ ...defaultAvatar })
    setCoins(0)
    setCorrect(0)
    setAttempts(0)
    setHints(0)
    setCompleted(false)
    setCurrentCityId('cartagena')
    setQuestionIndex(0)
    setRoundScore(0)
    setSelectedOption(null)
    setShowClue(false)

    try {
      localStorage.removeItem(storeKey)
    } catch {}

    // Redirigir a crear avatar e iniciar todo nuevamente
    setView('avatar')
  }

  const handleContinueJourney = () => {
    playAudioFeedback('click')
    stopSpeaking()
    // Conserva los datos guardados del usuario anterior y continúa el viaje
    setView('cities')
  }

  const selectCityAndStart = (cityId: CityId) => {
    playAudioFeedback('click')
    setCurrentCityId(cityId)
    setQuestionIndex(0)
    setRoundScore(0)
    setSelectedOption(null)
    setShowClue(false)
    stopSpeaking()
    setView('game')
  }

  const isCorrect = selectedOption === rawQuestion.answer

  const handleAnswer = (optionText: string) => {
    if (selectedOption !== null) return
    setSelectedOption(optionText)
    setAttempts(v => v + 1)

    const win = optionText === rawQuestion.answer
    if (win) {
      playAudioFeedback('success')
      setCorrect(v => v + 1)
      setRoundScore(v => v + 1)
      setCoins(v => v + 50)
    } else {
      playAudioFeedback('retry')
    }

    window.setTimeout(() => {
      stopSpeaking()
      setView('feedback')
    }, 650)
  }

  const handleRetry = () => {
    playAudioFeedback('click')
    setShuffledOptions(shuffleArray(rawQuestion.options))
    setSelectedOption(null)
    stopSpeaking()
    setView('game')
  }

  const nextQuestion = () => {
    playAudioFeedback('click')
    stopSpeaking()
    if (questionIndex >= cityData.questions.length - 1) {
      setCompleted(true)
      setView('complete')
    } else {
      setQuestionIndex(v => v + 1)
      setSelectedOption(null)
      setShowClue(false)
      setView('game')
    }
  }

  return (
    <div className={`game-shell theme-${theme}`} data-theme={theme}>
      <header className="app-header">
        <button
          className="brand"
          onClick={() => {
            playAudioFeedback('click')
            stopSpeaking()
            setView('welcome')
          }}
          aria-label="Ir al inicio de Recorriendo Colombia"
        >
          <span className="brand-mark">🇨🇴</span>
          <span>Recorriendo <em>Colombia</em></span>
        </button>

        <div className="header-actions">
          {name && (
            <span className="player-name">
              <span>🎒</span> {name}
            </span>
          )}

          <button
            className="text-button"
            onClick={() => {
              playAudioFeedback('click')
              stopSpeaking()
              setView('avatar')
            }}
          >
            Mi viajero
          </button>

          <button
            className="text-button"
            onClick={() => {
              playAudioFeedback('click')
              setShowVoiceModal(true)
            }}
            title="Configurar voz del narrador"
          >
            🎙️ Voz del guía
          </button>

          <button
            className="text-button"
            onClick={() => {
              playAudioFeedback('click')
              stopSpeaking()
              setView('therapist')
            }}
          >
            Panel clínico
          </button>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="game-stage">
        {view === 'welcome' && (
          <Welcome
            onStart={handleStartNewJourney}
            onContinue={handleContinueJourney}
            hasProgress={Boolean(name || attempts > 0 || coins > 0)}
            savedName={name}
            savedCoins={coins}
            savedCorrect={correct}
          />
        )}

        {view === 'avatar' && (
          <Avatar
            name={name}
            setName={setName}
            avatar={avatar}
            setAvatar={setAvatar}
            onContinue={() => {
              playAudioFeedback('click')
              setView('cities')
            }}
          />
        )}

        {view === 'cities' && (
          <Cities
            coins={coins}
            onSelect={selectCityAndStart}
          />
        )}

        {view === 'game' && (
          <Game
            city={cityData.city}
            question={rawQuestion}
            options={shuffledOptions}
            index={questionIndex}
            totalQuestions={cityData.questions.length}
            selected={selectedOption}
            showClue={showClue}
            isSpeaking={isSpeaking}
            onAnswer={handleAnswer}
            onClue={() => {
              playAudioFeedback('click')
              setShowClue(true)
              setHints(v => v + 1)
            }}
            onSpeak={() => speak(rawQuestion.prompt)}
            onOpenVoiceSettings={() => setShowVoiceModal(true)}
            coins={coins}
          />
        )}

        {view === 'feedback' && (
          <Feedback
            correct={isCorrect}
            question={rawQuestion}
            isSpeaking={isSpeaking}
            onNext={nextQuestion}
            onRetry={handleRetry}
            onSpeak={() =>
              speak(
                `${isCorrect ? '¡Qué bien hecho!' : 'Vamos con calma, cada intento es valioso.'} ${rawQuestion.prompt}. La respuesta correcta es: ${rawQuestion.answer}`
              )
            }
          />
        )}

        {view === 'complete' && (
          <Complete
            name={name}
            cityName={cityData.city.name}
            landmark={cityData.city.landmark}
            correct={roundScore}
            coins={coins}
            onCities={() => {
              playAudioFeedback('click')
              setView('cities')
            }}
            onDiploma={() => {
              playAudioFeedback('click')
              setView('diploma')
            }}
          />
        )}

        {view === 'diploma' && (
          <Diploma
            name={name}
            cityName={cityData.city.name}
            onBack={() => {
              playAudioFeedback('click')
              setView('cities')
            }}
          />
        )}

        {view === 'therapist' && (
          <Therapist
            name={name}
            correct={correct}
            coins={coins}
            attempts={attempts}
            hints={hints}
            completed={completed}
            cityName={cityData.city.name}
            onBack={() => {
              playAudioFeedback('click')
              setView('cities')
            }}
          />
        )}
      </main>

      {/* Modal de Configuración de Voz */}
      {showVoiceModal && (
        <VoiceSettingsModal
          voices={availableVoices}
          selectedVoiceURI={selectedVoiceURI}
          voiceSpeed={voiceSpeed}
          onSelectVoice={handleSelectVoice}
          onSelectSpeed={handleSelectSpeed}
          onClose={() => setShowVoiceModal(false)}
          onTest={() => speak('¡Hola! Soy tu guía de viaje. Juntos recorreremos las hermosas tierras de Colombia.')}
        />
      )}
    </div>
  )
}

// =============================================================================
// MODAL DE AJUSTES DE VOZ DEL GUÍA
// =============================================================================

function VoiceSettingsModal({
  voices,
  selectedVoiceURI,
  voiceSpeed,
  onSelectVoice,
  onSelectSpeed,
  onClose,
  onTest,
}: {
  voices: SpeechSynthesisVoice[]
  selectedVoiceURI: string
  voiceSpeed: number
  onSelectVoice: (uri: string) => void
  onSelectSpeed: (speed: number) => void
  onClose: () => void
  onTest: () => void
}) {
  return (
    <div className="voice-modal-backdrop" onClick={onClose}>
      <div className="voice-modal" onClick={e => e.stopPropagation()}>
        <div className="voice-modal-header">
          <h3>🎙️ Voz del Guía de Viaje</h3>
          <button className="voice-modal-close" onClick={onClose} aria-label="Cerrar ventana">
            ✕
          </button>
        </div>

        <p className="lead" style={{ fontSize: '14.5px', marginBottom: '18px' }}>
          Elige la voz que te resulte más clara y agradable para leer las preguntas y pistas durante tu recorrido.
        </p>

        <div className="voice-setting-group">
          <label htmlFor="voice-select">Voz en español detectada:</label>
          <select
            id="voice-select"
            className="voice-select"
            value={selectedVoiceURI}
            onChange={e => onSelectVoice(e.target.value)}
          >
            {voices.map(v => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="voice-setting-group">
          <label>Ritmo de lectura:</label>
          <div className="speed-buttons">
            <button
              type="button"
              className={`speed-btn ${voiceSpeed < 0.95 ? 'active' : ''}`}
              onClick={() => onSelectSpeed(0.85)}
            >
              🐢 Pausado (0.85x)
            </button>
            <button
              type="button"
              className={`speed-btn ${voiceSpeed >= 0.95 ? 'active' : ''}`}
              onClick={() => onSelectSpeed(1.0)}
            >
              ⚡ Normal (1.0x)
            </button>
          </div>
        </div>

        <div className="voice-test-row">
          <button className="secondary" style={{ flex: 1 }} onClick={onTest}>
            ▶️ Probar esta voz
          </button>
          <button className="primary" style={{ flex: 1 }} onClick={onClose}>
            Guardar y volver
          </button>
        </div>
      </div>
    </div>
  )
}

function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <span className="theme-toggle-thumb">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span className="theme-toggle-label">{theme === 'dark' ? 'Noche' : 'Día'}</span>
    </button>
  )
}

function Welcome({
  onStart,
  onContinue,
  hasProgress,
  savedName,
  savedCoins = 0,
  savedCorrect = 0,
}: {
  onStart: () => void
  onContinue: () => void
  hasProgress: boolean
  savedName?: string
  savedCoins?: number
  savedCorrect?: number
}) {
  return (
    <section className="welcome view-card">
      <div className="world">🌎</div>
      <p className="eyebrow">🇨🇴 Estimulación cognitiva y del lenguaje</p>
      <h1>
        Un viaje para<br />
        <em>recordar, sonreír y conversar</em>
      </h1>
      <p className="lead">
        Recorramos juntos los rincones más queridos de nuestra Colombia. Jugaremos con palabras, costumbres y recuerdos que llenan el corazón.
      </p>

      {hasProgress && savedName && (
        <div className="saved-session-badge">
          <div className="saved-session-icon">🎒</div>
          <div className="saved-session-info">
            <span className="saved-session-label">Partida guardada detectada</span>
            <strong className="saved-session-name">{savedName}</strong>
            <span className="saved-session-stats">
              🪙 {savedCoins} monedas conseguidas · 🎯 {savedCorrect} aciertos
            </span>
          </div>
        </div>
      )}

      <div className="stack">
        <button className="primary" onClick={onStart}>
          🗺️ Comenzar un nuevo recorrido
        </button>
        {hasProgress && (
          <button className="secondary" onClick={onContinue}>
            ⏩ Continuar donde iba {savedName ? `(${savedName})` : ''}
          </button>
        )}
      </div>
      <p className="support">
        Tómate todo el tiempo que desees. Aquí viajamos con calma, sin afanes ni límites de reloj.
      </p>
    </section>
  )
}

function AvatarFaceOverlay({
  gender,
  facialHair = 'none',
  faceDetail = 'glam',
  hairColor,
}: {
  gender: 'masculino' | 'femenino'
  facialHair?: string
  faceDetail?: string
  hairColor: string
}) {
  if (gender === 'femenino') {
    const showBlush = faceDetail === 'blush' || faceDetail === 'glam'
    const showEarrings = faceDetail === 'earrings' || faceDetail === 'glam'
    const showLipstick = faceDetail === 'glam'

    return (
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 168 168"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="fem-blush-l" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4F70" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#FF4F70" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF4F70" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fem-blush-r" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4F70" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#FF4F70" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF4F70" stopOpacity="0" />
          </radialGradient>
        </defs>

        {showBlush && (
          <g className="avatar-blush">
            <circle cx="68" cy="98" r="14" fill="url(#fem-blush-l)" />
            <circle cx="120" cy="92" r="14" fill="url(#fem-blush-r)" />
          </g>
        )}

        {showEarrings && (
          <g className="avatar-earring">
            <circle cx="44" cy="85" r="4.5" fill="#F7C94B" stroke="#B8860B" strokeWidth="1" />
            <circle cx="43" cy="83.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="44" cy="92" r="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          </g>
        )}

        {showLipstick && (
          <path
            d="M85 107 Q97 115 108 105"
            fill="none"
            stroke="#E63956"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        )}
      </svg>
    )
  }

  const color = hairColor || '#19140F'
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 168 168"
      aria-hidden="true"
    >
      {facialHair === 'stubble' && (
        <g>
          <path
            d="M60 94 C56 108, 63 125, 78 132 C92 136, 110 133, 122 122 C126 116, 126 106, 126 96 C123 105, 117 116, 107 123 C93 128, 77 125, 70 114 C65 106, 62 99, 60 94 Z"
            fill={color}
            opacity="0.32"
          />
          <path
            d="M78 104 C84 101, 92 102, 95 105 C98 102, 106 101, 114 103 C116 105, 115 108, 112 109 C105 109, 99 107, 96 109 C94 107, 87 109, 80 109 C76 108, 75 105, 78 104 Z"
            fill={color}
            opacity="0.35"
          />
        </g>
      )}

      {facialHair === 'beard' && (
        <g>
          <path
            d="M59 92 C55 110, 62 128, 78 135 C93 139, 111 136, 123 124 C128 118, 128 107, 128 95 C125 105, 118 120, 108 127 C93 132, 77 128, 69 116 C63 108, 60 99, 59 92 Z"
            fill={color}
            opacity="0.9"
            stroke="#171921"
            strokeWidth="1.2"
          />
          <path
            d="M78 103 C84 100, 92 101, 95 104 C98 101, 106 100, 114 102 C116 104, 115 107.5, 112 108.5 C105 108.5, 99 106.5, 96 108.5 C94 106.5, 87 108.5, 80 108.5 C76 107.5, 75 104, 78 103 Z"
            fill={color}
            stroke="#171921"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      )}

      {facialHair === 'mustache' && (
        <path
          d="M78 103 C84 100, 92 101, 95 104 C98 101, 106 100, 114 102 C116 104, 115 107.5, 112 108.5 C105 108.5, 99 106.5, 96 108.5 C94 106.5, 87 108.5, 80 108.5 C76 107.5, 75 104, 78 103 Z"
          fill={color}
          stroke="#171921"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      )}

      {facialHair === 'goatee' && (
        <g>
          <path
            d="M78 103 C84 100, 92 101, 95 104 C98 101, 106 100, 114 102 C116 104, 115 107.5, 112 108.5 C105 108.5, 99 106.5, 96 108.5 C94 106.5, 87 108.5, 80 108.5 C76 107.5, 75 104, 78 103 Z"
            fill={color}
            stroke="#171921"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M87 113 C91 113, 94 114, 95 116 C96 114, 99 113, 103 113 C106 117, 105 127, 95 130 C85 127, 84 117, 87 113 Z"
            fill={color}
            stroke="#171921"
            strokeWidth="1.2"
          />
        </g>
      )}
    </svg>
  )
}

function Avatar({
  name,
  setName,
  avatar,
  setAvatar,
  onContinue,
}: {
  name: string
  setName: (name: string) => void
  avatar: AvatarConfig
  setAvatar: (avatar: AvatarConfig) => void
  onContinue: () => void
}) {
  const set = <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => {
    playAudioFeedback('click')
    setAvatar({ ...avatar, [key]: value })
  }

  const handleGender = (g: 'masculino' | 'femenino') => {
    playAudioFeedback('click')
    if (g === 'femenino') {
      setAvatar({
        ...avatar,
        gender: 'femenino',
        hairStyle: 'womanLong',
        faceDetail: avatar.faceDetail || 'glam',
        facialHair: 'none',
      })
    } else {
      setAvatar({
        ...avatar,
        gender: 'masculino',
        hairStyle: 'normal',
        facialHair: avatar.facialHair && avatar.facialHair !== 'none' ? avatar.facialHair : 'mustache',
        faceDetail: 'natural',
      })
    }
  }

  const hairOptions = avatar.gender === 'femenino' ? HAIR_OPTIONS_F : HAIR_OPTIONS_M

  return (
    <section className="view-card form-view avatar-editor">
      <p className="eyebrow">Tu compañero de ruta</p>
      <h1>Diseña a tu <em>viajero</em></h1>

      <AvatarPreview avatar={avatar} />

      <label htmlFor="player-name">¿Cómo te gustaría que te llamemos con cariño?</label>
      <input
        id="player-name"
        value={name}
        maxLength={24}
        placeholder="Escribe tu nombre o apodo aquí..."
        onChange={e => setName(e.target.value)}
        autoFocus
      />

      <div className="avatar-section-picker">
        <p className="field-label">¿Quién viaja hoy contigo?</p>
        <div className="avatar-pills gender-pills">
          {genderOptions.map(o => (
            <button
              key={o.value}
              type="button"
              className={`avatar-pill gender-pill${avatar.gender === o.value ? ' active' : ''}`}
              onClick={() => handleGender(o.value as any)}
            >
              <span className="pill-icon" style={{ fontSize: 36 }}>{o.emoji}</span>
              <span className="pill-label">{o.label}</span>
              <span className="pill-desc">{o.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {avatar.gender === 'masculino' && (
        <div className="avatar-section-picker">
          <p className="field-label">Vello facial tradicional (Barba y Bigote)</p>
          <div className="avatar-pills">
            {FACIAL_HAIR_OPTIONS.map(o => (
              <button
                key={o.id}
                type="button"
                className={`avatar-pill${(avatar.facialHair || 'mustache') === o.id ? ' active' : ''}`}
                onClick={() => set('facialHair', o.id)}
              >
                <span className="pill-icon">{o.icon}</span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {avatar.gender === 'femenino' && (
        <div className="avatar-section-picker">
          <p className="field-label">Detalles de rostro y Maquillaje</p>
          <div className="avatar-pills">
            {FEMALE_DETAIL_OPTIONS.map(o => (
              <button
                key={o.id}
                type="button"
                className={`avatar-pill${(avatar.faceDetail || 'glam') === o.id ? ' active' : ''}`}
                onClick={() => set('faceDetail', o.id)}
              >
                <span className="pill-icon">{o.icon}</span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="avatar-section-picker">
        <p className="field-label">Peinado del personaje</p>
        <div className="avatar-pills">
          {hairOptions.map(o => (
            <button
              key={o.id}
              type="button"
              className={`avatar-pill${avatar.hairStyle === o.id ? ' active' : ''}`}
              onClick={() => set('hairStyle', o.id)}
            >
              <span className="pill-icon">{o.icon}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="customization-grid">
        <AvatarPicker
          label="Tono de piel"
          values={['#FDDBB4', '#E8B98A', '#C98E68', '#A96948', '#75432B', '#4A2C21']}
          selected={avatar.skin}
          onSelect={v => set('skin', v)}
        />
        <AvatarPicker
          label="Cabello"
          values={['#19140F', '#3A2419', '#72452D', '#B66A3C', '#D8B36C', '#D7D3CC', '#E35D6A', '#56A3E6']}
          selected={avatar.hair}
          onSelect={v => set('hair', v)}
        />
        <AvatarPicker
          label="Vestimenta"
          values={['#1B7A57', '#C9563B', '#315B9A', '#7F4B99', '#D59126', '#31363D']}
          selected={avatar.outfit}
          onSelect={v => set('outfit', v)}
        />
      </div>

      <div className="avatar-section-picker">
        <p className="field-label">Estilo de ropa</p>
        <div className="avatar-pills">
          {SHIRT_OPTIONS.map(o => (
            <button
              key={o.id}
              type="button"
              className={`avatar-pill${avatar.body === o.id ? ' active' : ''}`}
              onClick={() => set('body', o.id)}
            >
              <span className="pill-icon">{o.icon}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="avatar-section-picker" style={{ marginBottom: 28 }}>
        <p className="field-label">Accesorios para la vista</p>
        <div className="avatar-pills">
          {GLASSES_OPTIONS.map(o => (
            <button
              key={o.id}
              type="button"
              className={`avatar-pill${avatar.eyes === o.id ? ' active' : ''}`}
              onClick={() => set('eyes', o.id)}
            >
              <span className="pill-icon">{o.icon}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="primary" onClick={onContinue} disabled={!name.trim()}>
        ¡Listo! Vamos a viajar juntos 🎒
      </button>
    </section>
  )
}

function AvatarPicker({
  label,
  values,
  selected,
  onSelect,
}: {
  label: string
  values: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="avatar-picker">
      <p className="field-label">{label}</p>
      <div>
        {values.map(value => (
          <button
            key={value}
            className={selected === value ? 'active' : ''}
            style={{ background: value }}
            onClick={() => {
              playAudioFeedback('click')
              onSelect(value)
            }}
            aria-label={`${label}: ${value}`}
          />
        ))}
      </div>
    </div>
  )
}

function AvatarPreview({ avatar, size = 168 }: { avatar: AvatarConfig; size?: number }) {
  const sex = avatar.gender === 'masculino' ? 'man' : 'woman'
  const hairStyle = avatar.hairStyle as any
  const shirtStyle = avatar.body || 'polo'
  const glassesStyle = avatar.eyes || 'none'
  const eyeBrowStyle = avatar.gender === 'femenino' ? 'upWoman' : 'up'
  const earSize = avatar.gender === 'femenino' ? 'small' : 'big'
  const noseStyle = avatar.gender === 'femenino' ? 'round' : 'short'

  const config = genConfig({
    sex,
    faceColor: avatar.skin,
    hairColor: avatar.hair,
    shirtColor: avatar.outfit,
    hairStyle,
    eyeStyle: 'oval',
    mouthStyle: 'smile',
    shirtStyle: shirtStyle as any,
    bgColor: 'transparent',
    hatStyle: 'none',
    glassesStyle: glassesStyle as any,

    eyeBrowStyle,
    earSize,
    noseStyle,
  })

  return (
    <div className="avatar-preview portrait" aria-label="Vista previa de tu viajero">
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, borderRadius: '50%', overflow: 'hidden' }}>
        <NiceAvatar style={{ width: '100%', height: '100%' }} {...config} />
        <AvatarFaceOverlay
          gender={avatar.gender}
          facialHair={avatar.facialHair || (avatar.gender === 'masculino' ? 'mustache' : 'none')}
          faceDetail={avatar.faceDetail || (avatar.gender === 'femenino' ? 'glam' : 'natural')}
          hairColor={avatar.hair}
        />
      </div>
    </div>
  )
}

function Cities({
  coins,
  onSelect,
}: {
  coins: number
  onSelect: (cityId: CityId) => void
}) {
  const cityKeys: CityId[] = ['cartagena', 'bogota', 'medellin']

  return (
    <section className="cities view-card">
      <p className="eyebrow">Mapa de Colombia</p>
      <h1>¿A dónde quieres <em>viajar hoy</em>?</h1>
      <p className="coin-balance">🪙 Tienes {coins} monedas de viaje acumuladas</p>

      <div className="city-list">
        {cityKeys.map(key => {
          const item = CITIES[key].city
          return (
            <button
              key={item.id}
              className="city"
              onClick={() => onSelect(item.id)}
              style={{
                backgroundImage: `var(--city-card-bg), url(${item.image})`,
              }}
            >
              <span className="city-icon">{item.icon}</span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.region} · {item.landmark}</small>
                <i>{item.welcomeMsg}</i>
              </span>
              <b>Explorar →</b>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Game({
  city,
  question,
  options,
  index,
  totalQuestions,
  selected,
  showClue,
  isSpeaking,
  onAnswer,
  onClue,
  onSpeak,
  onOpenVoiceSettings,
  coins,
}: {
  city: CityData
  question: QuestionData
  options: string[]
  index: number
  totalQuestions: number
  selected: string | null
  showClue: boolean
  isSpeaking: boolean
  onAnswer: (optionText: string) => void
  onClue: () => void
  onSpeak: () => void
  onOpenVoiceSettings: () => void
  coins: number
}) {
  return (
    <section className="game-view view-card">
      <div className="hud">
        <span>{city.name} · Estación {index + 1} de {totalQuestions}</span>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <button
            type="button"
            className="text-button"
            style={{ fontSize: '12px', borderBottom: 'none', opacity: 0.8 }}
            onClick={onOpenVoiceSettings}
          >
            ⚙️ Ajustar voz
          </button>
          <span>🪙 {coins} Monedas</span>
        </div>
      </div>

      <div className="progress">
        <i style={{ width: `${((index + 1) / totalQuestions) * 100}%` }} />
      </div>

      <div className="question">
        <div className="station-card-banner">
          <div className="station-image-container">
            <img
              src={question.image}
              alt={question.answer}
              className="station-image-real"
              loading="eager"
              onError={e => {
                const target = e.currentTarget
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="station-fallback-emoji" style={{ display: 'none' }}>
              <span className="visual">{question.visual}</span>
            </div>
            <div className="station-badge">
              <span className="station-pill">
                <span className="station-pill-emoji">{question.visual}</span>
                <span>Estación {index + 1} de {totalQuestions}</span>
              </span>
            </div>
          </div>

          <div className="question-audio-bar">
            <p className="eyebrow">{question.category}</p>
            <button
              className={`listen ${isSpeaking ? 'active' : ''}`}
              onClick={onSpeak}
              aria-label="Escuchar pregunta en voz alta"
            >
              {isSpeaking ? '⏹️ Detener voz' : '🔊 Escuchar con calma'}
            </button>
          </div>
        </div>

        <h2>{question.prompt}</h2>

        {showClue && (
          <p className="clue">
            💡 <strong>Pista cariñosa:</strong> {question.clue}
          </p>
        )}
      </div>

      {/* Opciones barajadas aleatoriamente (RF-07) con A, B, C, D ordenadas */}
      <div className="answers">
        {options.map((option, idx) => {
          const isSelected = selected === option
          const isRight = isSelected && option === question.answer
          const isWrong = isSelected && option !== question.answer

          return (
            <button
              key={option}
              className={isRight ? 'right' : isWrong ? 'wrong' : ''}
              onClick={() => onAnswer(option)}
              disabled={selected !== null}
            >
              <span>{String.fromCharCode(65 + idx)}</span>
              {option}
            </button>
          )
        })}
      </div>

      <button className="hint-button" onClick={onClue} disabled={showClue}>
        {showClue ? '✓ Pista a la vista' : '💡 ¿Me das una pista, por favor?'}
      </button>
    </section>
  )
}

function Feedback({
  correct,
  question,
  isSpeaking,
  onNext,
  onRetry,
  onSpeak,
}: {
  correct: boolean
  question: QuestionData
  isSpeaking: boolean
  onNext: () => void
  onRetry: () => void
  onSpeak: () => void
}) {
  return (
    <section className={`feedback view-card ${correct ? 'success' : 'retry'}`}>
      <div className="feedback-station-hero">
        {question.image && (
          <img src={question.image} alt={question.answer} className="feedback-photo-thumb" />
        )}
        <div className="result-icon">{correct ? '🌟' : '💛'}</div>
      </div>
      <p className="eyebrow">{correct ? '¡Qué alegría!' : 'Vamos con calma'}</p>
      <h1>{correct ? '¡Respuesta perfecta!' : 'Poco a poco se llega lejos'}</h1>

      <p className="lead">
        {correct
          ? `¡Exactamente! Es ${question.answer}. Has recuperado una pieza para completar el monumento.`
          : `No te preocupes. En este viaje aprender y recordar es lo más valioso. La respuesta correcta era: "${question.answer}". ¿Deseas probar de nuevo?`}
      </p>

      <button className={`listen ${isSpeaking ? 'active' : ''}`} onClick={onSpeak}>
        {isSpeaking ? '⏹️ Detener voz' : '🔊 Escuchar explicación'}
      </button>

      <button className="primary" onClick={correct ? onNext : onRetry}>
        {correct ? 'Continuar a la siguiente estación →' : 'Intentar de nuevo con calma ↻'}
      </button>

      {!correct && (
        <button className="secondary" onClick={onNext}>
          Avanzar a la siguiente estación
        </button>
      )}
    </section>
  )
}

function Complete({
  name,
  cityName,
  landmark,
  correct,
  coins,
  onCities,
  onDiploma,
}: {
  name: string
  cityName: string
  landmark: string
  correct: number
  coins: number
  onCities: () => void
  onDiploma: () => void
}) {
  return (
    <section className="complete view-card">
      <div className="completion-landmark">🏰</div>
      <p className="eyebrow">¡Meta alcanzada!</p>
      <h1>¡Felicitaciones en <em>{cityName}</em>!</h1>
      <p className="lead">
        Reconstruiste cada detalle de <strong>{landmark}</strong>. Cada palabra recordada es un triunfo que celebramos contigo.
      </p>

      <div className="stats">
        <span>
          <b>{correct} / 5</b>
          Aciertos
        </span>
        <span>
          <b>🪙 {coins}</b>
          Monedas
        </span>
        <span>
          <b>5</b>
          Recuerdos
        </span>
      </div>

      <button className="primary" onClick={onDiploma}>
        Ver mi diploma de honor 🏅
      </button>
      <button className="secondary" onClick={onCities}>
        Elegir otra hermosa ciudad 🗺️
      </button>

      <p className="support">¡Qué orgullo viajar contigo, {name || 'apreciado caminante'}!</p>
    </section>
  )
}

function Diploma({
  name,
  cityName,
  onBack,
}: {
  name: string
  cityName: string
  onBack: () => void
}) {
  return (
    <section className="diploma view-card">
      <div className="seal">🏅</div>
      <p className="eyebrow">Diploma de honor al mérito</p>
      <h1>Otorgado a <em>{name || 'nuestro querido viajero'}</em></h1>

      <p className="lead">
        Por su memoria viva, su curiosidad insaciable y por recorrer los caminos de <strong>{cityName}</strong> compartiendo la magia de nuestras palabras e historias.
      </p>

      <div className="signature">
        Recorriendo Colombia con Amor
        <br />
        <small>Aprender y recordar es volver a florecer</small>
      </div>

      <button className="primary" onClick={onBack}>
        Continuar explorando Colombia 🇨🇴
      </button>
    </section>
  )
}

function Therapist({
  name,
  correct,
  coins,
  attempts,
  hints,
  completed,
  cityName,
  onBack,
}: {
  name: string
  correct: number
  coins: number
  attempts: number
  hints: number
  completed: boolean
  cityName?: string
  onBack: () => void
}) {
  const [copied, setCopied] = useState(false)
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0
  const semanticScore = Math.max(completed ? 75 : 0, accuracy)

  const skills = [
    { label: 'Evocación léxica', value: semanticScore },
    { label: 'Categorización semántica', value: Math.min(100, semanticScore + 6) },
    { label: 'Asociación conceptual', value: Math.max(0, semanticScore - 4) },
    { label: 'Comprensión oral (con audio)', value: Math.min(100, semanticScore + (hints ? 0 : 8)) },
  ]

  const generateClinicalReportText = () => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const formattedTime = now.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const interpretation =
      accuracy >= 80
        ? 'Desempeño cognitivo y lingüístico óptimo. El paciente evidencia adecuada preservación de la memoria léxico-semántica, alta comprensión auditivo-verbal y baja necesidad de facilitadores o pistas externas.'
        : accuracy >= 60
        ? 'Desempeño cognitivo y lingüístico funcional con preservación moderada. Se beneficia notablemente de claves semánticas y auditivas para facilitar el acceso al almacén léxico.'
        : 'Desempeño con dificultades en el acceso léxico espontáneo y discriminación semántica. Se sugiere continuar plan de intervención fonoaudiológica intensificando el andamiaje con claves fonológicas y de reminiscencia.'

    return `================================================================================
REPORTE DE ESTIMULACIÓN COGNITIVA Y FONOAUDIOLÓGICA
ANEXO A HISTORIA CLÍNICA DE FONOAUDIOLOGÍA / NEUROPSICOLOGÍA
Software: Recorriendo Colombia (MVP Terapéutico)
================================================================================

1. INFORMACIÓN GENERAL DE LA SESIÓN
--------------------------------------------------------------------------------
Paciente / Participante:  ${name || 'No especificado'}
Fecha de evaluación:      ${formattedDate} a las ${formattedTime}
Ciudad / Estación:        ${cityName || 'Cartagena de Indias'}
Estado de la sesión:      ${completed ? 'Recorrido completado con éxito' : 'Sesión en desarrollo'}

2. RESULTADOS CUANTITATIVOS DE LA VALORACIÓN
--------------------------------------------------------------------------------
- Aciertos obtenidos:     ${correct}
- Intentos totales:       ${attempts}
- Índice de precisión:    ${accuracy}%
- Pistas requeridas:      ${hints}
- Monedas / Puntuación:   ${coins}

3. PERFIL DE HABILIDADES COGNITIVO-COMUNICATIVAS ESTIMULADAS
--------------------------------------------------------------------------------
- Evocación léxica:                 ${semanticScore}%
- Categorización semántica:         ${Math.min(100, semanticScore + 6)}%
- Asociación conceptual:            ${Math.max(0, semanticScore - 4)}%
- Comprensión oral con soporte:     ${Math.min(100, semanticScore + (hints ? 0 : 8))}%

4. ANÁLISIS Y OBSERVACIONES CLÍNICAS (FONOAUDIOLOGÍA)
--------------------------------------------------------------------------------
${interpretation}

5. ORIENTACIONES Y RECOMENDACIONES TERAPÉUTICAS
--------------------------------------------------------------------------------
* Continuar estimulando la evocación léxica mediante reminiscencia cultural y afectiva.
* Proporcionar tiempo de latencia prolongado sin presión temporal ni penalizaciones.
* Fortalecer la retroalimentación fonológica y auditiva ante respuestas erradas.
* Fomentar el diálogo guiado y la descripción de anécdotas personales sobre las regiones.

6. REGISTRO DEL PROFESIONAL
--------------------------------------------------------------------------------
Profesional tratante:     ________________________________________
Especialidad:             Fonoaudiología / Neuropsicología / Terapia
Registro Profesional / TP:________________________________________
Firma y Sello:            ________________________________________

================================================================================
Documento confidencial generado para uso clínico y terapéutico exclusivo.
Recorriendo Colombia - Módulo de Fonoaudiología Clínica.
================================================================================`
  }

  const handleDownloadPDF = () => {
    playAudioFeedback('click')
    exportClinicalReportPDF({
      patientName: name,
      cityName,
      correct,
      attempts,
      hints,
      coins,
      completed,
    })
  }

  const handleCopy = () => {
    playAudioFeedback('click')
    const content = generateClinicalReportText()
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section className="therapist view-card">
      <div className="clinical-title">
        <div className="clinical-mark">✚</div>
        <div>
          <p className="eyebrow">Seguimiento Fonoaudiológico</p>
          <h1>Perfil de <em>{name || 'la persona participante'}</em></h1>
        </div>
      </div>

      <p className="clinical-note">
        Herramienta de estimulación semántica y registro objetivo. Complementa las sesiones de fonoaudiología sin sustituir la valoración profesional individual.
      </p>

      <div className="patient-summary">
        <span>Estado de la sesión</span>
        <b>{completed ? 'Recorrido completado con éxito' : 'Sesión en desarrollo'}</b>
        <small>Objetivo: fortalecer fluidez semántica, vocabulario funcional y memoria léxica cotidiana.</small>
      </div>

      <div className="clinical-metrics">
        <div>
          <b>{correct}</b>
          <span>aciertos registrados</span>
        </div>
        <div>
          <b>{attempts}</b>
          <span>intentos totales</span>
        </div>
        <div>
          <b>{accuracy}%</b>
          <span>precisión de respuesta</span>
        </div>
        <div>
          <b>{hints}</b>
          <span>pistas solicitadas</span>
        </div>
      </div>

      <section className="skill-card">
        <div className="section-heading">
          <h2>Indicadores por proceso cognitivo</h2>
          <span>Sesión actual</span>
        </div>
        {skills.map(skill => (
          <div className="skill-row" key={skill.label}>
            <span>{skill.label}</span>
            <div>
              <i style={{ width: `${skill.value}%` }} />
            </div>
            <b>{skill.value}%</b>
          </div>
        ))}
      </section>

      <section className="clinical-download-card">
        <div className="section-heading">
          <h2>📥 Anexo para Historia Clínica</h2>
          <span>Exportación Fonoaudiológica</span>
        </div>
        <p className="clinical-download-desc">
          Descarga o copia el informe estructurado con las métricas cuantitativas, indicadores cognitivos y observaciones fonoaudiológicas listo para adjuntar a la historia clínica del paciente.
        </p>
        <div className="clinical-download-actions">
          <button className="primary download-btn" onClick={handleDownloadPDF}>
            📄 Descargar reporte para historia clínica (PDF)
          </button>
          <button className="secondary copy-btn" onClick={handleCopy}>
            {copied ? '✅ ¡Copiado al portapapeles!' : '📋 Copiar texto clínico'}
          </button>
        </div>
      </section>

      <section className="recommendation-card">
        <div className="section-heading">
          <h2>Orientaciones para el profesional</h2>
          <span>Apoyo terapéutico</span>
        </div>
        <ul>
          <li>Proveer refuerzo positivo ante aciertos y permitir pausas sin límite de tiempo.</li>
          <li>Articular las preguntas con anécdotas de la infancia del paciente en su ciudad natal.</li>
          <li>Registrar conceptos de difícil evocación para abordarlos con claves fonológicas en la siguiente sesión.</li>
        </ul>
      </section>

      <div className="privacy-message">
        🔒 Los datos de la sesión se almacenan exclusivamente en este dispositivo (localStorage). Máxima confidencialidad y privacidad.
      </div>

      <button className="primary" onClick={onBack}>
        Volver al juego
      </button>
    </section>
  )
}
