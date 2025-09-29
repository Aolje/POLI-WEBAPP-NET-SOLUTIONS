
// Definir funciones primero, antes de la carga del DOM
function loadServices() {
    try {
        // Obtener servicios del localStorage
        const servicesData = localStorage.getItem('services');

        let services = [];
        if (servicesData) {
            services = JSON.parse(servicesData);
        }

        // Actualizar estadísticas
        updateStats(services);

        // Actualizar tabla
        updateServicesTable(services);

    } catch (error) {
        console.error('Error al cargar servicios:', error);
        showNotification('Error al cargar los servicios', 'error');

        // Mostrar mensaje de error en la tabla
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

function updateStats(services) {
    const totalServices = services.length;
    const activos = services.filter(s => s.status === 'activo').length;
    const inactivos = services.filter(s => s.status === 'inactivo').length;

    const statsContainer = document.getElementById('servicesStats');
    if (statsContainer) {
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

function updateServicesTable(services) {
    const container = document.getElementById('servicesTableContainer');

    if (!container) {
        console.error('Contenedor de tabla no encontrado');
        return;
    }

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

    // Ordenar servicios por fecha de creación más recientes primero
    const sortedServices = services.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });

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

    sortedServices.forEach(service => {
        // Formatear fecha como dd/mm/yy
        const dateObj = new Date(service.createdAt);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        const date = `${day}/${month}/${year}`;

        const statusClass = service.status === 'activo' ? 'status-activo' : 'status-inactivo';
        const statusText = service.status === 'activo' ? 'Activo' : 'Inactivo';

        // Truncar descripción si es muy larga
        const descriptionPreview = service.description && service.description.length > 50 ?
            service.description.substring(0, 50) + '...' :
            (service.description || 'Sin descripción');

        // Formatear valor como moneda
        const formattedValue = service.value ? 
            new Intl.NumberFormat('es-CO', { 
                style: 'currency', 
                currency: 'COP' 
            }).format(service.value) : 
            'Sin valor';

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

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

function editService(serviceId) {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const service = services.find(s => s.id === serviceId);

    if (!service) {
        showNotification('Servicio no encontrado', 'error');
        return;
    }

    // Llenar el formulario
    document.getElementById('editServiceId').value = service.id;
    document.getElementById('editServiceImage').value = service.image || '';
    document.getElementById('editServiceTitle').value = service.title || '';
    document.getElementById('editServiceDescription').value = service.description || '';
    document.getElementById('editServiceValue').value = service.value || '';
    document.getElementById('editServiceStatus').value = service.status || 'activo';

    // Mostrar modal
    document.getElementById('editModal').style.display = 'block';
}

function handleEditService(e) {
    e.preventDefault();

    const serviceId = parseInt(document.getElementById('editServiceId').value);
    const image = document.getElementById('editServiceImage').value.trim();
    const title = document.getElementById('editServiceTitle').value.trim();
    const description = document.getElementById('editServiceDescription').value.trim();
    const value = parseFloat(document.getElementById('editServiceValue').value) || 0;
    const status = document.getElementById('editServiceStatus').value;

    // Validaciones
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

    // Actualizar servicio
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);

    if (serviceIndex !== -1) {
        services[serviceIndex].image = image;
        services[serviceIndex].title = title;
        services[serviceIndex].description = description;
        services[serviceIndex].value = value;
        services[serviceIndex].status = status;
        services[serviceIndex].updatedAt = new Date().toISOString();

        localStorage.setItem('services', JSON.stringify(services));

        showNotification('Servicio actualizado correctamente', 'success');
        closeModal();
        loadServices();
    } else {
        showNotification('Error al actualizar el servicio', 'error');
    }
}


function deleteService(serviceId) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.')) {
        const services = JSON.parse(localStorage.getItem('services') || '[]');
        const updatedServices = services.filter(s => s.id !== serviceId);

        localStorage.setItem('services', JSON.stringify(updatedServices));

        showNotification('Servicio eliminado correctamente', 'success');
        loadServices();
    }
}

function toggleServiceStatus(serviceId) {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex !== -1) {
        const newStatus = services[serviceIndex].status === 'activo' ? 'inactivo' : 'activo';
        services[serviceIndex].status = newStatus;
        services[serviceIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('services', JSON.stringify(services));
        
        showNotification(`Estado cambiado a: ${newStatus}`, 'success');
        loadServices();
    } else {
        showNotification('Error al cambiar el estado', 'error');
    }
}

function closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.style.display = 'none';
    }

    const form = document.getElementById('editServiceForm');
    if (form) {
        form.reset();
    }
}

function refreshServices() {
    loadServices();
    showNotification('Lista de servicios actualizada', 'success');
}

function openCreateModal() {
    // Limpiar formulario
    document.getElementById('createServiceForm').reset();
    // Mostrar modal
    document.getElementById('createModal').style.display = 'block';
}

function closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.style.display = 'none';
    }
    const form = document.getElementById('createServiceForm');
    if (form) {
        form.reset();
    }
}

function handleCreateService(e) {
    e.preventDefault();

    const image = document.getElementById('createServiceImage').value.trim();
    const title = document.getElementById('createServiceTitle').value.trim();
    const description = document.getElementById('createServiceDescription').value.trim();
    const value = parseFloat(document.getElementById('createServiceValue').value) || 0;
    const status = document.getElementById('createServiceStatus').value;

    // Validaciones
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

    // Crear nuevo servicio
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

    // Obtener servicios existentes
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    // Agregar nuevo servicio
    services.push(newService);
    
    // Guardar en localStorage
    localStorage.setItem('services', JSON.stringify(services));

    showNotification('Servicio creado correctamente', 'success');
    closeCreateModal();
    loadServices();
}

function setupEventListeners() {
    // Formulario de creación
    const createForm = document.getElementById('createServiceForm');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateService);
    }

    // Formulario de edición
    const editForm = document.getElementById('editServiceForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditService);
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
            closeCreateModal();
        }
    });
}

function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos de la notificación
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

    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    }

    // Agregar al DOM
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Hacer las funciones globales INMEDIATAMENTE

window.refreshServices = refreshServices;
window.openCreateModal = openCreateModal;
window.closeCreateModal = closeCreateModal;
window.editService = editService;
window.deleteService = deleteService;
window.toggleServiceStatus = toggleServiceStatus;
window.closeModal = closeModal;
window.loadServices = loadServices;

// Inicialización
function inicializar() {
    // Verificar si el localStorage está disponible
    if (typeof (Storage) === "undefined") {
        console.error('LocalStorage no está disponible');
        showNotification('Error: LocalStorage no está disponible en este navegador', 'error');
        return;
    }

    // Cargar servicios al inicializar
    loadServices();

    // Configurar event listeners
    setupEventListeners();
}

// Ejecutar inmediatamente si el DOM ya está listo, o esperar si no
if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', inicializar);
} else {

    inicializar();
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    const editModal = document.getElementById('editModal');
    const createModal = document.getElementById('createModal');
    
    if (event.target === editModal) {
        closeModal();
    }
    
    if (event.target === createModal) {
        closeCreateModal();
    }
}


