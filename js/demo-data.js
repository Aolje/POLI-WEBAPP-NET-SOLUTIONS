// Datos de demostración para el sistema
document.addEventListener('DOMContentLoaded', function() {
    // Crear contactos de demostración si no existen
    if (!localStorage.getItem('contacts')) {
        const demoContacts = [
            {
                id: 1,
                name: 'Andrea Bedoya Betancur',
                phone: '3012458977',
                email: 'andrea.bedoya@email.com',
                schedule: '10:00 AM',
                message: 'Me interesa conocer más sobre sus servicios de desarrollo web. ¿Podrían contactarme para una consulta?',
                status: 'sin responder',
                comment: '',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                name: 'Juan Pérez',
                phone: '3001234567',
                email: 'juan.perez@email.com',
                schedule: '2:00 PM',
                message: 'Necesito ayuda con el diseño de mi sitio web. ¿Tienen disponibilidad para una reunión esta semana?',
                status: 'respondido',
                comment: 'Cliente interesado en servicios de diseño. Programar reunión para el viernes.',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                name: 'María García',
                phone: '3019876543',
                email: 'maria.garcia@email.com',
                schedule: '4:00 PM',
                message: 'Quiero renovar completamente mi página web. ¿Podrían enviarme una cotización?',
                status: 'sin responder',
                comment: '',
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 4,
                name: 'Carlos Rodríguez',
                phone: '3157891234',
                email: 'carlos.rodriguez@email.com',
                schedule: '9:00 AM',
                message: 'Necesito una aplicación móvil para mi negocio. ¿Trabajan con desarrollo de apps?',
                status: 'respondido',
                comment: 'Cliente potencial para desarrollo móvil. Enviar propuesta técnica.',
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        localStorage.setItem('contacts', JSON.stringify(demoContacts));
        console.log('Contactos de demostración creados');
    }
});
