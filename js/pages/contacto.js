/**
 * SCRIPT DE FORMULARIO DE CONTACTO
 * 
 * Este archivo maneja toda la funcionalidad de la página de contacto,
 * incluyendo validación, almacenamiento y notificaciones.
 * 
 * Funcionalidades principales:
 * - Validación del formulario de contacto
 * - Almacenamiento de mensajes en localStorage
 * - Validación en tiempo real de campos
 * - Sistema de notificaciones visuales
 * - Validación específica de email y teléfono
 * - Estado de carga en el botón de envío
 */

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const contactForm = document.getElementById('contactForm');

    // Inicializar la aplicación
    init();

    /**
        * Función de inicialización principal
        * Configura todos los event listeners necesarios para el formulario
        */
    function init() {
        // Configurar event listeners
        setupEventListeners();
    }

    /**
     * Configura todos los event listeners del formulario
     * - Envío del formulario
     * - Validación en tiempo real
     */
    function setupEventListeners() {
        // Formulario de contacto
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }

        // Validación en tiempo real para el formulario
        setupFormValidation();
    }

    /**
     * Maneja el envío del formulario de contacto
     * - Valida los datos
     * - Crea un objeto de contacto
     * - Guarda en localStorage
     * - Muestra notificación de éxito/error
     * 
     * @param {Event} e - Evento de envío del formulario
     */
    function handleContactFormSubmit(e) {
        e.preventDefault();

        if (validateForm(contactForm)) {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Mostrar estado de carga en el botón
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Crear objeto de contacto con toda la información
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
    /**
         * Configura la validación en tiempo real para todos los campos del formulario
         * - Validación al salir del campo (blur)
         * - Re-validación al escribir (si había error previo)
         */
    function setupFormValidation() {
        // Validación para formulario de contacto
        const contactInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
        contactInputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    validateField(this);
                }
            });
        });
    }

    /**
     * Valida un campo individual del formulario
     * Incluye validaciones específicas para email y teléfono
     * 
     * @param {HTMLInputElement} field - Campo a validar
     * @returns {boolean} - true si el campo es válido, false si no
     */
    function validateField(field) {
        // Verificar si el campo es requerido y está vacío
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            return false;
        }

        // Validar email si tiene valor
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        }

        // Validar teléfono si tiene valor
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value.trim())) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        }

        // Si llegamos aquí, el campo es válido
        field.style.borderColor = '#2c3e50';
        return true;
    }
    /**
         * Valida todos los campos requeridos del formulario
         * 
         * @param {HTMLFormElement} form - Formulario a validar
         * @returns {boolean} - true si todos los campos son válidos, false si no
         */
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
    /**
       * Muestra una notificación temporal en la pantalla
       * 
       * @param {string} message - Mensaje a mostrar en la notificación
       * @param {string} type - Tipo de notificación: 'success' o 'error'
       */
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