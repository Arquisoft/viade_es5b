import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class MessageDialog extends Component {
  render () {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={this.props.handleAceptar}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MessageDialog
