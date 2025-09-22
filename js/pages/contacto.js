// JavaScript específico para la página Contacto
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const contactForm = document.getElementById('contactForm');
    
    // Inicializar la aplicación
    init();

    function init() {
        // Configurar event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
        // Formulario de contacto
    if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }

        // Validación en tiempo real para el formulario
        setupFormValidation();
    }

    function handleContactFormSubmit(e) {
            e.preventDefault();
            
        if (validateForm(contactForm)) {
            const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Mostrar loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
            // Crear objeto de contacto
            const contactData = {
                id: Date.now(),
                name: data.name,
                phone: data.phone,
                email: data.email,
                schedule: data.schedule || 'No especificado',
                message: data.message || 'Sin información adicional',
                status: 'sin responder',
                comment: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            // Guardar en localStorage
                setTimeout(() => {
                const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                contacts.push(contactData);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                
                showNotification('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Por favor, completa todos los campos requeridos', 'error');
            }
    }


    function setupFormValidation() {
        // Validación para formulario de contacto
        const contactInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
        contactInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    validateField(this);
                }
            });
        });
    }
    
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            return false;
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        } else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        } else {
            field.style.borderColor = '#2c3e50';
            return true;
        }
    }
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
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
});
