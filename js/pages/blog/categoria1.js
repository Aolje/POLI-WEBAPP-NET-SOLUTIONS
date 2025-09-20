// JavaScript específico para Categoría 1 del Blog
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
    
    // Efecto de hover mejorado para los artículos
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
    });
    
    // Sistema de lectura de tiempo estimado
    const readTimeElements = document.querySelectorAll('.read-time');
    readTimeElements.forEach(element => {
        const post = element.closest('.blog-post');
        const text = post.querySelector('p').textContent;
        const wordsPerMinute = 200;
        const wordCount = text.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        element.textContent = `${readTime} min de lectura`;
    });
    
    // Efecto de gradiente animado en el fondo
    const gradientBackground = document.querySelector('.blog-posts');
    if (gradientBackground) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            gradientBackground.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${(hue + 60) % 360}, 70%, 60%) 100%)`;
        }, 100);
    }
    
    // Animación de las comillas en los artículos
    const quotes = document.querySelectorAll('.blog-post::before');
    quotes.forEach(quote => {
        quote.style.animation = 'float 3s ease-in-out infinite';
    });
});

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
