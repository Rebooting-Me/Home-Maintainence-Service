import React, { Component } from 'react';
import Navbar from '../components/landing/Navbar/Navbar';
import Hero from '../components/landing/Hero/Hero';
import Features from '../components/landing/Features/Features';
import Footer from '../components/footer/Footer';
import HomeownerComment from '../components/landing/HomeownerComment/HomeownerComment';

export class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Features />
        <HomeownerComment />
        <Footer />
      </div>
    );
  }
}

export default Landing;
