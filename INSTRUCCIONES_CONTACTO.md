# Sistema de Contacto y Gestión Administrativa

## Descripción
Este sistema implementa una página de contacto donde los usuarios envían sus datos de contacto, y un panel de administración donde se gestionan estos contactos. El administrador puede ver, editar, comentar y cambiar el estado de cada contacto.

## Características Implementadas

### 1. Formulario de Contacto
- **Campos requeridos**: Nombre, Teléfono, Email
- **Campo opcional**: Horario de contacto (selector de hora)
- **Campo adicional**: Información adicional (textarea)
- **Validación en tiempo real** de todos los campos
- **Diseño responsive** con fondo degradado azul
- **Almacenamiento automático** en localStorage

### 2. Panel de Administración de Contactos
- **Tabla de contactos** con información completa
- **Estadísticas** en tiempo real (total, sin responder, respondidos)
- **Gestión de estados**: Cambiar entre "sin responder" y "respondido"
- **Comentarios del administrador**: Agregar notas a cada contacto
- **Edición de contactos**: Modificar estado y comentarios
- **Eliminación de contactos**: Borrar registros no deseados

### 3. Sistema de Autenticación
- **Solo administradores**: Acceso restringido a administradores
- **Login de administrador**: `admin@admin.com` / `admin`
- **Redirección automática** al panel de administración
- **Seguridad**: Solo usuarios autorizados pueden acceder

## Credenciales de Acceso

### Administrador
| Email | Contraseña | Acceso |
|-------|------------|--------|
| admin@admin.com | admin | Panel de Administración |

## Contactos de Demostración

El sistema incluye contactos de ejemplo predefinidos:

| Nombre | Email | Teléfono | Estado | Comentario |
|--------|-------|----------|--------|------------|
| Andrea Bedoya Betancur | andrea.bedoya@email.com | 3012458977 | Sin responder | - |
| Juan Pérez | juan.perez@email.com | 3001234567 | Respondido | Cliente interesado en servicios de diseño |
| María García | maria.garcia@email.com | 3019876543 | Sin responder | - |
| Carlos Rodríguez | carlos.rodriguez@email.com | 3157891234 | Respondido | Cliente potencial para desarrollo móvil |

## Cómo Usar el Sistema

### 1. Envío de Contacto (Usuarios)
- Navegar a `pages/contacto.html`
- Completar el formulario de contacto con:
  - Nombre (requerido)
  - Teléfono (requerido)
  - Email (requerido)
  - Horario de contacto (opcional)
  - Información adicional (opcional)
- Hacer clic en "Enviar"
- El mensaje se guarda automáticamente en el sistema

### 2. Acceso al Panel de Administración
- Ir a `pages/login.html`
- Usar las credenciales: `admin@admin.com` / `admin`
- El sistema redirige automáticamente al panel de administración

### 3. Gestión de Contactos (Administrador)
- **Ver contactos**: La tabla muestra todos los contactos recibidos
- **Estadísticas**: Ver resumen de contactos por estado
- **Editar contacto**: Hacer clic en "Editar" para:
  - Cambiar el estado (sin responder/respondido)
  - Agregar comentarios del administrador
- **Cambiar estado**: Usar el botón "Marcar Respondido/Sin Responder"
- **Eliminar contacto**: Usar el botón "Eliminar" para borrar registros

### 4. Funcionalidades del Administrador
- **Filtrado visual**: Los contactos se muestran ordenados por fecha
- **Estados claros**: Badges de color para identificar el estado
- **Comentarios**: Agregar notas internas sobre cada contacto
- **Actualización en tiempo real**: Los cambios se guardan automáticamente

## Características Técnicas

### Validaciones Implementadas
- **Email**: Formato válido de email
- **Teléfono**: Solo números, espacios, guiones y paréntesis
- **Campos requeridos**: Verificación de campos obligatorios
- **Contraseñas**: Verificación de coincidencia

### Almacenamiento de Datos
- **localStorage**: Almacenamiento local del navegador
- **Estructura de datos**: JSON con información completa del usuario
- **Persistencia**: Los datos se mantienen entre sesiones

### Interfaz de Usuario
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos visuales
- **Notificaciones**: Mensajes de éxito y error
- **Estados de carga**: Indicadores visuales durante operaciones

### Selector de Horarios
- **24 horas completas**: Desde 12:00 AM hasta 11:00 PM
- **Formato estándar**: AM/PM para mejor legibilidad
- **Integración**: Funciona tanto en contacto como en edición

## Archivos Modificados

1. **pages/contacto.html**: Estructura HTML actualizada
2. **css/pages/contacto.css**: Estilos modernos con gradiente azul
3. **js/pages/contacto.js**: Lógica completa del sistema
4. **js/pages/login.js**: Autenticación actualizada
5. **js/demo-data.js**: Datos de demostración (nuevo)

## Compatibilidad
- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, móvil
- **JavaScript**: ES6+ con funciones modernas
- **CSS**: Flexbox y Grid para layouts responsivos

## Notas de Desarrollo
- El sistema usa localStorage para simular una base de datos
- Las validaciones se realizan tanto en el cliente como en tiempo real
- El diseño sigue las especificaciones de las imágenes proporcionadas
- Se implementaron todas las funcionalidades solicitadas
