import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { AlertCircle, RefreshCw, Plus, Pencil, Save, X, Upload } from 'lucide-react';
import { CMSEditor, CMSSection, CMSField, languages } from '../../components/admin/CMSEditor';

type Language = 'es' | 'en' | 'pt';

interface MaestrosContentLang {
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

interface MaestrosContent {
  es: MaestrosContentLang;
  en: MaestrosContentLang;
  pt: MaestrosContentLang;
}

interface Maestro {
  id: string;
  name: string;
  instrument: string;
  bio_es: string;
  bio_en?: string;
  bio_pt?: string;
  institution: string;
  country: string;
  role: string;
  image: string;
  featured: boolean;
  order: number;
}

export default function EditMaestros() {
  const [content, setContent] = useState<MaestrosContent | null>(null);
  const [maestros, setMaestros] = useState<Maestro[]>([]);
  const [editingMaestro, setEditingMaestro] = useState<Maestro | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [needsReinit, setNeedsReinit] = useState(false);
  const [reinitializing, setReinitializing] = useState(false);
  const [showMaestrosSection, setShowMaestrosSection] = useState(true);

  useEffect(() => {
    fetchContent();
    fetchMaestros();
  }, []);

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

      if (!data.es || !data.en || !data.pt) {
        console.error('Missing language data:', { es: !!data.es, en: !!data.en, pt: !!data.pt });
        // Auto-initialize maestros content
        await autoInitializeMaestrosContent();
        return;
      }

      setContent(data);
      setNeedsReinit(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Try to auto-initialize on error
      await autoInitializeMaestrosContent();
    } finally {
      setLoading(false);
    }
  };

