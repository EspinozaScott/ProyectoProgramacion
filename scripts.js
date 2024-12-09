$(document).ready(function () {
    $('#search').on('input', function () {
        const query = $(this).val().toLowerCase();
        $('#product-list .card').each(function () {
            const productName = $(this).find('.card-title').text().toLowerCase();
            $(this).toggle(productName.includes(query));
        });
    });

    $('.btn-add-to-cart').on('click', function () {
        const productId = $(this).data('id');
        alert(`Producto con ID ${productId} añadido al carrito.`);
    });
});

$(document).ready(function () {
    $('.btn-add-to-cart').on('click', function () {
        const productId = $(this).data('id');
        const size = $('#size').val();
        const quantity = $('#quantity').val();

        alert(`Producto con ID ${productId}, talla ${size}, cantidad ${quantity} añadido al carrito.`);
        
    });
});

$(document).ready(function () {
    const cartKey = 'shoppingCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    function renderCart() {
        const cart = getCart();
        const cartItems = $('#cart-items');
        cartItems.empty();

        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartItems.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${item.quantity}</td>
                    <td>S/ ${item.price.toFixed(2)}</td>
                    <td>S/ ${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `);
        });

        $('#cart-total').text(`S/ ${total.toFixed(2)}`);
    }

    function addToCart(product) {
        const cart = getCart();
        cart.push(product);
        saveCart(cart);
        renderCart();
        alert('Producto añadido al carrito.');
    }

    $(document).on('click', '.remove-item', function () {
        const index = $(this).data('index');
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    });

    $('#clear-cart').on('click', function () {
        localStorage.removeItem(cartKey);
        renderCart();
    });

    $('#checkout').on('click', function () {
        const cart = getCart();
        if (cart.length === 0) {
            alert('El carrito está vacío.');
        } else {
            alert('Redirigiendo a la página de pago...');
        }
    });

    renderCart();
});

$(document).ready(function () {
    const cartKey = 'shoppingCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

    function renderCartSummary() {
        const cart = getCart();
        const summaryItems = $('#summary-items');
        summaryItems.empty();

        let total = 0;

        cart.forEach((item) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            summaryItems.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${item.quantity}</td>
                    <td>S/ ${subtotal.toFixed(2)}</td>
                </tr>
            `);
        });

        $('#summary-total').text(`S/ ${total.toFixed(2)}`);
    }

    function validatePaymentForm() {
        const cardNumber = $('#cardNumber').val();
        const expiryDate = $('#expiryDate').val();
        const cvv = $('#cvv').val();

        if (!/^\d{16,19}$/.test(cardNumber)) {
            alert('El número de tarjeta no es válido.');
            return false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert('La fecha de expiración no es válida.');
            return false;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert('El CVV no es válido.');
            return false;
        }

        return true;
    }

    $('#payment-form').on('submit', function (e) {
        e.preventDefault();

        if (validatePaymentForm()) {
            alert('Pago realizado con éxito. ¡Gracias por tu compra!');
            localStorage.removeItem(cartKey); 
            window.location.href = 'index.html';
        }
    });

    renderCartSummary();
});
