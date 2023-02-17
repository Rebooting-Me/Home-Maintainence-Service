import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Form from './Form/Form';
import Footer from './Footer/Footer';

export class Signup extends Component {
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

export default Signup;
