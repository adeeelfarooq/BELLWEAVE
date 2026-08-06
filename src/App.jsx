// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages import karein
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Jab URL '/' hoga toh HomePage khulega */}
        <Route path="/" element={<HomePage />} />
        
        {/* Jab URL '/features' hoga toh FeaturesPage khulega */}
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    </Router>
  );
}

export default App;