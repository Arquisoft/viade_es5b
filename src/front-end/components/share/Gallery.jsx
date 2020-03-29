import React, { Component } from "react";
import {
  Image,
  Col,
  Card,
  Accordion,
  Button,
  Container,
  Row
} from "react-bootstrap";

class Gallery extends Component {
  state = {};
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
              <Container>
                <Row>
                  <Col xs={4} md={4}>
                    <Image
                      src={process.env.PUBLIC_URL + "/img/ruta-avs.jpg"}
                      rounded
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Gallery;
