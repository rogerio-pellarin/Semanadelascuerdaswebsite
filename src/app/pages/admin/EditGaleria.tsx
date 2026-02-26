import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Video, Image as ImageIcon } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import AdminSidebar from '../../components/admin/AdminSidebar';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: string;
  title: string;
  image?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
}

export default function EditGaleria() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [reinitializing, setReinitializing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/site-images`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setItems(data?.galeria || []);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      type: 'image',
      category: 'Recitales',
      title: 'Nueva imagen',
      image: '',
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof GalleryItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        // If changing to video type, ensure video fields exist
        if (field === 'type' && value === 'video') {
          if (!updated.videoUrl) updated.videoUrl = '';
          if (!updated.videoEmbedUrl) updated.videoEmbedUrl = '';
        }
        
        // Auto-generate embed URL from YouTube/Vimeo links
        if (field === 'videoUrl' && value) {
          updated.videoEmbedUrl = convertToEmbedUrl(value);
          // Auto-fetch thumbnail if not already set
          if (!updated.image) {
            updated.image = extractThumbnail(value);
          }
        }
        
        return updated;
      }
      return item;
    }));
  };

  const convertToEmbedUrl = (url: string): string => {
    // YouTube Playlist
    const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (playlistMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
    }
    
    // YouTube Single Video
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
  };

  const extractThumbnail = (url: string): string => {
    // YouTube Playlist - get first video thumbnail
    const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (playlistMatch) {
      // For playlists, we can't get a reliable thumbnail without API
      // But we can try to extract video ID if it's also in the URL
      const videoMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      if (videoMatch) {
        return `https://img.youtube.com/vi/${videoMatch[1]}/maxresdefault.jpg`;
      }
      return ''; // User will need to manually add thumbnail for pure playlist URLs
    }
    
    // YouTube Single Video
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }
    
    // Vimeo - unfortunately requires API call to get thumbnail
    // We'll leave it empty for now
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return ''; // User needs to manually add or we'd need Vimeo API
    }
    
    return '';
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploading(true);
    try {
      console.log('Starting image upload...', { fileName: file.name, fileSize: file.size, fileType: file.type });
      
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data:image/xxx;base64, prefix
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;
      console.log('File converted to base64, length:', base64Data.length);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/upload-image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            filename: file.name,
            contentType: file.type,
            category: 'galeria',
          }),
        }
      );

      console.log('Upload response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        updateItem(id, 'image', data.url);
        setMessage('Imagen subida exitosamente');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Upload failed:', response.status, errorData);
        setMessage(`Error al subir la imagen: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage(`Error al subir la imagen: ${error instanceof Error ? error.message : 'Error de conexión'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/site-images`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: 'galeria',
            items: items,
          }),
        }
      );

      if (response.ok) {
        setMessage('Cambios guardados exitosamente');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error al guardar cambios');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setMessage('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleReinitialize = async () => {
    if (!confirm('¿Estás seguro de que quieres reinicializar todos los datos?')) {
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
        fetchData();
      }, 1000);
    } catch (error) {
      console.error('Error initializing:', error);
      setMessage('Error al inicializar datos');
    } finally {
      setReinitializing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <AdminSidebar onReinitialize={handleReinitialize} reinitializing={reinitializing} />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="mb-2 text-4xl font-bold text-white">Editar Galería</h1>
              <p className="text-white/60">Administra las imágenes y videos de la galería</p>
            </div>

            {message && (
              <div className={`mb-6 rounded-sm p-4 ${
                message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
              }`}>
                {message}
              </div>
            )}

            <div className="mb-6">
              <button
                onClick={addItem}
                className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-black transition-all hover:bg-[#B8941F]"
              >
                <Plus className="h-4 w-4" />
                Agregar item
              </button>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="rounded-sm border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {item.type === 'image' ? (
                        <ImageIcon className="h-5 w-5 text-[#D4AF37]" />
                      ) : (
                        <Video className="h-5 w-5 text-[#D4AF37]" />
                      )}
                      <select
                        value={item.type}
                        onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                        className="rounded-sm border border-white/20 bg-black/50 px-3 py-1 text-white"
                      >
                        <option value="image">Imagen</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-400 transition-colors hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-white/70">Título</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                        className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/70">Categoría</label>
                      <select
                        value={item.category}
                        onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                        className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-2 text-white"
                      >
                        <option value="Recitales">Recitales</option>
                        <option value="Clases maestras">Clases maestras</option>
                        <option value="Ensambles">Ensambles</option>
                        <option value="Momentos">Momentos</option>
                      </select>
                    </div>
                  </div>

                  {item.type === 'image' ? (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm text-white/70">Imagen</label>
                      <div className="flex items-start gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-32 w-32 rounded-sm object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.image || ''}
                            onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="URL de la imagen"
                            className="mb-2 w-full rounded-sm border border-white/20 bg-black/50 px-4 py-2 text-white"
                          />
                          <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-4 py-2 text-white transition-colors hover:bg-white/10">
                            <Upload className="h-4 w-4" />
                            {uploading ? 'Subiendo...' : 'Subir imagen'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(item.id, file);
                              }}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="mb-2 block text-sm text-white/70">
                          URL del video (YouTube, Playlist o Vimeo)
                        </label>
                        <input
                          type="text"
                          value={item.videoUrl || ''}
                          onChange={(e) => updateItem(item.id, 'videoUrl', e.target.value)}
                          onFocus={(e) => e.target.select()}
                          placeholder="https://youtube.com/watch?v=... o https://youtube.com/playlist?list=..."
                          className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-2 text-white"
                        />
                        <p className="mt-1 text-xs text-white/50">
                          Soporta videos individuales de YouTube/Vimeo y playlists completas de YouTube
                        </p>
                        {item.videoUrl && item.image && (
                          <p className="mt-1 text-xs text-green-400">
                            ✓ Thumbnail cargado automáticamente
                          </p>
                        )}
                      </div>

                      {item.videoEmbedUrl && (
                        <div>
                          <label className="mb-2 block text-sm text-white/70">Vista previa</label>
                          <div className="aspect-video overflow-hidden rounded-sm bg-black">
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.videoEmbedUrl}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="h-full w-full"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="mb-2 block text-sm text-white/70">
                          Imagen de portada (thumbnail)
                        </label>
                        <div className="flex items-start gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-32 w-32 rounded-sm object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.image || ''}
                              onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                              onFocus={(e) => e.target.select()}
                              placeholder="URL de la imagen de portada"
                              className="mb-2 w-full rounded-sm border border-white/20 bg-black/50 px-4 py-2 text-white"
                            />
                            <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-4 py-2 text-white transition-colors hover:bg-white/10">
                              <Upload className="h-4 w-4" />
                              {uploading ? 'Subiendo...' : 'Subir imagen'}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(item.id, file);
                                }}
                                className="hidden"
                                disabled={uploading}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-sm bg-[#D4AF37] px-6 py-3 font-semibold text-black transition-all hover:bg-[#B8941F] disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <a
                href="/galeria"
                className="rounded-sm border border-white/20 px-6 py-3 text-white transition-all hover:bg-white/5"
              >
                Ver galería
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}