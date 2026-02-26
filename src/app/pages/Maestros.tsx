import { useMaestros } from '../hooks/useSupabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface MaestrosContent {
  hero: {
    title: string;
    subtitle: string;
  };
  philosophy: {
    title: string;
    values: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  selection: {
    title: string;
    criteria: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export default function Maestros() {
  const { maestros, loading: maestrosLoading, error: maestrosError } = useMaestros();
  const { language } = useLanguage();
  const [content, setContent] = useState<MaestrosContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros-content`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) throw new Error('Error al cargar contenido');

        const data = await response.json();
        setContent(data[language]);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  if (loading || maestrosLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Cargando maestros...</div>
      </div>
    );
  }

  if (maestrosError) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar maestros: {maestrosError}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar contenido</div>
      </div>
    );
  }

  const teachersList = maestros || [];

  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">{content.hero.title}</h1>
          <p className="text-xl text-white/70">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teachersList.map((teacher, idx) => {
              // Get bio in current language, fallback to Spanish
              const bio = teacher[`bio_${language}`] || teacher.bio_es || teacher.bio || '';
              
              return (
                <div
                  key={idx}
                  className="group overflow-hidden rounded-sm bg-white/5 transition-all hover:bg-white/10"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-2xl">{teacher.name}</h3>
                    <p className="mb-3 text-sm text-[#D4AF37]">{teacher.instrument}</p>
                    <p className="mb-4 text-sm text-white/60">{bio}</p>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-white/50">{teacher.institution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            {content.philosophy.title}
          </h2>

          <div className="space-y-8">
            {content.philosophy.values.map((value) => (
              <div
                key={value.id}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <h3 className="mb-3 text-2xl text-[#D4AF37]">{value.title}</h3>
                <p className="text-lg text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            {content.selection.title}
          </h2>

          <div className="space-y-6">
            {content.selection.criteria.map((criterion, idx) => (
              <div key={criterion.id} className="rounded-sm bg-white/5 p-8">
                <h3 className="mb-3 text-xl text-[#D4AF37]">
                  {idx + 1}. {criterion.title}
                </h3>
                <p className="text-white/70">
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-y border-white/10 bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote className="text-2xl text-white/80 md:text-3xl">
            "{content.testimonial.quote}"
          </blockquote>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[#D4AF37]">{content.testimonial.author}</p>
            <p className="text-sm text-white/60">{content.testimonial.role}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">
            {content.cta.title}
          </h2>
          <p className="mb-10 text-xl text-white/60">
            {content.cta.description}
          </p>
          <a
            href="/audiciona"
            className="inline-block rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
          >
            {content.cta.buttonText}
          </a>
        </div>
      </section>
    </div>
  );
}