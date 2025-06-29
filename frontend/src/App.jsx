import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

import { SearchProvider } from './contexts/SearchContext';
import { SelectionProvider } from './contexts/SelectionContext';

export default function App() {
  return (
    <SearchProvider>
      <SelectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </SelectionProvider>
    </SearchProvider>
  );
}
