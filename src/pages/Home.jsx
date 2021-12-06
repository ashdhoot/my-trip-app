import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      cities: [],
      filterCities: [],
    };
  }

  componentDidMount() {
    let getCities = async () => {
      let url = "https://mtrip-dynamic.herokuapp.com/cities";
      let response = await fetch(url);
      console.log(response);
      let data = await response.json();
      console.log(data);
      this.setState({
        cities: data,
        filterCities: data,
      });
    };
    getCities();
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.search !== this.state.search) {
      let data = this.state.cities.filter((city) =>
        city.city.toLowerCase().match(this.state.search.toLowerCase())
      );
      console.log(data);
      this.setState({
        ...data,
        filterCities: data,
      });
    }
  }

  render() {
    return (
      <div className="home">
        <div className="top__side">
          <h1> Welcome To My-Trip</h1>
          <h5>Explore the world around fantastic places to venture around</h5>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search a City"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>

        <div className="bottom__side">
          <div className="container mt-5">
            <div className="row">
              {this.state.filterCities.map((city) => (
                <div
                  className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                  key={city.image}
                >
                  <Link to={`/adventures/${city.id}`}>
                    <div className="card city__card mt-2 mb-2">
                      <img src={city.image} alt="" className="card-img-fluid" />

                      <div className="city__bottom">
                        <strong>{city.city}</strong>
                        <strong>{city.description}</strong>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
