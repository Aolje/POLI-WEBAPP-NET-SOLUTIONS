// JavaScript específico para Servicio 1
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
    
    // Animación para las características del servicio
    const featureItems = document.querySelectorAll('.feature-item');
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
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Efecto parallax para el fondo del servicio
    const serviceSection = document.querySelector('.service-detail');
    if (serviceSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            serviceSection.style.backgroundPosition = `center ${rate}px`;
        });
    }
});
