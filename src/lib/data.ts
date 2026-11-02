export type Modalidad = "Remoto" | "Híbrido" | "Presencial";
export type Rol = "Desarrollo Frontend" | "Backend" | "Data Science";

export interface Offer {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: number;
  modalidad: Modalidad;
  rol: Rol;
  match: number;
  description: string;
  requirements: string[];
  supervisor: { name: string; email: string; phone: string };
  posted: string;
}

export interface Company {
  name: string;
  rut: string;
  sector: string;
  rating: number;
  city: string;
  practicantesUSM: number;
}

export const companies: Company[] = [
  { name: "Banco Itaú", rut: "76.645.030-K", sector: "Banca y Finanzas", rating: 4.5, city: "Santiago", practicantesUSM: 38 },
  { name: "BRASS Engineering", rut: "77.112.340-5", sector: "Ingeniería de Software", rating: 4.8, city: "Viña del Mar", practicantesUSM: 22 },
  { name: "Mercado Libre", rut: "76.248.812-3", sector: "E-commerce", rating: 4.7, city: "Santiago", practicantesUSM: 51 },
  { name: "Codelco", rut: "61.704.000-K", sector: "Minería", rating: 4.2, city: "Santiago", practicantesUSM: 17 },
  { name: "NotCo", rut: "76.553.201-8", sector: "Foodtech / IA", rating: 4.6, city: "Santiago", practicantesUSM: 9 },
  { name: "Falabella Tecnología", rut: "90.749.000-9", sector: "Retail", rating: 4.1, city: "Santiago", practicantesUSM: 29 },
];

export const offers: Offer[] = [
  {
    id: "itau-frontend",
    title: "Práctica Desarrollo Frontend (React)",
    company: "Banco Itaú",
    location: "Las Condes, Santiago",
    stipend: 650000,
    modalidad: "Híbrido",
    rol: "Desarrollo Frontend",
    match: 95,
    description:
      "Te sumarás al squad de Banca Digital para construir nuevas funcionalidades de la app web de personas. Trabajarás con React, TypeScript y un design system propio, participando en ceremonias Scrum y revisiones de código.",
    requirements: ["Alumno/a regular ICI o IEI con IWI-300 habilitada", "React y TypeScript", "Git y trabajo en equipo", "Deseable: testing con Jest"],
    supervisor: { name: "Camila Rojas", email: "camila.rojas@itau.cl", phone: "+56 9 8765 4321" },
    posted: "Hace 2 días",
  },
  {
    id: "brass-backend",
    title: "Práctica Backend Python / Django",
    company: "BRASS Engineering",
    location: "Viña del Mar, Valparaíso",
    stipend: 500000,
    modalidad: "Presencial",
    rol: "Backend",
    match: 91,
    description:
      "Desarrollarás APIs REST para sistemas de gestión industrial de clientes mineros. Aprenderás buenas prácticas de arquitectura, Docker y despliegue en la nube junto a ex-alumnos sansanos.",
    requirements: ["Python intermedio", "SQL (PostgreSQL)", "Conocimientos de Docker", "Disponibilidad presencial en Viña"],
    supervisor: { name: "Felipe Muñoz", email: "fmunoz@brass.cl", phone: "+56 9 5555 1234" },
    posted: "Hace 5 días",
  },
  {
    id: "meli-data",
    title: "Data Science Intern – Pricing",
    company: "Mercado Libre",
    location: "Remoto (Chile)",
    stipend: 800000,
    modalidad: "Remoto",
    rol: "Data Science",
    match: 88,
    description:
      "Analizarás datos de precios y comportamiento de compra para alimentar modelos de recomendación. Usarás Python, BigQuery y notebooks colaborativos con el equipo regional.",
    requirements: ["Python (pandas, scikit-learn)", "Estadística (MAT-041 aprobado)", "SQL", "Inglés intermedio"],
    supervisor: { name: "Ignacio Fernández", email: "ignacio.fernandez@mercadolibre.cl", phone: "+56 2 2345 6789" },
    posted: "Hoy",
  },
  {
    id: "meli-backend",
    title: "Práctica Backend Go – Pagos",
    company: "Mercado Libre",
    location: "Las Condes, Santiago",
    stipend: 750000,
    modalidad: "Híbrido",
    rol: "Backend",
    match: 82,
    description: "Participa en el desarrollo de microservicios de Mercado Pago en Go, con foco en observabilidad y alta disponibilidad.",
    requirements: ["Programación en Go o Java", "Conceptos de sistemas distribuidos", "Git"],
    supervisor: { name: "Daniela Soto", email: "daniela.soto@mercadolibre.cl", phone: "+56 2 2345 0000" },
    posted: "Hace 1 semana",
  },
  {
    id: "notco-data",
    title: "Práctica Machine Learning – Giuseppe",
    company: "NotCo",
    location: "Providencia, Santiago",
    stipend: 600000,
    modalidad: "Híbrido",
    rol: "Data Science",
    match: 79,
    description: "Apoya al equipo de IA en el entrenamiento y evaluación de modelos para formulación de alimentos plant-based.",
    requirements: ["Python y PyTorch", "Álgebra lineal", "Curiosidad científica"],
    supervisor: { name: "Tomás Vergara", email: "tvergara@notco.com", phone: "+56 9 4444 2222" },
    posted: "Hace 3 días",
  },
  {
    id: "falabella-frontend",
    title: "Práctica Frontend – E-commerce",
    company: "Falabella Tecnología",
    location: "Remoto (Chile)",
    stipend: 450000,
    modalidad: "Remoto",
    rol: "Desarrollo Frontend",
    match: 74,
    description: "Mejora la experiencia de compra de falabella.com con Next.js y foco en rendimiento web y accesibilidad.",
    requirements: ["JavaScript / React", "CSS moderno", "Nociones de accesibilidad web"],
    supervisor: { name: "Paula Henríquez", email: "phenriquez@falabella.cl", phone: "+56 9 3333 1111" },
    posted: "Hace 4 días",
  },
  {
    id: "codelco-backend",
    title: "Práctica Backend – Sistemas Operacionales",
    company: "Codelco",
    location: "Calama, Antofagasta",
    stipend: 400000,
    modalidad: "Presencial",
    rol: "Backend",
    match: 68,
    description: "Integración de datos de sensores de planta con sistemas corporativos usando .NET y SQL Server.",
    requirements: ["C# o Java", "SQL Server", "Disposición a trabajar en faena"],
    supervisor: { name: "Rodrigo Araya", email: "raraya@codelco.cl", phone: "+56 55 232 1000" },
    posted: "Hace 2 semanas",
  },
];

