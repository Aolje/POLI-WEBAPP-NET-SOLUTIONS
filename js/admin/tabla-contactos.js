
// Definir funciones primero, antes de la carga del DOM
function loadContacts() {

    try {
        // Obtener contactos del localStorage
        const contactsData = localStorage.getItem('contacts');

        let contacts = [];
        if (contactsData) {
            contacts = JSON.parse(contactsData);
        }

        // Actualizar estadísticas
        updateStats(contacts);

        // Actualizar tabla
        updateContactsTable(contacts);

    } catch (error) {
        console.error('Error al cargar contactos:', error);
        showNotification('Error al cargar los contactos', 'error');

        // Mostrar mensaje de error en la tabla
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

function updateStats(contacts) {
    const totalContacts = contacts.length;
    const sinResponder = contacts.filter(c => c.status === 'Pendiente').length;
    const respondidos = contacts.filter(c => c.status === 'respondido').length;

    const statsContainer = document.getElementById('contactsStats');
    if (statsContainer) {
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

function updateContactsTable(contacts) {
    const container = document.getElementById('contactsTableContainer');

    if (!container) {
        console.error('Contenedor de tabla no encontrado');
        return;
    }

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

    sortedContacts.forEach(contact => {
        // Formatear fecha como dd/mm/yy
        const dateObj = new Date(contact.createdAt);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const date = `${day}/${month}/${year}`;

        const statusClass = contact.status === 'respondido' ? 'status-respondido' : 'status-sin-responder';
        const statusText = contact.status === 'respondido' ? 'Respondido' : 'Pendiente';

        // Truncar mensaje si es muy largo
        const messagePreview = contact.message && contact.message.length > 50 ?
            contact.message.substring(0, 50) + '...' :
            (contact.message || 'Sin mensaje');

        // Truncar comentario si es muy largo
        const commentPreview = contact.comment ?
            (contact.comment.length > 30 ? contact.comment.substring(0, 30) + '...' : contact.comment) :
            'Sin comentario';

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

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;

}

function editContact(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contact = contacts.find(c => c.id === contactId);

    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }

    // Llenar el formulario
    document.getElementById('editContactId').value = contact.id;
    document.getElementById('editContactName').value = contact.name || '';
    document.getElementById('editContactEmail').value = contact.email || '';
    document.getElementById('editContactPhone').value = contact.phone || '';
    document.getElementById('editContactSchedule').value = contact.schedule || '';
    document.getElementById('editContactMessage').value = contact.message || '';
    document.getElementById('editContactStatus').value = contact.status || 'Pendiente';
    document.getElementById('editContactComment').value = contact.comment || '';

    // Mostrar modal
    document.getElementById('editModal').style.display = 'block';
}

function handleEditContact(e) {
    e.preventDefault();

    const contactId = parseInt(document.getElementById('editContactId').value);
    const status = document.getElementById('editContactStatus').value;
    const comment = document.getElementById('editContactComment').value;

    // Validar que si se marca como respondido, debe tener comentario
    if (status === 'respondido' && !comment.trim()) {
        showNotification('Para marcar como respondido, debes agregar un comentario', 'error');
        return;
    }

    // Actualizar contacto
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactIndex = contacts.findIndex(c => c.id === contactId);

    if (contactIndex !== -1) {
        contacts[contactIndex].status = status;
        contacts[contactIndex].comment = comment;
        contacts[contactIndex].updatedAt = new Date().toISOString();

        localStorage.setItem('contacts', JSON.stringify(contacts));

        showNotification('Contacto actualizado correctamente', 'success');
        closeModal();
        loadContacts();
    } else {
        showNotification('Error al actualizar el contacto', 'error');
    }
}


function deleteContact(contactId) {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.')) {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        const updatedContacts = contacts.filter(c => c.id !== contactId);

        localStorage.setItem('contacts', JSON.stringify(updatedContacts));

        showNotification('Contacto eliminado correctamente', 'success');
        loadContacts();
    }
}

function closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.style.display = 'none';
    }

    const form = document.getElementById('editContactForm');
    if (form) {
        form.reset();
    }
}

function refreshContacts() {

    loadContacts();
    showNotification('Lista de contactos actualizada', 'success');
}

function setupEventListeners() {


    // Formulario de edición
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

window.refreshContacts = refreshContacts;
window.editContact = editContact;
window.deleteContact = deleteContact;
window.closeModal = closeModal;
window.loadContacts = loadContacts;

// Inicialización
function inicializar() {



    // Verificar si el localStorage está disponible
    if (typeof (Storage) === "undefined") {
        console.error('LocalStorage no está disponible');
        showNotification('Error: LocalStorage no está disponible en este navegador', 'error');
        return;
    }

    // Cargar contactos al inicializar
    loadContacts();

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
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
}


