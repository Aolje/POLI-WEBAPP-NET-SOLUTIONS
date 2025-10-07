
/**
 * GESTIÓN DE SERVICIOS - - Modulo del administrador.
 * Este archivo maneja la funcionalidad como CRUD para administrar los servicios que se
 * expondrian en la pagina web.
 * que se ofrecen en la página web, incluyendo creación, edición, eliminación y cambio de estado.
 * 
 * Funcionalidades principales:
 * - Cargar y mostrar servicios desde localStorage
 * - Mostrar estadísticas de servicios (total, activos, inactivos)
 * - Crear nuevos servicios con validaciones
 * - Editar servicios existentes (título, descripción, valor, imagen, estado)
 * - Cambiar estado de servicios (activar/desactivar)
 * - Eliminar servicios
 * - Notificaciones de éxito/error
 */

/**
 * Carga todos los servicios desde localStorage y actualiza la interfaz
 * Esta es la función principal que se ejecuta al cargar la página
 */
function loadServices() {
    try {
        // Obtener servicios del localStorage (almacenamiento local del navegador)
        const servicesData = localStorage.getItem('services');

        let services = [];
        if (servicesData) {
            // Convertir de JSON string a array de objetos
            services = JSON.parse(servicesData);
        }

        // Actualizar las estadísticas en la parte superior de la página
        updateStats(services);

        // Actualizar la tabla con todos los servicios
        updateServicesTable(services);

    } catch (error) {
        console.error('Error al cargar servicios:', error);
        showNotification('Error al cargar los servicios', 'error');

        // Mostrar mensaje de error en la tabla si algo falla
        const container = document.getElementById('servicesTableContainer');
        if (container) {
            container.innerHTML = `
                <div class="no-services">
                    <h3>Error al cargar servicios</h3>
                    <p>Hubo un problema al cargar los datos. Por favor, recarga la página.</p>
                </div>
            `;
        }
    }
}

/**
 * Actualiza las estadísticas de servicios en la parte superior de la página
 * Muestra tarjetas con: total de servicios, activos e inactivos
 * @param {Array} services - Array de objetos de servicios
 */
