// JavaScript para la gestión de contactos en el panel de administración
document.addEventListener('DOMContentLoaded', function() {
    // Cargar contactos al inicializar
    loadContacts();
    
    // Configurar event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Formulario de edición
    const editForm = document.getElementById('editContactForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditContact);
    }
}

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    
    // Actualizar estadísticas
    updateStats(contacts);
    
    // Actualizar tabla
    updateContactsTable(contacts);
}

function updateStats(contacts) {
    const totalContacts = contacts.length;
    const sinResponder = contacts.filter(c => c.status === 'sin responder').length;
    const respondidos = contacts.filter(c => c.status === 'respondido').length;
    
    const statsContainer = document.getElementById('contactsStats');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalContacts}</div>
            <div class="stat-label">Total Contactos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${sinResponder}</div>
            <div class="stat-label">Sin Responder</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${respondidos}</div>
            <div class="stat-label">Respondidos</div>
        </div>
    `;
}

function updateContactsTable(contacts) {
    const container = document.getElementById('contactsTableContainer');
    
    if (contacts.length === 0) {
        container.innerHTML = `
            <div class="no-contacts">
                <h3>No hay contactos registrados</h3>
                <p>Los mensajes de contacto aparecerán aquí cuando los usuarios envíen el formulario.</p>
            </div>
        `;
        return;
    }
    
    // Ordenar contactos por fecha de creación (más recientes primero)
    const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    let tableHTML = `
        <table class="contacts-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    sortedContacts.forEach(contact => {
        const date = new Date(contact.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusClass = contact.status === 'respondido' ? 'status-respondido' : 'status-sin-responder';
        const statusText = contact.status === 'respondido' ? 'Respondido' : 'Sin responder';
        
        tableHTML += `
            <tr>
                <td>${date}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.schedule}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="editContact(${contact.id})">Editar</button>
                        <button class="btn-sm btn-status" onclick="toggleStatus(${contact.id})">
                            ${contact.status === 'respondido' ? 'Marcar Sin Responder' : 'Marcar Respondido'}
                        </button>
                        <button class="btn-sm btn-delete" onclick="deleteContact(${contact.id})">Eliminar</button>
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
    document.getElementById('editContactName').value = contact.name;
    document.getElementById('editContactEmail').value = contact.email;
    document.getElementById('editContactPhone').value = contact.phone;
    document.getElementById('editContactSchedule').value = contact.schedule;
    document.getElementById('editContactMessage').value = contact.message;
    document.getElementById('editContactStatus').value = contact.status;
    document.getElementById('editContactComment').value = contact.comment || '';
    
    // Mostrar modal
    document.getElementById('editModal').style.display = 'block';
}

function handleEditContact(e) {
    e.preventDefault();
    
    const contactId = parseInt(document.getElementById('editContactId').value);
    const status = document.getElementById('editContactStatus').value;
    const comment = document.getElementById('editContactComment').value;
    
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

function toggleStatus(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactIndex = contacts.findIndex(c => c.id === contactId);
    
    if (contactIndex !== -1) {
        const newStatus = contacts[contactIndex].status === 'respondido' ? 'sin responder' : 'respondido';
        contacts[contactIndex].status = newStatus;
        contacts[contactIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        showNotification(`Estado cambiado a: ${newStatus}`, 'success');
        loadContacts();
    } else {
        showNotification('Error al cambiar el estado', 'error');
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
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editContactForm').reset();
}

function refreshContacts() {
    loadContacts();
    showNotification('Lista de contactos actualizada', 'success');
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
        animation: slideInRight 0.3s ease-out;
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

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Agregar estilos CSS para las animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
