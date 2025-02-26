// Esperar a que el DOM cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Objeto con los botones y sus URLs correspondientes
    const rutas = {
        btnInicio: "inicio.html",
        btnFavoritos: "favoritos.html",
        btnMenu: "menu.html",
        btnCarrito: "carrito.html",
        btnUsuario: "cuenta.html",
        btnDomicilio: "inicio.html",
        btnPedidoLocal: "pedidoLocal.html",
        btnMostrador: "mostrador.html",
        btnPedido: "pedidoDom.html",
        btnExito: "pedidoRealizado.html",
        btnForm: "confirmacionAtencion.html",
        cerrarSesion: "/index.html"
    };

    // Iterar sobre cada ID y agregar un evento de clic
    Object.keys(rutas).forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.addEventListener("click", function () {
                window.location.href = rutas[id]; // Redirigir a la página correspondiente
            });
        }
    });
});
