class Comentario {
  constructor(fecha) {
    this.fecha = fecha;
  }
  getFecha() {
    return this.fecha;
  }
  setFecha(persona)
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
  setTexto(texto)
  {
    this.contenido=texto;
    this.tipoContenido='Text';
  }
  setVideo(video)
  {
    this.contenido=video;
    this.tipoContenido='Video';

  }
  setImagen(imagen)
  {
    this.contenido=imagen;
    this.tipoContenido='Image';
  }
  getContenido()
  {
    return this.contenido;
  }
  getTipoContenido()
  {
    return this.tipoContenido;
  }


  toString(){
    console.log("-Comentario:");
    console.log("--Autor: "+this.autor.getWebId());
    console.log("--Contenido: "+this.contenido);
    console.log("--TipoContenido: "+this.tipoContenido);

  }
}

export default Comentario;
