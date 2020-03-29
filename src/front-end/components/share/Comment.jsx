import React, { Component } from "react";
import { Card } from "react-bootstrap";

/**
 * Modela una caja de comentario, que puede ser un texto,
 * una imagen o un video.
 */
class Comment extends Component {
  constructor(props) {
    super(props);
    this.comment = props.comment;
    this.author = props.author;
    this.date = new Date();
  }

  render() {
    return (
      <Card className="mb-4">
        <Card.Header>{`${this.author} ${this.getFormattedDate()}`}</Card.Header>
        <Card.Body>
          <Card.Text>{this.comment}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  getFormattedDate() {
    let commentDate =
      "Publicado: " +
      this.date.getDate() +
      "/" +
      (this.date.getMonth() + 1) +
      "/" +
      this.date.getFullYear() +
      " " +
      this.date.getHours() +
      ":" +
      ((this.date.getMinutes() < 10 ? "0" : "") + this.date.getMinutes()) +
      ":" +
      this.date.getSeconds();
    return commentDate;
  }
}

export default Comment;
