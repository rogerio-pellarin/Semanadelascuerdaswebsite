# Sistema CMS - Documentación

Este sistema CMS permite editar el contenido de todas las páginas en 3 idiomas (Español, Inglés y Portugués Brasileño).

## Estructura Implementada

### ✅ Páginas Editables

1. **Home** (`/admin/edit-home`) - Completamente funcional
2. **El Programa** (`/admin/edit-programa`) - Completamente funcional 
3. **Impacto** - Pendiente crear interfaz
4. **Fundación** - Pendiente crear interfaz
5. **Apoya** - Pendiente crear interfaz

### Backend (Servidor)

Todos los endpoints están implementados en `/supabase/functions/server/index.tsx`:

- ✅ `GET /programa-content` - Obtener contenido
- ✅ `PUT /programa-content` - Guardar contenido
- ✅ `GET /impacto-content` - Obtener contenido
- ✅ `PUT /impacto-content` - Guardar contenido
- ✅ `GET /fundacion-content` - Obtener contenido
- ✅ `PUT /fundacion-content` - Guardar contenido
- ✅ `GET /apoya-content` - Obtener contenido
- ✅ `PUT /apoya-content` - Guardar contenido

### Datos Inicializados

Todos los datos están en español, inglés y portugués brasileño. Ver `initializeTables()` en el servidor para la estructura completa.

## Cómo Crear una Nueva Página de Edición

Usa `EditPrograma.tsx` como plantilla. Los pasos son:

### 1. Definir Tipos TypeScript

```typescript
interface ContenidoLang {
  seccion1: {
    titulo: string;
    descripcion: string;
  };
  // ... más secciones
}

interface Contenido {
  es: ContenidoLang;
  en: ContenidoLang;
  pt: ContenidoLang;
}
```

### 2. Crear el Hook de Estado

```typescript
const [content, setContent] = useState<Contenido | null>(null);
const [currentLang, setCurrentLang] = useState<Language>('es');
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState('');
```

### 3. Implementar fetchContent y handleSave

```typescript
const fetchContent = async () => {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/NOMBRE-content`,
    { headers: { Authorization: `Bearer ${publicAnonKey}` } }
  );
  const data = await response.json();
  setContent(data);
};

const handleSave = async () => {
  await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/NOMBRE-content`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(content),
    }
  );
};
```

### 4. Usar los Componentes del CMS

```typescript
return (
  <CMSEditor
    title="Editar Página - NOMBRE"
    currentLang={currentLang}
    onLangChange={setCurrentLang}
    onSave={handleSave}
    saving={saving}
    message={message}
  >
    <CMSSection title="Sección 1">
      <CMSField
        label="Título"
        value={langContent.seccion1.titulo}
        onChange={(value) => updateField('seccion1', 'titulo', value)}
      />
    </CMSSection>
  </CMSEditor>
);
```

### 5. Agregar la Ruta

En `/src/app/routes.tsx`:

```typescript
import EditNuevaPagina from "./pages/admin/EditNuevaPagina";

// En el array de rutas:
{ path: "admin/edit-nuevapagina", Component: EditNuevaPagina },
```

### 6. Agregar Enlace en AdminDashboard

En `/src/app/pages/admin/AdminDashboard.tsx`:

```tsx
<a
  href="/admin/edit-nuevapagina"
  className="block rounded-sm border border-white/10 bg-black p-4 transition-colors hover:border-[#D4AF37]"
>
  <h3 className="mb-2 font-medium">Nueva Página</h3>
  <p className="text-sm text-white/60">Descripción breve</p>
</a>
```

## Páginas Pendientes de Implementar

### EditImpacto.tsx

Estructura de datos (ya en servidor):
- `hero`: title, subtitle
- `stats`: array de { number, label, icon }
- `mission`: title, content
- `achievements`: title, items (array de strings)

### EditFundacion.tsx

Estructura de datos (ya en servidor):
- `hero`: title, subtitle
- `about`: title, content
- `vision`: title, content
- `team`: title, members (array de { name, role, bio })

### EditApoya.tsx

Estructura de datos (ya en servidor):
- `hero`: title, subtitle
- `impact`: title, items (array de { amount, description })
- `why`: title, content
- `recognition`: title, content

## Componentes Reutilizables

### CMSEditor
Wrapper principal con tabs de idiomas, botones de guardar y manejo de mensajes.

### CMSSection
Sección con borde y título dorado.

### CMSField
Campo individual con label. Soporta `type="text"` o `type="textarea"`.

## Reinicialización

Si necesitas reinicializar los datos:
1. Ve a `/admin`
2. Haz clic en "Reinicializar Datos"
3. Confirma la acción

Esto restaurará todos los datos a los valores por defecto definidos en el servidor.

## Variables de Entorno

El sistema usa:
- `projectId` - ID del proyecto Supabase
- `publicAnonKey` - Clave pública de Supabase

Ambas se importan desde `/utils/supabase/info`.
