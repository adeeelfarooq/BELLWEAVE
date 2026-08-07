// src/App.jsx
import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 🚀 Register Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Pages import karein
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // 🚀 BROWSER JUMP FIX: URL mein hash ho ya na ho, sab se pehle browser ko zabardasti 
    // instantly TOP par rok do. Is se browser khud se neeche jump nahi karega.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (hash) {
      // 🚀 Phir GSAP ko apna time do taake wo calculations kar ke smoothly scroll down kare
      setTimeout(() => {
        ScrollTrigger.refresh(); 

        gsap.to(window, {
          duration: 1.2, 
          scrollTo: { 
            y: hash, 
            autoKill: true 
          },
          ease: "power3.inOut"
        });
      }, 500); 
    }
  }, [pathname, hash]);

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