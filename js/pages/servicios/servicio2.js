// JavaScript específico para Servicio 2
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
    
    // Animación para los elementos de precios
    const pricingItems = document.querySelectorAll('.pricing-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    pricingItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Efecto hover para los elementos de precios
    pricingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animación de números (si hay precios)
    const priceNumbers = document.querySelectorAll('.price');
    priceNumbers.forEach(price => {
        const targetValue = parseInt(price.textContent.replace(/[^0-9]/g, ''));
        if (targetValue) {
            animateNumber(price, 0, targetValue, 2000);
        }
    });
});

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isPrice = element.textContent.includes('$');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = isPrice ? `$${current}` : current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}
