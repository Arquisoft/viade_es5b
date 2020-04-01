class RutaAmigo {
  constructor (ruta, persona) {
    this.ruta = ruta
    this.amigo = persona
  }

  /*
   * Devuelve el amigo
   */
  getAmigo () {
    return this.amigo
  }

  /*
   * Devuelve la ruta
   */
  getRuta () {
    return this.ruta
  }
}

export default RutaAmigo
