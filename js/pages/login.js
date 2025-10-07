/**
 * SCRIPT DE INICIO DE SESIÓN * 
 * Este archivo maneja la funcionalidad de la página de login,
 * incluyendo validación, autenticación y redirección al panel de administración.
 * 
 * Funcionalidades principales:
 * - Validación del formulario de login
 * - Autenticación de administradores
 * - Redirección al panel de administración
 * - Validación en tiempo real
 * - Animaciones de entrada
 * - Efectos de focus en campos
 */

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        // Configurar el evento de envío del formulario
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir envío normal del formulario

            // Validar el formulario antes de procesar
            if (validateForm(this)) {
                // Obtener datos del formulario
                const formData = new FormData(this);
                const username = formData.get('username');
                const password = formData.get('password');

                // Mostrar estado de carga en el botón
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Iniciando sesión...';
                submitBtn.disabled = true;

                // Simular proceso de autenticación con delay
                setTimeout(() => {
                    // Verificar credenciales de administrador
                    if (username === 'admin' && password === 'admin') {
                        showNotification('Inicio de sesión exitoso', 'success');
                        // Redirigir al panel de administración después de 1.5 segundos
                        setTimeout(() => {
                            window.location.href = '../admin/index.html';
                        }, 1500);
                    } else {
                        showNotification('Solo los administradores pueden acceder', 'error');
                        // Restaurar el botón a su estado original
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }, 2000);
            } else {
                showNotification('Por favor, completa todos los campos', 'error');
            }
        });
    }

    // Configurar validación en tiempo real para todos los campos
    const formInputs = document.querySelectorAll('#loginForm input');
    formInputs.forEach(input => {
        // Validar cuando el usuario sale del campo (blur)
        input.addEventListener('blur', function () {
            validateField(this);
        });

        // Re-validar cuando el usuario escribe (si había error previo)
        input.addEventListener('input', function () {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                validateField(this);
            }
        });
    });

    /**
     * Valida un campo individual del formulario
     * @param {HTMLInputElement} field - Campo a validar
     * @returns {boolean} - true si el campo es válido, false si no
     */
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            // Campo vacío: marcar como error con borde rojo
            field.style.borderColor = '#e74c3c';
            return false;
        } else {
            // Campo válido: restaurar borde normal
            field.style.borderColor = '#ecf0f1';
            return true;
        }
    }

    // Configurar efectos de focus en los campos del formulario
    const inputFields = document.querySelectorAll('.form-group input');
    inputFields.forEach(field => {
        // Agregar clase 'focused' cuando el campo recibe focus
        field.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        // Remover clase 'focused' cuando el campo pierde focus (solo si está vacío)
        field.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Configurar animación de entrada para el formulario
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        // Estado inicial: invisible y desplazado hacia abajo
        loginContainer.style.opacity = '0';
        loginContainer.style.transform = 'translateY(30px)';
        loginContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Aplicar animación después de un pequeño delay
        setTimeout(() => {
            loginContainer.style.opacity = '1';
            loginContainer.style.transform = 'translateY(0)';
        }, 200);
    }

    // Configurar botón para mostrar/ocultar contraseña
    const passwordField = document.getElementById('password');
    if (passwordField) {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
        `;
        // Aquí se podría agregar la funcionalidad de mostrar/ocultar contraseña
    }
});
