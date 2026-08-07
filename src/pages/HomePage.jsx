import React, { useRef } from 'react'
import { ScrollSmoother, ScrollTrigger , ScrollToPlugin  } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 🚀 FIX: Yahan './' ki jagah '../' aayega
import Navbar from '../sections/NavbarSection';
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
    
    // 🚀 OPTIMIZATION 2: The "Magic Lag Fix" for Mobile
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 🚀 CRITICAL FIX: Isey ek variable mein store kiya taake isay destroy kiya ja sake
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // Desktop ke liye premium luxury smooth
      effects: true, // Parallax aur lag effects on rakhe hain
      
      // 🚀 OPTIMIZATION 3: Touch / Mobile Optimization
      smoothTouch: 0.1, 

      // 🚀 OPTIMIZATION 4: Mobile par normalizeScroll bohot bugs (stuck scrolling) create karta hai.
      // Is logic se ye Desktop par ON rahega, aur Touch devices (Mobile/Tablet) par OFF rahega.
      normalizeScroll: ScrollTrigger.isTouch ? false : true, 
    });

    // 🚀 CRITICAL OPTIMIZATION 5: Memory Leak & React Router Fix
    // Jab tum /features page pe jaoge to ye component unmount hoga. 
    // Agar smoother ko explicitly kill na kiya, to wapas aane par page ka layout toot jayega (blank screen issue).
    return () => {
      if (smoother) smoother.kill();
    };

  }, { scope: appRef }); 

  return (
    // Ref pass kar diya
    <main ref={appRef}>
      <Navbar/>
      <div id="smooth-wrapper">   
        <div id="smooth-content">
          <Hero/>
          <BuiltForSection/>
          <WhatItDoesSection/>
          <HowItWorksSection/>
          <BookDemoSection/>
          <Footer/>
        </div>
      </div>
    </main>
  )
}

export default App