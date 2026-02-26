# 🎯 Guía Técnica - Integración Supabase

## ✅ Estado Actual

**Supabase está completamente integrado** en tu proyecto de Semana de las Cuerdas.

### Lo que se implementó:

1. ✅ **Backend** - Servidor Hono con endpoints API
2. ✅ **Base de datos** - Sistema KV para almacenar contenido
3. ✅ **Cliente API** - Funciones para consumir datos desde el frontend
4. ✅ **React Hooks** - Hooks personalizados para cargar datos
5. ✅ **Datos iniciales** - Contenido de ejemplo precargado
6. ✅ **Páginas conectadas** - Maestros y Noticias ya consumen Supabase
7. ✅ **Tipografía actualizada** - Montserrat (similar a Gotham) aplicada

---

## 📁 Estructura de Archivos

```
/supabase/functions/server/
  ├── index.tsx          # Servidor principal con todos los endpoints
  └── kv_store.tsx       # Utilidades para el sistema KV (no modificar)

/src/app/
  ├── api/
  │   └── supabase.ts    # Cliente API (funciones para hacer requests)
  ├── hooks/
  │   └── useSupabase.ts # React hooks personalizados
  └── pages/
      ├── Maestros.tsx   # ✅ Conectado a Supabase
      ├── Noticias.tsx   # ✅ Conectado a Supabase
      └── ...            # Otras páginas (pueden conectarse)
```

---

## 🔌 API Endpoints Disponibles

### **Maestros**
- `GET /make-server-65077a1f/maestros` - Obtener todos los maestros
- `GET /make-server-65077a1f/maestros/:id` - Obtener un maestro específico
- `PUT /make-server-65077a1f/maestros/:id` - Actualizar un maestro

### **Noticias**
- `GET /make-server-65077a1f/noticias` - Obtener todas las noticias
- `GET /make-server-65077a1f/noticias/:slug` - Obtener una noticia por slug

### **Ediciones**
- `GET /make-server-65077a1f/ediciones` - Obtener todas las ediciones anteriores

### **Testimonios**
- `GET /make-server-65077a1f/testimonios` - Obtener todos los testimonios

### **Galería**
- `GET /make-server-65077a1f/galeria?category=conciertos&year=2025` - Obtener items de galería (con filtros opcionales)

### **Formularios**
- `POST /make-server-65077a1f/audiciones/submit` - Enviar solicitud de audición
- `POST /make-server-65077a1f/contacto/submit` - Enviar mensaje de contacto
- `POST /make-server-65077a1f/donaciones/submit` - Registrar donación

---

## 💾 Estructura de Datos

### **Sistema KV (Key-Value)**

El contenido se almacena en la tabla `kv_store_65077a1f` con esta estructura:

| key | value (JSON) |
|-----|--------------|
| maestros | Array de objetos maestro |
| noticias | Array de objetos noticia |
| ediciones | Array de objetos edición |
| testimonios | Array de objetos testimonio |
| galeria | Array de objetos galería |
| audicion_submissions | Array de formularios enviados |
| contact_messages | Array de mensajes de contacto |
| donations | Array de donaciones |

---

## 🎨 Fuentes Aplicadas

### **Títulos (h1-h6):**
- Familia: `Montserrat` (similar a Gotham)
- Pesos: 700-800
- Letter spacing: -0.02em

### **Cuerpo y UI:**
- Familia: `Inter`
- Pesos: 300-600

**Variables CSS:**
```css
--font-headings: 'Montserrat', sans-serif
--font-body: 'Inter', sans-serif
```

---

## 🔨 Cómo Usar en Otras Páginas

### **Ejemplo: Conectar página de Galería**

```tsx
import { useGaleria } from '../hooks/useSupabase';

export default function Galeria() {
  const { galeria, loading, error } = useGaleria();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {galeria.map(item => (
        <img key={item.id} src={item.url} alt={item.title} />
      ))}
    </div>
  );
}
```

### **Ejemplo: Filtrar galería por categoría**

```tsx
const { galeria, loading, error } = useGaleria('conciertos', '2025');
```

