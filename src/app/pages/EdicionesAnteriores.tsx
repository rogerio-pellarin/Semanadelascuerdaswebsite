import { Calendar, Users, MapPin, Music } from "lucide-react";
import { useSiteImages } from "../hooks/useSiteImages";

export default function EdicionesAnteriores() {
  const { images } = useSiteImages();

  const defaultImages = [
    "https://images.unsplash.com/photo-1719753458800-c09cfb167ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMGNvbmNlcnQlMjBoYWxsJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxOTkwNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const getImageForYear = (year: string, index: number) => {
    const yearNum = parseInt(year);
    const edicionImage = images?.ediciones?.find((e: any) => e.year === yearNum);
    return edicionImage?.image || defaultImages[index] || defaultImages[0];
  };

  const editions = [
  {
    year: "2025",
    theme: "Intensidad y comunidad",
    participants: 35,
    countries: 8,
    concerts: 5,
    highlights: [
      "Primera participación de maestros de Chicago Symphony Orchestra",
      "Programa ampliado de talleres de salud mental para músicos",
      "Recital final con repertorio del siglo XXI",
    ],
    image: getImageForYear("2025", 0),
  },
  {
    year: "2024",
    theme: "Raíces y proyección",
    participants: 32,
    countries: 6,
    concerts: 4,
    highlights: [
      "Inclusión de repertorio latinoamericano en programas de cámara",
      "Taller de audiciones con panel de maestros internacionales",
      "Primera beca completa financiada por empresa privada",
    ],
    image: getImageForYear("2024", 1),
  },
  {
    year: "2023",
    theme: "Excelencia y apertura",
    participants: 28,
    countries: 5,
    concerts: 4,
    highlights: [
      "Primera masterclass pública abierta a la comunidad",
      "Incorporación de repertorio barroco con instrumentos de época",
      "Taller de gestión de carrera artística",
    ],
    image: getImageForYear("2023", 2),
  },
  {
    year: "2022",
    theme: "Reencuentro y resiliencia",
    participants: 25,
    countries: 4,
    concerts: 3,
    highlights: [
      "Primera edición post-pandemia con formato presencial completo",
      "Énfasis en salud mental y manejo de ansiedad escénica",
      "Concierto de cierre transmitido en streaming internacional",
    ],
    image: getImageForYear("2022", 3),
  },
  {
    year: "2019",
    theme: "Consolidación",
    participants: 22,
    countries: 4,
    concerts: 3,
    highlights: [
      "Primera participación de maestro de Berlin Philharmonic",
      "Expansión del programa de becas",
      "Alianza con conservatorio europeo para seguimiento de egresados",
    ],
    image: getImageForYear("2021", 4),
  },
  {
    year: "2018",
    theme: "Fundación",
    participants: 20,
    countries: 3,
    concerts: 2,
    highlights: [
      "Primera edición de Semana de las Cuerdas",
      "Participación de maestros de Royal Concertgebouw Orchestra",
      "Establecimiento del modelo pedagógico intensivo",
    ],
    image: getImageForYear("2020", 5),
  },
];

const milestones = [
  { year: "2018", event: "Primera edición con 20 participantes" },
  { year: "2019", event: "Primer maestro de Berlin Philharmonic" },
  { year: "2020", event: "Edición virtual durante pandemia" },
  { year: "2022", event: "Retorno presencial con streaming internacional" },
  { year: "2023", event: "Masterclasses públicas abiertas a la comunidad" },
  { year: "2024", event: "Inclusión de repertorio latinoamericano" },
  { year: "2025", event: "35 participantes de 8 países" },
];

  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Ediciones anteriores</h1>
          <p className="text-xl text-white/70">
            7 años construyendo excelencia, comunidad y transformación.
            <br />
            Un recorrido por nuestra historia y evolución.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Línea de <span className="text-[#D4AF37]">tiempo</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 h-full w-0.5 bg-white/10 md:left-1/2" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex items-center gap-8 md:gap-16">
                  {/* Year - left side on desktop */}
                  <div className="hidden w-1/2 text-right md:block">
                    {idx % 2 === 0 && (
                      <span className="text-2xl text-[#D4AF37]">{milestone.year}</span>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black md:absolute md:left-1/2 md:-ml-5">
                    <div className="h-3 w-3 rounded-full bg-[#D4AF37]" />
                  </div>

                  {/* Event - right side on desktop, full width on mobile */}
                  <div className="flex-1 md:w-1/2">
                    {/* Mobile year */}
                    <span className="mb-2 block text-xl text-[#D4AF37] md:hidden">
                      {milestone.year}
                    </span>
                    
                    {/* Desktop: show on right for even indices, left for odd */}
                    <div className={idx % 2 === 0 ? "" : "md:text-right"}>
                      {idx % 2 !== 0 && (
                        <span className="mb-2 hidden text-2xl text-[#D4AF37] md:block">
                          {milestone.year}
                        </span>
                      )}
                      <p className="text-white/70">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editions Grid */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Nuestras <span className="text-[#D4AF37]">ediciones</span>
          </h2>

          <div className="space-y-16">
            {editions.map((edition, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-8 lg:flex-row ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm">
                    <img
                      src={edition.image}
                      alt={`Edición ${edition.year}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-4xl text-[#D4AF37]">{edition.year}</h3>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  
                  <h4 className="mb-6 text-2xl">{edition.theme}</h4>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="rounded-sm bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl text-[#D4AF37]">{edition.participants}</div>
                      <div className="text-sm text-white/60">Músicos</div>
                    </div>
                    <div className="rounded-sm bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl text-[#D4AF37]">{edition.countries}</div>
                      <div className="text-sm text-white/60">Países</div>
                    </div>
                    <div className="rounded-sm bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl text-[#D4AF37]">{edition.concerts}</div>
                      <div className="text-sm text-white/60">Conciertos</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-3 text-sm uppercase tracking-wider text-[#D4AF37]">
                      Momentos destacados
                    </h5>
                    <ul className="space-y-2">
                      {edition.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-white/70">
                          <span className="mt-1 text-[#D4AF37]">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Stats */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Nuestro <span className="text-[#D4AF37]">crecimiento</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-2 text-5xl text-[#D4AF37]">+75%</div>
              <p className="text-white/60">Crecimiento en participantes desde 2018</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-2 text-5xl text-[#D4AF37]">8</div>
              <p className="text-white/60">Países representados en 2025</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-2 text-5xl text-[#D4AF37]">30+</div>
              <p className="text-white/60">Maestros internacionales en nuestra historia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote className="mb-8 text-2xl text-white/80 md:text-3xl">
            "Lo que más me impresiona es la consistencia. Cada año, el nivel sube.
            Los estudiantes llegan más preparados, los maestros más comprometidos,
            la comunidad más fuerte. Esto no es suerte: es visión y trabajo sostenido."
          </blockquote>
          <div className="border-t border-white/10 pt-6">
            <p className="text-[#D4AF37]">Marc Dubois</p>
            <p className="text-sm text-white/60">
              Viola principal, Royal Concertgebouw Orchestra
              <br />
              Maestro desde 2018
            </p>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">Archivo completo</h2>
          <p className="mb-10 text-lg text-white/60">
            Explora fotos, videos, programas de mano y más contenido de cada edición
            en nuestro archivo digital.
          </p>
          <a
            href="/galeria"
            className="inline-block rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
          >
            Ver galería completa
          </a>
        </div>
      </section>
    </div>
  );
}