        // Función para cambiar el estado del corazón
        function toggleHeart(event) {
            const heart = event.currentTarget; // Corazón clickeado
            const heartIcon = heart.querySelector('.heart-icon'); // Imagen del corazón
            const isActive = heart.getAttribute('data-state') === 'active';
            const menuItem = heart.closest('.menu-item'); // Contenedor de la hamburguesa

            // Cambiar el estado y la imagen
            if (isActive) {
                heartIcon.src = "/img/corazon-vacio.png"; // Cambiar a corazón vacío
                heart.setAttribute('data-state', 'inactive'); // Actualizar estado
                localStorage.setItem(menuItem.id, 'inactive'); // Guardar estado en localStorage
            } else {
                heartIcon.src = "/img/corazon amarillo.png"; // Cambiar a corazón relleno
                heart.setAttribute('data-state', 'active'); // Actualizar estado
                localStorage.setItem(menuItem.id, 'active'); // Guardar estado en localStorage
            }
        }

        // Función para cargar el estado de los corazones al iniciar la página
        function loadHeartStates() {
            const hearts = document.querySelectorAll('.heart');

            hearts.forEach(heart => {
                const menuItem = heart.closest('.menu-item'); // Contenedor de la hamburguesa
                const itemId = menuItem.id; // ID de la hamburguesa
                const heartState = localStorage.getItem(itemId); // Obtener estado del localStorage

                if (heartState === 'inactive') {
                    // Ocultar la hamburguesa si el corazón está vacío
                    menuItem.style.display = 'none';
                } else {
                    // Mostrar la hamburguesa si el corazón está relleno
                    menuItem.style.display = 'flex';
                }
            });
        }

        // Función para resetear el estado de los corazones
        function resetFavorites() {
            // Limpiar el localStorage
            localStorage.clear();

            // Recargar la página para aplicar los cambios
            window.location.reload();
        }

        // Agregar el evento de clic al botón de reset
        document.addEventListener('DOMContentLoaded', () => {
            const resetButton = document.querySelector('.reset-button');
            if (resetButton) {
                resetButton.addEventListener('click', resetFavorites);
            }

            // Cargar el estado de los corazones al iniciar la página
            loadHeartStates();

            // Agregar el evento de clic a cada corazón
            const hearts = document.querySelectorAll('.heart');
            hearts.forEach(heart => {
                heart.addEventListener('click', toggleHeart);
            });
        });
        function goBack() {
            window.history.back(); // Regresa a la página anterior
        }
