
/**
 * GESTIÓN DE CONTACTOS - Modulo del administrador.
 * Este archivo maneja la funcionalidad como CRUD para administrar los contactos de los usuarios
 * que se envian desde el formulario de contacto de la página web.
 * 
 * principales funcionalidades :
 * - Cargar y mostrar contactos desde localStorage
 * - Mostrar estadísticas de contactos (pendientes, respondidos, total)
 * - Editar contactos (cambiar estado y agregar comentarios como administrador) con el fin de gestionar el seguimiento de los contactos.
 * - Eliminar contactos con el fin de eliminar los contactos que no sean relevantes.
 * - Notificaciones de éxito/error (aun que no esté en los mockups, se vio necesario implementar una notificación para el usuario)
 */

/**
 * Carga todos los contactos desde localStorage y actualiza la interfaz
 * Esta es la función principal que se ejecuta al cargar la página
 */
function loadContacts() {
    try {
        // Obtener contactos del localStorage (almacenamiento local del navegador)
        const contactsData = localStorage.getItem('contacts');

        let contacts = [];
        if (contactsData) {
            // Convertir de JSON string a array de objetos
            contacts = JSON.parse(contactsData);
        }

        // Actualizar las estadísticas en la página
        updateStats(contacts);

        // Actualizar la tabla con todos los contactos
        updateContactsTable(contacts);

    } catch (error) {
        console.error('Error al cargar contactos:', error);
        showNotification('Error al cargar los contactos', 'error');

        // Mostrar mensaje de error en la tabla si algo falla
        const container = document.getElementById('contactsTableContainer');
        if (container) {
            container.innerHTML = `
                <div class="no-contacts">
                    <h3>Error al cargar contactos</h3>
                    <p>Hubo un problema al cargar los datos. Por favor, recarga la página.</p>
                </div>
            `;
        }
    }
}

/**
 * Actualiza las estadísticas de contactos en la parte superior de la página
 * Muestra en las tarjetas de las estadísticas con: contactos pendientes, respondidos y total
 * @param {Array} contacts - Array de objetos de contactos
 */
function updateStats(contacts) {
    // Contar total de contactos
    const totalContacts = contacts.length;
    
    // Filtrar contactos por estado: pendientes (sin responder)
    const sinResponder = contacts.filter(c => c.status === 'Pendiente').length;
    
    // Filtrar contactos por estado: respondidos
    const respondidos = contacts.filter(c => c.status === 'respondido').length;

    // Obtener el contenedor donde se muestran las estadísticas
    const statsContainer = document.getElementById('contactsStats');
    if (statsContainer) {
        // Generar HTML con las tarjetas de estadísticas "PENDIENTE", "RESPONDIDO" y "TOTAL"
        statsContainer.innerHTML = `
        <div class="stat-card card-red">
            <div class="stat-number">${sinResponder}</div>
            <div class="stat-label">Pendiente</div>
        </div>
        <div class="stat-card card-green">
            <div class="stat-number">${respondidos}</div>
            <div class="stat-label">Respondidos</div>
        </div>
        <div class="stat-card card-blue">
            <div class="stat-number">${totalContacts}</div>
            <div class="stat-label">Total Contactos</div>
        </div>
        `;
    }
}

/**
 * Actualiza la tabla de contactos con todos los datos
 * Genera una tabla HTML completa con todos los contactos ordenados por fecha
 * @param {Array} contacts - Array de objetos de contactos
 */
function updateContactsTable(contacts) {
    // Obtener el contenedor donde se renderiza la tabla
    const container = document.getElementById('contactsTableContainer');

    if (!container) {
        console.error('Contenedor de tabla no encontrado');
        return;
    }

    // Si no hay contactos, se va a mostrar un mensaje informativo
    if (contacts.length === 0) {
        container.innerHTML = `
            <div class="no-contacts">
                <h3>No hay contactos registrados</h3>
                <p>Los mensajes de contacto aparecerán aquí cuando los usuarios envíen el formulario.</p>
                <p><small>Total de contactos en localStorage: ${contacts.length}</small></p>
            </div>
        `;
        return;
    }

    // Ordenar contactos por fecha de creación (más recientes primero)
    const sortedContacts = contacts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });

    // Generar HTML de la tabla con encabezados
    let tableHTML = `
        <table class="contacts-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Horario</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                    <th>Comentario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Generar filas para cada contacto
    sortedContacts.forEach(contact => {
        // Formatear fecha como dd/mm/yy para mostrar en la tabla
        const dateObj = new Date(contact.createdAt);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        const date = `${day}/${month}/${year}`;

        // Determinar clase CSS y texto del estado
        const statusClass = contact.status === 'respondido' ? 'status-respondido' : 'status-sin-responder';
        const statusText = contact.status === 'respondido' ? 'Respondido' : 'Pendiente';

        // Truncar mensaje si es muy largo para que no rompa el diseño de la tabla
        const messagePreview = contact.message && contact.message.length > 50 ?
            contact.message.substring(0, 50) + '...' :
            (contact.message || 'Sin mensaje');

        // Truncar comentario si es muy largo
        const commentPreview = contact.comment ?
            (contact.comment.length > 30 ? contact.comment.substring(0, 30) + '...' : contact.comment) :
            'Sin comentario';

        // Generar fila HTML para este contacto
        tableHTML += `
            <tr>
                <td>${date}</td>
                <td>${contact.name || 'N/A'}</td>
                <td>${contact.email || 'N/A'}</td>
                <td>${contact.phone || 'N/A'}</td>
                <td>${contact.schedule || 'N/A'}</td>
                <td title="${contact.message || 'Sin mensaje'}">${messagePreview}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td title="${contact.comment || 'Sin comentario'}">${commentPreview}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="editContact(${contact.id})" title="Revisar">🔎</button>
                        <button class="btn-sm btn-delete" onclick="deleteContact(${contact.id})" title="Eliminar">🗑️</button>
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
 * Abre el modal de edición para un contacto específico
 * Llena el formulario con los datos del contacto seleccionado
 * @param {number} contactId - ID único del contacto a editar
 */