function updateStats(services) {
    // Contar total de servicios
    const totalServices = services.length;
    
    // Filtrar servicios por estado: activos
    const activos = services.filter(s => s.status === 'activo').length;
    
    // Filtrar servicios por estado: inactivos
    const inactivos = services.filter(s => s.status === 'inactivo').length;

    // Obtener el contenedor donde se muestran las estadísticas
    const statsContainer = document.getElementById('servicesStats');
    if (statsContainer) {
        // Generar HTML con las tarjetas de estadísticas
        statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalServices}</div>
            <div class="stat-label">Total Servicios</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${activos}</div>
            <div class="stat-label">Activos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${inactivos}</div>
            <div class="stat-label">Inactivos</div>
        </div>
        `;
    }
}

/**
 * Actualiza la tabla de servicios con todos los datos
 * Genera una tabla HTML completa con todos los servicios ordenados por fecha
 * @param {Array} services - Array de objetos de servicios
 */
function updateServicesTable(services) {
    // Obtener el contenedor donde se renderiza la tabla
    const container = document.getElementById('servicesTableContainer');

    if (!container) {
        console.error('Contenedor de tabla no encontrado');
        return;
    }

    // Si no hay servicios, mostrar mensaje informativo
    if (services.length === 0) {
        container.innerHTML = `
            <div class="no-services">
                <h3>No hay servicios registrados</h3>
                <p>Los servicios aparecerán aquí cuando se agreguen al sistema.</p>
                <p><small>Total de servicios en localStorage: ${services.length}</small></p>
            </div>
        `;
        return;
    }

    // Ordenar servicios por fecha de creación (más recientes primero)
    const sortedServices = services.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });

    // Generar HTML de la tabla con encabezados
    let tableHTML = `
        <table class="services-table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Generar filas para cada servicio
    sortedServices.forEach(service => {
        // Formatear fecha como dd/mm/yy para mostrar en la tabla
        const dateObj = new Date(service.createdAt);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        const date = `${day}/${month}/${year}`;

        // Determinar clase CSS y texto del estado
        const statusClass = service.status === 'activo' ? 'status-activo' : 'status-inactivo';
        const statusText = service.status === 'activo' ? 'Activo' : 'Inactivo';

        // Truncar descripción si es muy larga para que no rompa el diseño de la tabla
        const descriptionPreview = service.description && service.description.length > 50 ?
            service.description.substring(0, 50) + '...' :
            (service.description || 'Sin descripción');

        // Formatear valor como moneda colombiana (COP)
        const formattedValue = service.value ? 
            new Intl.NumberFormat('es-CO', { 
                style: 'currency', 
                currency: 'COP' 
            }).format(service.value) : 
            'Sin valor';

        // Generar fila HTML para este servicio
        tableHTML += `
            <tr>
                <td>
                    ${service.image ? 
                        `<img src="${service.image}" alt="${service.title}" class="service-image" onerror="this.src='../images/common/logo.png'">` : 
                        '<div class="service-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999;">Sin imagen</div>'
                    }
                </td>
                <td>${service.title || 'Sin título'}</td>
                <td title="${service.description || 'Sin descripción'}">${descriptionPreview}</td>
                <td>${formattedValue}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${date}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="editService(${service.id})" title="Editar">✏️</button>
                        <button class="btn-sm btn-status" onclick="toggleServiceStatus(${service.id})" title="Cambiar Estado">
                            ${service.status === 'activo' ? 'Desactivar' : 'Activar'}
                        </button>
                        <button class="btn-sm btn-delete" onclick="deleteService(${service.id})" title="Eliminar">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    });

    // Cerrar la tabla
    tableHTML += `
            </tbody>
        </table>
    `;

    // Insertar el HTML generado en el contenedor
    container.innerHTML = tableHTML;
}

/**
 * Abre el modal de edición para un servicio específico
 * Llena el formulario con los datos del servicio seleccionado
 * @param {number} serviceId - ID único del servicio a editar
 */
function editService(serviceId) {
    // Obtener todos los servicios del localStorage
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    // Buscar el servicio específico por su ID
    const service = services.find(s => s.id === serviceId);

    if (!service) {
        showNotification('Servicio no encontrado', 'error');
        return;
    }

    // Llenar todos los campos del formulario de edición con los datos del servicio
    document.getElementById('editServiceId').value = service.id;
    document.getElementById('editServiceImage').value = service.image || '';
    document.getElementById('editServiceTitle').value = service.title || '';
    document.getElementById('editServiceDescription').value = service.description || '';
    document.getElementById('editServiceValue').value = service.value || '';
    document.getElementById('editServiceStatus').value = service.status || 'activo';

    // Mostrar el modal de edición
    document.getElementById('editModal').style.display = 'block';
}

/**
 * Maneja el envío del formulario de edición de servicio
 * Valida los datos y actualiza el servicio en localStorage
 * @param {Event} e - Evento del formulario
 */
function handleEditService(e) {
    e.preventDefault(); // Prevenir envío normal del formulario

    // Obtener datos del formulario
    const serviceId = parseInt(document.getElementById('editServiceId').value);
    const image = document.getElementById('editServiceImage').value.trim();
    const title = document.getElementById('editServiceTitle').value.trim();
    const description = document.getElementById('editServiceDescription').value.trim();
    const value = parseFloat(document.getElementById('editServiceValue').value) || 0;
    const status = document.getElementById('editServiceStatus').value;

    // Validaciones de campos obligatorios
    if (!title) {
        showNotification('El título es obligatorio', 'error');
        return;
    }

    if (!description) {
        showNotification('La descripción es obligatoria', 'error');
        return;
    }

    if (value < 0) {
        showNotification('El valor no puede ser negativo', 'error');
        return;
    }

    // Obtener todos los servicios y encontrar el índice del servicio a actualizar
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);

    if (serviceIndex !== -1) {
        // Actualizar todos los campos del servicio
        services[serviceIndex].image = image;
        services[serviceIndex].title = title;
        services[serviceIndex].description = description;
        services[serviceIndex].value = value;
        services[serviceIndex].status = status;
        services[serviceIndex].updatedAt = new Date().toISOString();

        // Guardar los cambios en localStorage
        localStorage.setItem('services', JSON.stringify(services));

        showNotification('Servicio actualizado correctamente', 'success');
        closeModal();
        loadServices(); // Recargar la tabla con los cambios
    } else {
        showNotification('Error al actualizar el servicio', 'error');
    }
}


/**
 * Elimina un servicio del localStorage después de confirmar la acción
 * @param {number} serviceId - ID único del servicio a eliminar
 */
function deleteService(serviceId) {
    // Mostrar confirmación antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.')) {
        // Obtener todos los servicios
        const services = JSON.parse(localStorage.getItem('services') || '[]');
        
        // Filtrar para remover el servicio con el ID especificado
        const updatedServices = services.filter(s => s.id !== serviceId);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('services', JSON.stringify(updatedServices));

        showNotification('Servicio eliminado correctamente', 'success');
        loadServices(); // Recargar la tabla sin el servicio eliminado
    }
}

/**
 * Cambia el estado de un servicio entre activo e inactivo
 * @param {number} serviceId - ID único del servicio a cambiar de estado
 */
function toggleServiceStatus(serviceId) {
    // Obtener todos los servicios
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex !== -1) {
        // Cambiar el estado: si está activo lo pone inactivo y viceversa
        const newStatus = services[serviceIndex].status === 'activo' ? 'inactivo' : 'activo';
        services[serviceIndex].status = newStatus;
        services[serviceIndex].updatedAt = new Date().toISOString();
        
        // Guardar los cambios en localStorage
        localStorage.setItem('services', JSON.stringify(services));
        
        showNotification(`Estado cambiado a: ${newStatus}`, 'success');
        loadServices(); // Recargar la tabla con el nuevo estado
    } else {
        showNotification('Error al cambiar el estado', 'error');
    }
}

/**
 * Cierra el modal de edición y limpia el formulario
 */
function closeModal() {
    // Ocultar el modal de edición
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.style.display = 'none';
    }

    // Limpiar el formulario de edición
    const form = document.getElementById('editServiceForm');
    if (form) {
        form.reset();
    }
}

/**
 * Refresca la lista de servicios y muestra notificación de éxito
 */
function refreshServices() {
    loadServices();
    showNotification('Lista de servicios actualizada', 'success');
}

/**
 * Abre el modal para crear un nuevo servicio
 */
function openCreateModal() {
    // Limpiar el formulario de creación
    document.getElementById('createServiceForm').reset();
    // Mostrar el modal de creación
    document.getElementById('createModal').style.display = 'block';
}

/**
 * Cierra el modal de creación y limpia el formulario
 */
function closeCreateModal() {
    // Ocultar el modal de creación
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Limpiar el formulario de creación
    const form = document.getElementById('createServiceForm');
    if (form) {
        form.reset();
    }
}

/**
 * Maneja el envío del formulario de creación de servicio
 * Valida los datos y crea un nuevo servicio en localStorage
 * @param {Event} e - Evento del formulario
 */
function handleCreateService(e) {
    e.preventDefault(); // Prevenir envío normal del formulario

    // Obtener datos del formulario
    const image = document.getElementById('createServiceImage').value.trim();
    const title = document.getElementById('createServiceTitle').value.trim();
    const description = document.getElementById('createServiceDescription').value.trim();
    const value = parseFloat(document.getElementById('createServiceValue').value) || 0;
    const status = document.getElementById('createServiceStatus').value;

    // Validaciones de campos obligatorios
    if (!title) {
        showNotification('El título es obligatorio', 'error');
        return;
    }

    if (!description) {
        showNotification('La descripción es obligatoria', 'error');
        return;
    }

    if (value < 0) {
        showNotification('El valor no puede ser negativo', 'error');
        return;
    }

    // Crear nuevo objeto servicio con ID único basado en timestamp
    const newService = {
        id: Date.now(), // ID único basado en timestamp
        image: image,
        title: title,
        description: description,
        value: value,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Obtener servicios existentes del localStorage
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    // Agregar el nuevo servicio al array
    services.push(newService);
    
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('services', JSON.stringify(services));

    showNotification('Servicio creado correctamente', 'success');
    closeCreateModal();
    loadServices(); // Recargar la tabla con el nuevo servicio
}

/**
 * Configura todos los event listeners necesarios para la funcionalidad
 * Se ejecuta al inicializar la página
 */
function setupEventListeners() {
    // Configurar el formulario de creación
    const createForm = document.getElementById('createServiceForm');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateService);
    }

    // Configurar el formulario de edición
    const editForm = document.getElementById('editServiceForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditService);
    }

    // Cerrar modales con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
            closeCreateModal();
        }
    });
}

/**
 * Muestra una notificación temporal en la esquina superior derecha
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success' o 'error')
 */
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Aplicar estilos CSS inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        max-width: 300px;
    `;

    // Aplicar color de fondo según el tipo
    if (type === 'success') {
        notification.style.background = '#27ae60'; // Verde para éxito
    } else if (type === 'error') {
        notification.style.background = '#e74c3c'; // Rojo para error
    }

    // Agregar la notificación al DOM
    document.body.appendChild(notification);

    // Remover la notificación después de 3 segundos con animación
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Hacer las funciones globales para que estén disponibles desde HTML
window.refreshServices = refreshServices;
window.openCreateModal = openCreateModal;
window.closeCreateModal = closeCreateModal;
window.editService = editService;
window.deleteService = deleteService;
window.toggleServiceStatus = toggleServiceStatus;
window.closeModal = closeModal;
window.loadServices = loadServices;

/**
 * Función de inicialización principal
 * Se ejecuta cuando la página está lista
 */
function inicializar() {
    // Verificar si el localStorage está disponible en el navegador
    if (typeof (Storage) === "undefined") {
        console.error('LocalStorage no está disponible');
        showNotification('Error: LocalStorage no está disponible en este navegador', 'error');
        return;
    }

    // Cargar servicios al inicializar la página
    loadServices();

    // Configurar todos los event listeners necesarios
    setupEventListeners();
}

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    // Si el DOM aún se está cargando, esperar al evento DOMContentLoaded
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    // Si el DOM ya está listo, ejecutar inmediatamente
    inicializar();
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = function (event) {
    const editModal = document.getElementById('editModal');
    const createModal = document.getElementById('createModal');
    
    // Cerrar modal de edición si se hace clic fuera de él
    if (event.target === editModal) {
        closeModal();
    }
    
    // Cerrar modal de creación si se hace clic fuera de él
    if (event.target === createModal) {
        closeCreateModal();
    }
}


