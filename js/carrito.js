        // Función para cargar los elementos del carrito
        function loadCartItems() {
            const cartItems = document.getElementById('cart-items');
            const totalPriceElement = document.getElementById('total-price');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            const cartContainer = document.getElementById('cart-container');
            let totalPrice = 0;

            // Obtener el carrito desde localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Mostrar u ocultar el mensaje de carrito vacío
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block'; // Mostrar mensaje de carrito vacío
                cartContainer.style.display = 'none';   // Ocultar el contenedor del carrito
            } else {
                emptyCartMessage.style.display = 'none'; // Ocultar mensaje de carrito vacío
                cartContainer.style.display = 'block';    // Mostrar el contenedor del carrito
            }

            // Limpiar la lista de elementos del carrito
            cartItems.innerHTML = '';

            // Recorrer el carrito y agregar cada elemento a la lista
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'cart-item';

                const extraNames = {
                    refresco: "Refresco",
                    papasGajo: "Papas Gajo",
                    papasFritas: "Papas Fritas"
                };

                // Mostrar los detalles de la hamburguesa
                li.innerHTML = `
                <div class="item-info">
                    <img src="${item.burgerImage}" alt="${item.burgerName}" class="burger-image">
                    <div>
                        <h3>${item.burgerName}</h3>
                        <h3>Cantidad: ${item.burgerQuantity} x ${item.burgerPrice}$ c/u</h3>
                        <p>Extras:${Object.entries(item.extras)
                                    .filter(([key, value]) => value > 0)
                                    .map(([key, value]) => {
                                        let extraPrice = 0;
            
                                        // Definir los precios de los extras según el objeto `prices`
                                        if (key === 'refresco') extraPrice = 20;
                                        if (key === 'papasGajo') extraPrice = 55;
                                        if (key === 'papasFritas') extraPrice = 30;
            
                                        return `<p>${extraNames[key]} <br> Cantidad: ${value} x ${extraPrice}$ c/u</p>`;
                                    })
                                    .join('') || ' Ninguno'}</p>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">Eliminar</button>
            `;
                cartItems.appendChild(li);
                totalPrice += item.totalPrice;
            });

            // Mostrar el precio total
            totalPriceElement.textContent = `${totalPrice}$ MXN`;
        }

        // Función para eliminar un elemento del carrito
        function removeItem(index) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Eliminar el elemento en la posición `index`
            cart.splice(index, 1);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Recargar los elementos del carrito
            loadCartItems();
        }

        // Función para proceder al pago
        function proceedToCheckout() {
            window.location.href = "pedidoDom.html"
        }
        document.addEventListener('DOMContentLoaded', loadCartItems);

        function goBack() {
            window.history.back(); // Regresa a la página anterior
        }