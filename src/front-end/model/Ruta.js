class Ruta {
  constructor(nombre, inicio) {
    this.nombre = nombre; // Nombre de la ruta
    this.inicio = inicio; // Lugar de inicio
    this.hitos = []; // Hitos de la ruta
  }

  /*
   * Devuelve el nombre de la ruta
   */
  getNombre() {
    return this.nombre;
  }

  /*
   * Devuelve el lugar de inicio
   */
  getInicio() {
    return this.inicio;
  }

  /*
   * Devuelve la lista de hitos de la ruta.
   */
  getHitos() {
    return this.hitos;
  }

  /*
   * Añade un hito a la ruta.
   */
  addHito(hito) {
    this.hitos.push(hito);
  }
}

export default Ruta;
