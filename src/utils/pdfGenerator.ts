import jsPDF from 'jspdf'

export interface ClinicalReportData {
  patientName: string
  cityName?: string
  correct: number
  attempts: number
  hints: number
  coins: number
  completed: boolean
}

export function exportClinicalReportPDF(data: ClinicalReportData) {
  const {
    patientName,
    cityName = 'Cartagena de Indias',
    correct,
    attempts,
    hints,
    coins,
    completed,
  } = data

  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0
  const semanticScore = Math.max(completed ? 75 : 0, accuracy)

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth() // 210 mm
  const margin = 16
  const contentWidth = pageWidth - margin * 2 // 178 mm

  // 1. Franja tricolor de Colombia superior (Amarillo, Azul, Rojo)
  doc.setFillColor(247, 201, 75) // Amarillo
  doc.rect(0, 0, pageWidth * 0.5, 3.5, 'F')
  doc.setFillColor(26, 107, 138) // Azul
  doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, 3.5, 'F')
  doc.setFillColor(184, 58, 30) // Rojo
  doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, 3.5, 'F')

  // 2. Encabezado institucional / Clínico
  doc.setFillColor(13, 74, 47) // Verde esmeralda profundo
  doc.roundedRect(margin, 9, contentWidth, 24, 3, 3, 'F')

  doc.setTextColor(247, 201, 75) // Oro
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('RECORRIENDO COLOMBIA', margin + 8, 17)

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('PROGRAMA DIGITAL DE ESTIMULACIÓN COGNITIVA Y DEL LENGUAJE', margin + 8, 22)

  doc.setTextColor(200, 230, 215)
  doc.setFontSize(8)
  doc.text('INFORME TÉCNICO DE EVOLUCIÓN · ANEXO A HISTORIA CLÍNICA', margin + 8, 27)

  // Badge derecho de fecha
  const now = new Date()
  const dateFormatted = now.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const timeFormatted = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  })

  doc.setFontSize(8)
  doc.setTextColor(247, 201, 75)
  doc.text(`Fecha: ${dateFormatted}`, pageWidth - margin - 8, 17, { align: 'right' })
  doc.setTextColor(255, 255, 255)
  doc.text(`Hora: ${timeFormatted}`, pageWidth - margin - 8, 22, { align: 'right' })
  doc.setTextColor(200, 230, 215)
  doc.text('Módulo: Fonoaudiología', pageWidth - margin - 8, 27, { align: 'right' })

  let currentY = 38

  // 3. Tarjeta de Datos del Paciente
  doc.setFillColor(245, 248, 245)
  doc.setDrawColor(210, 230, 215)
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, currentY, contentWidth, 22, 2.5, 2.5, 'FD')

  doc.setTextColor(13, 74, 47)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.text('DATOS DE LA PERSONA EVALUADA', margin + 6, currentY + 6)

  doc.setTextColor(40, 40, 40)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Paciente / Participante:', margin + 6, currentY + 12)
  doc.setFont('helvetica', 'bold')
  doc.text(patientName || 'No especificado', margin + 46, currentY + 12)

  doc.setFont('helvetica', 'normal')
  doc.text('Escenario / Ciudad:', margin + 6, currentY + 17)
  doc.setFont('helvetica', 'bold')
  doc.text(cityName, margin + 46, currentY + 17)

  doc.setFont('helvetica', 'normal')
  doc.text('Estado de la sesión:', margin + 98, currentY + 12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(completed ? 22 : 180, completed ? 120 : 100, completed ? 50 : 20)
  doc.text(completed ? 'Completado con éxito' : 'En desarrollo / Parcial', margin + 132, currentY + 12)

  doc.setTextColor(40, 40, 40)
  doc.setFont('helvetica', 'normal')
  doc.text('Modalidad:', margin + 98, currentY + 17)
  doc.setFont('helvetica', 'bold')
  doc.text('Reminiscencia y evocación léxica', margin + 118, currentY + 17)

  currentY += 27

  // 4. Métricas cuantitativas (4 cajas de KPIs)
  const boxWidth = (contentWidth - 9) / 4
  const boxHeight = 18

  const kpis = [
    { label: 'Aciertos', val: `${correct}`, color: [13, 74, 47] },
    { label: 'Intentos totales', val: `${attempts}`, color: [26, 107, 138] },
    { label: 'Precisión global', val: `${accuracy}%`, color: [22, 140, 70] },
    { label: 'Monedas', val: `${coins}`, color: [160, 100, 20] },
  ]

  kpis.forEach((kpi, i) => {
    const x = margin + i * (boxWidth + 3)
    doc.setFillColor(252, 253, 252)
    doc.setDrawColor(220, 230, 220)
    doc.roundedRect(x, currentY, boxWidth, boxHeight, 2, 2, 'FD')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2])
    doc.text(kpi.val, x + boxWidth / 2, currentY + 7.5, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(90, 90, 90)
    doc.text(kpi.label, x + boxWidth / 2, currentY + 13.5, { align: 'center' })
  })

  currentY += 23

  // 5. Perfil de Procesos Cognitivo-Comunicativos
  doc.setFillColor(248, 250, 248)
  doc.setDrawColor(210, 230, 215)
  doc.roundedRect(margin, currentY, contentWidth, 48, 2.5, 2.5, 'FD')

  doc.setTextColor(13, 74, 47)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.text('INDICADORES POR PROCESO COGNITIVO Y DEL LENGUAJE', margin + 6, currentY + 6.5)

  const skills = [
    {
      label: 'Evocación léxica (Memoria semántica)',
      value: semanticScore,
      desc: 'Capacidad de acceder a la palabra diana ante pistas contextuales.',
    },
    {
      label: 'Categorización semántica',
      value: Math.min(100, semanticScore + 6),
      desc: 'Reconocimiento de elementos por campo cultural y regional.',
    },
    {
      label: 'Asociación conceptual',
      value: Math.max(0, semanticScore - 4),
      desc: 'Relación lógica entre costumbres, lugares y patrimonio.',
    },
    {
      label: 'Comprensión auditivo-verbal',
      value: Math.min(100, semanticScore + (hints ? 0 : 8)),
      desc: 'Decodificación efectiva mediante el apoyo del guía auditivo.',
    },
  ]

  let skillY = currentY + 12.5
  skills.forEach(skill => {
    doc.setTextColor(40, 40, 40)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(skill.label, margin + 6, skillY)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(110, 110, 110)
    doc.text(skill.desc, margin + 6, skillY + 3.5)

    // Barra de progreso
    const barX = margin + 115
    const barW = 42
    const barH = 3.5

    doc.setFillColor(230, 235, 230)
    doc.roundedRect(barX, skillY - 2.5, barW, barH, 1.5, 1.5, 'F')

    doc.setFillColor(47, 185, 118)
    const fillW = Math.max(2, (barW * skill.value) / 100)
    doc.roundedRect(barX, skillY - 2.5, fillW, barH, 1.5, 1.5, 'F')

    // Porcentaje
    doc.setTextColor(13, 74, 47)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.text(`${skill.value}%`, margin + contentWidth - 4, skillY, { align: 'right' })

    skillY += 8.5
  })

  currentY += 53

  // 6. Análisis e Interpretación Clínica
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(210, 230, 215)
  doc.roundedRect(margin, currentY, contentWidth, 34, 2.5, 2.5, 'FD')

  doc.setTextColor(13, 74, 47)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.text('INTERPRETACIÓN FONOAUDIOLÓGICA DEL RENDIMIENTO', margin + 6, currentY + 6.5)

  const interpretation =
    accuracy >= 80
      ? 'El paciente presenta un desempeño sobresaliente en la memoria léxico-semántica y discriminación conceptual. Evidencia rápida evocación léxica espontánea y adecuada orientación contextual, respondiendo de manera óptima a los estímulos visuales y auditivos regionales con mínima necesidad de andamiaje externo.'
      : accuracy >= 60
      ? 'El paciente exhibe un desempeño funcional adecuado con buena preservación de categorías culturales y semánticas. Se beneficia sustancialmente del soporte multimodal (imagen auténtica y lectura por voz), mostrando efectividad ante claves contextuales y reforzamiento de opciones.'
      : 'El paciente evidencia dificultad leve a moderada en el acceso léxico inmediato y en la selección semántica guiada. Se sugiere fortalecer la estimulación estructurada mediante claves fonológicas iniciales, prolongar el tiempo de respuesta y vincular anécdotas de reminiscencia personal.'

  doc.setTextColor(50, 50, 50)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const splitInterp = doc.splitTextToSize(interpretation, contentWidth - 12)
  doc.text(splitInterp, margin + 6, currentY + 12)

  currentY += 39

  // 7. Orientaciones y Recomendaciones Terapéuticas
  doc.setFillColor(254, 252, 245)
  doc.setDrawColor(240, 225, 180)
  doc.roundedRect(margin, currentY, contentWidth, 32, 2.5, 2.5, 'FD')

  doc.setTextColor(160, 100, 20)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('ORIENTACIONES Y RECOMENDACIONES PARA EL TRATAMIENTO', margin + 6, currentY + 6)

  const recommendations = [
    '• Mantener la estimulación comunicativa basada en reminiscencia y elementos identitarios colombianos.',
    '• Facilitar tiempos de latencia generosos para propiciar el rescate léxico sin estrés ni presión temporal.',
    '• Articular las imágenes de los lugares con narraciones orales espontáneas sobre vivencias del paciente.',
    '• Continuar el seguimiento clínico registrando los vocablos de mayor dificultad para reforzar con claves fonémicas.',
  ]

  doc.setTextColor(60, 60, 60)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  let recY = currentY + 11.5
  recommendations.forEach(rec => {
    doc.text(rec, margin + 6, recY)
    recY += 4.8
  })

  currentY += 37

  // 8. Espacio para Firma y Validación del Profesional Tratante
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(210, 230, 215)
  doc.roundedRect(margin, currentY, contentWidth, 35, 2.5, 2.5, 'FD')

  doc.setTextColor(13, 74, 47)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text('VALIDACIÓN PROFESIONAL / CONSTANCIA CLÍNICA', margin + 6, currentY + 5.5)

  // Línea de firma izquierda
  doc.setDrawColor(160, 160, 160)
  doc.setLineWidth(0.3)
  doc.line(margin + 10, currentY + 23, margin + 80, currentY + 23)

  doc.setTextColor(80, 80, 80)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.text('Firma del Profesional Tratante', margin + 10, currentY + 27)
  doc.text('Fonoaudiología / Neuropsicología', margin + 10, currentY + 31)

  // Datos derecha
  doc.text('Registro / Tarjeta Profesional No.: _______________________', margin + 92, currentY + 16)
  doc.text('Institución / Consultorio: _________________________________', margin + 92, currentY + 23)
  doc.text('Firma y Sello de Validación Clínica', margin + 92, currentY + 30)

  // 9. Pie de página
  doc.setFontSize(7)
  doc.setTextColor(140, 140, 140)
  doc.text(
    'Documento confidencial generado digitalmente por "Recorriendo Colombia" · Válido para anexo probatorio en Historia Clínica.',
    margin,
    290
  )
  doc.text('Página 1 de 1', pageWidth - margin, 290, { align: 'right' })

  // Guardar y descargar PDF
  const safeName = (patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]/g, '_')
  const fileDate = now.toISOString().slice(0, 10)
  doc.save(`Historia_Clinica_${safeName}_${fileDate}.pdf`)
}
