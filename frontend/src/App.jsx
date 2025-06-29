import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterForm from './components/RegisterForm'; 
import { SearchProvider } from './contexts/SearchContext';
import { SelectedProvider } from './contexts/SelectedContext'; 

export default function App() {
  return (
    <SearchProvider>
      <SelectedProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} /> 
          </Routes>
        </Router>
      </SelectedProvider>
    </SearchProvider>
  );
}
