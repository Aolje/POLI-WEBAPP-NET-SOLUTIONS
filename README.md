# NetSolutions - Sitio Web Corporativo

**NetSolutions** es una aplicación web corporativa desarrollada con tecnologías web estándar (HTML, CSS y JavaScript) que presenta los servicios de una empresa de tecnología especializada en automatización, transformación digital y desarrollo de software.

## 🎯 ¿Qué es NetSolutions?

NetSolutions es un sitio web corporativo que permite a una empresa de tecnología mostrar sus servicios, gestionar contenido y recibir consultas de clientes. La aplicación incluye:

- **Sitio web público** con información de la empresa y servicios
- **Panel de administración** para gestionar contenido y contactos
- **Sistema de contacto** para recibir consultas de clientes
- **Blog corporativo** con artículos técnicos
- **Catálogo de servicios** detallado

## 🏗️ Estructura del Proyecto

```
NetSolutions/
├── 📄 index.html                    # Página principal (Inicio)
├── 📁 pages/                        # Páginas del sitio web
│   ├── nosotros.html                # Información de la empresa
│   ├── servicios.html               # Lista de servicios (10 servicios)
│   ├── blog.html                    # Blog corporativo
│   ├── catalogo.html                # Catálogo de productos
│   ├── contacto.html                # Formulario de contacto
│   ├── login.html                   # Página de inicio de sesión
│   ├── 📁 servicios/                # Páginas detalladas de servicios
│   │   ├── servicio1.html           # Diseño y transformación de procesos
│   │   ├── servicio2.html           # Modelos de gestión ISO
│   │   ├── servicio3.html           # Extensión de capacidades
│   │   ├── servicio4.html           # Automatización RPA
│   │   ├── servicio5.html           # Ciencia de Datos
│   │   ├── servicio6.html           # Gestión de proyectos
│   │   ├── servicio7.html           # Diseño web y tiendas virtuales
│   │   ├── servicio8.html           # Marketing digital
│   │   ├── servicio9.html           # Mantenimiento de servidores
│   │   └── servicio10.html          # Desarrollo de aplicaciones móviles
│   └── 📁 blog/                    # Categorías del blog
│       ├── categoria1.html          # ISO 45001 - Seguridad y Salud
│       ├── categoria2.html          # ISO 27001 - Seguridad de la Información
│       ├── categoria3.html          # ISO 14001 - Gestión Ambiental
│       └── categoria4.html          # Artículos sobre RPA
├── 📁 admin/                        # Panel de administración
│   ├── index.html                   # Dashboard principal
│   ├── tabla-servicios.html        # Gestión de servicios
│   └── tabla-contactos.html         # Gestión de contactos
├── 📁 css/                          # Estilos del sitio
│   ├── main.css                     # Estilos principales
│   ├── 📁 pages/                    # Estilos por página
│   │   ├── home.css                 # Estilos de inicio
│   │   ├── servicios.css            # Estilos de servicios
│   │   ├── blog.css                 # Estilos del blog
│   │   ├── contacto.css             # Estilos de contacto
│   │   └── 📁 admin/                # Estilos del panel admin
│   │       ├── admin.css            # Estilos del dashboard
│   │       ├── tabla-servicios.css  # Estilos de gestión de servicios
│   │       └── tabla-contactos.css  # Estilos de gestión de contactos
│   └── 📁 pages/servicios/          # Estilos específicos de servicios
├── 📁 js/                           # Funcionalidad JavaScript
│   ├── main.js                      # Funcionalidad común
│   ├── demo-data.js                 # Datos de demostración
│   ├── 📁 pages/                    # JavaScript por página
│   │   ├── home.js                  # Funcionalidad de inicio
│   │   ├── servicios.js              # Funcionalidad de servicios
│   │   ├── blog.js                  # Funcionalidad del blog
│   │   ├── contacto.js              # Funcionalidad de contacto
│   │   └── 📁 admin/                # JavaScript del panel admin
│   │       ├── admin.js             # Funcionalidad del dashboard
│   │       ├── tabla-servicios.js    # Gestión de servicios
│   │       └── tabla-contactos.js   # Gestión de contactos
│   └── 📁 pages/servicios/          # JavaScript específico de servicios
└── 📁 images/                       # Recursos multimedia
    ├── 📁 common/                   # Imágenes comunes (logo, iconos)
    ├── 📁 inicio/                   # Imágenes de la página principal
    ├── 📁 servicios/                # Imágenes de servicios
    ├── 📁 blog/                     # Imágenes del blog
    └── 📁 admin/                    # Imágenes del panel admin
```

## 🚀 Funcionalidades Principales

### 🌐 Sitio Web Público

