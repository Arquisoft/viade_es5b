class Amigo {
  constructor(nombre,apellido,apodo, webId) {
    this.nombre = nombre;
    this.apellido=apellido;
    this.apodo=apodo;
    this.webId=webId;
  }

  /*
   * Devuelve el nombre del amigo.
   */
  getNombre() {
    return this.nombre;
  }
    /*
   * Devuelve el nombre del amigo.
   */
  getApellido() {
    return this.apellido;
  }
    /*
   * Devuelve el apodo que le hayamos puesto al amigo.
   */
  getApodo() {
    return this.apodo;
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
    console.log("--Apellido: "+this.apellido);
    console.log("--Apodo: "+this.apodo);
    console.log("--WebID: "+this.webID);
  }
}

export default Amigo;
