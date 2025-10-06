/**
 * SCRIPT PRINCIPAL DEL PANEL DE ADMINISTRACIÓN * 
 * Este archivo contiene la funcionalidad JavaScript específica para el
 * panel de administración, validaciones, navegación y utilidades CRUD para las diferentes secciones del admin.
 * 
 * Funcionalidades principales:
 * - Inicialización del dashboard
 * - Configuración de navegación del admin
 * - Validación de formularios del admin
 * - Funcionalidad de tablas (ordenamiento, búsqueda, filtrado)
 * - Utilidades para operaciones CRUD
 */

// Inicialización principal cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el dashboard con animaciones
    initializeDashboard();
    
    // Configurar navegación del admin
    setupAdminNavigation();
    
    // Configurar formularios del admin
    setupAdminForms();
    
    // Configurar tablas del admin
    setupAdminTables();
});

/**
 * Inicializa el dashboard con animaciones de entrada
 * Configura las animaciones de aparición para las tarjetas del dashboard
 * usando Intersection Observer para detectar cuando los elementos son visibles
 */
function initializeDashboard() {
    // Obtener todas las tarjetas del dashboard
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    // Configuración del Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,                    // Activar cuando el 10% del elemento sea visible
        rootMargin: '0px 0px -50px 0px'   // Margen adicional para activar la animación
    };
    
    // Crear el observer para detectar cuando las tarjetas entran en el viewport
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Aplicar animación con delay escalonado para cada tarjeta
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Delay de 200ms entre cada tarjeta
            }
        });
    }, observerOptions);
    
    // Configurar animación inicial y observar cada tarjeta
    dashboardCards.forEach(card => {
        // Estado inicial: invisible y desplazada hacia abajo
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observar la tarjeta para activar la animación
        observer.observe(card);
    });
}

/**
 * Configura la navegación del panel de administración
 * Resalta la página activa en la barra de navegación basándose en la URL actual
 */
function setupAdminNavigation() {
    // Obtener el nombre del archivo actual de la URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Obtener todos los enlaces de navegación del admin
    const navLinks = document.querySelectorAll('.admin-navbar .nav-link');
    
    // Iterar sobre cada enlace para encontrar el activo
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Si el href contiene la página actual, marcarlo como activo
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

/**
 * Configura los formularios del panel de administración
 * Agrega validación y manejo de envío para todos los formularios del admin
 */
function setupAdminForms() {
    // Obtener todos los formularios con clase admin-form
    const adminForms = document.querySelectorAll('.admin-form');
    
    // Configurar cada formulario
    adminForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal del formulario
            
            // Validar el formulario antes de procesar
            if (validateAdminForm(this)) {
                // Obtener el botón de envío y cambiar su estado
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Guardando...';
                submitBtn.disabled = true;
                
                // Simular proceso de guardado con delay
                setTimeout(() => {
                    showNotification('Datos guardados correctamente', 'success');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });
}

/**
 * Valida un formulario del admin verificando campos obligatorios
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns {boolean} - true si el formulario es válido, false si no
 */
function validateAdminForm(form) {
    // Obtener todos los campos obligatorios
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    // Validar cada campo obligatorio
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            // Campo vacío: marcar como error con borde rojo
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            // Campo válido: restaurar borde normal
            field.style.borderColor = '#ecf0f1';
        }
    });
    
    return isValid;
}

/**
 * Configura las tablas del panel de administración
 * Agrega funcionalidad de ordenamiento y búsqueda a las tablas
 */
function setupAdminTables() {
    // Obtener todas las tablas con clase admin-table
    const tables = document.querySelectorAll('.admin-table');
    
    // Configurar cada tabla
    tables.forEach(table => {
        // Configurar ordenamiento por columnas
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer'; // Indicar que es clickeable
            header.addEventListener('click', function() {
                sortTable(table, this);
            });
        });
        
        // Configurar funcionalidad de búsqueda
        const searchInput = table.querySelector('.table-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterTable(table, this.value);
            });
        }
    });
}

/**
 * Ordena una tabla por la columna especificada
 * @param {HTMLTableElement} table - Tabla a ordenar
 * @param {HTMLTableCellElement} header - Encabezado de la columna por la cual ordenar
 */
function sortTable(table, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const isAscending = header.classList.contains('sort-asc');
    
    // Limpiar clases de ordenamiento de todos los encabezados
    header.parentNode.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Agregar clase de ordenamiento al encabezado actual
    header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    
    // Ordenar las filas según el contenido de la columna
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        // Cambiar dirección del ordenamiento
        if (isAscending) {
            return bValue.localeCompare(aValue); // Descendente
        } else {
            return aValue.localeCompare(bValue); // Ascendente
        }
    });
    
    // Reordenar las filas en el DOM
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Filtra las filas de una tabla según el término de búsqueda
 * @param {HTMLTableElement} table - Tabla a filtrar
 * @param {string} searchTerm - Término de búsqueda
 */
function filterTable(table, searchTerm) {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    // Filtrar cada fila según el término de búsqueda
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        
        // Mostrar u ocultar la fila según si coincide con la búsqueda
        row.style.display = matches ? '' : 'none';
    });
}

/**
 * UTILIDADES DEL PANEL DE ADMINISTRACIÓN
 * Objeto global que contiene funciones de utilidad para operaciones comunes
 * en el panel de administración.
 */
window.adminUtils = {
    /**
     * Elimina un elemento con confirmación del usuario
     * @param {string|number} itemId - ID del elemento a eliminar
     * @param {string} itemType - Tipo de elemento (para el mensaje)
     */
    deleteItem: function(itemId, itemType) {
        if (confirm(`¿Estás seguro de que quieres eliminar este ${itemType}?`)) {
            // Aquí iría la lógica de eliminación específica
            showNotification(`${itemType} eliminado correctamente`, 'success');
        }
    },
    
    /**
     * Inicia el proceso de edición de un elemento
     * @param {string|number} itemId - ID del elemento a editar
     * @param {string} itemType - Tipo de elemento
     */
    editItem: function(itemId, itemType) {
        // Aquí iría la lógica de edición específica
        console.log(`Editando ${itemType} con ID: ${itemId}`);
    },
    
    /**
     * Exporta datos en el formato especificado
     * @param {string} format - Formato de exportación (CSV, JSON, etc.)
     */
    exportData: function(format) {
        // Aquí iría la lógica de exportación específica
        showNotification(`Datos exportados en formato ${format}`, 'success');
    }
};
