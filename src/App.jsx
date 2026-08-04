import React from 'react'
import { ScrollSmoother, ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BuiltForSection from './components/Solutions'
import WhatItDoesSection from './components/Whatitdoes';

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
      </div>
      </div>
    </main>
  )
}

export default App