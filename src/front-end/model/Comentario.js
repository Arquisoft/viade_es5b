class Comentario {
  constructor(fecha,texto) {
    this.fecha = fecha;
    this.texto = texto;
  }
  getFecha() {
    return this.fecha;
  }
  setFecha(fecha)
  {
    this.fecha=fecha
  }
  getAutor() {
    return this.autor;
  }
  setAutor(persona)
  {
    this.autor=persona
  }
  getTexto() {
    return this.texto;
  }
  setTexto(texto)
  {
    this.texto=texto;
  }
  toString(){
    console.log("-Comentario:");
    console.log("--Autor: "+this.autor.getWebId());
    console.log("--Texto: "+this.texto);
  }
}

export default Comentario;
