// src/data/sprintData.js
export const sprintBacklogItems = [
  {
    id: 'SR-REQ-003',
    title: 'Sesiones con PYMES y repartidores',
    description: 'Realizar sesiones de trabajo con PYMES y repartidores para capturar requerimientos funcionales',
    points: 10,
    priority: 'Critical',
    estimatedHours: 60,
    owner: 'PO',
    status: 'todo',
    acceptanceCriteria: [
      'Documento de requerimientos funcionales priorizados',
      'Matriz de trazabilidad requerimientos-usuarios',
      'Validación con al menos 5 PYMES y 10 repartidores'
    ]
  },
  {
    id: 'SR-REQ-004',
    title: 'Documentar NFRs',
    description: 'Documentar requerimientos no funcionales relacionados con desempeño, seguridad y escalabilidad',
    points: 7,
    priority: 'High',
    estimatedHours: 24,
    owner: 'Arquitecto',
    status: 'todo',
    acceptanceCriteria: [
      'Especificación técnica de NFRs con métricas cuantificables',
      'Criterios de aceptación para cada NFR',
      'Plan de pruebas de validación'
    ]
  },
  {
    id: 'SR-ALC-005',
    title: 'Finalizar EDT/WBS',
    description: 'Finalizar y socializar la Estructura de Desglose de Trabajo con stakeholders',
    points: 5,
    priority: 'High',
    estimatedHours: 25,
    owner: 'PM',
    status: 'todo',
    acceptanceCriteria: [
      'EDT completa con paquetes de trabajo detallados',
      'Matriz de asignación de recursos',
      'Acta de socialización con stakeholders'
    ]
  },
  {
    id: 'SR-PLN-002',
    title: 'Definir KPIs de negocio',
    description: 'Definir KPIs de negocio para establecer criterios de éxito medibles',
    points: 7,
    priority: 'High',
    estimatedHours: 22,
    owner: 'PO',
    status: 'todo',
    acceptanceCriteria: [
      'Dashboard de KPIs con metas cuantificables',
      'Procedimiento de medición y reporte',
      'Alineación con objetivos estratégicos validada'
    ]
  },
  {
    id: 'SR-UIX-009',
    title: 'Seleccionar pila tecnológica',
    description: 'Seleccionar la pila tecnológica y definir patrones de arquitectura',
    points: 10,
    priority: 'High',
    estimatedHours: 34,
    owner: 'Arquitecto',
    status: 'todo',
    acceptanceCriteria: [
      'Matriz comparativa de tecnologías evaluadas',
      'Documento de arquitectura técnica',
      'Justificación de selección frente a requerimientos'
    ]
  },
  {
    id: 'SR-COM-011',
    title: 'Plan de gestión de comunicaciones',
    description: 'Elaborar el plan de gestión de comunicaciones con stakeholders',
    points: 9,
    priority: 'Medium',
    estimatedHours: 19,
    owner: 'PM',
    status: 'todo',
    acceptanceCriteria: [
      'Matriz de stakeholders con frecuencia de comunicación',
      'Plan de reportes y reuniones periódicas',
      'Canales de comunicación definidos y probados'
    ]
  },
  {
    id: 'SR-RIS-010',
    title: 'Análisis detallado de riesgos',
    description: 'Realizar análisis de riesgos y definir plan de respuesta',
    points: 10,
    priority: 'Medium',
    estimatedHours: 25,
    owner: 'PM',
    status: 'todo',
    acceptanceCriteria: [
      'Matriz de riesgos con probabilidad e impacto',
      'Plan de respuesta y mitigación',
      'Dueños de riesgos asignados'
    ]
  }
];

export const teamMembers = [
  {
    id: 1,
    name: 'Vladimir Sahagun',
    role: 'Product Owner',
    avatar: 'VS',
    capacity: 80,
    color: '#3b82f6'
  },
  {
    id: 2,
    name: '[PM]',
    role: 'Project Manager',
    avatar: 'PM',
    capacity: 80,
    color: '#f59e0b'
  },
  {
    id: 3,
    name: '[Arquitecto]',
    role: 'Software Architect',
    avatar: 'SA',
    capacity: 80,
    color: '#10b981'
  },
  {
    id: 4,
    name: '[BA]',
    role: 'Business Analyst',
    avatar: 'BA',
    capacity: 80,
    color: '#8b5cf6'
  }
];

export const definitionOfDone = [
  'Todos los criterios de aceptación verificados',
  'Documentación en repositorio Git',
  'Revisiones de pares completadas',
  'Pruebas unitarias aprobadas (si aplica)',
  'Product Owner aprueba la entrega',
  'Retrospectiva completada',
  'Código/documentación en rama correcta',
  'Métricas del sprint registradas'
];

