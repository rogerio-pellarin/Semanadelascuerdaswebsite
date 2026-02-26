import { useEffect, useState } from "react";
import { MaestrosCarouselSimple } from "./MaestrosCarouselSimple";
import { useLanguage } from '../contexts/LanguageContext';

interface Maestro {
  id: string;
  name: string;
  instrument: string;
  bio?: string; // Legacy field
  bio_es?: string;
  bio_en?: string;
  bio_pt?: string;
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

export function MaestrosCarousel({ maestros }: MaestrosCarouselProps) {
  const { language } = useLanguage();
  
  // Map maestros to include the bio in the current language
  const maestrosWithLocalizedBio = maestros.map((maestro) => ({
    ...maestro,
    bio: maestro[`bio_${language}`] || maestro.bio_es || maestro.bio || '',
  }));
  
  return <MaestrosCarouselSimple maestros={maestrosWithLocalizedBio} />;
}