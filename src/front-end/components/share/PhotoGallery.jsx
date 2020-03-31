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
    selectedImages: []
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
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Galería
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Gallery images={this.state.images} />
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
    this.setState({ selectedImages: event.target.files });
  };

  /**
   * Se encarga de subir las imagenes al servidor.
   */
  handleUpload = async () => {
    console.log("Ruta id: " + this.state.route.getUUID());
    console.log(this.state.selectedImages);
    await this.rutaService.subirFicheroAMiRuta(
      this.state.selectedImages,
      this.state.route.getUUID()
    );
    /*
    let reader = new FileReader();
    reader.readAsDataURL(this.state.selectedImages[0]);
    reader.onloadend = e => {
      console.log([reader.result]);
      this.setState({
        images: [
          {
            src: reader.result,
            thumbnail: reader.result,
            thumbnailWidth: 320,
            thumbnailHeight: 174
          }
        ]
      });
    };
    */
  };

  /**
   * Devuelve la URL base
   */
  getBaseUrl() {
    let url = window.location;
    let base = url.protocol + "//" + url.host;
    return base;
  }
}

export default PhotoGallery;
