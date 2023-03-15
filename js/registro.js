//variables

const formulario = document.querySelector('#btnSubmit');

document.addEventListener('DOMContentLoaded', () => {
	usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
});

let admin = new Usuario(9999, 'Admin', 'admin@gmail.com', 'admin', 'admin');
//usuarios.push(admin);
usuarios = [...usuarios, admin];

//eventos
formulario.addEventListener('submit', validarUsuarios);

class Usuario {
	constructor(id, nombre, email, usuario, password) {
		this.id = id;
		this.nombre = nombre;
		this.email = email;
		this.usuario = usuario;
		this.password = password;
	}
}

function validarUsuarios(e) {
	e.preventDefault();
	const id = Date.now();
	const nombre = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const user = document.querySelector('#user').value;
	const password = document.querySelector('#password').value;

	let existeEmail = usuarios.find((user) => {
		return user.email === email;
	});

	if (existeEmail !== undefined) {
		Swal.fire({
			icon: 'error',
			title: 'Usuario Existente',
			text: 'Lo siento el usuario ingresado ya esta registrado!',
			footer: '<a href="">Why do I have this issue?</a>',
		});
		formulario.reset();
		return;
	}

	let newUser = new Usuario(id, nombre, email, user, password);

	usuarios = [...usuarios, newUser];
	localStorage.setItem('usuarios', JSON.stringify(usuarios));

	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Usuario Registrado',
		showConfirmButton: false,
		timer: 1500,
	});

	formulario.reset();
}
