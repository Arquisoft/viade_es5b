class RutaAmigo {
  constructor(ruta, amigo) {
    this.ruta = ruta;
    this.amigo = amigo; 
  }
  /*
   * Devuelve el amigo
   */
  getAmigo() {
    return this.amigo;
  }
    /*
   * Devuelve la ruta
   */
  getRuta() {
    return this.ruta;
  }
}

export default RutaAmigo;
