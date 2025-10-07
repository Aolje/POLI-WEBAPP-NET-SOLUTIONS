/* 
====================================================================
JavaScript específico de la página Catálogo (catalogo.js)
Propósito:
  - Renderizar el listado de servicios con búsqueda, orden y paginación.
  - Ajustar la cantidad de tarjetas por página según el ancho de pantalla.
  - Delegar eventos para CTA "Solicite su Demo" y apertura de detalle.

Dependencias externas:
  - Ninguna. Utiliza APIs nativas del navegador.

Accesibilidad y rendimiento:
  - Accesibilidad: aria-live="polite" y aria-busy en el contenedor de resultados,
    aria-current="page" en la paginación.
  - Rendimiento: imágenes con loading="lazy" + decoding="async",
    cálculos mínimos en render y “debounce” básico en resize.

Notas:
  - No altera el diseño visual; solo añade semántica y micro-optimizaciones.
====================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // ========================= Helpers =========================
  const warn = (...args) => console.warn('[CATÁLOGO]', ...args);

  // ================== Paginación adaptativa ==================
  let ITEMS_POR_PAG = 9;                 // se recalcula dinámicamente
  const FILAS_POR_PAG_DESKTOP = 3;       // filas en desktop
  const FILAS_POR_PAG_MOBILE  = 4;       // filas en móvil (pon 3 si prefieres)

  function filasPorPag() {
    return (window.innerWidth <= 760) ? FILAS_POR_PAG_MOBILE : FILAS_POR_PAG_DESKTOP;
  }

  // Detecta columnas según breakpoints de Bootstrap
  function detectarColumnas() {
    const w = window.innerWidth;
    if (w >= 992) return 3; // lg y superiores: 3 columnas
    if (w >= 576) return 2; // sm y md: 2 columnas
    return 1;               // xs: 1 columna
  }

  function recalcularItemsPorPag() {
    const cols = detectarColumnas();
    ITEMS_POR_PAG = cols * filasPorPag();
  }

  // ========================= Dataset =========================
  const items = [
    {
      id: 1, nombre: 'Diseño web / Tiendas virtuales', precio: 120000,
      icon: '../images/catalogo/catalogo1.png',
      desc: 'Desarrollo de sitios Web y tiendas en línea a medida',
      promo: 'Si son más de 7 horas te queda cada hora en $ 110.000',
      detalle: '../pages/servicios/servicio7.html'
    },
    {
      id: 2, nombre: 'Marketing digital en redes Sociales', precio: 80000,
      icon: '../images/catalogo/catalogo1.png',
      desc: 'Estrategias y gestión de campañas en redes sociales',
      detalle: '../pages/servicios/servicio8.html'
    },
    {
      id: 3, nombre: 'Gestión estratégica de proyectos', precio: 120000,
      icon: '../images/catalogo/catalogo9.png',
      desc: 'Planificación, ejecución y seguimiento de tus proyectos.',
      promo: '',
      detalle: '../pages/servicios/servicio6.html'
    },
    {
      id: 4, nombre: 'Mantenimiento de Servidores', precio: 85000,
      icon: '../images/catalogo/catalogo3.png',
      desc: 'Soporte y mantenimiento de infraestructura TI',
      detalle: '../pages/servicios/servicio9.html'
    },
    {
      id: 5, nombre: 'Desarrollo de aplicaciones iOS y Android', precio: 100000,
      icon: '../images/catalogo/catalogo4.png',
      desc: 'Creación de Apps para iOS y Android',
      detalle: '../pages/servicios/servicio10.html'
    },
    {
      id: 6, nombre: 'Automatización de procesos (RPA)', precio: 110000,
      icon: '../images/catalogo/catalogo5.png',
      desc: 'Implementación de robots para automatizar tareas',
      promo: 'Si tomas este servicio con nosotros, el próximo servicio tiene un 15% de descuento ',
      detalle: '../pages/servicios/servicio4.html'
    },
    {
      id: 7, nombre: 'Diseño y transformación de procesos', precio: 95000,
      icon: '../images/catalogo/catalogo8.png',
      desc: 'Mejora y optimización de flujos de trabajo',
      detalle: '../pages/servicios/servicio1.html'
    },
    {
      id: 8, nombre: 'Ciencia de Datos', precio: 95000,
      icon: '../images/catalogo/catalogo6.png',
      desc: 'Análisis y visualización de datos para la toma de decisiones.',
      detalle: '../pages/servicios/servicio5.html'
    },
    {
      id: 9, nombre: 'Capacitación tecnológica', precio: 60000,
      icon: '../images/catalogo/catalogo7.png',
      desc: 'Cursos y Workshops en tecnologías y herramientas',
      detalle: '../pages/servicios/servicio3.html'
    },
    {
      id: 10, nombre: 'Diseño e implementación de modelos de gestión ISO', precio: 67000,
      icon: '../images/catalogo/catalogo7.png',
      desc: 'Descripción de este luego',
      detalle: '../pages/servicios/servicio2.html'
    }
  ];

  // ================================================================
  // REFERENCIAS (DOM) Y ESTADO DE LA PÁGINA
  // - $grid, $pag, $search, $orden: nodos del DOM que reutilizamos.
  // - pagina, texto, orden: estado actual para filtrar/ordenar/paginar.
  // ================================================================
  const $grid   = document.getElementById('catalogo-grid');
  const $pag    = document.getElementById('catalogo-paginacion');
  const $search = document.getElementById('catalogo-buscar');
  const $orden  = document.getElementById('catalogo-orden');

  if (!$grid) warn('Falta el contenedor del grid: #catalogo-grid');
  if (!$pag)  warn('Falta el contenedor de paginación: #catalogo-paginacion');

  // Accesibilidad (sin cambios visuales)
  if ($grid) {
    $grid.setAttribute('role', 'region');
    $grid.setAttribute('aria-live', 'polite');
    $grid.setAttribute('aria-label', 'Resultados del catálogo');
  }

  let pagina = 1;        // página actual
  let texto  = '';       // término de búsqueda (minúsculas)
  let orden  = 'relevancia'; // criterio de orden activo

  // ======================= Render principal =======================
  function render() {
    if (!$grid) return;
    $grid.setAttribute('aria-busy', 'true');

    // Filtrar
    let lista = items.filter(it => {
      if (!texto) return true;
      const hay = (it.nombre + ' ' + it.desc).toLowerCase();
      return hay.includes(texto);
    });

    // Ordenar
    lista.sort((a, b) => {
      switch (orden) {
        case 'nombre-asc':  return a.nombre.localeCompare(b.nombre);
        case 'nombre-desc': return b.nombre.localeCompare(a.nombre);
        case 'precio-asc':  return a.precio - b.precio;
        case 'precio-desc': return b.precio - a.precio;
        default:            return a.id - b.id; // relevancia simple
      }
    });

    // Paginación
    const total    = lista.length;
    const totalPag = Math.max(1, Math.ceil(total / ITEMS_POR_PAG));
    pagina = Math.min(pagina, totalPag);

    const ini   = (pagina - 1) * ITEMS_POR_PAG;
    const fin   = ini + ITEMS_POR_PAG;
    const trozo = lista.slice(ini, fin);

    // Pintar tarjetas
    $grid.innerHTML = trozo.map(cardHTML).join('');

    // Paginación UI
    if ($pag) {
      let htmlPag = '';
      for (let i = 1; i <= totalPag; i++) {
        const active = (i === pagina);
        htmlPag += `
          <li>
            <button
              class="${active ? 'active' : ''}"
              data-page="${i}"
              aria-label="Ir a la página ${i}"
              ${active ? 'aria-current="page"' : ''}
            >${i}</button>
          </li>`;
      }
      $pag.innerHTML = htmlPag;

      $pag.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          pagina = parseInt(btn.dataset.page, 10);
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    $grid.setAttribute('aria-busy', 'false');
  }

  // ==================== Plantilla de tarjeta ======================
  function cardHTML(s) {
    const precio = Number(s.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    return `
    <!-- d-flex en la columna para que el article pueda estirarse -->
    <div class="col-12 col-sm-6 col-lg-4 d-flex">
      <!-- h-100 para que la tarjeta ocupe toda la altura de la columna -->
      <article class="card-servicio h-100" data-service-id="${s.id}" data-service-url="${s.detalle}" style="cursor: pointer;">
        <div class="card-servicio__icono">
          <img
            src="${s.icon}"
            alt="${escapeHtml(s.nombre)}"
            loading="lazy"
            decoding="async"
            onerror="this.style.opacity=.15"
          >
        </div>

        <div class="card-servicio__row">
          <div class="card-servicio__colL">
            <h3 class="card-servicio__title" title="${escapeHtml(s.nombre)}">${escapeHtml(s.nombre)}</h3>
            <p class="card-servicio__desc" title="${escapeHtml(s.desc)}">${escapeHtml(s.desc)}</p>
          </div>

          <div class="card-servicio__colR">
            <div class="precio-strong">${precio} <span class="barra">/ Hora</span></div>
            ${s.promo
              ? `<div class="promo" title="${escapeHtml(s.promo)}">${escapeHtml(s.promo)}</div>`
              : `<div class="promo promo--empty"></div>`
            }
          </div>
        </div>

        <div class="card-servicio__cta">
          <button class="btn-demo" data-id="${s.id}">Solicite su Demo</button>
        </div>
      </article>
    </div>`;
  }

  // =========================== Utils ==============================
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  // ========================= Listeners ============================
  if ($search) {
    $search.addEventListener('input', e => {
      texto = e.target.value.toLowerCase();
      pagina = 1;
      render();
    });
  }

  if ($orden) {
    $orden.addEventListener('change', e => {
      orden = e.target.value;
      pagina = 1;
      render();
    });
  }

  // Delegación: botón "Solicite su Demo" y click en tarjeta
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-demo');
    if (btn) {
      e.stopPropagation(); // evita que se active el click de la tarjeta
      window.location.href = './contacto.html'; // relativo a /pages/
      return;
    }

    const card = e.target.closest('.card-servicio');
    if (card) {
      const serviceUrl = card.getAttribute('data-service-url');
      if (serviceUrl) window.location.href = serviceUrl;
    }
  });

  // ===================== Init + resize (debounce) =================
  recalcularItemsPorPag();
  render();

  let _rzTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_rzTimer);
    _rzTimer = setTimeout(() => {
      const anterior = ITEMS_POR_PAG;
      recalcularItemsPorPag();
      if (ITEMS_POR_PAG !== anterior) {
        pagina = 1;
        render();
      }
    }, 120);
  });
});
