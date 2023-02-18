import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Features from './Features/Features';
import Footer from '../Footer/Footer';

export class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    );
  }
}

export default Landing;
