import React, { Component } from 'react';
import Dashboard from '../components/dashboard/homeowner/Dashboard/Dashboard';
import Navbar from '../components/signin/Navbar/Navbar';

export class HomeownerDashboard extends Component {
    render() {
      return (
        <div>
          <Dashboard />
          <div style={{position:"fixed", top: "0", minWidth: "100%"}}><Navbar /></div>
        </div>
      );
    }
  }
  
  export default HomeownerDashboard;