import React, { useRef } from 'react'
import { ScrollSmoother, ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './sections/NavbarSection'
import Hero from './sections/HeroSection'
import BuiltForSection from './sections/BuiltForSection'
import WhatItDoesSection from './sections/WhatItDoesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BookDemoSection from './sections/BookDemoSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const App = () => {
  // 🚀 OPTIMIZATION 1: Ref banaya taake GSAP ko sirf isi component tak mehdood rakha ja sake (Memory Leak se bachne k liye)
  const appRef = useRef(null);

  useGSAP(() => {
    
    // 🚀 OPTIMIZATION 2: The "Magic Lag Fix" for Mobile
    // Mobile par scroll karte waqt URL bar chota/bara hone par GSAP ko baar baar refresh hone se roke ga. (Makhhan scroll k liye)
    ScrollTrigger.config({ ignoreMobileResize: true });

    // ScrollSmoother Create karna
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // Desktop ke liye premium luxury smooth
      effects: true, // Parallax aur lag effects on rakhe hain
      
      // 🚀 OPTIMIZATION 3: Touch / Mobile Optimization
      // Mobile aur iPads k liye heavy smoothing hata di, 0.1 rakhi hai taake premium feel bhi rahe aur bilkul atkay (lag) nahi.
      smoothTouch: 0.1, 

      normalizeScroll: true, // Scroll bugs aur Jittering fix karne k liye
    });

  }, { scope: appRef }); // 🚀 OPTIMIZATION 4: App destroy/route hone pe animations khud clean hongi

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