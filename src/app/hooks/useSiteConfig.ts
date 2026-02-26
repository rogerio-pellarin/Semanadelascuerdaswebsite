import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function useSiteConfig() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/config`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      } else {
        setError('Error al cargar la configuración');
      }
    } catch (err) {
      console.error('Error fetching config:', err);
      setError('Error al cargar la configuración');
    } finally {
      setLoading(false);
    }
  };

  return { config, loading, error, refetch: fetchConfig };
}
