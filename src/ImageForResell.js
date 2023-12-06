import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Button, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class ImageForResell extends Component {
  state = {
    loading: false,
    errorMessage: "",
    price_set: "",
    user: "",
    owner: "",
    artistFee: ""
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const user=accounts[0];
    const userBalance = await ClickStore.methods.balanceOf(accounts[0]).call();
    this.setState({userBalance});
    const owner = await ClickStore.methods.ownerOf(this.props.id).call();
    const artist = await ClickStore.methods.artists(this.props.id).call();
    // console.log(artist);
    const artistFee = artist.artist_fees;
    // console.log(artistFee);
    this.setState({user, owner,artistFee});
    // console.log('hey',this.state.user, this.state.owner);
  }

  resellImage = async (event) => {
    event.preventDefault();
    console.log('in');
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    try {
      await ClickStore.methods.resellImage(this.props.id, web3.utils.toWei(this.state.price_set, "ether")).send({
        from: accounts[0],
        value: this.state.artistFee,
        gas: "30000000",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  }

  render() {
    const { id, price, uri, seller, boughtStatus, resellStatus} = this.props;
    return (
      <div>
      {boughtStatus ?
        (this.state.user==this.state.owner ? (
        <Col>
          <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" style={{width: '12rem', height: '12rem'}} src={uri} />
            <Card.Body>
              <Card.Text>Current Price : {web3.utils.fromWei(price, "ether")} Ether</Card.Text>

            <Form onSubmit={this.resellImage} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Set New Price</label>
                <Input
                  value={this.state.price_set}
                  onChange={(event) => this.setState({ price_set: event.target.value })}
                />
              </Form.Field>
              <Button loading={this.state.loading} primary>Resell</Button>
            </Form>
            </Card.Body>
            {this.state.errorMessage=="" ? null : (
            <Message error header="Oops!" content={this.state.errorMessage} />
          )}
          </Card>
        </Col>
      ) : null
    ) : null
  }
      </div>
    );
  }
};

export default ImageForResell;