function editContact(contactId) {
    // Obtener todos los contactos del localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    
    // Buscar el contacto específico por su ID
    const contact = contacts.find(c => c.id === contactId);

    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }

    // Llenar todos los campos del formulario de edición con los datos del contacto
    document.getElementById('editContactId').value = contact.id;
    document.getElementById('editContactName').value = contact.name || '';
    document.getElementById('editContactEmail').value = contact.email || '';
    document.getElementById('editContactPhone').value = contact.phone || '';
    document.getElementById('editContactSchedule').value = contact.schedule || '';
    document.getElementById('editContactMessage').value = contact.message || '';
    document.getElementById('editContactStatus').value = contact.status || 'Pendiente';
    document.getElementById('editContactComment').value = contact.comment || '';

    // Mostrar el modal de edición
    document.getElementById('editModal').style.display = 'block';
}

/**
 * Maneja el envío del formulario de edición de contacto
 * Valida los datos y actualiza el contacto en localStorage
 * @param {Event} e - Evento del formulario
 */
function handleEditContact(e) {
    e.preventDefault(); // Prevenir envío normal del formulario

    // Obtener datos del formulario
    const contactId = parseInt(document.getElementById('editContactId').value);
    const status = document.getElementById('editContactStatus').value;
    const comment = document.getElementById('editContactComment').value;

    // Validar que si se marca como respondido, debe tener comentario
    if (status === 'respondido' && !comment.trim()) {
        showNotification('Para marcar como respondido, debes agregar un comentario', 'error');
        return;
    }

    // Obtener todos los contactos y encontrar el índice del contacto a actualizar
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactIndex = contacts.findIndex(c => c.id === contactId);

    if (contactIndex !== -1) {
        // Actualizar los campos del contacto
        contacts[contactIndex].status = status;
        contacts[contactIndex].comment = comment;
        contacts[contactIndex].updatedAt = new Date().toISOString();

        // Guardar los cambios en localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));

        showNotification('Contacto actualizado correctamente', 'success');
        closeModal();
        loadContacts(); // Recargar la tabla con los cambios
    } else {
        showNotification('Error al actualizar el contacto', 'error');
    }
}


/**
 * Elimina un contacto del localStorage después de confirmar la acción
 * @param {number} contactId - ID único del contacto a eliminar
 */
function deleteContact(contactId) {
    // Mostrar confirmación antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.')) {
        // Obtener todos los contactos
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        
        // Filtrar para remover el contacto con el ID especificado
        const updatedContacts = contacts.filter(c => c.id !== contactId);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));

        showNotification('Contacto eliminado correctamente', 'success');
        loadContacts(); // Recargar la tabla sin el contacto eliminado
    }
}

/**
 * Cierra el modal de edición y limpia el formulario
 */
function closeModal() {
    // Ocultar el modal
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.style.display = 'none';
    }

    // Limpiar el formulario
    const form = document.getElementById('editContactForm');
    if (form) {
        form.reset();
    }
}

/**
 * Refresca la lista de contactos y muestra notificación de éxito
 */
function refreshContacts() {
    loadContacts();
    showNotification('Lista de contactos actualizada', 'success');
}

/**
 * Configura todos los event listeners necesarios para la funcionalidad
 * Se ejecuta al inicializar la página
 */
function setupEventListeners() {
    // Configurar el formulario de edición
    const editForm = document.getElementById('editContactForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditContact);
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
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
window.refreshContacts = refreshContacts;
window.editContact = editContact;
window.deleteContact = deleteContact;
window.closeModal = closeModal;
window.loadContacts = loadContacts;

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

    // Cargar contactos al inicializar la página
    loadContacts();

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

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
}


