import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import VatPage from './pages/VatPage';
import SalaryPage from './pages/SalaryPage';
import EndOfServicePage from './pages/EndOfServicePage';
import InvoicePage from './pages/InvoicePage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Marketing landing screen */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public authentication screens */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard core layouts */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/vat" element={<VatPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/end-of-service" element={<EndOfServicePage />} />
          <Route path="/invoice" element={<InvoicePage />} />
        </Route>

        {/* Fallback routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
