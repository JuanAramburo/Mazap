// Función para cambiar el estado del corazón
function toggleHeart(event) {
    const heart = event.currentTarget;
    const heartIcon = heart.querySelector('.heart-icon');
    const menuItem = heart.closest('.menu-item');
    const itemId = menuItem.id;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = favorites.some(item => item.id === itemId);

    if (isFavorite) {
        // Confirmación antes de eliminar
        if (!confirm("¿Estás seguro de que quieres eliminar esta hamburguesa de tus favoritos?")) {
            return; // Si el usuario cancela, no hace nada
        }

        // Eliminar de favoritos
        favorites = favorites.filter(item => item.id !== itemId);
        heartIcon.src = "/img/corazon-vacio.png";
        menuItem.remove(); // Eliminar del DOM
    } else {
        // Agregar a favoritos
        const newItem = {
            id: itemId,
            img: menuItem.querySelector('.ham').src,
            name: menuItem.querySelector('h3').textContent,
            price: menuItem.querySelector('.price').textContent
        };
        favorites.push(newItem);
        heartIcon.src = "/img/corazon amarillo.png";
    }

    // Guardar cambios en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Verificar si ya no hay favoritos y mostrar el mensaje
    checkEmptyFavorites();
}

// Función para cargar los favoritos al iniciar la página
function loadFavorites() {
    const favoritesContainer = document.querySelector('.menu-grid');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesContainer.innerHTML = ''; // Limpiar antes de insertar

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No tienes favoritos aún.</p>';
        return;
    }

    favorites.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.id = item.id;
        menuItem.innerHTML = `
            <span class="heart" data-state="active">
                <img src="/img/corazon amarillo.png" alt="Favorito" class="heart-icon">
            </span>
            <img src="${item.img}" alt="${item.name}" class="ham">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <button class="order-button">Ordenar</button>
        `;

        // Agregar evento de clic al corazón dentro de cada item
        menuItem.querySelector('.heart').addEventListener('click', toggleHeart);

        favoritesContainer.appendChild(menuItem);
    });
}

// Función para verificar si ya no hay favoritos y mostrar mensaje
function checkEmptyFavorites() {
    const favoritesContainer = document.querySelector('.menu-grid');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No tienes favoritos aún.</p>';
    }
}

// Función para resetear los favoritos
function resetFavorites() {
    if (!confirm("¿Estás seguro de que quieres eliminar todos los favoritos?")) {
        return; // Si el usuario cancela, no hace nada
    }

    localStorage.removeItem('favorites'); // Eliminar solo los favoritos
    loadFavorites(); // Recargar la lista sin refrescar la página
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();

    const resetButton = document.querySelector('.reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetFavorites);
    }
});
