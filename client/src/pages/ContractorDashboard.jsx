import React, { Component } from 'react';
import Dashboard from '../components/dashboard/contractor/Dashboard/Dashboard';
import Navbar from '../components/signin/Navbar/Navbar';

export class ContractorDashboard extends Component {
    render() {
      return (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      );
    }
  }
  
  export default ContractorDashboard;