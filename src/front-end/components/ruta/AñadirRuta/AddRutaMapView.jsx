import React, { Component } from "react";
import AddRouteMap from "../../map/AddRouteMap";
import {
  Container,
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import Hito from "../../../model/Hito";
import Ruta from "../../../model/Ruta";
import RutaService from "../../../services/rutas/RutaService";
import MessageDialog from "../../util/MessageDialog";

/**
 * Componente que representa la vista para añadir una ruta a través
 * de un mapa, en donde el usuario puede ir hacieno click para ir
 * dibujando la ruta.
 */
class AddRutaMapView extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
  }

  state = {
    name: "",
    description: "",
    points: [], // array de objetos {index: indice en el array, name: "nombre del punto", latlng: objeto LatLng},
    isAdding: true, // Indica si se está añadiendo la ruta al POD.
    routeIsAdded: true, // Indica si ya se ha añadido la ruta al POD.
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Añadir una ruta a través de un mapa</h1>
              <p>
                Desde aquí podrás crear tu propia ruta personalizada, indicando
                sus datos básicos y los hitos que la conforman.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mb-2" style={{ width: "70vh" }}>
                <Card.Header>Datos básicos</Card.Header>
                <Card.Body>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>Nombre</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Ruta de Avilés"
                      onChange={this.onChangeName}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>Descripción</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Texto descriptivo de la ruta"
                      as="textarea"
                      onChange={this.onChangeDescription}
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mb-2">
                <Card.Header>Seleccionar los hitos de la ruta</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Puedes utilizar el mapa de la parte inferior para
                    seleccionar los puntos que conformarán tu ruta. También
                    puedes hacer <b>doble click sobre un punto</b> para
                    modificar sus datos. Utiliza los botones de la barra
                    superior para eliminar el último marcador o eliminar todos
                    los marcadores.
                  </Card.Text>
                  <AddRouteMap
                    points={this.state.points}
                    updatePoints={this.updatePoints}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="success"
                style={{ padding: "12px 48px" }}
                onClick={this.handleAdd}
              >
                {this.handleIsAdding()}
              </Button>
            </Col>
          </Row>
        </Container>
        {this.handleRouteAdded()}
      </div>
    );
  }

  /**
   * Método invocado cada vez que se modifica la lista de puntos,
   * bien porque se haya añadido uno nuevo, se haya eliminado o
   * se haya modificado.
   */
  updatePoints = (points) => {
    this.setState({ points: points });
    console.log(this.state.points);
  };

  /**
   * Método invocado cuando se haga click sobre el botón para agregar la ruta.
   * Se encarga de comprobar que los datos de la ruta son correctos (número de puntos
   * seleccionado >= 2, nombre y descripción no están vacíos...). Construye un objeto Ruta
   * con los datos correspondientes y se lo pasa al servicio para almacenarlo en el pod del usuario loggeado.
   */
  handleAdd = async () => {
    let name = this.state.name;
    let description = this.state.description;
    let points = this.state.points;
    // Pre-condiciones
    if (name == null || name.length === 0) {
      // Nombre vacío
      alert("No puedes agregar una ruta sin nombre.");
      return;
    }

    if (description == null || description.length === 0) {
      // Descripción vacía
      alert("No puedes agregar una ruta sin descripción.");
      return;
    }

    if (points == null || points.length < 2) {
      // Ruta con menos de dos puntos.
      alert("La ruta debe tener al menos un inicio y un hito.");
      return;
    }

    // Construcción del objeto Ruta
    let inicio = points[0];
    let hitos = points
      .slice(1)
      .map((hito) => new Hito(hito.name, hito.latlng.lat, hito.latlng.lng));

    let ruta = new Ruta(
      name,
      [inicio.latlng.lat, inicio.latlng.lng],
      description
    );
    for (let i in hitos) ruta.addHito(hitos[i]);

    console.log(ruta);

    if (await this.rutaService.addRutaObject(ruta)) {
      alert("Ruta añadida correctamente");
    }
  };

  /**
   * Renderiza el texto del botón para añadir la ruta o bien
   * un Spinner de carga en función del estado isAdding.
   */
  handleIsAdding = () => {
    if (this.state.isAdding) {
      return (
        <div>
          <Spinner
            as="span"
            role="status"
            animation="border"
            size="sm"
            className="mr-2"
          />
          Agregando...
        </div>
      );
    }
    return "Agregar";
  };

  /**
   * Renderiza si ya se ha cargado la ruta en el POD un panel
   * modal con un mensaje indicando al usuario que su ruta ha sido
   * añadida.
   */
  handleRouteAdded = () => {
    if (this.state.routeIsAdded) {
      return (
        <MessageDialog
          show={true}
          title={`Ruta creada: ${this.state.name}`}
          message={
            "Tu nueva ruta ha sido creada correctamente, puedes ir a echarle un vistazo al listado de rutas."
          }
          handleAceptar={() => this.setState({ routeIsAdded: false })}
        />
      );
    }
    return null;
  };

  // Manejadores onChange para los inputs de nombre y descripción.

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
}

export default AddRutaMapView;
