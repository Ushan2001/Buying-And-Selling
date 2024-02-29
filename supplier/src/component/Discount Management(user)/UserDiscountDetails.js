import React, { Component } from 'react';
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar';

export default class UserDiscountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discount: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/discount/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            discount: res.data.discount
          });
        }
      });
  }

  render() {
    const { name, category, pdiscount, date, time, note, _id } = this.state.discount;

    return (
      <div>
        <UserNavBar />
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <hr />

              <dl className="row">
                <div className="col-sm-6">
                  <dt>Discount Tempory ID:</dt>
                  <dd>{_id}</dd>

                  <dt>Category:</dt>
                  <dd>{category}</dd>

                  <dt>Discount:</dt>
                  <dd>{pdiscount}</dd>
                </div>

                <div className="col-sm-6">
                  <dt>Start Date:</dt>
                  <dd>{date}</dd>

                  <dt>Time Duration:</dt>
                  <dd>{time}</dd>

                  <dt>Additional Comment:</dt>
                  <dd>{note}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="ml-3 mt-3">
          <button className="btn btn-dark">
            <a href="/userdiscount" style={{ textDecoration: "none", color: "white" }}>
              <i className="fas fa-arrow-left"></i> Back to Discounts
            </a>
          </button>
        </div>
      </div>
    );
  }
}
