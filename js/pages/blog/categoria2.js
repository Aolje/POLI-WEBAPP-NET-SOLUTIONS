// JavaScript específico para Categoría 2 del Blog
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
    
    // Efecto de hover con rotación para los artículos
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
    });
    
    // Sistema de etiquetas dinámicas
    const tagElements = document.querySelectorAll('.blog-tag');
    tagElements.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent;
            filterByTag(tagName);
        });
    });
    
    // Efecto de partículas en el fondo
    createParticleEffect();
    
    // Animación de texto tipo máquina de escribir
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        typeWriterEffect(element, element.textContent, 100);
    });
});

function filterByTag(tagName) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const postTags = post.getAttribute('data-tags');
        if (postTags && postTags.includes(tagName)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
        } else {
            post.style.display = 'none';
        }
    });
}

function createParticleEffect() {
    const container = document.querySelector('.blog-posts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        container.style.position = 'relative';
        container.appendChild(particle);
    }
}

function typeWriterEffect(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
