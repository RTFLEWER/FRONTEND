import React, { useState } from 'react';

import stepsLogo from "./assets/steps.svg";

import "./App.css";
import "./components/NavbarComp.css"

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp.js';


function shoot() {
  alert("Sold Out");
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], items: [] };
  }

  callAPIServer() {
    // when component mounted, start a GET request
    // to specified URL
    fetch("https://nusstore.glitch.me/cust")
      // when we get a response map the body to json
      .then((response) => response.json())
      // and update the state data to said json
      .then((data) => this.setState({ data }));

    fetch("https://nusstore.glitch.me/items")
      .then((response) => response.json())
      .then((items) => this.setState({ items }));
  }

  componentDidMount() {
    this.callAPIServer();
  }


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={stepsLogo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to my App</h1>
          </header>

          <div>
            <NavbarComp />
          </div>

          <h1>Shopping Cart</h1>
          <Container>
            <Row xs={1} md={3} className="g-4" id="section1">
              {
                this.state.items.map((item) => {
                  return (
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>{item.itemId}</Card.Title>
                          <Card.Text></Card.Text>
                          <Card.Text><b><h2>{item.name}</h2></b></Card.Text>
                          <Card.Text><h3>{currencyFormat(item.price)}</h3></Card.Text>
                          <Card.Text>PIC  : {item.pic}</Card.Text>
                          <Button onClick={shoot} size="lg" variant="dark">Buy Now</Button>{' '}

                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              }
            </Row>
          </Container>

          <div>
            <Button onClick={event => window.location.href = '/index.html'} size="lg" variant="dark">Logout</Button>{' '}
          </div>

          <br /> <br /> <br />
          <h1>EXTRA</h1>
          <br /> <br /> <br />

          <table className="myTable" id="section2">
            <thead>
              <tr><th>CustID</th><th>Password</th><th>Name</th><th>Gender</th></tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td> {item.custId} </td>
                    <td> {item.pwd} </td>
                    <td> {item.name} </td>
                    <td> {item.gender} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          
          <div className='section3' id='section3'>
            Section 3
          </div>

          <table className="myTable">
            <thead>
              <tr><th>ItemID</th><th>Name</th><th>Price</th><th>Picture</th></tr>
            </thead>
            <tbody>
              {this.state.items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td> {item.itemId} </td>
                    <td> {item.name} </td>
                    <td> {item.price} </td>
                    <td> {item.pic} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
  }
}



export default Cart;