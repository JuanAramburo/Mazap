document.addEventListener('DOMContentLoaded', function () {
    const cartSummary = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const descuentoElement = document.getElementById('descuento');

    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    let descuento = 80; // Ajusta este valor si el descuento es variable
    let total = 0;

    // Verificar si el carrito tiene elementos
    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        cartSummary.innerHTML = ""; // Limpiar antes de agregar elementos

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.burgerName} x${item.burgerQuantity}</strong>
                <p>Extras: ${Object.entries(item.extras)
                    .filter(([key, value]) => value > 0)
                    .map(([key, value]) => `${key} (${value})`)
                    .join(', ') || 'Ninguno'}</p>
                <p><strong>${item.totalPrice}$ MXN</strong></p>
            `;
            cartSummary.appendChild(li);
            subtotal += item.totalPrice;
        });

        total = subtotal - descuento;
    }

    // Actualizar los valores en la página
    subtotalElement.textContent = `${subtotal}$ MXN`;
    descuentoElement.textContent = `-${descuento}$ MXN`;
    totalElement.textContent = `${total}$ MXN`;
});

document.addEventListener("DOMContentLoaded", function () {
    const btnCambiarPago = document.getElementById("btnCambiarPago");

    if (btnCambiarPago) {
        btnCambiarPago.addEventListener("click", function () {
            window.location.href = "pago.html"; // Reemplaza con la URL correcta
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const metodoPagoDiv = document.querySelector(".pago");
    const savedPayment = JSON.parse(localStorage.getItem("metodoPago"));

    if (savedPayment) {
        let paymentHtml = `
            <label class="method">
                <img src="${savedPayment.imagenPago}" alt="${savedPayment.metodoPago}" class="metodo">
                ${savedPayment.metodoPago.charAt(0).toUpperCase() + savedPayment.metodoPago.slice(1)}
            </label>
        `;

        // Si es tarjeta, mostrar últimos 4 dígitos
        if (savedPayment.metodoPago === "tarjeta" && savedPayment.cardInfo) {
            paymentHtml += `<p>Tarjeta: ${savedPayment.cardInfo.maskedCard}</p>`;
        }

        metodoPagoDiv.innerHTML = paymentHtml;
    }
}); 

function goBack() {
    window.history.back(); // Regresa a la página anterior
}
