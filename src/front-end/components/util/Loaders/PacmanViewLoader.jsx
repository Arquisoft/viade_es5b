import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import PacmanLoader from "react-spinners/PacmanLoader";

class PacmanViewLoader extends Component {
  state = {};
  render() {
    return (
      <LoadingOverlay
        active={this.props.loading}
        spinner={
          <PacmanLoader
            size={25}
            color={"#50E3C2"}
            css={{ display: "block", margin: "0 20vh 5vh" }}
          />
        }
        text={this.props.text}
        styles={{
          wrapper: {
            width: "100%",
            height: "100vh"
          }
        }}
      >
        {this.props.children}
      </LoadingOverlay>
    );
  }
}

export default PacmanViewLoader;
