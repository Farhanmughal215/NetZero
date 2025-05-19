import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import OffVsOnChain from './pages/OffVsOnChain';
import Supply from './pages/Supply';
import RetirementTrends from './pages/RetirementTrends';
import TokenDetails from './pages/TokenDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/off-vs-on-chain" element={<OffVsOnChain />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/retirement-trends" element={<RetirementTrends />} />
          <Route path="/token-details" element={<TokenDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;