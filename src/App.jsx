// src/App.jsx
import React, { useLayoutEffect } from 'react'; // 🚀 FIX: useEffect ki jagah useLayoutEffect
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Pages import karein
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // 🚀 FIX: useLayoutEffect screen paint hone se *pehle* scroll to top kar dega
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 🚀 FIX: Is se directly top pe jayega bina neeche dikhaye ya smooth slide kiye
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    </Router>
  );
}

export default App;