#### **Página de Inicio (index.html)**
- **Presentación de la empresa**: Información corporativa y propuesta de valor
- **Servicios destacados**: Automatización, Diseño de procesos, Ciencia de datos, RPA
- **Diseño responsive**: Adaptable a móviles, tablets y escritorio
- **Animaciones suaves**: Efectos visuales al hacer scroll (AOS - Animate On Scroll)
- **Navegación intuitiva**: Menú hamburguesa para dispositivos móviles

#### **Página de Servicios (servicios.html)**
- **10 servicios especializados**:
  1. Diseño y transformación de procesos
  2. Diseño e implementación de modelos de gestión ISO
  3. Extensión de capacidades profesionales
  4. Automatización inteligente de procesos con RPA
  5. Ciencia de Datos
  6. Gestión estratégica de proyectos
  7. Diseño web y Tiendas virtuales
  8. Marketing digital en redes sociales
  9. Mantenimiento de Servidores
  10. Desarrollo de aplicaciones móviles
- **Navegación directa**: Cada servicio tiene su página detallada
- **Galería visual**: Imágenes representativas de cada servicio

#### **Blog Corporativo (blog.html)**
- **4 categorías especializadas**:
  - ISO 45001 - Sistema de Gestión de Seguridad y Salud en el Trabajo
  - ISO 27001 - Sistema de Gestión de Seguridad de la Información
  - ISO 14001 - Sistema de Gestión Ambiental
  - Artículos sobre RPA y automatización
- **Contenido técnico**: Artículos especializados en normativas ISO y tecnología
- **Diseño atractivo**: Tarjetas con imágenes y enlaces a artículos detallados

#### **Catalogo (catalogo.html)**
- **10 servicios con su valoración y promoción**:
  1. Diseño y transformación de procesos
  2. Diseño e implementación de modelos de gestión ISO
  3. Extensión de capacidades profesionales
  4. Automatización inteligente de procesos con RPA
  5. Ciencia de Datos
  6. Gestión estratégica de proyectos
  7. Diseño web y Tiendas virtuales
  8. Marketing digital en redes sociales
  9. Mantenimiento de Servidores
  10. Desarrollo de aplicaciones móviles
- **Contenido técnico**: Tarjetas informativas con los precios y promociones de los servicios.
- **Diseño atractivo**: Tarjetas con iconos y enlaces a su servicio detallado.

#### **Formulario de Contacto (contacto.html)**
- **Campos completos**: Nombre, teléfono, email, horario preferido, mensaje
- **Validación en tiempo real**: Verificación de datos mientras el usuario escribe
- **Almacenamiento local**: Los mensajes se guardan en el navegador (localStorage)
- **Notificaciones visuales**: Confirmación de envío exitoso o errores
- **Experiencia de usuario**: Interfaz intuitiva y fácil de usar

### 🔧 Panel de Administración

#### **Dashboard Principal (admin/index.html)**
- **Acceso centralizado**: Punto de entrada para todas las funciones administrativas
- **Tarjetas de navegación**: Acceso rápido a gestión de servicios y contactos
- **Diseño profesional**: Interfaz limpia y organizada para administradores

#### **Gestión de Servicios (admin/tabla-servicios.html)**
- **CRUD completo**: Crear, leer, actualizar y eliminar servicios
- **Estadísticas en tiempo real**: Total de servicios, activos e inactivos
- **Formularios modales**: Crear y editar servicios sin salir de la página
- **Gestión de estados**: Activar/desactivar servicios fácilmente
- **Validación de datos**: Verificación de campos obligatorios y formatos
- **Almacenamiento persistente**: Los datos se guardan en localStorage

#### **Gestión de Contactos (admin/tabla-contactos.html)**
- **Lista de mensajes**: Visualización de todas las consultas recibidas
- **Seguimiento de estado**: Marcar mensajes como respondidos o pendientes
- **Comentarios administrativos**: Agregar notas internas a cada contacto
- **Filtros y búsqueda**: Encontrar contactos específicos rápidamente
- **Datos de demostración**: Contactos de ejemplo para probar la funcionalidad

## 🛠️ Tecnologías Utilizadas

### **Frontend (Interfaz de Usuario)**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox, Grid y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva y dinámica
- **Bootstrap 5**: Framework CSS para componentes y responsividad
- **AOS (Animate On Scroll)**: Biblioteca de animaciones al hacer scroll

### **Almacenamiento de Datos**
- **localStorage**: Almacenamiento local en el navegador
- **JSON**: Formato de datos estructurado
- **Datos de demostración**: Información de ejemplo para probar funcionalidades

### **Características Técnicas**
- **Validación de Formularios**: Verificación en tiempo real
- **Modales**: Ventanas emergentes para formularios
- **Animaciones**: Transiciones suaves y efectos visuales

