import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import PileCalculator from './components/PileCalculator'; // ✅ import calculator

function App() {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* ✅ Add this route for the calculator */}
          <Route path="/pile-calculator" element={<PileCalculator />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
