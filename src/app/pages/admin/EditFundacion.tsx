import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { CMSEditor, CMSSection, CMSField, languages } from '../../components/admin/CMSEditor';

type Language = 'es' | 'en' | 'pt';

interface FundacionContentLang {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
  team: {
    title: string;
    members: Array<{
      id: string;
      name: string;
      role: string;
      bio: string;
    }>;
  };
}

interface FundacionContent {
  es: FundacionContentLang;
  en: FundacionContentLang;
  pt: FundacionContentLang;
}

export default function EditFundacion() {
  const [content, setContent] = useState<FundacionContent | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [needsReinit, setNeedsReinit] = useState(false);
  const [reinitializing, setReinitializing] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/fundacion-content`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al cargar contenido');

      const data = await response.json();

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
    if (
      !confirm(
        '¿Estás seguro de que quieres reinicializar todos los datos? Esto restaurará los valores por defecto en todos los idiomas (español, inglés y portugués).'
      )
    ) {
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
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/fundacion-content`,
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

  const updateField = (section: keyof FundacionContentLang, field: string, value: any) => {
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

  const updateTeamMember = (index: number, field: string, value: string) => {
    if (!content) return;
    const newMembers = [...content[currentLang].team.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setContent({
      ...content,
      [currentLang]: {
        ...content[currentLang],
        team: {
          ...content[currentLang].team,
          members: newMembers,
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
            Los datos de idiomas no están configurados correctamente. El sistema necesita tener
            español, inglés y portugués configurados.
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
            <p className={`mt-4 text-sm ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  const langContent = content[currentLang];

  return (
    <CMSEditor
      title="Editar Página - La Fundación"
      currentLang={currentLang}
      onLangChange={setCurrentLang}
      onSave={handleSave}
      saving={saving}
      message={message}
      onReinitialize={handleReinitialize}
      reinitializing={reinitializing}
    >
      {/* Hero Section */}
      <CMSSection title="Sección Hero">
        <CMSField
          label="Título Principal"
          value={langContent.hero.title}
          onChange={(value) => updateField('hero', 'title', value)}
        />
        <CMSField
          label="Subtítulo"
          value={langContent.hero.subtitle}
          onChange={(value) => updateField('hero', 'subtitle', value)}
          type="textarea"
        />
      </CMSSection>

      {/* About Section */}
      <CMSSection title="Quiénes Somos">
        <CMSField
          label="Título"
          value={langContent.about.title}
          onChange={(value) => updateField('about', 'title', value)}
        />
        <CMSField
          label="Contenido"
          value={langContent.about.content}
          onChange={(value) => updateField('about', 'content', value)}
          type="textarea"
          rows={3}
        />
      </CMSSection>

      {/* Vision Section */}
      <CMSSection title="Nuestra Visión">
        <CMSField
          label="Título"
          value={langContent.vision.title}
          onChange={(value) => updateField('vision', 'title', value)}
        />
        <CMSField
          label="Contenido"
          value={langContent.vision.content}
          onChange={(value) => updateField('vision', 'content', value)}
          type="textarea"
          rows={3}
        />
      </CMSSection>

      {/* Team Section */}
      <CMSSection title="Equipo Directivo">
        <CMSField
          label="Título de Sección"
          value={langContent.team.title}
          onChange={(value) => updateField('team', 'title', value)}
        />

        <div className="space-y-6">
          {langContent.team.members.map((member, index) => (
            <div key={member.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
              <h3 className="mb-3 text-sm font-medium text-[#D4AF37]">Miembro {index + 1}</h3>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">Nombre</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/40">Rol</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/40">Biografía</label>
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                    rows={2}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CMSSection>
    </CMSEditor>
  );
}
