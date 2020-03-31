import React, { Component } from "react";
import { Form, Card, Accordion, Button } from "react-bootstrap";
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
    images: [
      {
        src: "https://pedro223.solid.community/public/_1585583190000_.jpeg",
        thumbnail:
          "https://pedro223.solid.community/public/_1585583190000_.jpeg",
        thumbnailWidth: 320,
        thumbnailHeight: 174
      },
      {
        src: "https://www.youtube.com/watch?v=OzXQ7biJIfs",
        thumbnail: process.env.PUBLIC_URL + "/img/ruta-avs-2.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174
      },
      {
        src: process.env.PUBLIC_URL + "/img/avs.jpg",
        thumbnail: process.env.PUBLIC_URL + "/img/avs.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174
      }
    ],
    imageList: [],
    selectedImages: [],
    ableToUpload: false
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
                onClick={this.loadImages}
              >
                Galería
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Gallery images={this.state.imageList} />
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
    console.log("Ruta id: " + this.state.route.getUUID());
    console.log(this.state.selectedImages);
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
    let uuid = this.state.route.getUUID();
    let webID = this.props.author == null ? null : this.props.author.getWebId();
    let urls = await this.rutaService.obtenerFicherosRuta(uuid, webID);
    let imageObjects = urls.map(url => {
      return {
        src: url,
        thumbnail: url,
        thumbnailWidth: 320,
        thumbnailHeight: 174
      };
    });
    //console.log(await this.rutaService.obtenerFicherosRuta(uuid, webID));
    this.setState({
      imageList: imageObjects
    });
  };
}

export default PhotoGallery;
