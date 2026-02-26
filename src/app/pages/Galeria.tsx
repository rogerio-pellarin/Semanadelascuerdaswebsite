import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Play, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useSiteImages } from "../hooks/useSiteImages";
import { useSiteConfig } from "../hooks/useSiteConfig";
import SEO, { getBreadcrumbStructuredData } from "../components/SEO";

interface GalleryItem {
  type: 'image' | 'video';
  category: string;
  title: string;
  image?: string;
  thumbnail?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
}

export default function Galeria() {
  const { images } = useSiteImages();
  const { config } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Default values in case config is loading
  const socialMedia = config?.social_media || {
    instagram: 'https://www.instagram.com/semanadelascuerdasmed/',
    facebook: 'https://www.facebook.com/semanadelascuerdas',
    youtube: 'https://www.youtube.com/@semanadelascuerdas',
  };

  const categories = ["Todos", "Videos", "Fotos", "Recitales", "Clases maestras", "Ensambles", "Momentos"];

  const defaultGalleryItems: GalleryItem[] = [
    {
      type: "video",
      category: "Recitales",
      title: "Concierto final 2025",
      thumbnail: "https://images.unsplash.com/photo-1719753458800-c09cfb167ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMGNvbmNlcnQlMjBoYWxsJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxOTkwNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoUrl: "https://youtu.be/aK-Xg6MTf1Q",
      videoEmbedUrl: "https://www.youtube.com/embed/aK-Xg6MTf1Q",
    },
    {
      type: "image",
      category: "Clases maestras",
      title: "Masterclass con Elena Reyes",
      image: "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      type: "image",
      category: "Ensambles",
      title: "Cuarteto de cuerdas en ensayo",
      image: "https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      type: "image",
      category: "Momentos",
      title: "Detalle de instrumento",
      image: "https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      type: "image",
      category: "Recitales",
      title: "Presentación de cellista",
      image: "https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      type: "image",
      category: "Momentos",
      title: "Concentración intensa",
      image: "https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  // Build gallery items from CMS
  const galleryItems: GalleryItem[] = images?.galeria && Array.isArray(images.galeria) 
    ? images.galeria 
    : defaultGalleryItems;

  const filteredItems = selectedCategory === "Todos" 
    ? galleryItems 
    : selectedCategory === "Videos"
    ? galleryItems.filter(item => item.type === "video")
    : selectedCategory === "Fotos"
    ? galleryItems.filter(item => item.type === "image")
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div>
      <SEO 
        title="Galería - Fotos y Videos de Semana de las Cuerdas"
        description="Explora la galería multimedia de Semana de las Cuerdas: recitales, clases maestras, ensambles y momentos memorables del festival de formación musical en Medellín. Videos y fotografías de nuestros músicos talentosos."
        keywords="galería música clásica, videos recitales, fotos masterclass, música cámara videos, festival música Colombia fotos, jóvenes músicos fotos, conciertos clásicos videos"
        image={defaultGalleryItems[0].image}
        structuredData={getBreadcrumbStructuredData([
          { name: "Inicio", url: "/" },
          { name: "Galería", url: "/galeria" }
        ])}
      />
      
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Galería</h1>
          <p className="text-xl text-white/70">
            Imágenes y videos que capturan la intensidad, belleza y transformación
            de Semana de las Cuerdas.
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
                onClick={() => setSelectedCategory(category)}
                className={`rounded-sm px-6 py-2 text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[#D4AF37] text-black"
                    : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openModal(item)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm bg-white/5"
              >
                <img
                  src={item.type === "video" ? (item.thumbnail || item.image) : item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/60">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-[#D4AF37]">
                      <Play className="ml-1 h-8 w-8 fill-white text-white" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <p className="text-sm text-[#D4AF37]">{item.category}</p>
                  <h3 className="text-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal para ver imágenes y videos */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div 
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "video" && selectedItem.videoEmbedUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedItem.videoEmbedUrl}
                  title={selectedItem.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[80vh] w-full rounded-sm object-contain"
              />
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-[#D4AF37]">{selectedItem.category}</p>
              <h3 className="text-2xl text-white">{selectedItem.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Video Highlight Section */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Video <span className="text-[#D4AF37]">oficial</span>
          </h2>
          
          <div className="overflow-hidden rounded-sm">
            <div className="aspect-video bg-white/5">
              <iframe
                src="https://player.vimeo.com/video/1168117010?badge=0&autopause=0&player_id=0&app_id=58479"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                className="h-full w-full"
                title="Semana de las Cuerdas - Video oficial"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60">
              Este video captura la esencia de nuestra última edición: la intensidad del trabajo,
              la calidez de la comunidad, y el nivel artístico que alcanzamos juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">Síguenos en redes</h2>
          <p className="mb-10 text-lg text-white/60">
            Mantente conectado con actualizaciones, historias de nuestros músicos,
            y contenido exclusivo de las clases y recitales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Instagram
            </a>
            <a
              href={socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Facebook
            </a>
            <a
              href={socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Archive Note */}
      <section className="border-t border-white/10 bg-black py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-white/60">
            ¿Buscas más contenido? Visita nuestra{" "}
            <Link to="/ediciones-anteriores" className="text-[#D4AF37] hover:underline">
              sección de ediciones anteriores
            </Link>{" "}
            para explorar el archivo completo de fotos, videos y testimonios de años pasados.
          </p>
        </div>
      </section>
    </div>
  );
}