## 📱 Páginas del Sitio Web

### **Páginas Principales**
1. **🏠 Inicio** - Página principal con presentación de la empresa
2. **👥 Nosotros** - Información corporativa y equipo
3. **🛠️ Servicios** - Lista de 10 servicios especializados
4. **📝 Blog** - Artículos técnicos y noticias
5. **🧮 Catalogo** - Catalogo de precios de los servicios
6. **📞 Contacto** - Formulario para consultas
7. **🔐 Login** - Acceso al panel de administración

### **Páginas de Servicios (10 servicios)**
- **Servicio 1**: Diseño y transformación de procesos
- **Servicio 2**: Modelos de gestión ISO
- **Servicio 3**: Extensión de capacidades profesionales
- **Servicio 4**: Automatización RPA
- **Servicio 5**: Ciencia de Datos
- **Servicio 6**: Gestión estratégica de proyectos
- **Servicio 7**: Diseño web y tiendas virtuales
- **Servicio 8**: Marketing digital
- **Servicio 9**: Mantenimiento de servidores
- **Servicio 10**: Desarrollo de aplicaciones móviles

### **Categorías del Blog (4 categorías)**
- **Categoría 1**: ISO 45001 - Seguridad y Salud en el Trabajo
- **Categoría 2**: ISO 27001 - Seguridad de la Información
- **Categoría 3**: ISO 14001 - Gestión Ambiental
- **Categoría 4**: Artículos sobre RPA y automatización

### **Catalogo de servicios (10 servicios)**
- Una grilla de tarjetas de los 10 servicios con su valoración y promociones. 
- Buscador inteligente y filtros.

## 🚀 Instalación y Uso

### **Instalación Rápida**
1. **Descargar el proyecto** desde el repositorio
2. **Abrir `index.html`** en cualquier navegador web moderno
3. **¡Listo!** El sitio web está funcionando

### **Acceso al Panel de Administración**
1. **Navegar a**: `/admin/index.html`
2. **Credenciales de prueba**: Use usuario admin y contraseña admin, con fines educativos
3. **Usar las funcionalidades**: Gestión de servicios y contactos
4. **Datos de demostración**: Se crean automáticamente al cargar la página

### **Funcionalidades Interactivas**
- **Formularios inteligentes**: Validación en tiempo real
- **Notificaciones**: Feedback visual para el usuario (estó es una adición al diseño del boceto, para fines más de acceibilidad al usuario)
- **Modales**: Ventanas emergentes para formularios
- **Navegación fluida**: Transiciones suaves entre páginas

## 📊 Gestión de Datos

### **Almacenamiento Local**
- **localStorage**: Los datos se guardan en el navegador
- **Persistencia**: Los datos se mantienen entre sesiones (no persite entre diferentes instancias de la página)
- **Formato JSON**: Estructura de datos organizada
- **Datos de ejemplo**: Información de demostración incluida

### **Funcionalidades de Administración**
- **CRUD completo**: Crear, leer, actualizar y eliminar
- **Estadísticas**: Contadores en tiempo real
- **Filtros**: Búsqueda y organización de datos
- **Exportación**: Los datos se pueden exportar fácilmente

## 🔧 Mantenimiento y Escalabilidad

### **Estructura Modular**
- **Código organizado**: Cada página tiene sus propios archivos CSS y JS
- **Fácil mantenimiento**: Cambios independientes por página
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

### **Mejores Prácticas**
- **Código limpio**: Comentarios y documentación en el código
- **Estándares web**: HTML5 semántico y CSS3 moderno
- **Compatibilidad**: Funciona en todos los navegadores modernos

## 📈 Casos de Uso

### **Para Estudiantes**
- **Aprendizaje web**: Ejemplo completo de desarrollo frontend
- **Estructura de proyecto**: Organización adecuada de archivos
- **Tecnologías modernas**: Uso de HTML5, CSS3 y JavaScript ES6+
- **Mejores prácticas**: Código limpio y bien documentado

## 🎯 Pósibles mejoras a la aplicaión

### **Funcionalidades Adicionales**
- **Base de datos real**: Integración con backend
- **Autenticación**: Sistema de usuarios más robusto
- **Email**: Envío automático de notificaciones

### **Optimizaciones**
- **SEO**: Optimización para motores de búsqueda
- **PWA**: Aplicación web progresiva
- **Performance**: Mejoras en velocidad de carga
- **Accesibilidad**: Mejoras en accesibilidad web

---

**NetSolutions** Como taller de frontend es un ejemplo completo de un sitio web corporativo, muy basíco y sencillo de realizar, desarrollado con tecnologías web estándar y diseñado para ser escalable, mantenible y fácil de usar tanto para usuarios finales como para desarrolladores.