export interface Enrollment {
  id: string;
  company: string;
  rut: string;
  supervisor: string;
  supervisorEmail: string;
  tipo: string;
  start: string;
  end: string;
  modalidad: Modalidad;
  status: string;
}

export interface LogEntry {
  id: string;
  week: number;
  date: string;
  title: string;
  description: string;
}

export const seedEnrollments: Enrollment[] = [
  {
    id: "e1",
    company: "BRASS Engineering",
    rut: "77.112.340-5",
    supervisor: "Felipe Muñoz",
    supervisorEmail: "fmunoz@brass.cl",
    tipo: "Práctica Industrial (IWI-300 / 360 horas)",
    start: "2026-10-05",
    end: "2026-11-27",
    modalidad: "Presencial",
    status: "Aprobada - En Curso",
  },
];

export const seedLogs: LogEntry[] = [
  { id: "l1", week: 1, date: "2026-10-09", title: "Onboarding y entorno", description: "Configuración de Docker y repositorios. Aprendí el flujo GitFlow del equipo." },
  { id: "l2", week: 2, date: "2026-10-16", title: "Primer endpoint REST", description: "Implementé endpoint de órdenes de trabajo en Django REST Framework con tests unitarios." },
  { id: "l3", week: 3, date: "2026-10-23", title: "Optimización de consultas", description: "Reduje tiempos de respuesta 40% usando select_related e índices en PostgreSQL." },
  { id: "l4", week: 4, date: "2026-10-30", title: "Code review y despliegue", description: "Primer deploy a staging. Aprendí a recibir y dar feedback en pull requests." },
];

export const clp = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
