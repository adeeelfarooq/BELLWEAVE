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
    // 🚀 CRITICAL OPTIMIZATION: Browser History Scroll Restoration ko manual kar diya.
    // Ye browser ko route change par khud se ghalat scroll jumps (vibration) karne se rokay ga.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Instantly Top par lock
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    let scrollTimer;

    if (hash) {
      // 🚀 GSAP ko calculations k liye time dena
      scrollTimer = setTimeout(() => {
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

    // 🚀 CRITICAL FIX: Memory Leak Prevention
    // Agar user 500ms se pehle hi koi naya button daba de, toh pichla scroll cancel ho jayega
    // warna page ajeeb tarike se achanak jump marta hai.
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
    };
    
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
