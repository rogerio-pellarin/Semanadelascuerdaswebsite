import { Music, Users, GraduationCap, Mic, Piano, Calendar } from "lucide-react";
import { useSiteImages } from "../hooks/useSiteImages";

export default function ElPrograma() {
  const { images } = useSiteImages();

  const programImage = images?.programa?.programImage || "https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

  const activities = [
    {
      icon: Music,
      title: "Clases individuales 1:1",
      description: "3-4 sesiones personalizadas con maestros de orquestas como Berlin Philharmonic, Royal Concertgebouw, y otras instituciones de élite mundial.",
    },
    {
      icon: Users,
      title: "Música de cámara",
      description: "Ensambles curados por nivel y afinidad musical. Coaching intensivo diario con énfasis en escucha, balance y construcción colectiva.",
    },
    {
      icon: Piano,
      title: "Correpetición con piano",
      description: "Sesiones con pianistas profesionales para repertorio concertante y sonatas. Trabajo sobre colaboración y proyección escénica.",
    },
    {
      icon: GraduationCap,
      title: "Talleres integrales",
      description: "Técnica Alexander, manejo de ansiedad escénica, salud del músico, interpretación estilística, y construcción de carrera artística.",
    },
    {
      icon: Mic,
      title: "Recitales internos",
      description: "Plataforma de proyección con retroalimentación constructiva. Espacio seguro para experimentar, tomar riesgos y crecer como intérprete.",
    },
    {
      icon: Calendar,
      title: "Concierto final",
      description: "Presentación pública que cierra la semana. Los mejores ensambles y solistas comparten el escenario en un evento de alto nivel.",
    },
  ];

  const schedule = [
    {
      day: "Día 1",
      title: "Bienvenida y evaluación",
      activities: ["Registro y orientación", "Evaluación inicial", "Formación de ensambles", "Recital de apertura"],
    },
    {
      day: "Días 2-6",
      title: "Inmersión intensiva",
      activities: ["Clases 1:1 diarias", "Ensayos de cámara (mañana y tarde)", "Talleres especializados", "Sesiones de correpetición", "Recitales internos rotativos"],
    },
    {
      day: "Día 7",
      title: "Cierre y proyección",
      activities: ["Clase magistral pública", "Ensayo general", "Concierto final", "Ceremonia de clausura"],
    },
  ];

  const expectations = [
    {
      title: "Intensidad real",
      description: "8-10 horas diarias de actividades musicales. Este no es un campamento: es un entorno de alto rendimiento.",
    },
    {
      title: "Exigencia artística",
      description: "Los maestros esperan preparación seria, apertura al cambio, y compromiso total con la excelencia.",
    },
    {
      title: "Trabajo colaborativo",
      description: "La música de cámara requiere escucha profunda, flexibilidad y liderazgo compartido.",
    },
    {
      title: "Crecimiento personal",
      description: "Esta experiencia te confronta artística y emocionalmente. Saldrás transformado.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="relative flex min-h-[50vh] items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={programImage}
            alt="Violin detail"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">El Programa</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/80">
            7 días de inmersión total en música de cuerdas y piano.
            <br />
            Una experiencia que acelera tu desarrollo artístico.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl">
              Acelerador de <span className="text-[#D4AF37]">formación musical</span>
            </h2>
            <p className="text-lg text-white/70">
              Semana de las Cuerdas no es una masterclass convencional. Es una plataforma de
              transformación intensiva donde jóvenes músicos trabajan con maestros internacionales
              en un ambiente de exigencia artística, colaboración profunda, y proyección profesional.
            </p>
          </div>

          <div className="rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-8">
            <h3 className="mb-4 text-2xl text-[#D4AF37]">¿Para quién es este programa?</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#D4AF37]">→</span>
                <span>
                  Músicos de 15-25 años con nivel avanzado o pre-profesional que buscan acelerar
                  su trayectoria artística
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#D4AF37]">→</span>
                <span>
                  Talentos comprometidos con la excelencia, dispuestos a trabajar con intensidad
                  y abrirse a nuevas perspectivas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#D4AF37]">→</span>
                <span>
                  Estudiantes que valoran la música de cámara como herramienta esencial de
                  formación musical y humana
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#D4AF37]">→</span>
                <span>
                  Músicos que buscan no solo mejorar técnica, sino consolidar identidad artística,
                  profundidad interpretativa, y madurez escénica
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Actividades <span className="text-[#D4AF37]">principales</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#D4AF37]/50"
              >
                <activity.icon className="mb-4 h-10 w-10 text-[#D4AF37]" />
                <h3 className="mb-3 text-xl">{activity.title}</h3>
                <p className="text-white/60">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Estructura <span className="text-[#D4AF37]">de la semana</span>
          </h2>

          <div className="space-y-8">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-3xl text-[#D4AF37]">{item.day}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <h3 className="text-2xl">{item.title}</h3>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {item.activities.map((activity, actIdx) => (
                    <li key={actIdx} className="flex items-start gap-2 text-white/70">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm bg-white/5 p-6 text-center">
            <p className="text-white/60">
              <strong className="text-[#D4AF37]">Horario típico:</strong>{" "}
              09:00 - 13:00 actividades matutinas | 14:00 - 18:00 actividades vespertinas | 
              19:00 - 21:00 recitales y eventos especiales
            </p>
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Qué <span className="text-[#D4AF37]">esperar</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {expectations.map((item, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <h3 className="mb-4 text-2xl text-[#D4AF37]">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-sm border-2 border-[#D4AF37]/30 bg-[#D4AF37]/5 p-8">
            <h3 className="mb-4 text-center text-2xl text-[#D4AF37]">
              ¿Qué NO es Semana de las Cuerdas?
            </h3>
            <ul className="max-w-3xl mx-auto space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">×</span>
                <span>No es un campamento recreativo o vacacional</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">×</span>
                <span>No es un espacio sin exigencia o de participación relajada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">×</span>
                <span>No es solo para networking o turismo musical</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">×</span>
                <span>No es un programa para principiantes o nivel intermedio bajo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">
            ¿Listo para la <span className="text-[#D4AF37]">transformación</span>?
          </h2>
          <p className="mb-10 text-xl text-white/60">
            Las audiciones están abiertas. Becas disponibles según mérito artístico.
          </p>
          <a
            href="/audiciona"
            className="inline-block rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
          >
            Audiciona ahora
          </a>
        </div>
      </section>
    </div>
  );
}