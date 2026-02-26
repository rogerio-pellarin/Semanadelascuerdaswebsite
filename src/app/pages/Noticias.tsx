import { Calendar, ArrowRight } from "lucide-react";
import { useNoticias } from '../hooks/useSupabase';

const categories = ["Todas", "Audiciones", "Maestros", "Resultados", "Alianzas", "Eventos", "Programa"];

export default function Noticias() {
  const { noticias, loading, error } = useNoticias();

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Cargando noticias...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar noticias: {error}</div>
      </div>
    );
  }

  // Filter published news and sort by date (newest first)
  const publishedNews = Array.isArray(noticias) 
    ? noticias
        .filter((n: any) => n?.published)
        .sort((a: any, b: any) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime())
    : [];

  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Noticias</h1>
          <p className="text-xl text-white/70">
            Mantente al día con actualizaciones sobre audiciones, maestros confirmados,
            historias de éxito de nuestros músicos, y novedades del programa.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-white/10 bg-[#0a0a0a] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-sm border border-white/20 px-6 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="mb-2 inline-block rounded-sm bg-[#D4AF37]/20 px-3 py-1 text-sm text-[#D4AF37]">
              Destacado
            </span>
            <h2 className="text-3xl">Audiciones abiertas para edición 2026</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-sm">
              <img
                src={news[0].image}
                alt={news[0].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                <Calendar className="h-4 w-4" />
                <span>{news[0].date}</span>
                <span>•</span>
                <span className="text-[#D4AF37]">{news[0].category}</span>
              </div>
              <p className="mb-8 text-xl text-white/80">
                El proceso de audiciones para nuestra octava edición ya está abierto. Buscamos
                músicos de cuerdas y piano entre 15 y 25 años con alto nivel técnico, compromiso
                artístico y disposición para el trabajo intensivo. Becas disponibles según mérito
                y necesidad. Fecha límite: 30 de abril 2026.
              </p>
              <div>
                <a
                  href="/audiciona"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-all hover:bg-[#C5A028]"
                >
                  Aplica ahora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl">Actualizaciones recientes</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {publishedNews.map((item, idx) => (
              <article
                key={idx}
                className="group overflow-hidden rounded-sm bg-white/5 transition-all hover:bg-white/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-sm text-white/60">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <span className="mb-3 inline-block rounded-sm bg-[#D4AF37]/20 px-2 py-1 text-xs text-[#D4AF37]">
                    {item.category}
                  </span>
                  <h3 className="mb-3 text-xl">{item.title}</h3>
                  <p className="mb-4 text-sm text-white/60">{item.excerpt}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-2 text-sm text-[#D4AF37] transition-colors hover:text-[#C5A028]"
                  >
                    Leer más
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="mb-4 text-3xl">No te pierdas ninguna novedad</h2>
            <p className="mb-8 text-white/60">
              Suscríbete a nuestro boletín y recibe actualizaciones directamente en tu correo.
              <br />
              Información sobre audiciones, fechas, maestros confirmados y más.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="rounded-sm border border-white/20 bg-white/5 px-6 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-[#D4AF37] focus:outline-none sm:w-80"
              />
              <button
                type="submit"
                className="rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-all hover:bg-[#C5A028]"
              >
                Suscribirse
              </button>
            </form>
            <p className="mt-4 text-sm text-white/50">
              Enviamos máximo 2 emails al mes. Sin spam. Puedes cancelar cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl">Síguenos en redes sociales</h2>
          <p className="mb-10 text-white/60">
            Contenido exclusivo, historias de nuestros músicos, y actualizaciones en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/watch?v=aK-Xg6MTf1Q"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}