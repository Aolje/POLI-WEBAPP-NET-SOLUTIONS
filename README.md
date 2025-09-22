# Mi Sitio Web

Sitio web básico desarrollado con HTML, CSS y JavaScript vanilla.

## Estructura del Proyecto

```
WEBAPP/
├── index.html                 # Página principal
├── pages/                     # Páginas principales
│   ├── nosotros.html
│   ├── servicios.html
│   ├── blog.html
│   ├── contacto.html
│   ├── login.html
│   ├── servicios/             # Sub-páginas de servicios
│   │   ├── servicio1.html
│   │   ├── servicio2.html
│   │   ├── servicio3.html
│   │   ├── servicio4.html
│   │   ├── servicio5.html
│   │   └── servicio6.html
│   └── blog/                  # Sub-páginas del blog
│       ├── categoria1.html
│       ├── categoria2.html
│       ├── categoria3.html
│       └── categoria4.html
├── admin/                     # Panel de administración
│   └── admin.html
|   ├── panel-admin.html
├── css/                       # Estilos CSS
│   ├── main.css              # Estilos principales
│   ├── pages/                # Estilos específicos por página
│   │   ├── home.css
│   │   ├── nosotros.css
│   │   ├── servicios.css
│   │   ├── blog.css
│   │   ├── contacto.css
│   │   ├── login.css
│   │   └── admin/
│   │       └── admin.css
│   └── pages/servicios/       # Estilos específicos de servicios
│       ├── servicio1.css
│       ├── servicio2.css
│       ├── servicio3.css
│       ├── servicio4.css
│       ├── servicio5.css
│       └── servicio6.css
├── js/                        # JavaScript
│   ├── main.js               # JavaScript principal
│   ├── pages/                # JavaScript específico por página
│   │   ├── home.js
│   │   ├── nosotros.js
│   │   ├── servicios.js
│   │   ├── blog.js
│   │   ├── contacto.js
│   │   ├── login.js
│   │   └── admin/
│   │       └── admin.js
│   └── pages/servicios/       # JavaScript específico de servicios
│       ├── servicio1.js
│       ├── servicio2.js
│       ├── servicio3.js
│       ├── servicio4.js
│       ├── servicio5.js
│       └── servicio6.js
└── images/                    # Directorio de imágenes
    ├── pages/                # Imágenes de páginas
    ├── servicios/            # Imágenes de servicios
    ├── blog/                 # Imágenes del blog
    ├── admin/                # Imágenes del admin
    └── common/               # Imágenes comunes
```

## Características

- **Responsive Design**: Diseño adaptable a diferentes dispositivos
- **Navegación Mobile**: Menú hamburguesa para dispositivos móviles
- **Animaciones**: Efectos de entrada y transiciones suaves
- **Validación de Formularios**: Validación en tiempo real
- **Panel de Administración**: Interfaz separada para administradores
- **Estructura Modular**: Organización por componentes y páginas

## Páginas Principales

1. **Home** - Página de inicio
2. **Nosotros** - Información sobre la empresa
3. **Servicios** - Lista de servicios con 6 sub-páginas
4. **Blog** - Blog con 4 categorías
5. **Contacto** - Formulario de contacto
6. **Login** - Página de inicio de sesión

## Panel de Administración

- Acceso desde: `/admin/index.html`
- Credenciales por defecto: admin/admin
- Funcionalidades:
  - Dashboard principal
  - Gestión de contenido
  - Administración de usuarios
  - Configuración del sitio

## Tecnologías Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animaciones)
- JavaScript ES6+
- Sin dependencias externas

## Instalación

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. Para desarrollo, usa un servidor local (recomendado)

## Desarrollo

- Cada página tiene su propio CSS y JS específico
- Los estilos comunes están en `css/main.css`
- El JavaScript principal está en `js/main.js`
- Las imágenes se organizan por categorías en el directorio `images/`

## Notas

- El proyecto está diseñado para ser escalable y fácil de mantener
- Cada componente es independiente y reutilizable
- Se incluyen animaciones y efectos modernos
- Compatible con navegadores modernos
