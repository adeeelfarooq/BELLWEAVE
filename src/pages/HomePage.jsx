import React, { useRef } from 'react'
import { ScrollSmoother, ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 🚀 FIX: Yahan './' ki jagah '../' aayega
import Navbar from '../sections/Navbar';
import Hero from '../sections/HeroSection';
import BuiltForSection from '../sections/BuiltForSection';
import WhatItDoesSection from '../sections/WhatItDoesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import BookDemoSection from '../sections/BookDemoSection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const App = () => {
  // 🚀 OPTIMIZATION 1: Ref banaya taake GSAP ko sirf isi component tak mehdood rakha ja sake
  const appRef = useRef(null);

  useGSAP(() => {
    // 🚀 MOBILE OPTIMIZATION: Mobile browser address bar resize par
    // ScrollTrigger ko repeatedly refresh hone se rokta hai
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // 🚀 CRITICAL FIX: Smoother ko variable mein store kiya
    // taa-ke component unmount hone par properly destroy ho
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,

      // 🚀 MOBILE OPTIMIZATION:
      // Mobile par native touch scrolling rahegi, isliye stuck nahi hogi
      

      // Desktop par normalized scrolling, mobile par native scrolling
      normalizeScroll: ScrollTrigger.isTouch ? false : true,
    });

    // Images aur heavy sections render hone ke baad positions refresh hongi
    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // 🚀 OPTIMIZED RESIZE HANDLER:
    // Mobile address bar ke height-change par unnecessary refresh nahi hoga
    let resizeTimeout;
    let previousWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Touch devices par sirf actual width/orientation change par refresh karo
      if (ScrollTrigger.isTouch && currentWidth === previousWidth) {
        return;
      }

      previousWidth = currentWidth;
      window.clearTimeout(resizeTimeout);

      resizeTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);

      if (smoother) {
        smoother.kill();
      }
    };
  }, { scope: appRef });

  return (
    <main ref={appRef}>
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <BuiltForSection />
          <WhatItDoesSection />
          <HowItWorksSection />
          <BookDemoSection />
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default App