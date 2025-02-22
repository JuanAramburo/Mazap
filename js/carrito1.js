// Obtener el parámetro de la URL para saber qué hamburguesa se seleccionó
const urlParams = new URLSearchParams(window.location.search);
const burger = urlParams.get('burger');

// Validar el parámetro de la URL
if (!burger) {
    alert('Hamburguesa no seleccionada.');
    window.location.href = '/html/inicio.html'; // Redirigir a la página de inicio
}

// Actualizar los detalles de la hamburguesa según la selección
const burgerName = document.getElementById('burger-name');
const burgerDescription = document.getElementById('burger-description');
const burgerPrice = document.getElementById('burger-price');
const addToCartButton = document.querySelector('.add-to-cart');

if (burger === 'classic') {
    burgerName.textContent = 'Classic Burger';
    burgerDescription.textContent = 'Una hamburguesa clásica con carne de res, tomate, cebolla y lechuga.';
    burgerPrice.textContent = '80$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 80$ MXN';
} else if (burger === 'bacon') {
    burgerName.textContent = 'Bacon Deluxe';
    burgerDescription.textContent = 'Una deliciosa hamburguesa con queso amarillo, lechuga, tomate, cebolla, carne y queso Philadelphia.';
    burgerPrice.textContent = '90$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 90$ MXN';
} else if (burger === 'spicy') {
    burgerName.textContent = 'Spicy Jalapeño';
    burgerDescription.textContent = 'Una hamburguesa con tocino crujiente, queso cheddar, lechuga y tomate.';
    burgerPrice.textContent = '85$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 85$ MXN';
} else if (burger === 'mushroom') {
    burgerName.textContent = 'Mushroom Swiss';
    burgerDescription.textContent = 'Una hamburguesa con champiñones, queso suizo, lechuga y tomate.';
    burgerPrice.textContent = '88$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 88$ MXN';
} else if (burger === 'bbq') {
    burgerName.textContent = 'BBQ Ranch';
    burgerDescription.textContent = 'Una hamburguesa con salsa BBQ, queso ranch, lechuga y tomate.';
    burgerPrice.textContent = '87$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 87$ MXN';
} else if (burger === 'double') {
    burgerName.textContent = 'Double Cheeseburger';
    burgerDescription.textContent = 'Una hamburguesa doble con queso cheddar, lechuga y tomate.';
    burgerPrice.textContent = '95$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 95$ MXN';
} else if (burger === 'veggie') {
    burgerName.textContent = 'Veggie Burger';
    burgerDescription.textContent = 'Una hamburguesa vegetariana con lechuga, tomate y queso.';
    burgerPrice.textContent = '82$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 82$ MXN';
} else if (burger === 'chicken') {
    burgerName.textContent = 'Chicken Avocado';
    burgerDescription.textContent = 'Una hamburguesa de pollo con aguacate, lechuga y tomate.';
    burgerPrice.textContent = '89$ MXN';
    addToCartButton.textContent = 'Agregar al carrito 89$ MXN';
}

// Lógica para manejar extras y cantidad
let quantity = 1;
const extras = {
    refresco: 0,
    papasGajo: 0,
    papasFritas: 0
};

const prices = {
    burger: parseFloat(burgerPrice.textContent.replace('$ MXN', '')),
    refresco: 20,
    papasGajo: 55,
    papasFritas: 30
};

function updateExtra(type, change) {
    extras[type] = Math.max(0, extras[type] + change);
    document.getElementById(`${type}-quantity`).textContent = extras[type];
    updateTotal();
}

function updateQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById('quantity').textContent = quantity;
    updateTotal();
}

function updateTotal() {
    if (isNaN(prices.burger)) {
        console.error('Precio de la hamburguesa no válido.');
        return;
    }

    let total = prices.burger * quantity;

    // Agregar el costo de los extras
    total += extras.refresco * prices.refresco;
    total += extras.papasGajo * prices.papasGajo;
    total += extras.papasFritas * prices.papasFritas;

    // Actualizar el texto del botón
    addToCartButton.textContent = `Agregar al carrito ${total}$ MXN`;
}

// Definir las rutas de las imágenes de las hamburguesas
const burgerImages = {
    classic: '/img/ham1.jpg',       // Classic Burger
    bacon: '/img/ham2.jpg',         // Bacon Deluxe
    spicy: '/img/ham3.jpg',         // Spicy Jalapeño
    mushroom: '/img/ham4.jpg',      // Mushroom Swiss
    bbq: '/img/ham5.jpg',           // BBQ Ranch
    double: '/img/ham6.jpg',        // Double Cheeseburger
    veggie: '/img/ham7.jpg',        // Veggie Burger
    chicken: '/img/ham8.jpg'        // Chicken Avocado
};

// Obtener la imagen correspondiente a la hamburguesa seleccionada
const selectedBurgerImage = burgerImages[burger] || '/img/default-burger.jpg'; // Imagen por defecto si no se encuentra

// Modificar la función addToCart para incluir la imagen
function addToCart() {
    const totalPrice = parseFloat(addToCartButton.textContent.match(/\d+/)[0]);

    if (!burgerName.textContent || !quantity || !totalPrice) {
        alert('Error al agregar al carrito. Inténtalo de nuevo.');
        return;
    }

    const orderData = {
        burgerName: burgerName.textContent,
        burgerImage: selectedBurgerImage, // Agregar la ruta de la imagen
        burgerQuantity: quantity,
        extras: extras,
        totalPrice: totalPrice
    };

    // Obtener el carrito actual desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregar la nueva orden al carrito
    cart.push(orderData);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Datos de la orden:', orderData);
    window.location.href = 'carrito.html'; // Redirigir a la página del carrito final
}
function goBack() {
    window.history.back(); // Regresa a la página anterior
}