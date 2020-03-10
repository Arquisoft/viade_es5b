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
                <label>
                    Nombre de la ruta:
                    <input disabled={this.state.formulario1} placeholder="Ruta 21" type="text" name="nombre" value={this.state.nombre} onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Lugar de inicio:
                    <input disabled={this.state.formulario1} type="text" name="inicio" value={this.state.inicio} onChange={this.onChange}/>
                </label>
                <br/>
                <input type="submit" value="Añadir ruta"/>
        </form>
        <h2>Añadir hitos para la ruta:</h2>
        <form onSubmit={this.onSubmit2} disabled={this.state.formulario}>
                <label>
                    Nombre del hito:
                    <input disabled={this.state.formulario2} type="text" name="nombreHito" value={this.state.nombreHito} onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Longitud del hito:
                    <input disabled={this.state.formulario2} type="text" name="longitudHito" value={this.state.longitudHito} onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Latitud del hito:
                    <input disabled={this.state.formulario2} type="text" name="latitudHito" value={this.state.latitudHito} onChange={this.onChange}/>
                </label>
                <br/>
                <input type="submit" value="Añadir hito"/>
        </form>
        <br/>
        <button onClick={this.crearRuta}>Guardar ruta</button>
      </div>
      
    );
  }
  

}

export default AddRuta;
