// Variables para almacenar el estado de búsqueda
let filteredProducts = products;

// Función para renderizar productos (actualizada para usar productos filtrados)
function renderProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const currentProducts = filteredProducts.slice(start, end);

    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    if (currentProducts.length === 0) {
        productContainer.innerHTML = "<p class='text-center'>No se encontraron productos.</p>";
        return;
    }

    currentProducts.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Precio: ${product.price}</p>
                        <button class="btn btn-primary">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Función para filtrar productos según la búsqueda
function filterProducts() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );
    
    currentPage = 1; // Reiniciar a la primera página al filtrar
    renderProducts(currentPage);
    renderPagination();
}

// Paginación (sin cambios)
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
        paginationContainer.innerHTML += pageItem;
    }

    // Botón "Siguiente"
    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Siguiente</a>
            </li>
        `;
    }
}

// Cambio de página (sin cambios)
function changePage(page) {
    currentPage = page;
    renderProducts(page);
    renderPagination();
}

// Inicializar vista
renderProducts(currentPage);
renderPagination();
