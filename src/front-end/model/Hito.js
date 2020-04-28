class Hito {
	constructor (nombre, latitud, longitud) {
		this.nombre = nombre; // Nombre del hito.
		// Coordenadas del hito
		this.longitud = longitud;
		this.latitud = latitud;
	}

	/*
   * Devuelve el nombre del hito.
   */
	getNombre () {
		return this.nombre;
	}

	/*
   * Devuelve la componente longitud de las coordenadas
   * del hito.
   */
	getLong () {
		return this.longitud;
	}

	/*
   * Devuelve la componente latitud de las coords.
   * del hito.
   */
	getLat () {
		return this.latitud;
	}

	toString () {
		console.log("-Hito:");
		console.log("--Nombre: " + this.nombre);
		console.log("--Longitud: " + this.longitud);
		console.log("--Latitud: " + this.latitud);
	}
}

export default Hito;
