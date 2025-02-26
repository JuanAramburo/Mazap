document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los botones de seleccionar
    const botonesSeleccionar = document.querySelectorAll(".select-btn");

    botonesSeleccionar.forEach((boton) => {
        boton.addEventListener("click", function () {
            // Obtener el nombre de la sucursal seleccionada
            const sucursalSeleccionada = this.closest(".direccion-item").querySelector("p").textContent.trim();

            // Guardar en localStorage
            localStorage.setItem("sucursalSeleccionada", sucursalSeleccionada);

            // Redirigir a la página de pedidos
            window.location.href = "pedidoLocal.html";
        });
    });
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