document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.btn-add-to-cart');

    addToCartButton.addEventListener('click', () => {
        const productId = addToCartButton.dataset.id;
        const size = document.getElementById('size').value;
        const quantity = document.getElementById('quantity').value;

        // Almacenar en localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ productId, size, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`Producto con ID ${productId}, talla ${size}, cantidad ${quantity} añadido al carrito.`);
    });
});
