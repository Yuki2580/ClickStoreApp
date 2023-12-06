import React, { Component } from "react";
import ImageForBuy from "./ImageForBuy";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class BuyImage extends Component {
  state = {
    loading: false,
    price: "",
    id: "",
    errorMessage: "",
    boughtItem: [],
    images: [],
    bought: "Bought",
    id_array: [],
    price_array: [],

  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const images = await ClickStore.methods.getImages().call();
    const manager = await ClickStore.methods.manager().call();
    this.setState({ images: images });
  }

  showImage() {
    return this.state.images.map((image) => {

      return (
        <ImageForBuy
          id={image.tokenId}
          price={image.price}
          uri={image.uri}
          seller={image.seller}
          boughtStatus={image.statusForBought}
        />
      );
    });
  }

  render() {
    return (
      <Container>
      <Row>
        {this.showImage()}
      </Row>
      </Container>
    );
  }
};

export default BuyImage;
