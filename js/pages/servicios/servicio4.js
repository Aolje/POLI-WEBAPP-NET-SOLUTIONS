// JavaScript específico para Servicio 4
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
    
    // Galería de imágenes con efecto lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
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
                }, index * 200);
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Efecto hover para las imágenes de la galería
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
            });
        }
    });
    
    // Modal para vista ampliada de imágenes
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
});

function openImageModal(src, alt) {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Crear imagen
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Crear botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10001;
    `;
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    // Cerrar modal
    function closeModal() {
        modal.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
