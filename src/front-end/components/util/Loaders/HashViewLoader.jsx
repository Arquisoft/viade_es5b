import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import HashLoader from "react-spinners/HashLoader";

class HashViewLoader extends Component {
  state = {};
  render() {
    return (
      <LoadingOverlay
        active={this.props.loading}
        spinner={
          <HashLoader
            size={35}
            color={"#50E3C2"}
            css={{ display: "block", margin: "0 43% 2vh" }}
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

export default HashViewLoader;