---

## 📤 Cómo Enviar Formularios

### **Ejemplo: Formulario de audición**

```tsx
import { submitAudicion } from '../api/supabase';

async function handleSubmit(formData) {
  try {
    const result = await submitAudicion(formData);
    console.log('Éxito:', result.message);
    alert('Audición enviada exitosamente');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar audición');
  }
}
```

---

## 🖼️ Manejo de Imágenes

### **Actualmente:**
Las imágenes usan URLs de Unsplash como placeholders.

### **Para usar tus propias imágenes:**

#### **Opción 1: URLs externas**
```tsx
{
  image: "https://drive.google.com/uc?id=TU_ID_DE_DRIVE"
}
```

#### **Opción 2: Supabase Storage**
```tsx
// 1. Subir imagen al Storage de Supabase
// 2. Obtener URL pública
// 3. Usar en el objeto:
{
  image: "https://tu-proyecto.supabase.co/storage/v1/object/public/images/foto.jpg"
}
```

---

## 🔐 Seguridad

### **Variables de entorno:**
- `SUPABASE_URL` - URL de tu proyecto Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Key privada (SOLO en backend)
- `SUPABASE_ANON_KEY` - Key pública (puede usarse en frontend)

**⚠️ IMPORTANTE:** Nunca expongas `SERVICE_ROLE_KEY` en el frontend.

---

## 🚀 Próximas Mejoras Sugeridas

### **1. Panel de Administración**
Crear interfaz visual para editar contenido:
- Login con Supabase Auth
- Formularios CRUD para cada tipo de contenido
- Upload de imágenes directo
- Preview en vivo

### **2. Supabase Storage**
Configurar buckets para:
- `/maestros` - Fotos de profesores
- `/noticias` - Imágenes de artículos
- `/galeria` - Media del evento
- `/documentos` - PDFs, programas, etc.

### **3. Optimización de Imágenes**
- Implementar lazy loading
- Usar Supabase Image Transformation
- Generar thumbnails automáticos

### **4. Búsqueda y Filtros**
- Buscador de noticias por palabra clave
- Filtros de galería por año/categoría
- Filtros de maestros por instrumento

---

## 📊 Ver Datos en Supabase Dashboard

### **SQL Editor:**

```sql
-- Ver maestros
SELECT value FROM kv_store_65077a1f WHERE key = 'maestros';

-- Ver noticias
SELECT value FROM kv_store_65077a1f WHERE key = 'noticias';

-- Ver formularios enviados
SELECT value FROM kv_store_65077a1f WHERE key = 'audicion_submissions';
```

### **Actualizar datos:**

```sql
-- Ejemplo: Actualizar maestros
UPDATE kv_store_65077a1f
SET value = '[
  {
    "id": "1",
    "name": "Elena Reyes",
    "instrument": "Violín",
    "bio": "Nueva biografía aquí...",
    "institution": "Berliner Philharmoniker",
    "country": "Alemania",
    "image": "https://nueva-url-imagen.jpg",
    "featured": true,
    "order": 1
  }
]'::jsonb
WHERE key = 'maestros';
```

---

## 🐛 Debugging

### **Ver logs del servidor:**
En el dashboard de Supabase → Functions → Logs

### **Errores comunes:**

1. **"Error fetching maestros"**
   - Verificar que Supabase esté conectado
   - Revisar logs del servidor
   - Confirmar que los datos existen en KV store

2. **Imágenes no cargan**
   - Verificar que las URLs sean públicas
   - Comprobar CORS si son de otro dominio
   - Usar HTTPS, no HTTP

3. **Formularios no se envían**
   - Revisar logs de consola
   - Verificar estructura de datos
   - Confirmar que el endpoint responde

---

## 🎓 Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [API Reference](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Hono Framework](https://hono.dev/)

---

¿Necesitas ayuda con algo específico? Puedo:
- Conectar más páginas a Supabase
- Crear el panel de administración
- Configurar Supabase Storage
- Implementar autenticación
- Optimizar performance
