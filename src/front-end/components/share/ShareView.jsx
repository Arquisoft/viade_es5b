import React, { Component } from "react";
import HashViewLoader from "../util/Loaders/HashViewLoader";
import SharedWithMe from "./SharedWithMe";

class ShareView extends Component {
  state = { loading: true };
  render() {
    return (
      <HashViewLoader
        text="Recuperando rutas de tus colegas..."
        children={<SharedWithMe handleLoaded={this.handleLoaded} />}
        loading={this.state.loading}
      />
    );
  }

  handleLoaded = () => {
    this.setState({ loading: false });
  };
}

export default ShareView;
