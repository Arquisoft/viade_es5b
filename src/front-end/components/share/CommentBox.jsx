import React, { Component } from "react";
import { Accordion, Card, InputGroup, Form, Button } from "react-bootstrap";

class CommentBox extends Component {
  state = {
    comment: "",
    commentList: [],
    onlyRead: this.props.onlyRead
  };
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
                    <Card.Header>Alex Florez 15:36</Card.Header>
                    <Card.Body>
                      <Card.Text>Comentario1</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
              <Card className="mb-4">
                <Card.Header>Alex Florez 15:36</Card.Header>
                <Card.Body>
                  <Card.Text>Comentario1</Card.Text>
                </Card.Body>
              </Card>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  handleOnChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleAddComment = () => {
    let comment = this.state.comment;
    this.setState({ comment: "" });
    alert(comment + " " + this.getFormattedDate());
  };

  getFormattedDate() {
    let date = new Date();
    let commentDate =
      "Publicado: " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      ((date.getMinutes() < 10 ? "0" : "") + date.getMinutes()) +
      ":" +
      date.getSeconds();
    return commentDate;
  }
}

export default CommentBox;
