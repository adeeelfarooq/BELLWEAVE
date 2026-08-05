import React from 'react'
import { ScrollSmoother, ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './sections/NavbarSection'
import Hero from './sections/HeroSection'
import BuiltForSection from './sections/BuiltForSection'
import WhatItDoesSection from './sections/WhatItDoesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BookDemoSection from './sections/BookDemoSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const App = () => {

  useGSAP(() => {
    // 1. ScrollSmoother Create karna
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // 3 bohat heavy lagta hai, 1.5 ya 2 best hai
      effects: true,
      normalizeScroll: true, // Touch devices pe scroll bugs fix karta hai
    });
  })

  

   
  return (
    <main>
      <Navbar/>
      <div id="smooth-wrapper">   
        <div id="smooth-content">
      <Hero/>
      <BuiltForSection/>
      <WhatItDoesSection/>
      <HowItWorksSection/>
      <BookDemoSection/>
      </div>
      </div>
    </main>
  )
}

export default App