import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";


/**
 * Componente que modela una lista clickable de amigos,
 * que permite seleccionar a varios amigos con los que compartir
 * una ruta.
 */
class GroupSelect extends Component {
  constructor(props) {
    super(props);
    this.amigos = props.amigos;
    this.state = {
      selected: this.amigos.map(v => false)
    };
  }

  state = {};
  render() {
    return (
      <ListGroup data-testid="envoltorio">
        {this.amigos.map((a, key) => {
          return (
            <ListGroup.Item
              data-testid="itemLista"
              className={
                this.state.selected[key] === true ? "active mb-1" : "mb-1"
              }
              key={key++}
              onClick={() => this.clickItem(key - 1)}
            >
                <img src={a.getFoto()!==null?a.getFoto():process.env.PUBLIC_URL +"/img/defaultProfile.png"} 
                  className="rounded-circle img-fluid" alt="" width="50" height="50"/>
              {a.getNombre()}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }

  clickItem = index => {
    let selected = this.state.selected;
    selected[index] = !selected[index];
    this.setState({ selected: selected });
    if (this.state.selected[index]) {
      // Añadirlo a la lista del padre
      this.props.add(this.amigos[index]);
    } else {
      // Borrarlo de la lista del padre.
      this.props.delete(this.amigos[index]);
    }
  };
}

export default GroupSelect;
