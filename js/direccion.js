document.addEventListener("DOMContentLoaded", function() {
    cargarDirecciones();
});

function cargarDirecciones() {
    const listaDirecciones = document.getElementById("listaDirecciones");
    const direcciones = JSON.parse(localStorage.getItem("direcciones")) || [];

    if (direcciones.length === 0) {
        listaDirecciones.innerHTML = "<p>No tienes direcciones guardadas.</p>";
    } else {
        listaDirecciones.innerHTML = "";

        direcciones.forEach((direccion, index) => {
            const div = document.createElement("div");
            div.classList.add("direccion-item");
            div.innerHTML = `
                <p>${direccion.calle} ${direccion.numero}${direccion.interior ? ", Int " + direccion.interior : ""} ${direccion.colonia}, C.P. ${direccion.codigo}</p>
                <div class="buttons">
                    <button class="select-btn" onclick="seleccionarDireccion(${index})">Seleccionar</button>
                    <button class="delete-btn" onclick="eliminarDireccion(${index})"><img src="/img/eliminar.png" class="eliminar"></button>
                </div>
            `;
            listaDirecciones.appendChild(div);
        });
    }
}

function eliminarDireccion(index) {
    let direcciones = JSON.parse(localStorage.getItem("direcciones")) || [];
    
    if (confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
        direcciones.splice(index, 1);
        localStorage.setItem("direcciones", JSON.stringify(direcciones));
        cargarDirecciones(); // Recargar la lista sin recargar la página
    }
}

function seleccionarDireccion(index) {
    let direcciones = JSON.parse(localStorage.getItem("direcciones")) || [];
    const direccionSeleccionada = direcciones[index];

    // Guardamos la dirección seleccionada en localStorage
    localStorage.setItem("direccionSeleccionada", JSON.stringify(direccionSeleccionada));

    // Redirigir a pedidosDom.html
    window.location.href = "pedidoDom.html";
}

function goBack() {
    window.history.back(); // Regresa a la página anterior
}
