import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Adventures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventures: [],
      filterAdventures: [],
      duration: "",
      category: "",
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let getAdventures = async () => {
      let response = await fetch(
        `https://mtrip-dynamic.herokuapp.com/adventures?city=${id}`
      );
      let data = await response.json();
      this.setState({
        adventures: data,
        filterAdventures: data,
      });
    };
    getAdventures();
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.duration !== this.state.duration) {
      let data = this.state.duration.split("-");
      let [low, high] = data;
      let response = this.state.adventures.filter(
        (adventure) => adventure.duration > low && adventure.duration <= high
      );

      this.setState({
        ...response,
        filterAdventures: response,
      });
    } else if (prevstate.category !== this.state.category) {
      let datacat = this.state.adventures.filter(
        (adventure) => adventure.category === this.state.category
      );

      this.setState({
        ...datacat,
        filterAdventures: datacat,
      });
    }
  }

  async getAdventures() {
    let id = this.props.match.params.id;
    let response = await fetch(
      `https://mtrip-dynamic.herokuapp.com/adventures?city=${id}`
    );
    let data = await response.json();
    this.setState({
      adventures: data,
      filterAdventures: data,
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Explore all adventures</h3>
        <p className="fs-3">
          Here's a list of places that you can explore in city
        </p>
        <div className="d-flex align-items-center">
          <p className="fs-4">Filters:</p>
          <div className="ms-4 d-flex">
            <select
              className="form-select me-2"
              aria-label="Default select example"
              value={this.state.duration}
              onChange={(e) => this.setState({ duration: e.target.value })}
            >
              <option defaultValue>Filter by duration</option>
              <option value="0-2">0-2 hours</option>
              <option value="2-6">2-6 hours</option>
              <option value="6-12">6-12 hours</option>
              <option value="12+">12+ hours</option>
            </select>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={this.getAdventures}
            >
              Clear
            </span>
          </div>
          <div className="ms-4 d-flex ">
            <select
              className="form-select me-2"
              aria-label="Default select example"
              value={this.state.category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option defaultValue>Add Category</option>
              <option value="Cycling">Cycling Routes</option>
              <option value="Hillside">Hillside Gateways</option>
              <option value="Beaches">Serene Beaches</option>
              <option value="Party">Party Spots</option>
            </select>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={this.getAdventures}
            >
              Clear
            </span>
          </div>
        </div>
        <div className="row">
          {this.state.filterAdventures.map((adventure) => (
            <div
              className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
              key={adventure.id}
            >
              <div className="card mt-2 mb-2" style={{ height: "400px" }}>
                <Link to={`/adventure-detail/${adventure.id}`}>
                  <img
                    src={adventure.image}
                    alt=""
                    className="card-img-fluid"
                    style={{ height: "300px", width: "100%" }}
                  />
                </Link>
                <span className="badge bg-warning text-dark">
                  {adventure.category}
                </span>
                <div className="card-body d-flex justify-content-between">
                  <div className="left">
                    <p>
                      <strong>{adventure.name}</strong>
                    </p>
                    <p>
                      <strong>Duration</strong>
                    </p>
                  </div>
                  <div className="right">
                    <p>₹{adventure.costPerHead}</p>
                    <p>{adventure.duration}Hours</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Adventures);