  const autoInitializeMaestrosContent = async () => {
    console.log('Auto-initializing maestros content...');
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

      // Retry fetching content after initialization
      setTimeout(async () => {
        const retryResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros-content`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (retryResponse.ok) {
          const data = await retryResponse.json();
          if (data.es && data.en && data.pt) {
            setContent(data);
            setNeedsReinit(false);
          } else {
            setNeedsReinit(true);
          }
        } else {
          setNeedsReinit(true);
        }
      }, 1000);
    } catch (error) {
      console.error('Error auto-initializing:', error);
      setNeedsReinit(true);
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
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros-content`,
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

  const updateField = (section: keyof MaestrosContentLang, field: string, value: any) => {
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

  const updatePhilosophyValue = (index: number, field: string, value: string) => {
    if (!content) return;
    const newValues = [...content[currentLang].philosophy.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({
      ...content,
      [currentLang]: {
        ...content[currentLang],
        philosophy: {
          ...content[currentLang].philosophy,
          values: newValues,
        },
      },
    });
  };

  const updateSelectionCriteria = (index: number, field: string, value: string) => {
    if (!content) return;
    const newCriteria = [...content[currentLang].selection.criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setContent({
      ...content,
      [currentLang]: {
        ...content[currentLang],
        selection: {
          ...content[currentLang].selection,
          criteria: newCriteria,
        },
      },
    });
  };

  const fetchMaestros = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al cargar maestros');

      const data = await response.json();
      setMaestros(data);
    } catch (error) {
      console.error('Error fetching maestros:', error);
    }
  };

  const handleAddMaestro = () => {
    const newMaestro: Maestro = {
      id: '',
      name: '',
      instrument: '',
      bio_es: '',
      bio_en: '',
      bio_pt: '',
      institution: '',
      country: '',
      role: '',
      image: '',
      featured: false,
      order: maestros.length + 1,
    };
    setEditingMaestro(newMaestro);
  };

  const handleEditMaestro = (maestro: Maestro) => {
    setEditingMaestro(maestro);
  };

  const handleSaveMaestro = async () => {
    if (!editingMaestro) return;

    setSaving(true);
    setMessage('');

    try {
      const isNewMaestro = !editingMaestro.id || editingMaestro.id === '';
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros${
          isNewMaestro ? '' : `/${editingMaestro.id}`
        }`,
        {
          method: isNewMaestro ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(editingMaestro),
        }
      );

      if (!response.ok) throw new Error('Error al guardar maestro');

      const data = await response.json();
      
      if (isNewMaestro) {
        // Add new maestro to the list
        setMaestros((prevMaestros) => [...prevMaestros, data]);
      } else {
        // Update existing maestro
        setMaestros((prevMaestros) =>
          prevMaestros.map((maestro) => (maestro.id === data.id ? data : maestro))
        );
      }
      
      setEditingMaestro(null);
      setMessage('✓ Maestro guardado exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving maestro:', error);
      setMessage('Error al guardar el maestro');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMaestro = async (maestroId: string) => {
    if (
      !confirm(
        '¿Estás seguro de que quieres eliminar este maestro? Esta acción no se puede deshacer.'
      )
    ) {
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/maestros/${maestroId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al eliminar maestro');

      setMaestros((prevMaestros) => prevMaestros.filter((maestro) => maestro.id !== maestroId));
      setMessage('✓ Maestro eliminado exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting maestro:', error);
      setMessage('Error al eliminar el maestro');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingMaestro(null);
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
      title="Editar Página - Maestros"
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
          rows={3}
        />
      </CMSSection>

      {/* Philosophy Section */}
      <CMSSection title="Filosofía Pedagógica">
        <CMSField
          label="Título de Sección"
          value={langContent.philosophy.title}
          onChange={(value) => updateField('philosophy', 'title', value)}
        />

        <div className="space-y-6">
          {langContent.philosophy.values.map((value, index) => (
            <div key={value.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
              <h3 className="mb-3 text-sm font-medium text-[#D4AF37]">Valor {index + 1}</h3>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">Título</label>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => updatePhilosophyValue(index, 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/40">Descripción</label>
                  <textarea
                    value={value.description}
                    onChange={(e) => updatePhilosophyValue(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CMSSection>

      {/* Selection Criteria Section */}
      <CMSSection title="Criterios de Selección">
        <CMSField
          label="Título de Sección"
          value={langContent.selection.title}
          onChange={(value) => updateField('selection', 'title', value)}
        />

        <div className="space-y-6">
          {langContent.selection.criteria.map((criterion, index) => (
            <div key={criterion.id} className="rounded-sm border border-white/5 bg-black/50 p-4">
              <h3 className="mb-3 text-sm font-medium text-[#D4AF37]">Criterio {index + 1}</h3>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">Título</label>
                  <input
                    type="text"
                    value={criterion.title}
                    onChange={(e) => updateSelectionCriteria(index, 'title', e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/40">Descripción</label>
                  <textarea
                    value={criterion.description}
                    onChange={(e) => updateSelectionCriteria(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full rounded-sm border border-white/10 bg-black px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CMSSection>

      {/* Testimonial Section */}
      <CMSSection title="Testimonio">
        <CMSField
          label="Cita"
          value={langContent.testimonial.quote}
          onChange={(value) => updateField('testimonial', 'quote', value)}
          type="textarea"
          rows={3}
        />
        <CMSField
          label="Autor"
          value={langContent.testimonial.author}
          onChange={(value) => updateField('testimonial', 'author', value)}
        />
        <CMSField
          label="Rol/Institución"
          value={langContent.testimonial.role}
          onChange={(value) => updateField('testimonial', 'role', value)}
        />
      </CMSSection>

      {/* CTA Section */}
      <CMSSection title="Llamada a la Acción">
        <CMSField
          label="Título"
          value={langContent.cta.title}
          onChange={(value) => updateField('cta', 'title', value)}
        />
        <CMSField
          label="Descripción"
          value={langContent.cta.description}
          onChange={(value) => updateField('cta', 'description', value)}
          type="textarea"
        />
        <CMSField
          label="Texto del Botón"
          value={langContent.cta.buttonText}
          onChange={(value) => updateField('cta', 'buttonText', value)}
        />
      </CMSSection>

      {/* Maestros Section */}
      <CMSSection title="Maestros">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-[#D4AF37]">Lista de Maestros</h3>
          <button
            onClick={handleAddMaestro}
            className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-black transition-colors hover:bg-[#C5A028]"
          >
            <Plus className="h-5 w-5" />
            Agregar Maestro
          </button>
        </div>

        <div className="mt-4">
          {maestros.map((maestro) => (
            <div key={maestro.id} className="mb-4 rounded-sm border border-white/5 bg-black/50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#D4AF37]">{maestro.name}</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditMaestro(maestro)}
                    className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-2 py-1 text-black transition-colors hover:bg-[#C5A028]"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteMaestro(maestro.id)}
                    className="flex items-center gap-2 rounded-sm bg-red-500 px-2 py-1 text-black transition-colors hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-white/40">Instrumento: {maestro.instrument}</p>
                <p className="text-xs text-white/40">Institución: {maestro.institution}</p>
                <p className="text-xs text-white/40">País: {maestro.country}</p>
                <p className="text-xs text-white/40">Rol: {maestro.role}</p>
                <p className="text-xs text-white/40">Destacado: {maestro.featured ? 'Sí' : 'No'}</p>
                <p className="text-xs text-white/40">Orden: {maestro.order}</p>
              </div>
            </div>
          ))}
        </div>
      </CMSSection>

      {/* Edit Maestro Form */}
      {editingMaestro && (
        <CMSSection title="Editar Maestro">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-[#D4AF37]">Editar Maestro</h3>
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-2 rounded-sm bg-red-500 px-4 py-2 text-black transition-colors hover:bg-red-600"
            >
              <X className="h-5 w-5" />
              Cancelar
            </button>
          </div>

          <div className="mt-4">
            <CMSField
              label="Nombre"
              value={editingMaestro.name}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, name: value })}
            />
            <CMSField
              label="Instrumento"
              value={editingMaestro.instrument}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, instrument: value })}
            />
            <CMSField
              label="Biografía (Español)"
              value={editingMaestro.bio_es}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, bio_es: value })}
              type="textarea"
              rows={5}
            />
            <CMSField
              label="Biografía (Inglés)"
              value={editingMaestro.bio_en || ''}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, bio_en: value })}
              type="textarea"
              rows={5}
            />
            <CMSField
              label="Biografía (Portugués)"
              value={editingMaestro.bio_pt || ''}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, bio_pt: value })}
              type="textarea"
              rows={5}
            />
            <CMSField
              label="Institución"
              value={editingMaestro.institution}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, institution: value })}
            />
            <CMSField
              label="País"
              value={editingMaestro.country}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, country: value })}
            />
            <CMSField
              label="Rol"
              value={editingMaestro.role}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, role: value })}
            />
            <CMSField
              label="Imagen (URL)"
              value={editingMaestro.image}
              onChange={(value) => setEditingMaestro({ ...editingMaestro, image: value })}
            />
            
            <div className="flex items-center gap-4">
              <div>
                <label className="mb-2 block text-sm text-white/60">Destacado</label>
                <input
                  type="checkbox"
                  checked={editingMaestro.featured}
                  onChange={(e) => setEditingMaestro({ ...editingMaestro, featured: e.target.checked })}
                  className="h-5 w-5 rounded-sm border border-white/10 bg-black text-[#D4AF37]"
                />
              </div>
              
              <CMSField
                label="Orden"
                value={editingMaestro.order}
                onChange={(value) => setEditingMaestro({ ...editingMaestro, order: value })}
                type="number"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSaveMaestro}
              disabled={saving}
              className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Guardando...' : 'Guardar Maestro'}
            </button>
          </div>
        </CMSSection>
      )}
    </CMSEditor>
  );
}