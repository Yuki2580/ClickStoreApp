import ImageForResell from "./ImageForResell";
import React, { Component } from "react";
import ImageForBuy from "./ImageForBuy";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class ResellImage extends Component {
  state = {
    loading: false,
    price: "",
    id: "",
    price_sell: "",
    errorMessage: "",
    boughtItem: [],
    images: [],
    userBalance: ""
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const userBalance = await ClickStore.methods.balanceOf(accounts[0]).call();
    this.setState({userBalance});
    const images = await ClickStore.methods.getImages().call();
    const manager = await ClickStore.methods.manager().call();
    this.setState({ images: images });
    // console.log(images);
  }

  ResellImage = async (event) => {
    event.preventDefault();
    this.setState({ loading: true});
    const accounts = await web3.eth.getAccounts();
    try {
      await ClickStore.methods.resellImage(this.state.id, this.state.price_sell).send({
        from: accounts[0],
        value: this.state.price,
        //web3.utils.toWei(this.state.price, "ether"),
        gas: "30000000",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
    this.setState({ loading: false });
  }

  showImage() {
    // console.log(this.state.images);
    if (this.state.userBalance==0){
      return (
        <h3>You don't have items to resell</h3>
      );
    }
    else
    {return this.state.images.map((image) => {
        return (
          <ImageForResell
            id={image.tokenId}
            price={image.price}
            uri={image.uri}
            seller={image.seller}
            boughtStatus={image.statusForBought}
            resellStatus={image.statusForResell}
          />
        );
    });}
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

export default ResellImage;
