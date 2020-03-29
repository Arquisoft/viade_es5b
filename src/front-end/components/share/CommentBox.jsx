import React, { Component } from "react";
import { Accordion, Card, InputGroup, Form, Button } from "react-bootstrap";
import RutaService from "../../services/rutas/RutaService";
import Comentario from "../../model/Comentario";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
  }

  state = {
    comment: "",
    commentList: [],
    onlyRead: this.props.onlyRead
  };

  async componentDidMount() {
    this.setState({
      commentList: await this.rutaService.obtenerComentariosRuta(
        this.props.ruta.getUUID()
      )
    });
  }

  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Comentarios
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {!this.state.onlyRead && (
                <div>
                  <InputGroup>
                    <Form.Control
                      placeholder="Haz un comentario..."
                      as="textarea"
                      rows="2"
                      value={this.state.comment}
                      onChange={this.handleOnChange}
                    />
                  </InputGroup>
                  <Button
                    className="mt-2 mb-2"
                    variant="success"
                    onClick={this.handleAddComment}
                  >
                    Publicar
                  </Button>
                </div>
              )}

              {this.state.commentList.map((c, key) => {
                return (
                  <Card className="mb-4">
                    <Card.Header>{`${c.getAutor()} ${c.getFormattedDate()}`}</Card.Header>
                    <Card.Body>
                      <Card.Text>{c.getTexto()}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  handleOnChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleAddComment = async () => {
    //Recolección de datos del comentario
    let commentText = this.state.comment;
    let date = new Date();
    let routeUUID = this.props.ruta.getUUID();
    this.setState({ comment: "" });
    // Creamos el objeto Comment
    let comment = new Comentario(date, commentText);
    // Lo guardamos en el pod del autor
    this.rutaService.comentarMiRuta(comment, routeUUID);
    // Recuperamos los comentarios
    this.setState({
      commentList: await this.rutaService.obtenerComentariosRuta(routeUUID)
    });
  };
}

export default CommentBox;
