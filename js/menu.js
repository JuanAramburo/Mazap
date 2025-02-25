// Seleccionar todos los corazones
const hearts = document.querySelectorAll('.heart');

// Función para cambiar el estado del corazón
function toggleHeart(event) {
const heart = event.currentTarget; // Corazón clickeado
const heartIcon = heart.querySelector('.heart-icon'); // Imagen del corazón
const isActive = heart.getAttribute('data-state') === 'active';

// Cambiar el estado y la imagen
if (isActive) {
    heartIcon.src = "/img/corazon-vacio.png"; // Cambiar a corazón vacío
    heart.setAttribute('data-state', 'inactive'); // Actualizar estado
    } else {
        heartIcon.src = "/img/corazon amarillo.png"; // Cambiar a corazón relleno
        heart.setAttribute('data-state', 'active'); // Actualizar estado
    }
}

// Agregar el evento de clic a cada corazón
hearts.forEach(heart => {
    heart.addEventListener('click', toggleHeart);
});

function goBack() {
    window.history.back(); // Regresa a la página anterior
}
