import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import Report from './pages/Report';
import Rewards from './pages/Rewards';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/questionnaire" element={
              <PrivateRoute>
                <Questionnaire />
              </PrivateRoute>
            } />
            <Route path="/report" element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            } />
            <Route path="/rewards" element={
              <PrivateRoute>
                <Rewards />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;