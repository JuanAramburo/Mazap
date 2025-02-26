document.addEventListener('DOMContentLoaded', function () {
    const cartSummary = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const descuentoElement = document.getElementById('descuento');

    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    let descuento = 20; // Ajusta este valor si el descuento es variable
    let total = 0;

    // Verificar si el carrito tiene elementos
    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        cartSummary.innerHTML = ""; // Limpiar antes de agregar elementos

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');

            const extraNames = {
                refresco: "Refresco",
                papasGajo: "Papas Gajo",
                papasFritas: "Papas Fritas"
            };

            li.innerHTML = `
                <img src="${item.burgerImage}" alt="${item.burgerName}" class="burger-img">
                <div class="cart-info">
                    <h3>${item.burgerName} ${item.burgerPrice}$</h3>
                    <p>Cantidad: ${item.burgerQuantity}</p>
                    <p>Extras: ${Object.entries(item.extras)
                            .filter(([key, value]) => value > 0)
                            .map(([key, value]) => {
                                let extraPrice = 0;
                                if (key === 'refresco') extraPrice = 20;
                                if (key === 'papasGajo') extraPrice = 55;
                                if (key === 'papasFritas') extraPrice = 30;
                                return `<p>${extraNames[key]} ${extraPrice}$ <br> Cantidad: ${value}</p>`;
                            })
                            .join('') || '<br> Ninguno'}</p>
                </div>
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

document.addEventListener("DOMContentLoaded", function() {
    // Obtener la dirección seleccionada de localStorage
    const direccionSeleccionada = JSON.parse(localStorage.getItem("direccionSeleccionada"));

    if (direccionSeleccionada) {
        document.getElementById("direccionSeleccionada").innerHTML = `
            <img src="/img/mapas-y-banderas.png" alt="" class="direccion">
            ${direccionSeleccionada.calle} ${direccionSeleccionada.numero}${direccionSeleccionada.interior ? ", Int " + direccionSeleccionada.interior : ""}, 
            ${direccionSeleccionada.colonia}, C.P. ${direccionSeleccionada.codigo}
        `;
    }
});

function goBack() {
    window.history.back(); // Regresa a la página anterior
}

document.addEventListener("DOMContentLoaded", function () {
    const btnExito = document.getElementById("btnExito");

    if (btnExito) {
        btnExito.addEventListener("click", function () {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = document.getElementById("subtotal").textContent;
            const descuento = document.getElementById("descuento").textContent;
            const total = document.getElementById("total").textContent;
            const metodoPago = JSON.parse(localStorage.getItem("metodoPago")) || { metodoPago: "No seleccionado" };
            const direccion = JSON.parse(localStorage.getItem("direccionSeleccionada")) || { calle: "No seleccionada" };

            const nuevoPedido = {
                productos: cart,
                subtotal: subtotal,
                descuento: descuento,
                total: total,
                metodoPago: metodoPago.metodoPago,
                direccion: direccion,
                fecha: new Date().toLocaleString()
            };

            // Obtener historial de pedidos
            let historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];

            // Agregar nuevo pedido
            historial.push(nuevoPedido);

            // Guardar historial actualizado
            localStorage.setItem("historialPedidos", JSON.stringify(historial));

            // Limpiar el carrito después de la compra
            localStorage.removeItem("cart");

            // Redirigir al historial de pedidos
            window.location.href = "historial.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener la sucursal seleccionada de localStorage
    const sucursalSeleccionada = localStorage.getItem("sucursalSeleccionada");

    // Mostrar la sucursal en la página
    if (sucursalSeleccionada) {
        document.getElementById("direccionSeleccionada").innerHTML = `
            <img src="/img/mapas-y-banderas.png" alt="" class="direccion">
            ${sucursalSeleccionada}
        `;
    }
});
