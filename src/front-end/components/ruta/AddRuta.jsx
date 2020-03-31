import React, { Component } from "react";
import RutaService from "../../services/rutas/RutaService";

class AddRuta extends Component {

  constructor(props){
    super(props);
    this.rutaService= new RutaService();
  }
  

state ={
  nombre:'',
  longitudInicio: '',
  latitudInicio: '',
  descripcion:'',
  nombreHito:'',
  longitudHito:'',
  latitudHito:'',
  hitos: [],
  formulario1: false,
  formulario2:true
};


onChange = (e) =>{ 
    this.setState({
        [e.target.name] : e.target.value
    });  //De esta manera cogemos el nombre del input y modificamos el atributo con ese nombre.  
}

onSubmit= (e) =>{//Creamos ruta sin hitos.
  
  
  //Modificamos los formularios:
  this.setState(
    {
      formulario1:true,
      formulario2:false
    }
  )
  e.preventDefault();
}



onSubmit2= (e) =>{//Creamos hitos.
  this.addHito();
  e.preventDefault();
  console.log(this.state.hitos);

  //Inicializamos el formulario de hito:
  this.setState({
    nombreHito: '',
    longitudHito:'',
    latitudHito:'',
   
  })
}



addHito = () =>{
  //Añadimos hito string con sus datos.
  const newHito={
    nombre: this.state.nombreHito,
    latitud: this.state.latitudHito,
    longitud: this.state.longitudHito
    
  }
  this.setState({
    hitos: [...this.state.hitos, newHito]
  })
}

crearRuta= (e) =>{
  console.log("Añadimos la ruta: "+this.state.nombre+", con "+this.state.hitos.length+" hitos");
  for (var h of this.state.hitos){
    console.log(h);
  }
  this.setState(
    {
      formulario1:false,
      formulario2:true    
    }
  );
  this.rutaService.addRuta(this.state.nombre, this.state.latitudInicio, this.state.longitudInicio,this.state.descripcion,this.state.hitos);
  this.setState({
    nombre:'',
    longitudInicio:'',
    latitudInicio:'',
    descripcion:'',
    hitos: []
  });
  alert ('La ruta '+ this.state.nombre+' ha sido añadida correctamente');
}

  render() {
    return (
      <div className="addRuta">
        <h1 data-testid="titleAñadirRuta">Añadir rutas:</h1>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label data-testid="e-nombreRuta">Nombre de la ruta:</label>
                <input data-testid="in-nombreRuta" disabled={this.state.formulario1} className="form-control" placeholder="Ruta 21" type="text" name="nombre" value={this.state.nombre} onChange={this.onChange}/>
            </div>    
            <div className="form-group">    
                <h3 data-testid="titlelugarInicio">Lugar de inicio:</h3>
                <div className="form-group">    
                  <label data-testid="e-latitudRuta">Latitud de la ruta:</label>
                  <input data-testid="in-latitudRuta" disabled={this.state.formulario1} className="form-control" placeholder="200" type="text" name="latitudInicio" value={this.state.latitudInicio} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label data-testid="e-longitudRuta">Longitud de la ruta:</label>
                  <input data-testid="in-longitudRuta" disabled={this.state.formulario1} className="form-control" placeholder="100" type="text" name="longitudInicio" value={this.state.longitudInicio} onChange={this.onChange}/>
                </div>
            </div> 
            <div className="form-group">
                <label data-testid="e-descripcionRuta">Descripción de la ruta:</label>
                <textarea data-testid="in-descripcionRuta" disabled={this.state.formulario1} className="form-control" rows="3" name="descripcion" value={this.state.descripcion} onChange={this.onChange}></textarea>
            </div> 
            <button type="submit" className="btn btn-primary" data-testid="addRouteButton" disabled={this.state.formulario1}>Añadir ruta</button>
        </form>
        
        <h2 data-testid="titleAñadirHito">Añadir hitos para la ruta:</h2>
        <form onSubmit={this.onSubmit2} disabled={this.state.formulario}>
              <div className="form-group"> 
                <label data-testid="e-nombreHito">Nombre del hito:</label>
                <input data-testid="in-nombreHito" disabled={this.state.formulario2} className="form-control" placeholder="Hito 1" type="text" name="nombreHito" value={this.state.nombreHito} onChange={this.onChange}/>
              </div>  
              <div className="form-group">
                <label data-testid="e-latitudHito">Latitud del hito:</label>
                <input data-testid="in-latitudHito" disabled={this.state.formulario2} className="form-control" placeholder="300" type="text" name="latitudHito" value={this.state.latitudHito} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label data-testid="e-longitudHito">Longitud del hito:</label>
                <input data-testid="in-longitudHito" disabled={this.state.formulario2} className="form-control" placeholder="200" type="text" name="longitudHito" value={this.state.longitudHito} onChange={this.onChange}/>
              </div>
              <button type="submit" className="btn btn-primary" data-testid="addHitoButton" disabled={this.state.formulario2}>Añadir hito</button>
        </form>
        <br/>
        <button onClick={this.crearRuta} className="btn btn-primary" data-testid="saveRouteButton" disabled={this.state.formulario2}>Guardar ruta</button>
      </div>
      
    );
  }
  

}

export default AddRuta;
