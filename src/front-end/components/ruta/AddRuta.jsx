import React, { Component } from "react";
import Hito from "../../model/Hito.js";
import Ruta from "../../model/Ruta.js";
import RutaService from "../../services/rutas/RutaService"

class AddRuta extends Component {

  constructor(props){
    super(props)
    this.rutaService= new RutaService();
  }
  

state ={
  nombre:'',
  inicio: '',
  nombreHito:'',
  longitudHito:'',
  latitudHito:'',
  hitos: [],
  formulario1: false,
  formulario2:true
};


onChange = e=>{ 
    this.setState({
        [e.target.name] : e.target.value
    })  //De esta manera cogemos el nombre del input y modificamos el atributo con ese nombre.  
}

onSubmit=e=>{//Creamos ruta sin hitos.
  
  
  //Modificamos los formularios:
  this.setState(
    {
      formulario1:true,
      formulario2:false
    }
  )
  e.preventDefault();
}



onSubmit2=e=>{//Creamos hitos.
  this.addHito();
  e.preventDefault();

  //Inicializamos el formulario de hito:
  this.setState({
    nombreHito: '',
    longitudHito:'',
    latitudHito:''
  })
}



addHito = () =>{
  //Añadimos hito string con sus datos.
  const newHito={
    nombre: this.state.nombreHito,
    longitud: this.state.longitudHito,
    latitud: this.state.latitudHito
  }
  this.setState({
    hitos: [...this.state.hitos, newHito]
  })
}

crearRuta=e=>{
  console.log("Añadimos la ruta: "+this.state.nombre+", con "+this.state.hitos.length+" hitos");
  this.setState(
    {
      formulario1:false,
      formulario2:true    
    }
  )
  this.rutaService.addRuta(new Ruta(this.state.nombre, this.state.inicio).setHitos(this.state.hitos));
  this.setState({
    nombre:'',
    inicio:'',
    hitos: []
  })
}

  render() {
    return (
      <div className="addRuta">
        <h1>Añadir rutas:</h1>
        <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label>Nombre de la ruta:</label>
                <input disabled={this.state.formulario1} class="form-control" placeholder="Ruta 21" type="text" name="nombre" value={this.state.nombre} onChange={this.onChange}/>
            </div>    
            <div class="form-group">    
                <label>Lugar de inicio:</label>
                <input disabled={this.state.formulario1} class="form-control" placeholder="Madrid" type="text" name="inicio" value={this.state.inicio} onChange={this.onChange}/>
            </div>  
            <input type="submit" value="Añadir ruta"/>
        </form>
        <h2>Añadir hitos para la ruta:</h2>
        <form onSubmit={this.onSubmit2} disabled={this.state.formulario}>
              <div class="form-group"> 
                <label>Nombre del hito:</label>
                <input disabled={this.state.formulario2} class="form-control" placeholder="hito1" type="text" name="nombreHito" value={this.state.nombreHito} onChange={this.onChange}/>
              </div>  
              <div class="form-group">
                <label>Longitud del hito:</label>
                <input disabled={this.state.formulario2} class="form-control" placeholder="200" type="text" name="longitudHito" value={this.state.longitudHito} onChange={this.onChange}/>
              </div>
              <div class="form-group">
                <label>Latitud del hito:</label>
                <input disabled={this.state.formulario2} class="form-control" placeholder="300" type="text" name="latitudHito" value={this.state.latitudHito} onChange={this.onChange}/>
              </div>
              <input type="submit"  value="Añadir hito"/>
        </form>
        <br/>
        <button onClick={this.crearRuta}>Guardar ruta</button>
      </div>
      
    );
  }
  

}

export default AddRuta;
