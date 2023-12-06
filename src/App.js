
import React, { Component } from 'react';
import Layout from "./Layout";
import { useState } from 'react';
import {ethers} from 'ethers'
import BuyImage from "./BuyImage";
import NewImage from "./NewImage";
import ListImage from "./ListImage";
import ResellImage from "./ResellImage";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Button, Container, Card, Row, Col } from 'react-bootstrap'

import web3 from "./web3";
import ClickStore from "./ClickStore";


class App extends Component {
  constructor() {
       super();
        this.state = {
        manager: "",
        value: "",
        keyword: "",
        message: "",
      };
  }

  async componentDidMount() {
    console.log("hello");
    const manager = await ClickStore.methods.manager().call();

  //  await window.ethereum.request({ method: 'eth_requestAccounts' })
  //  const provider = new ethers.providers.Web3Provider(window.ethereum)
  //  const signer = provider.getSigner()
  //  const store = new ethers.Contract(address, ClickStore.abi, signer)
  //  const manager = await store.manager()
    console.log(manager)
  }

  render() {
    return (
      <Layout>
        <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListImage/>}/>
            <Route path="/BuyImage" element={<BuyImage/>} />
            <Route path="/ResellImage" element={<ResellImage/>} />
            
          </Routes>
        </BrowserRouter>
        </div>
      </Layout>
    );
  }
}

export default App;
