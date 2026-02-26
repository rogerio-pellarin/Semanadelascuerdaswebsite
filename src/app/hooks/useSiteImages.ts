import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function useSiteImages() {
  const [images, setImages] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
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
        setImages(data);
      } else {
        setError('Error al cargar las imágenes');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Error al cargar las imágenes');
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, error, refetch: fetchImages };
}
