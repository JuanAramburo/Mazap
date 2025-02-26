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

        const extraNames = {
            refresco: "Refresco",
            papasGajo: "Papas Gajo",
            papasFritas: "Papas Fritas"
        };

        pedidoDiv.innerHTML = `
            ${pedido.productos.map(item => `
                <div class="producto">
                    <img src="${item.burgerImage}" alt="${item.burgerName}" class="burger-image">
                    <div class="producto-info">
                        <h3>${item.burgerQuantity} ${item.burgerName}</h3>
                        <p>Extras: ${Object.entries(item.extras)
                            .filter(([key, value]) => value > 0)
                            .map(([key, value]) => {
                                let extraPrice = 0;

                                // Definir los precios de los extras según el objeto `prices`
                                if (key === 'refresco') extraPrice = 20;
                                if (key === 'papasGajo') extraPrice = 55;
                                if (key === 'papasFritas') extraPrice = 30;

                                return `<p>${value} ${extraNames[key]}</p>`;
                            })
                            .join('') || '<br>Ninguno'}</p>
                    </div>
                </div>
            `).join("")}
            <br>
            <center><p><strong>Total del pedido: ${pedido.total}</strong></p></center>
        `;

        historialContainer.appendChild(pedidoDiv);
    });
});

function goBack() {
    window.history.back(); // Regresa a la página anterior
}