export const taskBreakdown = {
  'SR-REQ-003': [
    { description: 'Preparar guión de entrevistas', hours: 8, owner: 'PO/BA', day: 1, status: 'todo', progress: 0 },
    { description: 'Conducir sesiones con 5 PYMES', hours: 20, owner: 'PO', day: 2, status: 'todo', progress: 0 },
    { description: 'Conducir sesiones con 10 repartidores', hours: 15, owner: 'PO', day: 3, status: 'todo', progress: 0 },
    { description: 'Documentar y priorizar requerimientos', hours: 12, owner: 'BA', day: 4, status: 'todo', progress: 0 },
    { description: 'Validar con stakeholders', hours: 5, owner: 'PO', day: 5, status: 'todo', progress: 0 }
  ],
  'SR-REQ-004': [
    { description: 'Definir métricas de desempeño', hours: 6, owner: 'Arquitecto', day: 1, status: 'todo', progress: 0 },
    { description: 'Especificar requisitos de seguridad', hours: 8, owner: 'Arquitecto', day: 2, status: 'todo', progress: 0 },
    { description: 'Definir criterios de escalabilidad', hours: 6, owner: 'Arquitecto', day: 3, status: 'todo', progress: 0 },
    { description: 'Documentar criterios de aceptación', hours: 4, owner: 'BA', day: 4, status: 'todo', progress: 0 }
  ],
  'SR-ALC-005': [
    { description: 'Completar EDT nivel 3-4', hours: 12, owner: 'PM', day: 1, status: 'todo', progress: 0 },
    { description: 'Asignar responsables por paquete', hours: 6, owner: 'PM', day: 2, status: 'todo', progress: 0 },
    { description: 'Preparar presentación de socialización', hours: 4, owner: 'PM', day: 3, status: 'todo', progress: 0 },
    { description: 'Conductir sesión de validación', hours: 3, owner: 'PM', day: 4, status: 'todo', progress: 0 }
  ],
  'SR-PLN-002': [
    { description: 'Definir fórmula y cálculo de ROI', hours: 6, owner: 'PO', day: 1, status: 'todo', progress: 0 },
    { description: 'Establecer métricas de adopción', hours: 5, owner: 'PO', day: 2, status: 'todo', progress: 0 },
    { description: 'Crear dashboard de seguimiento', hours: 8, owner: 'PM', day: 3, status: 'todo', progress: 0 },
    { description: 'Validar con Cámara de Comercio', hours: 3, owner: 'PO', day: 4, status: 'todo', progress: 0 }
  ],
  'SR-UIX-009': [
    { description: 'Investigar tecnologías candidatas', hours: 12, owner: 'Arquitecto', day: 2, status: 'todo', progress: 0 },
    { description: 'Evaluar pros/cons de cada opción', hours: 10, owner: 'Dev Team', day: 3, status: 'todo', progress: 0 },
    { description: 'Documentar arquitectura propuesta', hours: 8, owner: 'Arquitecto', day: 4, status: 'todo', progress: 0 },
    { description: 'Validar con equipo técnico', hours: 4, owner: 'Tech Lead', day: 5, status: 'todo', progress: 0 }
  ],
  'SR-COM-011': [
    { description: 'Identificar todos los stakeholders', hours: 4, owner: 'PM', day: 1, status: 'todo', progress: 0 },
    { description: 'Definir frecuencia y canales', hours: 6, owner: 'PM', day: 2, status: 'todo', progress: 0 },
    { description: 'Crear templates de reportes', hours: 5, owner: 'PM', day: 3, status: 'todo', progress: 0 },
    { description: 'Establecer RACI de comunicaciones', hours: 4, owner: 'PM', day: 4, status: 'todo', progress: 0 }
  ],
  'SR-RIS-010': [
    { description: 'Identificar riesgos del proyecto', hours: 6, owner: 'PM', day: 1, status: 'todo', progress: 0 },
    { description: 'Calcular probabilidad e impacto', hours: 8, owner: 'Team', day: 2, status: 'todo', progress: 0 },
    { description: 'Definir planes de mitigación', hours: 8, owner: 'PM', day: 3, status: 'todo', progress: 0 },
    { description: 'Asignar dueños de riesgos', hours: 3, owner: 'PM', day: 4, status: 'todo', progress: 0 }
  ]
};

export const sprintEvents = [
  { name: 'Daily Scrum', frequency: 'Daily', time: '9:00 AM', duration: '15 min', participants: 'Whole Team' },
  { name: 'Sprint Review', frequency: 'End of Sprint', time: '10:00 AM', duration: '2 hours', participants: 'Stakeholders + Team' },
  { name: 'Sprint Retrospective', frequency: 'End of Sprint', time: '2