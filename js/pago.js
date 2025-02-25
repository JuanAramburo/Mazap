document.addEventListener("DOMContentLoaded", function () {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById("card-form");
    const savedCardDiv = document.getElementById("saved-card");

    function setupChangeCardButton() {
        const changeCardButton = document.getElementById("change-card");
        if (changeCardButton) {
            changeCardButton.addEventListener("click", function() {
                cardForm.style.display = "block";
                savedCardDiv.style.display = "none";
            });
        }
    }

    function displaySavedPayment() {
        const savedPayment = JSON.parse(localStorage.getItem("metodoPago"));
        if (savedPayment) {
            // Actualiza el radio button correspondiente
            const radioButton = document.querySelector(`input[name="payment"][value="${savedPayment.metodoPago}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }

            if (savedPayment.metodoPago === "tarjeta" && savedPayment.cardInfo) {
                savedCardDiv.innerHTML = `  
                    <p>Tarjeta guardada: ${savedPayment.cardInfo.maskedCard}</p>
                    <button id="change-card">Cambiar tarjeta</button>
                `;
                savedCardDiv.style.display = "block";
                cardForm.style.display = "none";
                setupChangeCardButton();
            } else if (savedPayment.metodoPago === "tarjeta") {
                // Si es tarjeta pero no hay información de tarjeta
                cardForm.style.display = "block";
                savedCardDiv.style.display = "none";
            } else {
                // Para otros métodos de pago (banco, efectivo, etc.)
                savedCardDiv.style.display = "none";
                cardForm.style.display = "none";
            }
        } else {
            // Si no hay pago guardado, ocultamos el div de tarjeta guardada
            savedCardDiv.style.display = "none";
            cardForm.style.display = "none";
        }
    }

    // Mostrar método guardado al cargar
    displaySavedPayment();

    // Mostrar formulario si se selecciona Tarjeta
    paymentOptions.forEach(option => {
        option.addEventListener("change", function () {
            const savedPayment = JSON.parse(localStorage.getItem("metodoPago"));
            
            if (this.value === "tarjeta") {
                // Si hay una tarjeta guardada, mostrarla
                if (savedPayment && savedPayment.metodoPago === "tarjeta" && savedPayment.cardInfo) {
                    savedCardDiv.innerHTML = `  
                        <p>Tarjeta guardada: ${savedPayment.cardInfo.maskedCard}</p>
                        <button id="change-card">Cambiar tarjeta</button>
                    `;
                    savedCardDiv.style.display = "block";
                    cardForm.style.display = "none";
                    setupChangeCardButton();
                } else {
                    // Si no hay tarjeta guardada, mostrar el formulario
                    cardForm.style.display = "block";
                    savedCardDiv.style.display = "none";
                }
            } else if (this.value === "banco" || this.value === "efectivo") {
                // Si se selecciona otro método de pago, ocultar la tarjeta guardada
                cardForm.style.display = "none";
                savedCardDiv.style.display = "none";
            }
        });
    });

    // Guardar método de pago
    document.getElementById("btnGuardarPago").addEventListener("click", function () {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert("Selecciona un método de pago.");
            return;
        }

        const metodoPago = selectedPayment.value;
        let imagenPago = "";

        switch (metodoPago) {
            case "tarjeta":
                imagenPago = "/img/metodo-de-pago.png";
                break;
            case "banco":
                imagenPago = "/img/cuenta-bancaria.png";
                break;
            case "efectivo":
                imagenPago = "/img/metodo-de-pago (1).png";
                break;
        }

        let paymentData = { metodoPago, imagenPago };

        if (metodoPago === "tarjeta" && cardForm.style.display !== "none") {
            const cardNumber = document.getElementById("card-number").value.trim();
            if (cardNumber.length < 16) {
                alert("Por favor, ingresa un número de tarjeta válido.");
                return;
            }

            paymentData.cardInfo = {
                cardNumber: cardNumber,
                maskedCard: "**** **** **** " + cardNumber.slice(-4)
            };
        } else if (metodoPago === "tarjeta") {
            // Si es tarjeta pero el formulario está oculto, mantener la tarjeta guardada
            const savedPayment = JSON.parse(localStorage.getItem("metodoPago"));
            if (savedPayment && savedPayment.cardInfo) {
                paymentData.cardInfo = savedPayment.cardInfo;
            }
        }

        // Guardar en localStorage
        localStorage.setItem("metodoPago", JSON.stringify(paymentData));
        
        // Redirigir
        window.location.href = "pedidoDom.html";
    });
});
