import React, { Component } from "react";
import { Alert, Spinner, Form, Card, Accordion, Button } from "react-bootstrap";
import Gallery from "react-grid-gallery";
import bsCustomFileInput from "bs-custom-file-input";
import $ from "jquery";
import RutaService from "../../services/rutas/RutaService";

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
  }

  state = {
    route: this.props.ruta,
    imageList: [],
    selectedImages: [],
    ableToUpload: false,
    loading: true,
    loaded: false,
    empty: false
  };

  componentDidMount() {
    // Input file dinamico.
    $(document).ready(function() {
      bsCustomFileInput.init();
    });
  }

  render() {
    return (
      <>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                onClick={this.handleOnClick}
              >
                Galería
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Gallery images={this.state.imageList} />
                {this.state.loading && (
                  <>
                    <Spinner
                      className="mt-2"
                      as="span"
                      animation="border"
                      role="status"
                    />
                    Cargando imágenes...
                  </>
                )}
                {this.state.empty && (
                  <Alert variant="warning">Aún no hay imágenes.</Alert>
                )}
                <Form>
                  <Form.File
                    label="Selecciona una imagen"
                    multiple
                    accept="image/*"
                    custom
                    onChange={this.onChangeHandler}
                  />
                </Form>
                <Button
                  className="mt-2"
                  variant="success"
                  onClick={this.handleUpload}
                  disabled={!this.state.ableToUpload}
                >
                  Subir
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    );
  }

  onChangeHandler = event => {
    this.setState({
      selectedImages: event.target.files,
      ableToUpload: event.target.files.length > 0
    });
  };

  /**
   * Se encarga de subir las imagenes al servidor.
   */
  handleUpload = async () => {
    this.setState({ loading: true, empty: false });
    await this.rutaService.subirFicheroAMiRuta(
      // añadimos los ficheros a la ruta del pod.
      this.state.selectedImages,
      this.state.route.getUUID()
    );
    this.loadImages();
  };

  /**
   * Devuelve la URL base
   */
  getBaseUrl() {
    let url = window.location;
    let base = url.protocol + "//" + url.host;
    return base;
  }

  /**
   * Carga las imágenes asociadas a la ruta de UUID indicado, desde el pod
   * del usuario indicado en las props. Si el usuario es null, se interpreta
   * que el webId es el del usuario loggeado.
   */
  loadImages = async () => {
    console.log("Trayendo imagenes del pod");
    this.setState({ loading: true });
    let uuid = this.state.route.getUUID();
    let webID = this.props.author == null ? null : this.props.author.getWebId();
    let urls = await this.rutaService.obtenerFicherosRuta(uuid, webID);
    let imageObjects = urls.map(url => {
      // parseamos la lista de urls para obtener objetos imagen
      return {
        src: url,
        thumbnail: url,
        thumbnailWidth: 290,
        thumbnailHeight: 174
      };
    });
    this.setState({
      imageList: imageObjects,
      loading: false,
      empty: imageObjects.length === 0
    });
  };

  /**
   * Se invoca cuando se hace click sobre el link para
   * desplegar la galería.
   */
  handleOnClick = () => {
    if (!this.state.loaded) {
      this.loadImages();
      this.setState({ loaded: true });
    }
  };
}

export default PhotoGallery;
