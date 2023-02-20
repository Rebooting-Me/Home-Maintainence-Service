import React, { Component } from 'react';
import Navbar from '../components/signup/Navbar/Navbar';
import Form from '../components/signup/Form/Form';
import Footer from '../components/footer/Footer';

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
