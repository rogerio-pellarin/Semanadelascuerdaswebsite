import { useState, useEffect } from 'react';
import * as api from '../api/supabase';

// ==================== MAESTROS ====================

export function useMaestros() {
  const [maestros, setMaestros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🎻 useMaestros: Starting fetch...');
    api.getMaestros()
      .then(data => {
        console.log('✅ Maestros received in hook:', data);
        setMaestros(data || []);
      })
      .catch(err => {
        console.error('❌ Error in useMaestros:', err);
        setError(err.message);
        // Fallback data if API fails
        setMaestros([
          {
            id: '1',
            name: 'Iván Martín',
            instrument: 'Piano / Dirección',
            bio: 'Director titular de la Orquesta Sinfónica de Burgos y pianista invitado por orquestas como London Philharmonic, Konzerthausorchester Berlin, Wiener Kammerorchester y Orchestre de Paris.',
            institution: 'Orquesta Sinfónica de Burgos',
            country: 'España',
            role: 'Director Artístico',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            featured: true,
            order: 1
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { maestros, loading, error };
}

export function useMaestro(id: string) {
  const [maestro, setMaestro] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    api.getMaestro(id)
      .then(setMaestro)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { maestro, loading, error };
}

// ==================== NOTICIAS ====================

export function useNoticias() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getNoticias()
      .then(setNoticias)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { noticias, loading, error };
}

export function useNoticia(slug: string) {
  const [noticia, setNoticia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    api.getNoticia(slug)
      .then(setNoticia)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { noticia, loading, error };
}

// ==================== EDICIONES ====================

export function useEdiciones() {
  const [ediciones, setEdiciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getEdiciones()
      .then(setEdiciones)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { ediciones, loading, error };
}

// ==================== TESTIMONIOS ====================

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getTestimonios()
      .then(setTestimonios)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { testimonios, loading, error };
}

// ==================== GALERIA ====================

export function useGaleria(category?: string, year?: string) {
  const [galeria, setGaleria] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getGaleria(category, year)
      .then(setGaleria)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, year]);

  return { galeria, loading, error };
}

// ==================== SITE CONFIG ====================

export function useConfig() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getConfig()
      .then(setConfig)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { 
    config, 
    loading, 
    error, 
    refetch: () => {
      setLoading(true);
      api.getConfig()
        .then(setConfig)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  };
}