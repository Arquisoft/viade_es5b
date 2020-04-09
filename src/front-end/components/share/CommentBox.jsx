import React, { Component } from "react";
import {
  Accordion,
  Card,
  InputGroup,
  Form,
  Button,
  Spinner,
  Alert
} from "react-bootstrap";
import Comentario from "../../model/Comentario";
import "../../css/scroll.css";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import emoji from 'react-easy-emoji';
import { toArray } from "react-emoji-render";
import { Emojione } from 'react-emoji-render';
const Render = require("react-emoji-render");
const Emoji = Render.Emojione;
/**
 * Clase que representa un componente de una caja de comentarios.
 * Recibe sus funcionalidades del padre.
 */
class CommentBox extends Component {
  state = {
    comment: "",
    commentList: [],
    onlyRead: this.props.onlyRead,
    loading: true,
    empty: false,
    showEmojis: false,
    loaded: false
  };

  render() {
    return (
      <Accordion data-testid="Acordeon">
        <Card data-testid="cardEnv">
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              data-testid="btComment"
              onClick={this.handleClick}
            >
              Comentarios
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {!this.state.onlyRead && (
                <div>
                  <InputGroup data-testid="cajaComent">
                    <Form.Control
                      placeholder="Haz un comentario..."
                      as="textarea"
                      rows="2"
                      value={this.state.comment}
                      onChange={this.handleOnChange}
                    />
                    {this.state.showEmojis ? (
                      <span style={styles.emojiPicker} ref={el => (this.emojiPicker = el)}>
                        <Picker
                          onSelect={this.addEmoji}
                          mojiTooltip={true}
                          title="Viade_es5b"
                        />
                      </span>
                    ) : (
                        <p style={styles.getEmojiButton} onClick={this.showEmojis}>
                          {String.fromCodePoint(0x1f60a)}
                        </p>
                      )}

                  </InputGroup>
                  <Button
                    data-testid="btPublicar"
                    className="mt-2 mb-2"
                    variant="success"
                    onClick={this.handleAddComment}
                  >
                    Publicar
                  </Button>
                </div>
              )}
              {this.state.loading && (
                <Spinner
                  className="mt-2"
                  as="span"
                  animation="border"
                  role="status"
                />
              )}
              {this.state.empty && (
                <Alert variant="warning">Aún no hay comentarios</Alert>
              )}
              {this.state.commentList.length > 0 && (
                <div className="scroll-container" data-testid="listaComentarios">
                  {this.state.commentList.map((c, key) => {
                    return (
                      <Card className="mb-4 mr-2" key={key++}>
                        <Card.Header>{`${c
                          .getAutor()
                          .getNombre()} ${c.getFormattedDate()}`}</Card.Header>
                        <Card.Body>
                          <Card.Text>{
                            c.getTexto()
                          }</Card.Text>

                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion >
    );
  }

  /**
   * Manejador para recolectar el texto del comentario
   * que introduce el usuario en el input.
   */
  handleOnChange = e => {
    this.setState({ comment: e.target.value });
  };
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      comment: this.state.comment + emoji
    });
  };



  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };
  handleAddComment = async () => {
    this.setState({ loading: true, empty: false });
    //Recolección de datos del comentario
    let commentText = this.state.comment;
    let date = new Date();
    let routeUUID = this.props.ruta.getUUID();
    this.setState({ comment: "" });
    // Creamos el objeto Comment
    let comment = new Comentario(date, commentText);
    let webID = this.props.author == null ? null : this.props.author.getWebId();
    if (await this.props.comentarRuta(comment, routeUUID, webID)) {
      // Lo guardamos en el pod del autor
      this.loadComments(); // Recuperamos los comentarios
    }
  };

  /**
   * Carga los comentarios desde el pod del usuario indicado,
   * asociados a esta ruta.
   */
  loadComments = async () => {
    this.setState({ loading: true });
    let uuid = this.props.ruta.getUUID();
    let webID = this.props.author == null ? null : this.props.author.getWebId();
    this.setState({
      commentList: await this.props.obtenerComentariosRuta(uuid, webID),
      loading: false
    });

    this.setState({ empty: this.state.commentList.length === 0 });
  };

  /**
   * Se ejecutará cuando se haga click sobre el link
   * para desplegar la caja de comentarios.
   */
  handleClick = () => {
    if (!this.state.loaded) {
      this.loadComments();
      this.setState({ loaded: true });
    }
  };

}

export default CommentBox;


const parseEmojis = value => {
  const emojisArray = toArray(value);

  // toArray outputs React elements for emojis and strings for other
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === "string") {
      return previous + current;
    }
    return previous + current.props.children;
  }, "");

  return newValue;
};


const styles = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20
  },
  form: {
    display: "flex"
  },
  input: {
    color: "inherit",
    background: "none",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16
  },
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer"
  },
  emojiPicker: {
    position: "relative",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};
