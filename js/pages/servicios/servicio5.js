// JavaScript específico para Servicio 5
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
    
    // Animación para los testimonios
    const testimonialItems = document.querySelectorAll('.testimonial-item');
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
                }, index * 300);
            }
        });
    }, observerOptions);
    
    testimonialItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
    
    // Efecto de rotación para los testimonios
    testimonialItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Carrusel automático de testimonios (si hay más de 3)
    if (testimonialItems.length > 3) {
        createTestimonialCarousel();
    }
    
    // Animación de las comillas
    const quotes = document.querySelectorAll('.testimonial-item::before');
    quotes.forEach(quote => {
        quote.style.animation = 'pulse 2s infinite';
    });
});

function createTestimonialCarousel() {
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (!testimonialsContainer) return;
    
    let currentIndex = 0;
    const testimonials = Array.from(document.querySelectorAll('.testimonial-item'));
    const visibleCount = 3;
    
    // Crear controles del carrusel
    const carouselControls = document.createElement('div');
    carouselControls.className = 'carousel-controls';
    carouselControls.style.cssText = `
        text-align: center;
        margin-top: 2rem;
    `;
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '←';
    prevBtn.className = 'carousel-btn';
    prevBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border-radius: 25px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '→';
    nextBtn.className = 'carousel-btn';
    nextBtn.style.cssText = prevBtn.style.cssText;
    
    carouselControls.appendChild(prevBtn);
    carouselControls.appendChild(nextBtn);
    testimonialsContainer.parentNode.appendChild(carouselControls);
    
    // Funciones del carrusel
    function showTestimonials() {
        testimonials.forEach((testimonial, index) => {
            if (index >= currentIndex && index < currentIndex + visibleCount) {
                testimonial.style.display = 'block';
                testimonial.style.animation = 'fadeIn 0.5s ease';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }
    
    function nextTestimonials() {
        if (currentIndex + visibleCount < testimonials.length) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showTestimonials();
    }
    
    function prevTestimonials() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, testimonials.length - visibleCount);
        }
        showTestimonials();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextTestimonials);
    prevBtn.addEventListener('click', prevTestimonials);
    
    // Efectos hover para los botones
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
        });
    });
    
    // Inicializar
    showTestimonials();
    
    // Auto-rotación cada 5 segundos
    setInterval(nextTestimonials, 5000);
}
