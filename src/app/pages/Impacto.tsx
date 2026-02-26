import { Users, Award, TrendingUp, Heart } from "lucide-react";

const stats = [
  { number: "150+", label: "Músicos transformados", icon: Users },
  { number: "85%", label: "Con becas totales o parciales", icon: Award },
  { number: "92%", label: "Continúan estudios avanzados", icon: TrendingUp },
  { number: "7", label: "Ediciones realizadas", icon: Heart },
];

const testimonials = [
  {
    quote: "Esta semana no solo mejoró mi técnica: transformó mi relación con la música. Aprendí que la excelencia y la humanidad no son opuestas.",
    author: "Valentina Gómez",
    role: "Violinista, ahora en Juilliard School",
    year: "Participante 2023",
  },
  {
    quote: "Vine buscando clases de alto nivel. Me llevé una familia musical, mentores increíbles, y claridad sobre mi camino artístico.",
    author: "Santiago Morales",
    role: "Cellista, ahora en Orquesta Sinfónica Juvenil",
    year: "Participante 2024",
  },
  {
    quote: "La intensidad fue real, pero siempre acompañada de respeto y confianza. Este programa me enseñó a exigirme sin destruirme.",
    author: "Isabella Ramírez",
    role: "Pianista, finalista Concurso Internacional",
    year: "Participante 2025",
  },
];

const outcomes = [
  {
    title: "Continuidad formativa",
    description: "El 92% de nuestros participantes continúa estudios de alto nivel en conservatorios, universidades o programas pre-profesionales.",
  },
  {
    title: "Proyección profesional",
    description: "Músicos formados en Semana de las Cuerdas han ganado concursos internacionales, obtenido posiciones en orquestas juveniles, y construido carreras sólidas.",
  },
  {
    title: "Red de apoyo",
    description: "Creamos una comunidad duradera. Los participantes mantienen contacto, colaboran en proyectos, y se apoyan mutuamente en sus trayectorias.",
  },
  {
    title: "Transformación personal",
    description: "Más allá de la técnica musical, nuestros músicos desarrollan resiliencia, liderazgo, trabajo en equipo, y confianza artística.",
  },
];

export default function Impacto() {
  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Impacto</h1>
          <p className="text-xl text-white/70">
            Medimos nuestro éxito no solo en técnica musical, sino en trayectorias transformadas,
            artistas seguros de sí mismos, y una comunidad musical vibrante y sostenible.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="mx-auto mb-4 h-10 w-10 text-[#D4AF37]" />
                <div className="mb-2 text-5xl text-[#D4AF37]">{stat.number}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Resultados <span className="text-[#D4AF37]">medibles</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <h3 className="mb-4 text-2xl text-[#D4AF37]">{outcome.title}</h3>
                <p className="text-white/70">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Historias de <span className="text-[#D4AF37]">transformación</span>
          </h2>

          <div className="space-y-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <p className="mb-6 text-xl text-white/80">"{testimonial.quote}"</p>
                <div className="flex items-start justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[#D4AF37]">{testimonial.author}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/50">{testimonial.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Impacto <span className="text-[#D4AF37]">social</span>
          </h2>

          <div className="rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-10">
            <h3 className="mb-6 text-center text-2xl text-[#D4AF37]">
              Democratizando el acceso a la excelencia
            </h3>
            <div className="space-y-6 text-white/70">
              <p>
                Creemos que el talento artístico no depende de recursos económicos. Por eso, 
                el 85% de nuestros participantes recibe becas totales o parciales, financiadas 
                por donantes, aliados institucionales, y la Fundación Vivat.
              </p>
              <p>
                Semana de las Cuerdas no es un programa para familias privilegiadas: es una 
                plataforma de movilidad social a través del arte. Identificamos talento donde 
                sea que esté, y creamos las condiciones para que florezca.
              </p>
              <p>
                Cada beca es una apuesta por un músico, una familia, una comunidad. Cada músico 
                formado aquí se convierte en multiplicador: maestro, mentor, inspiración para otros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-term Vision */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Visión a <span className="text-[#D4AF37]">largo plazo</span>
          </h2>

          <div className="space-y-8">
            <div className="rounded-sm bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Construir ecosistema musical</h3>
              <p className="text-white/70">
                Queremos crear una red sostenible de músicos de élite en Colombia y Latinoamérica.
                Músicos que no tengan que emigrar para crecer, que puedan construir carreras
                locales e internacionales desde aquí.
              </p>
            </div>

            <div className="rounded-sm bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Formar formadores</h3>
              <p className="text-white/70">
                Los participantes de hoy serán maestros del mañana. Estamos sembrando una
                generación de músicos que combinará excelencia técnica con visión pedagógica
                humanista y compromiso con la democratización del arte.
              </p>
            </div>

            <div className="rounded-sm bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Elevar estándares regionales</h3>
              <p className="text-white/70">
                Cada edición de Semana de las Cuerdas eleva el nivel de exigencia y expectativa.
                Mostramos que es posible hacer música de nivel internacional desde Medellín,
                con recursos modestos pero visión clara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">
            Sé parte del <span className="text-[#D4AF37]">impacto</span>
          </h2>
          <p className="mb-10 text-xl text-white/60">
            Ya seas músico, donante o aliado institucional, puedes contribuir
            a esta transformación.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/audiciona"
              className="rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
            >
              Audiciona
            </a>
            <a
              href="/apoya"
              className="rounded-sm border border-white/20 px-10 py-4 text-lg transition-all hover:border-white/40 hover:bg-white/5"
            >
              Apoya una beca
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
