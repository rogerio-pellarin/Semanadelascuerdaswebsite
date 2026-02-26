# 📖 Guía para Editar Contenido - Semana de las Cuerdas

## ✅ ¡Supabase está conectado!

Tu sitio ahora obtiene el contenido desde Supabase. Esto significa que puedes editar maestros, noticias, galería y más **sin tocar código**.

---

## 🔑 Acceder al Dashboard de Supabase

1. Ve a: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto
4. En el menú lateral, haz clic en **"Table Editor"**

---

## 📊 Estructura de Contenido

Tu contenido está almacenado en el **sistema KV (Key-Value)** de Supabase. Actualmente tienes estas colecciones:

### 1. **Maestros** (`maestros`)

**Campos:**
- `id`: Identificador único (string)
- `name`: Nombre completo del maestro
- `instrument`: Instrumento que enseña
- `bio`: Biografía (texto largo)
- `institution`: Institución donde trabaja
- `country`: País de origen
- `image`: URL de la imagen
- `featured`: true/false (si aparece destacado)
- `order`: Número para ordenar (1, 2, 3...)

**Ejemplo:**
```json
{
  "id": "1",
  "name": "Elena Reyes",
  "instrument": "Violín",
  "bio": "Primera violinista de la Orquesta Filarmónica de Berlín...",
  "institution": "Berliner Philharmoniker",
  "country": "Alemania",
  "image": "https://tu-url-de-imagen.jpg",
  "featured": true,
  "order": 1
}
```

---

### 2. **Noticias** (`noticias`)

**Campos:**
- `id`: Identificador único
- `title`: Título de la noticia
- `slug`: URL amigable (ej: "convocatoria-2026")
- `excerpt`: Resumen corto
- `content`: Contenido completo (texto largo)
- `category`: Categoría ("audiciones", "maestros", "becas", etc.)
- `date`: Fecha en formato YYYY-MM-DD
- `image`: URL de la imagen
- `featured`: true/false (destacada)
- `published`: true/false (visible o no)

**Ejemplo:**
```json
{
  "id": "1",
  "title": "Convocatoria Abierta 2026",
  "slug": "convocatoria-abierta-2026",
  "excerpt": "Ya están abiertas las audiciones...",
  "content": "Texto completo de la noticia aquí...",
  "category": "audiciones",
  "date": "2025-02-15",
  "image": "https://tu-url-de-imagen.jpg",
  "featured": true,
  "published": true
}
```

---

### 3. **Ediciones Anteriores** (`ediciones`)

**Campos:**
- `id`: Identificador único
- `year`: Año de la edición (número: 2025, 2024...)
- `theme`: Tema de la edición
- `participants`: Número de participantes
- `countries`: Número de países
- `concerts`: Número de conciertos
- `description`: Descripción general
- `highlights`: Array de strings con puntos destacados
- `images`: Array de URLs de imágenes
- `featured`: true/false

**Ejemplo:**
```json
{
  "id": "1",
  "year": 2025,
  "theme": "Explorando Fronteras Musicales",
  "participants": 48,
  "countries": 12,
  "concerts": 5,
  "description": "La edición 2025 reunió...",
  "highlights": [
    "Concierto final en el Teatro Nacional",
    "15 masterclasses magistrales"
  ],
  "images": [
    "https://imagen1.jpg",
    "https://imagen2.jpg"
  ],
  "featured": true
}
```

---

### 4. **Testimonios** (`testimonios`)

**Campos:**
- `id`: Identificador único
- `author`: Nombre del estudiante
- `role`: Rol (ej: "Violinista")
- `year`: Año de participación
- `country`: País de origen
- `quote`: Texto del testimonio
- `image`: URL de foto
- `featured`: true/false

---

### 5. **Galería** (`galeria`)

**Campos:**
- `id`: Identificador único
- `title`: Título descriptivo
- `type`: "image" o "video"
- `category`: Categoría ("conciertos", "clases", "ensayos")
- `url`: URL del archivo
- `year`: Año
- `featured`: true/false

---

## 🖼️ Cómo Cambiar Imágenes

### Opción 1: Usar URLs externas (más simple)

1. Sube tu imagen a cualquier servicio:
   - **Google Drive** (hacer pública y obtener enlace directo)
   - **Imgur** (gratuito, fácil)
   - **Cloudinary** (profesional)
   - **ImgBB** (simple)

2. Copia la URL de la imagen

3. En el dashboard de Supabase:
   - Ve a Table Editor
   - Busca la entrada que quieres editar
   - Pega la nueva URL en el campo `image`
   - Guarda

### Opción 2: Supabase Storage (recomendado para producción)

1. En el dashboard de Supabase, ve a **Storage**

2. Crea un bucket público llamado `images` (si no existe)

3. Sube tus imágenes arrastrándolas

4. Haz clic derecho en la imagen → "Copy URL"

5. Usa esa URL en tus registros

---

## 📝 Cómo Editar Contenido

### **Paso 1: Ir al Table Editor**

1. Dashboard de Supabase → **Table Editor**
2. No verás tablas tradicionales porque usamos el sistema KV
3. Necesitarás usar la **API** o el **SQL Editor**

### **Paso 2: Editar con SQL Editor**

En Supabase, ve a **SQL Editor** y ejecuta comandos como:

```sql
-- Ver todos los maestros
SELECT * FROM kv_store_65077a1f WHERE key = 'maestros';

-- Ver todas las noticias
SELECT * FROM kv_store_65077a1f WHERE key = 'noticias';
```

### **Paso 3: Modificar contenido**

Para modificar, necesitarás actualizar el valor JSON:

```sql
UPDATE kv_store_65077a1f
SET value = '[
  {
    "id": "1",
    "name": "Nuevo Maestro",
    "instrument": "Violín",
    ...
  }
]'::jsonb
WHERE key = 'maestros';
```

---

## 🚀 Forma Más Fácil: Usar los Endpoints del API

También puedes crear una **página de administración** donde edites el contenido con formularios. 

### Endpoints disponibles:

- **GET** `/make-server-65077a1f/maestros` - Ver maestros
- **PUT** `/make-server-65077a1f/maestros/:id` - Editar maestro
- **GET** `/make-server-65077a1f/noticias` - Ver noticias
- **GET** `/make-server-65077a1f/galeria` - Ver galería
- Y más...

---

## 💡 Próximos Pasos

Si quieres una **interfaz visual** para editar (tipo WordPress), puedo crear:

1. **Panel de Administración** en el sitio con login
2. **Formularios de edición** para cada tipo de contenido
3. **Upload de imágenes** directo desde el panel

¿Te gustaría que cree esto?

---

## 📞 Soporte

Si tienes dudas, aquí estoy para ayudarte a:
- Editar contenido existente
- Agregar nuevas secciones
- Crear el panel de administración
- Configurar Storage para imágenes

¡El sitio ya está funcionando con Supabase! 🎉
