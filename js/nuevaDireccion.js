document.getElementById("direccionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const interior = document.getElementById("interior").value || "";
    const colonia = document.getElementById("colonia").value;
    const codigo = document.getElementById("codigo").value;

    // Crear objeto de dirección
    const nuevaDireccion = {
        calle,
        numero,
        interior,
        colonia,
        codigo
    };

    // Obtener direcciones existentes
    let direcciones = JSON.parse(localStorage.getItem("direcciones")) || [];

    // Agregar nueva dirección
    direcciones.push(nuevaDireccion);

    // Guardar en localStorage
    localStorage.setItem("direcciones", JSON.stringify(direcciones));

    // Redirigir a la página de direcciones
    window.location.href = "direccion.html";
});

function goBack() {
    window.history.back(); // Regresa a la página anterior
}