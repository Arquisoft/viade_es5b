class Amigo {
  constructor(nombre, webId) {
    this.nombre = nombre;
    this.webId=webId;
  }

  /*
   * Devuelve el nombre del amigo.
   */
  getNombre() {
    return this.nombre;
  }
  /*
   * Devuelve el webId del amigo
   */
  getWebId() {
    return this.webId;
  }

  toString(){
    console.log("-Amigo:");
    console.log("--Nombre: "+this.nombre);
    console.log("--WebID: "+this.webID);
  }
}

export default Amigo;
