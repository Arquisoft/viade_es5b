import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class PhotoUploader extends Component {
  state = {};
  render() {
    return (
      <>
        <Form>
          <Form.File
            label="Selecciona una imagen"
            multiple
            accept="image/*"
            custom
          />
        </Form>
        <Button className="mt-2" variant="success" onClick={this.handleUpload}>
          Subir
        </Button>{" "}
      </>
    );
  }
}

export default PhotoUploader;
