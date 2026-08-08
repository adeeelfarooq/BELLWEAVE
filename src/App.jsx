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
    let refreshTimer;

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

    // 🚀 BARA FIX (Sections Merging & Stuck Issue) - Same as your App.js
    // Har naye page/route par jane ke 1 second baad lazmi global refresh taake new DOM ki heights accurate calculate ho jayen
    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // 🚀 Mobile Resize / Keyboard open hone par layout jhatkay ko fix karne k liye
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // 🚀 CRITICAL FIX: Memory Leak Prevention
    // Agar user jaldi jaldi pages change kare, toh pichle timers aur events clean ho jayenge
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResize);
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