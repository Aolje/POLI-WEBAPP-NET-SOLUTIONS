// JavaScript específico para el panel de administración
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el dashboard
    initializeDashboard();
    
    // Configurar navegación del admin
    setupAdminNavigation();
    
    // Configurar formularios del admin
    setupAdminForms();
    
    // Configurar tablas del admin
    setupAdminTables();
});

function initializeDashboard() {
    // Animación de aparición para las tarjetas del dashboard
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    dashboardCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function setupAdminNavigation() {
    // Resaltar página activa en la navegación
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.admin-navbar .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function setupAdminForms() {
    // Configurar validación de formularios del admin
    const adminForms = document.querySelectorAll('.admin-form');
    
    adminForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateAdminForm(this)) {
                // Simular guardado
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Guardando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Datos guardados correctamente', 'success');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });
}

function validateAdminForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ecf0f1';
        }
    });
    
    return isValid;
}

function setupAdminTables() {
    // Configurar funcionalidad de las tablas del admin
    const tables = document.querySelectorAll('.admin-table');
    
    tables.forEach(table => {
        // Agregar funcionalidad de ordenamiento
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                sortTable(table, this);
            });
        });
        
        // Agregar funcionalidad de búsqueda
        const searchInput = table.querySelector('.table-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterTable(table, this.value);
            });
        }
    });
}

function sortTable(table, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const isAscending = header.classList.contains('sort-asc');
    
    // Limpiar clases de ordenamiento
    header.parentNode.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Agregar clase de ordenamiento
    header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    
    // Ordenar filas
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        if (isAscending) {
            return bValue.localeCompare(aValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });
    
    // Reordenar filas en la tabla
    rows.forEach(row => tbody.appendChild(row));
}

function filterTable(table, searchTerm) {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        row.style.display = matches ? '' : 'none';
    });
}

// Funciones de utilidad para el admin
window.adminUtils = {
    // Eliminar elemento con confirmación
    deleteItem: function(itemId, itemType) {
        if (confirm(`¿Estás seguro de que quieres eliminar este ${itemType}?`)) {
            // Aquí iría la lógica de eliminación
            showNotification(`${itemType} eliminado correctamente`, 'success');
        }
    },
    
    // Editar elemento
    editItem: function(itemId, itemType) {
        // Aquí iría la lógica de edición
        console.log(`Editando ${itemType} con ID: ${itemId}`);
    },
    
    // Exportar datos
    exportData: function(format) {
        // Aquí iría la lógica de exportación
        showNotification(`Datos exportados en formato ${format}`, 'success');
    }
};
