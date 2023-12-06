import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Grid,Button, Form, Message, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";
import ResellImage from "./ResellImage";

class ImageForBuy extends Component {

  state = {
    loading: false,
    errorMessage: "",
    user: "",
    owner: "",
    price_set: ""
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const user=accounts[0];
    const owner = await ClickStore.methods.ownerOf(this.props.id).call();
    this.setState({user, owner});
    // console.log('hey',this.state.user, this.state.owner);
  }

  buyImage = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    try {
      await ClickStore.methods.buyImage(this.props.id).send({
        from: accounts[0],
        value: this.props.price,
        //web3.utils.toWei(this.state.price, "ether"),
        gas: "30000000",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
    this.setState({ loading: false });
  }

  render() {
    const { id, price, uri, seller, boughtStatus} = this.props;
    return (
      <Col>
        <Card style={{ width: '12rem' }}>
          <Card.Img variant="top" style={{width: '12rem', height: '12rem'}} src={uri} />
          <Card.Body>

            <Card.Text>{web3.utils.fromWei(price, "ether")} Ether</Card.Text>
              {boughtStatus ?
                (this.state.user==this.state.owner ?
                  (
                <Link to="/ResellImage" className="btn btn-primary">Resell</Link>
              )
                :<h4>SOLD</h4> )
                :  (
                    <Button loading={this.state.loading} onClick={this.buyImage}>Buy</Button>
                    )
              }
          </Card.Body>
          {this.state.errorMessage=="" ? null : (
          <Message error header="Oops!" content={this.state.errorMessage} />
        )}
        </Card>
      </Col>
    );
  }
};

export default ImageForBuy;
