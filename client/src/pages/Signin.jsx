import React, { Component } from 'react';
import Navbar from '../components/signin/Navbar/Navbar';
import Form from '../components/signin/Form/Form';
import Footer from '../components/footer/Footer';

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
