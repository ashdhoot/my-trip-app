import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class AdventureDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventuredetail: {},
      images: [],
      name: "",
      date: "",
      person: "",
      adventure: "",
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let getdetail = async () => {
      let response = await fetch(
        `https://mtrip-dynamic.herokuapp.com/adventures/detail?adventure=${id}`
      );
      let data = await response.json();
      this.setState({
        adventuredetail: data,
        images: data.images,
      });
      console.log(this.state.images);
    };
    getdetail();
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    let user = {
      name: this.state.name,
      date: this.state.date,
      person: this.state.person,
      adventure: id,
    };
    await axios
      .post("https://mtrip-dynamic.herokuapp.com/reservations/new", user)
      .then(() => {
        window.alert("successfully reservd");
      });
  };

  render() {
    let { adventuredetail, images } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            {adventuredetail.reserved && (
              <div className="alert alert-danger" role="alert">
                Greetings! Reservation for this adventure is successful. (Click
                <Link to="/reservations" className="ms-1 me-1">
                  here
                </Link>
                to view your reservations)
              </div>
            )}
            <div className="card mt-2">
              <h2>{adventuredetail.name}</h2>
              <p className="fs-3 text-muted">{adventuredetail.subtitle}</p>
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={images[0]}
                      className="d-block w-100"
                      alt="..."
                      style={{ height: "400px", width: "100%" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={images[1]}
                      className="d-block w-100"
                      alt="..."
                      style={{ height: "400px", width: "100%" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={images[2]}
                      className="d-block w-100"
                      alt="..."
                      style={{ height: "400px", width: "100%" }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <p className="card-text" style={{ textAlign: "justify" }}>
                {adventuredetail.content}
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 ">
            {adventuredetail.available ? (
              <div className="card mt-4">
                <form onSubmit={this.submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      value={this.state.name}
                      className="form-control"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Pick a Date</label>
                    <input
                      type="date"
                      value={this.state.date}
                      className="form-control"
                      onChange={(e) => this.setState({ date: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Person(s) ₹ 3990 per head</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.person}
                      onChange={(e) =>
                        this.setState({ person: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Total</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.person * adventuredetail.costPerHead}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-success">Submit</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card mt-2">
                <h3>Sold Out!</h3>
                <p>
                  This activity is currently sold out. But there's a lot more to
                  <Link to="/" style={{ color: "yellow" }} className="ms-1">
                    explore
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdventureDetail);
