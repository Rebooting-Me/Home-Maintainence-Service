import React, { Component } from 'react';
import Navbar from '../components/landing/Navbar/Navbar';
import Hero from '../components/landing/Hero/Hero';
import Features from '../components/landing/Features/Features';
import Footer from '../components/footer/Footer';
import HomeownerComment from '../components/landing/HomeownerComment/HomeownerComment';
import ContractorComment from '../components/landing/ContractorComment/ContractorComment';
import About from '../components/landing/About/About';

export class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Features />
        <HomeownerComment />
        <ContractorComment />
        <About />
        <Footer />
      </div>
    );
  }
}

export default Landing;
