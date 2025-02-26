// Seleccionar todos los corazones
const hearts = document.querySelectorAll('.heart');

// Función para cambiar el estado del corazón y redirigir a favoritos
function toggleHeart(event) {
    const heart = event.currentTarget; // Corazón clickeado
    const heartIcon = heart.querySelector('.heart-icon'); // Imagen del corazón
    const menuItem = heart.closest('.menu-item'); // Contenedor del producto
    const itemId = menuItem.id; // ID del producto
    const itemName = menuItem.querySelector('h3').textContent; // Nombre del producto
    const itemPrice = menuItem.querySelector('.price').textContent; // Precio del producto
    const itemImg = menuItem.querySelector('.ham').src; // Imagen del producto
    const isActive = heart.getAttribute('data-state') === 'active';

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isActive) {
        // Si ya está activo, eliminar de favoritos
        heartIcon.src = "/img/corazon-vacio.png"; 
        heart.setAttribute('data-state', 'inactive');

        favorites = favorites.filter(item => item.id !== itemId); // Remueve de favoritos
    } else {
        // Si no está activo, agregar a favoritos
        heartIcon.src = "/img/corazon amarillo.png";
        heart.setAttribute('data-state', 'active');

        // Guardar en favoritos
        favorites.push({ id: itemId, name: itemName, price: itemPrice, img: itemImg });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Agregar el evento de clic a cada corazón
hearts.forEach(heart => {
    heart.addEventListener('click', toggleHeart);
});

// Función para cargar el estado de los corazones al iniciar la página
function loadFavoriteHearts() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    document.querySelectorAll('.menu-item').forEach(menuItem => {
        const heart = menuItem.querySelector('.heart'); // Corazón del producto
        const heartIcon = heart.querySelector('.heart-icon'); // Icono del corazón
        const itemId = menuItem.id; // ID del producto

        const isFavorite = favorites.some(item => item.id === itemId);

        if (isFavorite) {
            heartIcon.src = "/img/corazon amarillo.png"; // Corazón lleno
            heart.setAttribute('data-state', 'active');
        } else {
            heartIcon.src = "/img/corazon-vacio.png"; // Corazón vacío
            heart.setAttribute('data-state', 'inactive');
        }
    });
}

// Ejecutar la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    loadFavoriteHearts(); // Cargar favoritos marcados

    // Agregar evento de clic a los corazones
    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', toggleHeart);
    });
});