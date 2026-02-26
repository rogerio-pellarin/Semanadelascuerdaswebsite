import { Link } from 'react-router';
import { Play, ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteImages } from '../hooks/useSiteImages';
import SEO, { getEventStructuredData, getOrganizationStructuredData } from '../components/SEO';

interface HomeContentLang {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  video: {
    title: string;
    description: string;
    vimeoId: string;
    vimeoUrl: string;
  };
  whatWeOffer: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    title: string;
    items: Array<{
      id: string;
      quote: string;
      author: string;
      role: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    description: string;
  };
}

interface HomeContent {
  es: HomeContentLang;
  en: HomeContentLang;
  pt: HomeContentLang;
}

export default function Home() {
  const { language } = useLanguage();
  const [content, setContent] = useState<HomeContent | null>(null);
  const { images } = useSiteImages();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/home-content`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al cargar contenido');

      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  // Default values while loading
  const defaultContent: HomeContentLang = {
    hero: {
      title: 'Acelera tu trayectoria artística',
      subtitle: '7 días intensivos con maestros internacionales de élite.',
      description: 'Clases 1:1, música de cámara, y proyección profesional.',
      backgroundImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80'
    },
    video: {
      title: 'Descubre la experiencia',
      description: 'Un vistazo al nivel artístico y la intensidad de Semana de las Cuerdas',
      vimeoId: '1168117010',
      vimeoUrl: 'https://vimeo.com/1168117010'
    },
    whatWeOffer: {
      title: 'Una experiencia de alto impacto',
      subtitle: 'No buscamos crear un evento bonito. Creamos una plataforma de transformación artística que acelera tu carrera hacia el nivel internacional.'
    },
    testimonials: {
      title: 'Lo que dicen nuestros músicos',
      items: [
        {
          id: '1',
          quote: 'Esta semana transformó mi manera de entender la música. El nivel de exigencia y la calidad de los maestros superó todas mis expectativas.',
          author: 'Ana Sofía Martínez',
          role: 'Violinista, 19 años'
        },
        {
          id: '2',
          quote: 'No es solo una masterclass, es una experiencia que acelera tu carrera. Aquí conocí a maestros que cambiaron mi perspectiva artística.',
          author: 'Mateo Rendón',
          role: 'Cellista, 22 años'
        }
      ]
    },
    cta: {
      title: '¿Estás listo para el siguiente nivel?',
      subtitle: 'Las audiciones para la próxima edición están abiertas.',
      description: 'Becas disponibles para talentos excepcionales.'
    }
  };

  // Get content for current language or fallback to default
  const langContent = content?.[language] || defaultContent;

  // Get activity images from CMS or fallback to highlights default
  const highlights = images?.home?.activities || [
    {
      id: '1',
      title: "Clases 1:1",
      image: "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: '2',
      title: "Música de Cámara",
      image: "https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: '3',
      title: "Recitales y Audiciones",
      image: "https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const highlightDescriptions = [
    "Sesiones individuales con maestros de orquestas internacionales de élite",
    "Ensambles curados y coaching de alta intensidad musical",
    "Plataforma de proyección con retroalimentación profesional"
  ];

  const stats = [
    { number: "150+", label: "Músicos formados", icon: Users },
    { number: "30+", label: "Maestros internacionales", icon: MapPin },
    { number: "7", label: "Días intensivos", icon: Calendar },
  ];

  return (
    <div>
      <SEO 
        title="Festival de Formación Musical de Élite para Jóvenes Talentos"
        description="Semana de las Cuerdas: 7 días intensivos del 5-10 de octubre 2026 con maestros internacionales. Clases individuales, música de cámara y proyección profesional para músicos de cuerdas y piano de 15-25 años en Medellín, Colombia."
        keywords="festival música clásica, masterclass cuerdas, formación musical élite, música cámara Colombia, audiciones música, clases violín cello piano, maestros internacionales música, Medellín música clásica, becas música, educación musical"
        type="event"
        image={langContent.hero.backgroundImage}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            getEventStructuredData(),
            getOrganizationStructuredData()
          ]
        }}
      />
      
      {/* Hero Section with Video Background */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/1168117010?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            className="absolute left-1/2 top-1/2 h-[100vw] w-[177.77vh] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Semana de las Cuerdas Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Event Dates Badge */}
            <div className="mb-6 inline-block rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">Octubre 2026</span>
              </div>
            </div>

            <h1 className="mb-6 text-5xl md:text-7xl">
              {langContent.hero.title}
            </h1>
            <p className="mb-8 text-xl text-white/80 md:text-2xl">
              {langContent.hero.subtitle}
              <br />
              {langContent.hero.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/audiciona"
                className="group flex items-center gap-2 rounded-sm bg-[#D4AF37] px-8 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
              >
                Audiciona ahora
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 rounded-sm border border-white/20 px-8 py-4 text-lg backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
              >
                <Play className="h-5 w-5" />
                Ver video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/10 bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="mx-auto mb-4 h-8 w-8 text-[#D4AF37]" />
                <div className="mb-2 text-5xl text-[#D4AF37]">{stat.number}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="bg-[#0a0a0a] py-24" id="video-player">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl md:text-5xl">
              {langContent.video.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              {langContent.video.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-sm border border-white/10 bg-black shadow-2xl">
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${langContent.video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                title="Semana de las Cuerdas 2026"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              Video promocional - Semana de las Cuerdas 2026
            </p>
            <a
              href={langContent.video.vimeoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[#D4AF37] transition-colors hover:text-[#C5A028]"
            >
              Ver en Vimeo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl md:text-5xl">
              {langContent.whatWeOffer.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              {langContent.whatWeOffer.subtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {highlights.map((item, idx) => (
              <div key={item.id} className="group overflow-hidden rounded-sm bg-white/5">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl">{item.title}</h3>
                  <p className="text-white/60">{highlightDescriptions[idx]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/programa"
              className="inline-flex items-center gap-2 text-[#D4AF37] transition-colors hover:text-[#C5A028]"
            >
              Ver programa completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl md:text-5xl">
            {langContent.testimonials.title}
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {langContent.testimonials.items.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <p className="mb-6 text-lg text-white/80">"{testimonial.quote}"</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-[#D4AF37]">{testimonial.author}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl md:text-5xl">
            {langContent.cta.title}
          </h2>
          <p className="mb-10 text-xl text-white/60">
            {langContent.cta.subtitle}
            <br />
            {langContent.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/audiciona"
              className="rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
            >
              Audiciona ahora
            </Link>
            <Link
              to="/apoya"
              className="rounded-sm border border-white/20 px-10 py-4 text-lg backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
            >
              Apoya una beca
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}