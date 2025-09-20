// JavaScript específico para Categoría 4 del Blog
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para los artículos del blog
    const blogPosts = document.querySelectorAll('.blog-post');
    
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
    
    blogPosts.forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(post);
    });
    
    // Efecto de hover con efecto de zoom
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
    });
    
    // Sistema de filtros por fecha
    const dateFilters = document.querySelectorAll('.date-filter');
    dateFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const dateRange = this.getAttribute('data-date');
            filterByDate(dateRange);
            
            // Actualizar filtros activos
            dateFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Efecto de partículas flotantes
    createFloatingParticles();
    
    // Animación de contador de artículos
    animateArticleCount();
    
    // Efecto de parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
});

function filterByDate(dateRange) {
    const blogPosts = document.querySelectorAll('.blog-post');
    const now = new Date();
    
    blogPosts.forEach(post => {
        const postDate = new Date(post.getAttribute('data-date'));
        let showPost = false;
        
        switch(dateRange) {
            case 'today':
                showPost = postDate.toDateString() === now.toDateString();
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                showPost = postDate >= weekAgo;
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                showPost = postDate >= monthAgo;
                break;
            case 'all':
            default:
                showPost = true;
                break;
        }
        
        if (showPost) {
            post.style.display = 'block';
            post.style.animation = 'slideIn 0.5s ease';
        } else {
            post.style.display = 'none';
        }
    });
}

function createFloatingParticles() {
    const container = document.querySelector('.blog-posts');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: rgba(44,62,80,0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        container.style.position = 'relative';
        container.appendChild(particle);
    }
}

function animateArticleCount() {
    const countElement = document.querySelector('.article-count');
    if (!countElement) return;
    
    const targetCount = parseInt(countElement.textContent);
    let currentCount = 0;
    const increment = targetCount / 50;
    
    const counter = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(counter);
        }
        countElement.textContent = Math.floor(currentCount);
    }, 50);
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.8;
        }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0; 
            transform: translateX(-30px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    .floating-particle {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(style);
