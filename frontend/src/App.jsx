import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
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
          </Routes>
        </Router>
      </SelectedProvider>
    </SearchProvider>
  );
}
