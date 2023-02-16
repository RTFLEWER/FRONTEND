import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import cartLogo from "../assets/cart.svg";

import "./NavbarComp.css"

class NavbarComp extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={cartLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Shopaholic
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavHashLink to='./app.js/#section1' smooth>Section 1</NavHashLink>
                <NavHashLink to='./app.js/#section2' smooth>Section 2</NavHashLink>
                <NavHashLink to='./app.js/#section3' smooth>Section 3</NavHashLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </BrowserRouter>
    );
  }
}

export default NavbarComp;