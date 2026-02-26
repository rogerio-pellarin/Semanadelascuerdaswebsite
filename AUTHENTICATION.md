# Sistema de Autenticación - Panel de Administración

## ✅ Sistema Implementado

El panel de administración ahora está completamente protegido con autenticación de Supabase.

## 🚀 Configuración Inicial (Solo una vez)

### Paso 1: Crear el primer usuario administrador

1. Navega a: `/admin/setup`
2. Completa el formulario con:
   - **Nombre**: Tu nombre o "Administrador"
   - **Email**: Tu email (ejemplo: `admin@semanadelascuerdas.com`)
   - **Contraseña**: Mínimo 6 caracteres
3. Haz clic en "Crear Usuario Administrador"
4. Serás redirigido automáticamente al login

### Paso 2: Iniciar sesión

1. Navega a: `/admin/login`
2. Ingresa tu email y contraseña
3. Accede al panel de administración

## 🔐 Características de Seguridad

- ✅ **Autenticación JWT** con Supabase Auth
- ✅ **Rutas protegidas**: Todas las páginas `/admin/*` requieren login
- ✅ **Sesiones persistentes**: Mantiene la sesión activa entre recargas
- ✅ **Botón de logout**: En el sidebar del admin
- ✅ **Redirección automática**: Si no estás autenticado, redirige al login

## 📍 URLs Importantes

- **Setup (primera vez)**: `/admin/setup`
- **Login**: `/admin/login`
- **Panel admin**: `/admin` (redirige a `/admin/edit-home`)

## 👥 Gestión de Usuarios Adicionales

Después de crear el primer usuario, puedes:

1. **Opción A**: Usar el mismo endpoint desde Postman/curl:
   ```bash
   POST https://{tu-proyecto}.supabase.co/functions/v1/make-server-65077a1f/auth/create-admin
   Body: {
     "email": "nuevo@email.com",
     "password": "password123",
     "name": "Nombre"
   }
   ```

2. **Opción B**: Gestionar usuarios desde el Dashboard de Supabase:
   - Ve a: `https://supabase.com/dashboard/project/{tu-proyecto}/auth/users`
   - Crea usuarios manualmente

## 🔒 Cerrar Sesión

- Haz clic en el botón "Cerrar Sesión" en la parte inferior del sidebar del admin
- Serás redirigido al login

## 🛡️ Protección

Todas estas rutas están protegidas:
- `/admin`
- `/admin/edit-home`
- `/admin/edit-programa`
- `/admin/edit-maestros`
- `/admin/edit-galeria`
- `/admin/edit-impacto`
- `/admin/edit-fundacion`
- `/admin/edit-apoya`
- `/admin/settings`

## 📝 Notas Importantes

- Los emails se confirman automáticamente (no requiere verificación)
- Las contraseñas deben tener mínimo 6 caracteres
- La sesión se mantiene incluso después de cerrar el navegador
- Solo usuarios autenticados pueden acceder al CMS
