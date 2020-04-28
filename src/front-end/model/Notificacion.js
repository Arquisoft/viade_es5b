class Notificacion {
	constructor (titulo, mensaje, tipo) {
		this.titulo = titulo;
		this.mensaje = mensaje;
		this.tipo = tipo;
	}

	getTitulo () {
		return this.titulo;
	}

	setTitulo (titulo) {
		this.titulo = titulo;
	}

	getMensaje () {
		return this.mensaje;
	}

	setMensaje (mensaje) {
		this.mensaje = mensaje;
	}
	getTipo () {
		return this.tipo;
	}

	setTipo (tipo) {
		this.tipo = tipo;
	}

	toString () {

	}
}

export default Notificacion;
