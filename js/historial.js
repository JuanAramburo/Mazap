document.addEventListener("DOMContentLoaded", function () {
    const historialPedidos = JSON.parse(localStorage.getItem("historialPedidos")) || [];
    const historialContainer = document.getElementById("historialPedidos");

    if (historialPedidos.length === 0) {
        historialContainer.innerHTML = "<p>No tienes pedidos registrados.</p>";
        return;
    }

    historialPedidos.forEach((pedido, index) => {
        const pedidoDiv = document.createElement("div");
        pedidoDiv.classList.add("pedido-item");

        pedidoDiv.innerHTML = ` 
                    ${pedido.productos.map(item => `
                        <div class="producto">
                            <img src="${item.burgerImage}" alt="${item.burgerName}" class="burger-img">
                            <div class="producto-info">
                                <p>${item.burgerName} x${item.burgerQuantity}</p>
                                <p>Extras: ${Object.entries(item.extras)
                                    .filter(([key, value]) => value > 0)
                                    .map(([key, value]) => `${key} (${value})`)
                                    .join(', ') || 'Ninguno'}</p>
                                <p>Total: ${pedido.total}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>
        `;

        historialContainer.appendChild(pedidoDiv);
    });
});


function goBack() {
    window.history.back(); // Regresa a la página anterior
}
