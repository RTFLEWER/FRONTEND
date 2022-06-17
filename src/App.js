import React, {useState} from 'react';

import stepsLogo from "./assets/steps.svg";
import "./App.css";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

function shoot() {
    alert("Sold Out");
}

function currencyFormat(num) {
   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], items:[] };
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
          <h1 className="App-title">Assignment: Tan Chiang Song Victor</h1>
        </header>

        <h1>Shopping Cart</h1>
        <Container>
        <Row xs={1} md={3} className="g-4">
            {
              this.state.items.map((item) => {
              return(
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
            <Button onClick={event =>  window.location.href='/index.html'} size="lg" variant="dark">Logout</Button>{' '}
        </div>
      
        <br/> <br/> <br/>
        <h1>EXTRA</h1>
        <br/> <br/> <br/>

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
    </div>
    );
  }
}

function Home() {
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const fetchValidation = async () => {
    const reqBody = {custId: user, pwd: pw};
    const data = await fetch(`https://nusstore.glitch.me/login`, {method: 'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(reqBody)});
    const isValid = await data.json();
    setIsValid(isValid);
    console.log(isValid);
    if (isValid == false)
      document.getElementById("lblStatus").innerText   = 'Sorry. We Cannot locate User.';
  };

  function validate(e){
    e.preventDefault();
    fetchValidation();
  }

  function setUsername(){
    setUser(document.getElementById("username").value);
  }

  function setPassword(){
    setPw(document.getElementById("password").value);
  }

  if (isValid){
    //alert("Success");
    return (
        <Cart />
    )
  }else{ 
    return (
      <div>
          <header className="App-header">
            <img src={stepsLogo} className="App-logo" alt="logo" />
            <h1 className="App-title">Assignment: Tan Chiang Song Victor</h1>
          </header>
        
          <div className="wrapper">
          <p className ="name" >NUS App</p>
          <form class="p-3 mt-3" onSubmit = {validate}>
            <input class="form-field d-flex align-items-center" type = "text" id = "username" placeholder="username" onChange = {setUsername}/>
            <input class="form-field d-flex align-items-center"  type = "password" id = "password" placeholder="password" onChange = {setPassword}/>
            <input class="btn mt-3" type = "submit" value="Log In"/>
          </form>
          <label id="lblStatus"> </label>
        </div>
    </div>
    )
  }
}

export default Home;