import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Form from './Form/Form';
import Footer from '../footer/Footer';

export class Signin extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Form />
        <Footer />
      </div>
    );
  }
}

export default Signin;
