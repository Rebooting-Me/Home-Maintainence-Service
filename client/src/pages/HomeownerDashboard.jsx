import React, { Component } from 'react';
import Dashboard from '../components/dashboard/homeowner/Dashboard/Dashboard';
import Navbar from '../components/signin/Navbar/Navbar';

export class HomeownerDashboard extends Component {
    render() {
      return (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      );
    }
  }
  
  export default HomeownerDashboard;