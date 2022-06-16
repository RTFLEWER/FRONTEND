/* Demo for FinTech@SG Course 
Retrieving JSON data from Server in a Tabular form
Author: Prof Bhojan Anand */
import React from 'react';
import stepsLogo from './assets/steps.svg';
import './App.css';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = { data: [], items:[] };
  }

 callAPIServer() {
  // when component mounted, start a GET request
  // to specified URL
  fetch("https://nusstore.glitch.me/cust")
    // when we get a response map the body to json
    .then(response => response.json())
    // and update the state data to said json
    .then(data => this.setState({ data }));
     fetch("https://nusstore.glitch.me/items")
      .then((response) => response.json())
      .then((items) => this.setState({ items }));

      fetch("https://nusstore.glitch.me/items")
      .then((response) => response.json())
      .then((items) => this.setState({ items }));
 }

  componentDidMount() {   // react lifecycle method componentDidMount() 
                        //will execute the callAPIserver() method after the component mounts.
      this.callAPIServer();
      //console.log(this.serverResObjArr);

  }
  /* Replace the table with paragraph below if you need paragraph
    <p className="App-intro">{JSON.stringify(this.state.data)}</p>
  */

  render() {
    return (
    <div className="App">
        <header className="App-header">
          <img src={stepsLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Assignment: Tan Chiang Song Victor</h1>
        </header>

        <table className="myTable">
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

        <h2>Shopping Cart</h2>
        <Container>
        <Row xs={1} md={2} className="g-4">
            {
              this.state.items.map((item) => {
              return(
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                    <h1 className="App-title">{item.itemId}</h1>
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                  
                                    <Card.Text><b><h2>{item.name}</h2></b></Card.Text>
                                    <Card.Text><h3>${item.price}</h3></Card.Text>
                                    <Card.Text>PIC  : {item.pic}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                   );
                })
            }
         </Row>
       </Container>
    </div>
    );
  }
}


export default App;
