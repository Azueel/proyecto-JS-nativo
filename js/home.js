//si un usuario no se encuentra logeado

let user = JSON.parse(localStorage.getItem('usuario')) || {};

if (user.email === undefined) {
	location.href = 'login.html';
}

//traigo el arreglo de productos
let productos = JSON.parse(localStorage.getItem('productos')) || [];

//variabale donde voy a poner las cards
let contendor = document.querySelector('#contenedor');

//eventos
const buscarProduct = document.querySelector('#buscarProduct');
buscarProduct.addEventListener('click', buscarProducto);

function cargarCard() {
	contenedor.innerHTML = '';
	productos.map((product) => {
		let div = document.createElement('div');
		div.classList = 'col col-md-6 col-lg mb-3';

		div.innerHTML = `
        <div class="card">
        <img src="${product.imagen}" class="card-img-top imgCard" alt="${product.nombre}">
        <div class="card-body d-flex">
          <h5 class="card-title">${product.nombre}</h5>
          <span class="ml-auto"><b>Stock: </b>${product.stock}</span>
          </div>
          <div class="card-footer">
          <p class="card-text"><b>Precio: </b>$${product.precio}</p>
          <a href="#" class="btn btn-success" onclick="agregarCarrito(${product.codigo},${user.id})"><i class="fa fa-cart-plus" aria-hidden="true"></i></a>
        </div>
      </div>
        
        `;

		contendor.appendChild(div);
	});
}

cargarCard();

function buscarProducto() {
	productos = JSON.parse(localStorage.getItem('productos')) || [];

	const textoFiltrado = document.querySelector('#textSearch').value;

	if (textoFiltrado.trim() === '') {
		cargarCard();
	} else {
		productos = productos.filter((product) => product.nombre.toLowerCase() === textoFiltrado.toLowerCase());
	}

	cargarCard();
}
