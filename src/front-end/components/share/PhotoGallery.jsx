import React, { Component } from "react";
import {
  Container,
  Row,
  Alert,
  Spinner,
  Form,
  Card,
  Button,
  Col
} from "react-bootstrap";
import Gallery from "react-grid-gallery";
import bsCustomFileInput from "bs-custom-file-input";
import $ from "jquery";
import "../../css/photo-gallery.css";

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.tWidth = 85;
    this.tHeight = 85;
  }

  state = {
    route: this.props.ruta,
    imageList: [],
    selectedImages: [],
    ableToUpload: false,
    loading: true,
    loaded: false,
    empty: false,
    onlyRead: this.props.onlyRead
  };

  componentDidMount() {
    // Input file dinamico.
    $(document).ready(function() {
      bsCustomFileInput.init();
    });
    this.loadImages();
  }

  render() {
    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title>Galería</Card.Title>
          </Card.Header>
          <Card.Body>
            <Gallery images={this.state.imageList} />
            {this.state.loading && (
              <>
                <Spinner
                  className="mr-2"
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
          </Card.Body>
          <Card.Footer>
            {!this.state.onlyRead && (
              <Container fluid>
                <Row>
                  <Col>
                    <Form className="input-img">
                      <Form.File
                        label="Selecciona una imagen"
                        multiple
                        accept="image/*"
                        custom
                        onChange={this.onChangeHandler}
                        data-browse="Examinar"
                      />
                    </Form>
                  </Col>
                  <Col>
                    <Button
                      className="mt-2"
                      variant="success"
                      onClick={this.handleUpload}
                      disabled={!this.state.ableToUpload}
                    >
                      Subir
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Card.Footer>
        </Card>
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
    let webID = this.props.author == null ? null : this.props.author.getWebId();
    if (
      await this.props.subirFicheroARuta(
        // añadimos los ficheros a la ruta del pod.
        this.state.selectedImages,
        this.state.route.getUUID(),
        webID
      )
    ) {
      this.loadImages();
    }
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
    let urls = await this.props.obtenerFicherosRuta(uuid, webID);
    let imageObjects = urls.map(url => {
      // parseamos la lista de urls para obtener objetos imagen
      return {
        src: url,
        thumbnail: url,
        thumbnailWidth: this.tWidth,
        thumbnailHeight: this.tHeight
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
