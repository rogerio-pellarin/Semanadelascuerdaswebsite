import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Maestro {
  id: string;
  name: string;
  instrument: string;
  bio: string;
  institution: string;
  country: string;
  role?: string;
  image: string;
  featured: boolean;
  order: number;
}

interface MaestrosCarouselProps {
  maestros: Maestro[];
}

export function MaestrosCarouselSimple({ maestros }: MaestrosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!maestros || maestros.length === 0) {
    return (
      <div className="py-12 text-center text-white/60">
        No hay maestros disponibles
      </div>
    );
  }

  // Sort maestros by order
  const sortedMaestros = [...maestros].sort((a, b) => (a.order || 0) - (b.order || 0));

  const itemsPerPage = 3;
  const totalPages = Math.ceil(sortedMaestros.length / itemsPerPage);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page items
  const startIdx = currentIndex * itemsPerPage;
  const currentItems = sortedMaestros.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="relative px-8 pb-16 md:px-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((maestro) => (
          <div key={maestro.id} className="group overflow-hidden rounded-sm bg-white/5 transition-all hover:bg-white/10">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={maestro.image}
                alt={maestro.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Country badge */}
              <div className="absolute right-3 top-3 rounded-sm bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {maestro.country}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="mb-1 text-xl font-bold">{maestro.name}</h3>
              <div className="mb-2 text-[#D4AF37]">{maestro.instrument}</div>
              {maestro.role && (
                <div className="mb-3 text-sm text-white/60">{maestro.role}</div>
              )}
              <p className="mb-4 line-clamp-3 text-sm text-white/70">
                {maestro.bio}
              </p>
              <div className="text-xs text-white/50">{maestro.institution}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#D4AF37] p-3 text-black shadow-lg transition-all hover:bg-[#C5A028] md:-left-12"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#D4AF37] p-3 text-black shadow-lg transition-all hover:bg-[#C5A028] md:-right-12"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 transition-all ${
                idx === currentIndex
                  ? 'w-6 rounded-sm bg-[#D4AF37]'
                  : 'w-3 rounded-full bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}