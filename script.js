// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const explorarBtn = document.getElementById('explorar-btn');
    const comprarBtns = document.querySelectorAll('.comprar-btn');
    const suscripcionForm = document.getElementById('suscripcion-form');
    const prevTestimonioBtn = document.getElementById('prev-testimonio');
    const nextTestimonioBtn = document.getElementById('next-testimonio');
    const testimonios = document.querySelectorAll('.testimonio');
    
    // Contador para el carrusel de testimonios
    let testimonioActual = 0;
    
    // Ocultar todos los testimonios excepto el primero
    for (let i = 1; i < testimonios.length; i++) {
        testimonios[i].style.display = 'none';
    }
    
    // Función para mostrar un testimonio específico
    function mostrarTestimonio(indice) {
        // Ocultar todos los testimonios
        testimonios.forEach(testimonio => {
            testimonio.style.display = 'none';
        });
        
        // Mostrar el testimonio seleccionado
        testimonios[indice].style.display = 'block';
        
        // Aplicar animación de fade-in
        testimonios[indice].style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            testimonios[indice].style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 40);
    }
    
    // Event listener para el botón "Anterior" del carrusel
    prevTestimonioBtn.addEventListener('click', function() {
        testimonioActual--;
        if (testimonioActual < 0) {
            testimonioActual = testimonios.length - 1;
        }
        mostrarTestimonio(testimonioActual);
    });
    
    // Event listener para el botón "Siguiente" del carrusel
    nextTestimonioBtn.addEventListener('click', function() {
        testimonioActual++;
        if (testimonioActual >= testimonios.length) {
            testimonioActual = 0;
        }
        mostrarTestimonio(testimonioActual);
    });
    
    // Auto-rotación del carrusel cada 5 segundos
    setInterval(function() {
        testimonioActual++;
        if (testimonioActual >= testimonios.length) {
            testimonioActual = 0;
        }
        mostrarTestimonio(testimonioActual);
    }, 5000);
    
    // Animación en el botón "Explorar Ahora"
    explorarBtn.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    });
    
    explorarBtn.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    explorarBtn.addEventListener('click', function() {
        // Desplazamiento suave hasta la sección de productos destacados
        document.getElementById('destacados').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Event listeners para botones "Añadir al Carrito"
    comprarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const perfumeNombre = this.parentElement.querySelector('h3').textContent;
            const perfumePrecio = this.parentElement.querySelector('.precio').textContent;
            
            // Crear notificación flotante
            const notificacion = document.createElement('div');
            notificacion.className = 'notificacion';
            notificacion.innerHTML = `
                <p>Añadido al carrito: ${perfumeNombre}</p>
                <p>Precio: ${perfumePrecio}</p>
            `;
            
            // Estilo de la notificación
            notificacion.style.position = 'fixed';
            notificacion.style.top = '20px';
            notificacion.style.right = '20px';
            notificacion.style.background = '#1a1a1a';
            notificacion.style.color = 'white';
            notificacion.style.padding = '15px';
            notificacion.style.borderRadius = '5px';
            notificacion.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            notificacion.style.zIndex = '1000';
            notificacion.style.opacity = '0';
            notificacion.style.transition = 'opacity 0.3s ease';
            
            // Añadir al DOM
            document.body.appendChild(notificacion);
            
            // Mostrar con animación fade-in
            setTimeout(() => {
                notificacion.style.opacity = '1';
            }, 10);
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                notificacion.style.opacity = '0';
                // Eliminar del DOM después de la transición
                setTimeout(() => {
                    document.body.removeChild(notificacion);
                }, 300);
            }, 3000);
            
            // Animación del botón
            this.textContent = '¡Añadido!';
            this.style.backgroundColor = '#d4af37';
            
            // Volver al estado original después de 1.5 segundos
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.backgroundColor = '#1a1a1a';
            }, 1500);
        });
    });
    
    // Manejar envío del formulario de suscripción
    suscripcionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Mostrar mensaje de confirmación
        const formContainer = this.parentElement;
        const mensajeConfirmacion = document.createElement('div');
        mensajeConfirmacion.className = 'confirmacion';
        mensajeConfirmacion.innerHTML = `
            <h3>¡Gracias por suscribirte!</h3>
            <p>Te hemos enviado un correo de confirmación a ${email}</p>
        `;
        mensajeConfirmacion.style.padding = '20px';
        mensajeConfirmacion.style.margin = '20px auto';
        mensajeConfirmacion.style.backgroundColor = '#d4af37';
        mensajeConfirmacion.style.color = 'white';
        mensajeConfirmacion.style.borderRadius = '5px';
        mensajeConfirmacion.style.maxWidth = '500px';
        
        // Reemplazar el formulario con el mensaje
        formContainer.innerHTML = '';
        formContainer.appendChild(mensajeConfirmacion);
    });
    
    // Animación en las tarjetas de perfumes al hacer scroll
    const perfumeCards = document.querySelectorAll('.perfume-card');
    
    // Función para verificar si un elemento está visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar las tarjetas visibles
    function animateVisibleCards() {
        perfumeCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Ejecutar animación al cargar la página
    animateVisibleCards();
    
    // Ejecutar animación al hacer scroll
    window.addEventListener('scroll', animateVisibleCards);
    
    // Navegación suave para todos los enlaces del menú
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de parallax en el banner
    window.addEventListener('scroll', function() {
        const banner = document.getElementById('banner');
        const scrollPosition = window.pageYOffset;
        
        // Aplicar efecto parallax al fondo
        banner.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    });
    
    // Animación para las categorías
    const categorias = document.querySelectorAll('.categoria');
    
    categorias.forEach(categoria => {
        categoria.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        categoria.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        categoria.addEventListener('click', function() {
            // Simular selección de categoría
            categorias.forEach(cat => {
                cat.style.border = 'none';
            });
            
            this.style.border = '2px solid #d4af37';
            
            // Mostrar mensaje de filtro
            const nombreCategoria = this.querySelector('h3').textContent;
            const mensaje = document.createElement('div');
            mensaje.className = 'mensaje-filtro';
            mensaje.textContent = `Mostrando perfumes de la categoría: ${nombreCategoria}`;
            mensaje.style.position = 'fixed';
            mensaje.style.bottom = '20px';
            mensaje.style.left = '50%';
            mensaje.style.transform = 'translateX(-50%)';
            mensaje.style.backgroundColor = '#1a1a1a';
            mensaje.style.color = 'white';
            mensaje.style.padding = '15px 30px';
            mensaje.style.borderRadius = '30px';
            mensaje.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            mensaje.style.zIndex = '1000';
            
            // Eliminar mensajes previos
            const mensajesPrevios = document.querySelectorAll('.mensaje-filtro');
            mensajesPrevios.forEach(msg => {
                document.body.removeChild(msg);
            });
            
            // Añadir al DOM
            document.body.appendChild(mensaje);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                document.body.removeChild(mensaje);
            }, 3000);
        });
    });
    
    // Inicializar contador de productos en el carrito
    let contadorCarrito = 0;
    const iconoCarrito = document.createElement('div');
    iconoCarrito.className = 'icono-carrito';
    iconoCarrito.innerHTML = `
        <span class="icono">🛒</span>
        <span class="contador">${contadorCarrito}</span>
    `;
    
    // Estilo del contador de carrito
    iconoCarrito.style.position = 'fixed';
    iconoCarrito.style.top = '20px';
    iconoCarrito.style.right = '20px';
    iconoCarrito.style.backgroundColor = '#d4af37';
    iconoCarrito.style.color = 'white';
    iconoCarrito.style.padding = '10px 15px';
    iconoCarrito.style.borderRadius = '50px';
    iconoCarrito.style.cursor = 'pointer';
    iconoCarrito.style.zIndex = '1000';
    iconoCarrito.style.display = 'flex';
    iconoCarrito.style.alignItems = 'center';
    iconoCarrito.style.justifyContent = 'center';
    iconoCarrito.style.fontWeight = 'bold';
    
    document.body.appendChild(iconoCarrito);
    
    // Actualizar contador al agregar al carrito
    comprarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            contadorCarrito++;
            iconoCarrito.querySelector('.contador').textContent = contadorCarrito;
            
            // Animar el contador
            iconoCarrito.style.transform = 'scale(1.2)';
            setTimeout(() => {
                iconoCarrito.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // Modal para el carrito (al hacer clic en el icono)
    iconoCarrito.addEventListener('click', function() {
        if (contadorCarrito === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'modal-carrito';
        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="cerrar-modal">&times;</span>
                <h2>Tu Carrito</h2>
                <p>${contadorCarrito} productos en tu carrito</p>
                <button class="finalizar-compra">Finalizar Compra</button>
            </div>
        `;
        
        // Estilos del modal
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1001';
        
        const modalContenido = modal.querySelector('.modal-contenido');
        modalContenido.style.backgroundColor = 'white';
        modalContenido.style.padding = '30px';
        modalContenido.style.borderRadius = '8px';
        modalContenido.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        modalContenido.style.position = 'relative';
        modalContenido.style.maxWidth = '500px';
        modalContenido.style.width = '80%';
        
        const cerrarModal = modal.querySelector('.cerrar-modal');
        cerrarModal.style.position = 'absolute';
        cerrarModal.style.top = '10px';
        cerrarModal.style.right = '15px';
        cerrarModal.style.fontSize = '24px';
        cerrarModal.style.cursor = 'pointer';
        
        const finalizarCompra = modal.querySelector('.finalizar-compra');
        finalizarCompra.style.backgroundColor = '#d4af37';
        finalizarCompra.style.border = 'none';
        finalizarCompra.style.color = 'white';
        finalizarCompra.style.padding = '12px 24px';
        finalizarCompra.style.marginTop = '20px';
        finalizarCompra.style.borderRadius = '5px';
        finalizarCompra.style.cursor = 'pointer';
        finalizarCompra.style.fontWeight = 'bold';
        
        // Añadir modal al DOM
        document.body.appendChild(modal);
        
        // Cerrar modal
        cerrarModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Finalizar compra
        finalizarCompra.addEventListener('click', function() {
            alert('¡Gracias por tu compra!');
            contadorCarrito = 0;
            iconoCarrito.querySelector('.contador').textContent = contadorCarrito;
            document.body.removeChild(modal);
        });
    });
    
    // Agregar funcionalidad de búsqueda
    const searchButton = document.createElement('button');
    searchButton.textContent = '🔍';
    searchButton.className = 'search-button';
    searchButton.style.position = 'fixed';
    searchButton.style.top = '20px';
    searchButton.style.right = '90px';
    searchButton.style.backgroundColor = '#1a1a1a';
    searchButton.style.color = 'white';
    searchButton.style.border = 'none';
    searchButton.style.borderRadius = '50%';
    searchButton.style.width = '40px';
    searchButton.style.height = '40px';
    searchButton.style.cursor = 'pointer';
    searchButton.style.zIndex = '999';
    searchButton.style.fontSize = '16px';
    document.body.appendChild(searchButton);
    
    searchButton.addEventListener('click', function() {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" placeholder="Buscar perfumes...">
            <button class="buscar">Buscar</button>
        `;
        
        // Estilos
        searchBox.style.position = 'fixed';
        searchBox.style.top = '70px';
        searchBox.style.right = '20px';
        searchBox.style.backgroundColor = 'white';
        searchBox.style.padding = '10px';
        searchBox.style.borderRadius = '5px';
        searchBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        searchBox.style.zIndex = '999';
        searchBox.style.display = 'flex';
        
        const input = searchBox.querySelector('input');
        input.style.padding = '8px 12px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        input.style.marginRight = '10px';
        
        const buscarBtn = searchBox.querySelector('.buscar');
        buscarBtn.style.padding = '8px 15px';
        buscarBtn.style.backgroundColor = '#d4af37';
        buscarBtn.style.color = 'white';
        buscarBtn.style.border = 'none';
        buscarBtn.style.borderRadius = '4px';
        buscarBtn.style.cursor = 'pointer';
        
        // Añadir al DOM
        document.body.appendChild(searchBox);
        
        // Enfocar el input
        input.focus();
        
        // Cerrar al hacer clic fuera
        document.addEventListener('click', function closeSearch(e) {
            if (!searchBox.contains(e.target) && e.target !== searchButton) {
                document.body.removeChild(searchBox);
                document.removeEventListener('click', closeSearch);
            }
        });
        
        // Funcionalidad de búsqueda
        buscarBtn.addEventListener('click', function() {
            const termino = input.value.toLowerCase();
            if (termino.trim() === '') return;
            
            // Mostrar mensaje de búsqueda
            alert(`Buscando: ${termino}`);
            document.body.removeChild(searchBox);
        });
    });
});
