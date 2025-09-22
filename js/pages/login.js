// JavaScript específico para la página Login
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validar formulario
            if (validateForm(this)) {
                const formData = new FormData(this);
                const username = formData.get('username');
                const password = formData.get('password');

                // Mostrar loading
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Iniciando sesión...';
                submitBtn.disabled = true;

                // Autenticación de administradores
                setTimeout(() => {
                    // Verificar si es admin
                    if (username === 'admin' && password === 'admin') {
                        showNotification('Inicio de sesión exitoso', 'success');
                        // Redirigir al panel de administración
                        setTimeout(() => {
                            window.location.href = '../admin/panel-admin.html';
                        }, 1500);
                    } else {
                        showNotification('Solo los administradores pueden acceder', 'error');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }, 2000);
            } else {
                showNotification('Por favor, completa todos los campos', 'error');
            }
        });
    }

    // Validación en tiempo real
    const formInputs = document.querySelectorAll('#loginForm input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            return false;
        } else {
            field.style.borderColor = '#ecf0f1';
            return true;
        }
    }

    // Efecto de focus en los campos
    const inputFields = document.querySelectorAll('.form-group input');
    inputFields.forEach(field => {
        field.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Animación de entrada para el formulario
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.opacity = '0';
        loginContainer.style.transform = 'translateY(30px)';
        loginContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            loginContainer.style.opacity = '1';
            loginContainer.style.transform = 'translateY(0)';
        }, 200);
    }

    // Mostrar/ocultar contraseña
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
    }
});
