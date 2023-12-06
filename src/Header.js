import React from "react";
import { Menu } from "semantic-ui-react";
import BuyImage from "./BuyImage";
import ResellImage from "./ResellImage";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Button, Container, Card, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Menu position="right">
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Click Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/BuyImage">Buy</Nav.Link>
              <Nav.Link href="/ResellImage">Resell</Nav.Link>
              </Nav>
            </Container>
        </Navbar>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
