// JavaScript específico para la página Contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validateForm(this)) {
                // Simular envío del formulario
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Mostrar loading
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular envío (aquí iría la lógica real de envío)
                setTimeout(() => {
                    showNotification('Mensaje enviado correctamente', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Por favor, completa todos los campos requeridos', 'error');
            }
        });
    }
    
    // Validación en tiempo real
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                validateField(this);
            }
        });
    });
    
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
        } else {
            field.style.borderColor = '#ecf0f1';
            return true;
        }
    }
    
    // Animación de aparición para los elementos de contacto
    const contactItems = document.querySelectorAll('.contact-item');
    
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
    
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Mapa interactivo (si se implementa)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Aquí se integraría un mapa (Google Maps, OpenStreetMap, etc.)
        console.log('Inicializar mapa en:', mapContainer);
    }
});
