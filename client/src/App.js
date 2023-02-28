import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import HomeownerDashboard from './pages/HomeownerDashboard';
import ContractorDashboard from './pages/ContractorDashboard';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} /> */}

        <Route path="signup" element={
          !user ? <Signup /> : <Navigate to='/dashboard'/>
          } />

        <Route path="signin" element={
          !user ? <Signin /> : <Navigate to='/dashboard'/>
          } />

        <Route path="dashboard" element={
          user ? 
            (user.userType === "Homeowner") ? 
              <HomeownerDashboard /> 
              : <ContractorDashboard /> 
            : <Navigate to="/" />
          } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
