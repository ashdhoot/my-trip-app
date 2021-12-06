import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    let getUsers = async () => {
      let response = await fetch(
        "https://mtrip-dynamic.herokuapp.com/reservations/"
      );
      let data = await response.json();
      this.setState({
        users: data,
      });
    };
    getUsers();
  }

  render() {
    let { users } = this.state;
    return (
      <div className="container">
        <h2>Reservations</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Booking Name</th>
              <th>Adventure</th>
              <th>Person(s)</th>
              <th>Date</th>
              <th>Price</th>
              <th>Booking Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.adventureName}</td>
                <td>{user.person}</td>
                <td>{user.date}</td>
                <td>{user.price}</td>
                <td>{user.time}</td>
                <td>
                  <Link to={`/adventure-detail/${user.adventure}`}>
                    <button className="btn btn-warning">Visit Adventure</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Reservation;
