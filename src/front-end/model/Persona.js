class Persona {
	constructor (nombre, webId, foto) {
		this.nombre = nombre;
		this.webId = webId;
		this.foto = foto;
	}

	/*
   * Devuelve el nombre de la persiona.
   */
	getNombre () {
		return this.nombre;
	}

	/*
   * Devuelve el webId de la persona
   */
	getWebId () {
		return this.webId;
	}

	/*
   * Devuelve la url de la foto de la persona
   */
	getFoto () {
		return this.foto;
	}

	toString () {

	}
}

export default Persona;
