import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f`;

console.log('🔧 Supabase API configured:', {
  projectId,
  baseUrl: API_BASE_URL,
  hasKey: !!publicAnonKey
});

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
};

// ==================== MAESTROS ====================

export async function getMaestros() {
  try {
    console.log('🎻 Fetching maestros from:', `${API_BASE_URL}/maestros`);
    const response = await fetch(`${API_BASE_URL}/maestros`, { headers });
    console.log('🌐 API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`Error fetching maestros: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('📦 API Response data:', data);
    return data;
  } catch (error) {
    console.error('❌ Exception in getMaestros:', error);
    throw error;
  }
}

export async function getMaestro(id: string) {
  const response = await fetch(`${API_BASE_URL}/maestros/${id}`, { headers });
  if (!response.ok) throw new Error('Error fetching maestro');
  return response.json();
}

export async function updateMaestro(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/maestros/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error updating maestro');
  return response.json();
}

// ==================== NOTICIAS ====================

export async function getNoticias() {
  const response = await fetch(`${API_BASE_URL}/noticias`, { headers });
  if (!response.ok) throw new Error('Error fetching noticias');
  return response.json();
}

export async function getNoticia(slug: string) {
  const response = await fetch(`${API_BASE_URL}/noticias/${slug}`, { headers });
  if (!response.ok) throw new Error('Error fetching noticia');
  return response.json();
}

// ==================== EDICIONES ====================

export async function getEdiciones() {
  const response = await fetch(`${API_BASE_URL}/ediciones`, { headers });
  if (!response.ok) throw new Error('Error fetching ediciones');
  return response.json();
}

// ==================== TESTIMONIOS ====================

export async function getTestimonios() {
  const response = await fetch(`${API_BASE_URL}/testimonios`, { headers });
  if (!response.ok) throw new Error('Error fetching testimonios');
  return response.json();
}

// ==================== GALERIA ====================

export async function getGaleria(category?: string, year?: string) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (year) params.append('year', year);
  
  const url = `${API_BASE_URL}/galeria${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('Error fetching galeria');
  return response.json();
}

// ==================== SITE CONFIG ====================

export async function getConfig() {
  const response = await fetch(`${API_BASE_URL}/config`, { headers });
  if (!response.ok) throw new Error('Error fetching config');
  return response.json();
}

export async function updateConfig(data: any) {
  const response = await fetch(`${API_BASE_URL}/config`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error updating config');
  return response.json();
}

// ==================== FORMS ====================

export async function submitAudicion(data: any) {
  const response = await fetch(`${API_BASE_URL}/audiciones/submit`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Error al enviar audición');
  }
  
  return result;
}

export async function submitContacto(data: any) {
  const response = await fetch(`${API_BASE_URL}/contacto/submit`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Error al enviar mensaje');
  }
  
  return result;
}

export async function submitDonacion(data: any) {
  const response = await fetch(`${API_BASE_URL}/donaciones/submit`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Error al procesar donación');
  }
  
  return result;
}

export async function submitWaitlist(data: any) {
  const response = await fetch(`${API_BASE_URL}/waitlist/submit`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Error al registrar en lista de espera');
  }
  
  return result;
}