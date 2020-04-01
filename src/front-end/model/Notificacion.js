class Notificacion {
  constructor(titulo,mensaje) {
    this.titulo = titulo;
    this.mensaje = mensaje;
  }
  getTitulo() {
    return this.titulo;
  }
  setTitulo(titulo) {
    this.titulo = titulo;
  }
  getMensaje() {
    return this.mensaje;
  }
  setMensaje(mensaje) {
    this.mensaje = mensaje;
  }

  toString() {
    console.log("-Notificacion:");
    console.log("--Titulo: " + this.titulo);
    console.log("--Mensaje: " + this.mensaje);
  }
}

export default Notificacion;
