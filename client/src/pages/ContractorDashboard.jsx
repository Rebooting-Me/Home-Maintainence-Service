import React, { Component } from 'react';
import Dashboard from '../components/dashboard/contractor/Dashboard/Dashboard';
import Navbar from '../components/signin/Navbar/Navbar';

// Made some styling changes to keep the Navbar fixed.
export class ContractorDashboard extends Component {
    render() {
      return (
        <div>
          <Dashboard />
          <div style={{position:"fixed", top: "0", minWidth: "100%"}}><Navbar /></div>
        </div>
      );
    }
  }
  
  export default ContractorDashboard;