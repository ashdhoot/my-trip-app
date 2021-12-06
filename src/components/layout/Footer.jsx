import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div
        className="container-fluid p-2"
        style={{ backgroundColor: "black", color: "white" }}
      >
        &copy;Trip 2021-22
      </div>
    );
  }
}

export default Footer;
