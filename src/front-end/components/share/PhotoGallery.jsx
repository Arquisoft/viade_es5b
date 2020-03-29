import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import Gallery from "react-grid-gallery";

class PhotoGallery extends Component {
  state = {
    images: [
      {
        src: process.env.PUBLIC_URL + "/img/ruta-avs.jpg",
        thumbnail: process.env.PUBLIC_URL + "/img/ruta-avs.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174
      },
      {
        src: process.env.PUBLIC_URL + "/img/ruta-avs-2.jpg",
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
    ]
  };
  render() {
    return (
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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default PhotoGallery;
