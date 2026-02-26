import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { AlertCircle, RefreshCw, Image as ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

interface SiteImages {
  home: {
    heroBackground: string;
    activities: Array<{
      id: string;
      title: string;
      image: string;
    }>;
  };
  audiciona: {
    headerImage: string;
  };
  programa: {
    programImage: string;
  };
  fundacion: {
    foundationImage: string;
  };
  galeria: Array<{
    id: string;
    category: string;
    title: string;
    image: string;
  }>;
  ediciones: Array<{
    id: string;
    year: number;
    image: string;
  }>;
}

interface SiteConfig {
  auditions_open: boolean;
  event_dates: {
    start: string;
    end: string;
    display: string;
  };
  audition_dates: {
    open: string;
    close: string;
    display: string;
  };
  current_edition: number;
  location: string;
  social_media?: {
    instagram: string;
    facebook: string;
    youtube: string;
    email: string;
  };
}

export default function EditSettings() {
  const [images, setImages] = useState<SiteImages | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [imagesRes, configRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/site-images`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/config`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        ),
      ]);

      if (!imagesRes.ok || !configRes.ok) throw new Error('Error al cargar datos');

      const imagesData = await imagesRes.json();
      const configData = await configRes.json();

      setImages(imagesData);
      setConfig(configData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error al cargar la configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImages = async () => {
    if (!images) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/site-images`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(images),
        }
      );

      if (!response.ok) throw new Error('Error al guardar');

      setMessage('✓ Imágenes guardadas exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving images:', error);
      setMessage('Error al guardar las imágenes');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/config`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(config),
        }
      );

      if (!response.ok) throw new Error('Error al guardar');

      setMessage('✓ Configuración guardada exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('Error al guardar la configuración');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    if (!images || !config) return;

    setSaving(true);
    setMessage('');

    try {
      const [imagesRes, configRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/site-images`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(images),
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/config`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(config),
          }
        ),
      ]);

      if (!imagesRes.ok || !configRes.ok) throw new Error('Error al guardar');

      setMessage('✓ Todos los cambios guardados exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving all:', error);
      setMessage('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const updateImage = (section: keyof SiteImages, field: string, value: string) => {
    if (!images) return;
    setImages({
      ...images,
      [section]: {
        ...(images[section] as any),
        [field]: value,
      },
    });
  };

  const updateActivity = (index: number, field: string, value: string) => {
    if (!images) return;
    const newActivities = [...images.home.activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setImages({
      ...images,
      home: {
        ...images.home,
        activities: newActivities,
      },
    });
  };

  const updateGalleryImage = (index: number, field: string, value: string) => {
    if (!images) return;
    const newGallery = [...images.galeria];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setImages({
      ...images,
      galeria: newGallery,
    });
  };

  const updateEdicionImage = (index: number, value: string) => {
    if (!images) return;
    const newEdiciones = [...images.ediciones];
    newEdiciones[index] = { ...newEdiciones[index], image: value };
    setImages({
      ...images,
      ediciones: newEdiciones,
    });
  };

  const toggleAuditions = () => {
    if (!config) return;
    setConfig({
      ...config,
      auditions_open: !config.auditions_open,
    });
  };

  const handleReinitialize = async () => {
    if (!confirm('¿Estás seguro de que quieres reinicializar todos los datos?')) {
      return;
    }

    setSaving(true);
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

      setTimeout(() => {
        setLoading(true);
        fetchData();
      }, 1000);
    } catch (error) {
      console.error('Error initializing:', error);
      setMessage('Error al inicializar datos');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <RefreshCw className="h-8 w-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!images || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-sm border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-2xl font-medium text-white">Error de Configuración</h2>
          <p className="mb-6 text-white/60">
            No se pudieron cargar los datos. Por favor, recarga la página.
          </p>
        </div>
      </div>
    );
  }

  // Validate that all required data structures exist
  if (!images.home || !images.audiciona || !images.programa || !images.fundacion || !images.galeria || !images.ediciones) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-sm border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-2xl font-medium text-white">Datos incompletos</h2>
          <p className="mb-6 text-white/60">
            La estructura de datos no está completa. Por favor, reinicializa los datos usando el botón en la barra lateral.
          </p>
          <button
            onClick={handleReinitialize}
            disabled={saving}
            className="rounded-sm bg-[#D4AF37] px-6 py-3 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
          >
            {saving ? 'Reinicializando...' : 'Reinicializar Datos'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <AdminSidebar onReinitialize={handleReinitialize} reinitializing={saving} />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl">Configuración del Sitio</h1>
                <button
                  onClick={handleSaveAll}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-2 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {saving ? 'Guardando...' : 'Guardar Todo'}
                </button>
              </div>

              <p className="text-sm text-white/60">
                Gestiona las imágenes del sitio y el estado de las audiciones
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

            {/* Audiciones Toggle */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl text-[#D4AF37]">Control de Audiciones</h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    Estado actual: {config.auditions_open ? (
                      <span className="text-green-400">Audiciones ABIERTAS</span>
                    ) : (
                      <span className="text-red-400">Audiciones CERRADAS</span>
                    )}
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    {config.auditions_open 
                      ? 'Los usuarios pueden enviar sus audiciones' 
                      : 'Los usuarios solo pueden unirse a la lista de espera'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    toggleAuditions();
                    setTimeout(() => handleSaveConfig(), 100);
                  }}
                  className={`flex items-center gap-2 rounded-sm px-6 py-3 text-white transition-colors ${
                    config.auditions_open 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {config.auditions_open ? (
                    <>
                      <ToggleRight className="h-5 w-5" />
                      <span>Cerrar Audiciones</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-5 w-5" />
                      <span>Abrir Audiciones</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Home Images */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Página de Inicio
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Imagen de Fondo del Hero</label>
                  <input
                    type="text"
                    value={images.home.heroBackground}
                    onChange={(e) => updateImage('home', 'heroBackground', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="pt-4">
                  <h3 className="mb-3 text-sm font-medium text-white/80">Imágenes de Actividades</h3>
                  <div className="space-y-4">
                    {images.home.activities.map((activity, index) => (
                      <div key={activity.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
                        <p className="mb-2 text-xs text-white/40">{activity.title}</p>
                        <input
                          type="text"
                          value={activity.image}
                          onChange={(e) => updateActivity(index, 'image', e.target.value)}
                          className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                          placeholder="https://..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Audiciona Page */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Página Audiciona
              </h2>
              
              <div>
                <label className="mb-2 block text-sm text-white/60">Imagen de Encabezado</label>
                <input
                  type="text"
                  value={images.audiciona.headerImage}
                  onChange={(e) => updateImage('audiciona', 'headerImage', e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  placeholder="https://..."
                />
              </div>
            </section>

            {/* Programa Page */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Página El Programa
              </h2>
              
              <div>
                <label className="mb-2 block text-sm text-white/60">Imagen del Programa</label>
                <input
                  type="text"
                  value={images.programa.programImage}
                  onChange={(e) => updateImage('programa', 'programImage', e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  placeholder="https://..."
                />
              </div>
            </section>

            {/* Fundacion Page */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Página Fundación
              </h2>
              
              <div>
                <label className="mb-2 block text-sm text-white/60">Imagen de Fundación</label>
                <input
                  type="text"
                  value={images.fundacion.foundationImage}
                  onChange={(e) => updateImage('fundacion', 'foundationImage', e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                  placeholder="https://..."
                />
              </div>
            </section>

            {/* Ediciones Images */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Ediciones Anteriores
              </h2>
              
              <div className="space-y-4">
                {images.ediciones.map((item, index) => (
                  <div key={item.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
                    <p className="mb-2 text-sm text-white font-medium">Edición {item.year}</p>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => updateEdicionImage(index, e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                      placeholder="https://..."
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Social Media Configuration */}
            <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-[#D4AF37]">
                <ImageIcon className="h-5 w-5" />
                Redes Sociales
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/60">Instagram</label>
                  <input
                    type="text"
                    value={config.social_media?.instagram || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      social_media: {
                        ...(config.social_media || { instagram: '', facebook: '', youtube: '', email: '' }),
                        instagram: e.target.value
                      }
                    })}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                    placeholder="https://www.instagram.com/..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Facebook</label>
                  <input
                    type="text"
                    value={config.social_media?.facebook || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      social_media: {
                        ...(config.social_media || { instagram: '', facebook: '', youtube: '', email: '' }),
                        facebook: e.target.value
                      }
                    })}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                    placeholder="https://www.facebook.com/..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">YouTube</label>
                  <input
                    type="text"
                    value={config.social_media?.youtube || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      social_media: {
                        ...(config.social_media || { instagram: '', facebook: '', youtube: '', email: '' }),
                        youtube: e.target.value
                      }
                    })}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                    placeholder="https://www.youtube.com/..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Email de Contacto</label>
                  <input
                    type="email"
                    value={config.social_media?.email || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      social_media: {
                        ...(config.social_media || { instagram: '', facebook: '', youtube: '', email: '' }),
                        email: e.target.value
                      }
                    })}
                    className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
                    placeholder="info@semanadelascuerdas.com"
                  />
                </div>
              </div>
            </section>

            {/* Save Button at Bottom */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {saving ? 'Guardando...' : 'Guardar Todo'}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}