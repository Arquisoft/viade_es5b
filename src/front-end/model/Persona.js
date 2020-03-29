class Persona {
  constructor(nombre, webId) {
    this.nombre = nombre;
    this.webId=webId;
  }

  /*
   * Devuelve el nombre de la persiona.
   */
  getNombre() {
    return this.nombre;
  }
  /*
   * Devuelve el webId de la persona
   */
  getWebId() {
    return this.webId;
  }

  toString(){
    console.log("-Persona:");
    console.log("--Nombre: "+this.nombre);
    console.log("--WebID: "+this.webID);
  }
}

export default Persona;
