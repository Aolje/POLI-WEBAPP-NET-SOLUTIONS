// JavaScript específico para Servicio 6
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para el contenido del servicio
    const serviceDetail = document.querySelector('.service-detail');
    if (serviceDetail) {
        serviceDetail.style.opacity = '0';
        serviceDetail.style.transform = 'translateY(30px)';
        serviceDetail.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            serviceDetail.style.opacity = '1';
            serviceDetail.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animación para los métodos de contacto
    const contactMethods = document.querySelectorAll('.contact-method');
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
    
    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(method);
    });
    
    // Efecto de pulso para los enlaces de contacto
    const contactLinks = document.querySelectorAll('.contact-method a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
    
    // Funcionalidad de copiar al portapapeles
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('Copiado al portapapeles', 'success');
            }).catch(() => {
                showNotification('Error al copiar', 'error');
            });
        });
    });
    
    // Formulario de contacto rápido
    const quickContactForm = document.querySelector('.quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simular envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensaje enviado correctamente', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Animación de iconos de contacto
    const contactIcons = document.querySelectorAll('.contact-method');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = this.querySelector('.contact-icon');
            if (iconElement) {
                iconElement.style.transform = 'scale(1.2) rotate(10deg)';
                iconElement.style.transition = 'transform 0.3s ease';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const iconElement = this.querySelector('.contact-icon');
            if (iconElement) {
                iconElement.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Efecto de ondas para los elementos de contacto
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
