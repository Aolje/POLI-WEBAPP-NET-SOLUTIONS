// JavaScript específico para la página Blog
document.addEventListener('DOMContentLoaded', function() {
    // Animación de aparición para las categorías del blog
    const blogCategories = document.querySelectorAll('.blog-category');
    
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
                }, index * 200); // Delay escalonado
            }
        });
    }, observerOptions);
    
    blogCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
    });
    
    // Animación para los artículos del blog
    const blogPosts = document.querySelectorAll('.blog-post');
    
    const postObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        postObserver.observe(post);
    });
    
    // Sistema de búsqueda de artículos
    const searchInput = document.querySelector('.blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const posts = document.querySelectorAll('.blog-post');
            
            posts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.3s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
    
    // Filtro por categorías
    const categoryFilters = document.querySelectorAll('.category-filter');
    const allPosts = document.querySelectorAll('.blog-post');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Actualizar filtros activos
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar posts
            allPosts.forEach(post => {
                if (category === 'all' || post.classList.contains(category)) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Paginación (si se implementa)
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            // Aquí se implementaría la lógica de paginación
            console.log('Cargar página:', page);
        });
    });
});
