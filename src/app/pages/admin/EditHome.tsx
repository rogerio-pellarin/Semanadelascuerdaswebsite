import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { AlertCircle, RefreshCw } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

type Language = 'es' | 'en' | 'pt';

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

export default function EditHome() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [needsReinit, setNeedsReinit] = useState(false);
  const [reinitializing, setReinitializing] = useState(false);

  const languages = [
    { code: 'es' as Language, label: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'pt' as Language, label: 'Português', flag: '🇧🇷' },
  ];

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
      
      // Verificar que existan los 3 idiomas
      if (!data.es || !data.en || !data.pt) {
        console.error('Missing language data:', { es: !!data.es, en: !!data.en, pt: !!data.pt });
        setNeedsReinit(true);
        throw new Error('Faltan datos de idiomas');
      }
      
      setContent(data);
      setNeedsReinit(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  };

  const handleReinitialize = async () => {
    if (!confirm('¿Estás seguro de que quieres reinicializar todos los datos? Esto restaurará los valores por defecto en todos los idiomas (español, inglés y portugués).')) {
      return;
    }

    setReinitializing(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/admin/force-init`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al inicializar');

      const data = await response.json();
      setMessage(`✓ ${data.message}. Recargando...`);
      
      // Wait 1 second and reload content
      setTimeout(() => {
        setLoading(true);
        fetchContent();
      }, 1000);
    } catch (error) {
      console.error('Error initializing:', error);
      setMessage('Error al inicializar datos');
    } finally {
      setReinitializing(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/home-content`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(content),
        }
      );

      if (!response.ok) throw new Error('Error al guardar');

      setMessage('✓ Contenido guardado exitosamente en todos los idiomas');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error al guardar el contenido');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: keyof HomeContentLang, field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      [currentLang]: {
        ...content[currentLang],
        [section]: {
          ...(content[currentLang][section] as any),
          [field]: value,
        },
      },
    });
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    if (!content) return;
    const newItems = [...content[currentLang].testimonials.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      [currentLang]: {
        ...content[currentLang],
        testimonials: {
          ...content[currentLang].testimonials,
          items: newItems,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <RefreshCw className="h-8 w-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!content || needsReinit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-sm border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-2xl font-medium text-white">Error de Configuración</h2>
          <p className="mb-6 text-white/60">
            Los datos de idiomas no están configurados correctamente. 
            El sistema necesita tener español, inglés y portugués configurados.
          </p>
          <button
            onClick={handleReinitialize}
            disabled={reinitializing}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-3 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${reinitializing ? 'animate-spin' : ''}`} />
            {reinitializing ? 'Reinicializando...' : 'Reinicializar Sistema'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${
              message.startsWith('✓') ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  const langContent = content[currentLang];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <AdminSidebar onReinitialize={handleReinitialize} reinitializing={reinitializing} />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl">Editar Página de Inicio</h1>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-2 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>

              {/* Language Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`flex items-center gap-2 rounded-t-sm px-4 py-2 transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    {currentLang === lang.code && <AlertCircle className="h-4 w-4" />}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-sm text-white/60">
                Editando contenido en: <span className="text-[#D4AF37]">{languages.find(l => l.code === currentLang)?.label}</span>
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 rounded-sm p-4 ${
                  message.startsWith('✓')
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {message}
              </div>
            )}

            {/* Hero Section */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Sección Hero</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Título Principal</label>
                  <input
                    type="text"
                    value={langContent.hero.title}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Subtítulo</label>
                  <input
                    type="text"
                    value={langContent.hero.subtitle}
                    onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Descripción</label>
                  <input
                    type="text"
                    value={langContent.hero.description}
                    onChange={(e) => updateField('hero', 'description', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">URL de Imagen de Fondo</label>
                  <input
                    type="text"
                    value={langContent.hero.backgroundImage}
                    onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Video Section */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Sección Video</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Título</label>
                  <input
                    type="text"
                    value={langContent.video.title}
                    onChange={(e) => updateField('video', 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Descripción</label>
                  <textarea
                    value={langContent.video.description}
                    onChange={(e) => updateField('video', 'description', e.target.value)}
                    rows={2}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Vimeo ID</label>
                  <input
                    type="text"
                    value={langContent.video.vimeoId}
                    onChange={(e) => updateField('video', 'vimeoId', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Vimeo URL</label>
                  <input
                    type="text"
                    value={langContent.video.vimeoUrl}
                    onChange={(e) => updateField('video', 'vimeoUrl', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>
              </div>
            </section>

            {/* What We Offer Section */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Sección "Lo Que Ofrecemos"</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Título</label>
                  <input
                    type="text"
                    value={langContent.whatWeOffer.title}
                    onChange={(e) => updateField('whatWeOffer', 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Subtítulo</label>
                  <textarea
                    value={langContent.whatWeOffer.subtitle}
                    onChange={(e) => updateField('whatWeOffer', 'subtitle', e.target.value)}
                    rows={3}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Sección Testimonios</h2>
              
              <div className="mb-4">
                <label className="mb-2 block text-sm text-white/60">Título de Sección</label>
                <input
                  type="text"
                  value={langContent.testimonials.title}
                  onChange={(e) => updateField('testimonials', 'title', e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                />
              </div>

              <div className="space-y-6">
                {langContent.testimonials.items.map((item, index) => (
                  <div key={item.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
                    <h3 className="mb-3 text-sm font-medium text-[#D4AF37]">
                      Testimonio {index + 1}
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs text-white/40">Cita</label>
                        <textarea
                          value={item.quote}
                          onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                          rows={3}
                          className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-white/40">Autor</label>
                          <input
                            type="text"
                            value={item.author}
                            onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                            className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-white/40">Rol</label>
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                            className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Sección CTA (Call to Action)</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Título</label>
                  <input
                    type="text"
                    value={langContent.cta.title}
                    onChange={(e) => updateField('cta', 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Subtítulo</label>
                  <input
                    type="text"
                    value={langContent.cta.subtitle}
                    onChange={(e) => updateField('cta', 'subtitle', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Descripción</label>
                  <input
                    type="text"
                    value={langContent.cta.description}
                    onChange={(e) => updateField('cta', 'description', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Save Button at Bottom */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}