/* 
====================================================================
JavaScript específico de la página Home
Propósito:
  - Animar tarjetas de características cuando entran al viewport.
  - Aplicar un efecto parallax simple al “hero”.
  - Ejecutar contadores animados al hacerse visibles.
Dependencias:
  - Ninguna (API nativa: IntersectionObserver, requestAnimationFrame).
Accesibilidad/Perf:
  - Se evita trabajo innecesario hasta que los elementos son visibles.
  - El parallax solo se aplica si existe .Inicio (y se desactiva si
    el usuario prefiere reducir movimiento).
====================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    
  // Animaciones de entrada para las tarjetas de características
  const featureCards = document.querySelectorAll('.feature-card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Aplica clase final y deja de observar (mejor rendimiento)
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  featureCards.forEach(card => {
    // Estado inicial vía clase CSS (en vez de estilos inline)
    card.classList.add('will-reveal');
    observer.observe(card);
  });

  // Efecto parallax simple para el hero
  const hero = document.querySelector('.Inicio');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero && !reduceMotion) {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop;
          const rate = scrolled * -0.5;
          hero.style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Contador animado (ejemplo)
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    if (isNaN(target)) return; // Evita errores si data-target no es válido

    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // ~60fps
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Iniciar contador cuando sea visible
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counterObserver.observe(counter);
  });
});
