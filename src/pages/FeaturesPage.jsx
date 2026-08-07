import React, { useRef } from 'react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 🚀 FIX: Yahan bhi '../' aayega
import Navbar from '../sections/NavbarSection';

import Footer from '../sections/Footer';
import FeatureStages from '../sections/FeatureStages';

const FeaturesPage = () => {
  const pageRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    ScrollSmoother.create({
      wrapper: '#smooth-wrapper-features',
      content: '#smooth-content-features',
      smooth: 1.5, 
      effects: true,
      smoothTouch: 0.1, 
      normalizeScroll: true,
    });
  }, { scope: pageRef }); 

  return (
    <main ref={pageRef} className="bg-[#0f172a]">
      {/* Navbar yahan bhi chahiye taake dusre page pe bhi dikhay */}
      <Navbar />
      
      <div id="smooth-wrapper-features">   
        <div id="smooth-content-features">
          <FeatureStages/>
          <Footer/>
          
          
          {/* Yahan baad mein hum Stage 2, 3, aur 4 lagayenge */}
          
          
        </div>
      </div>
    </main>
  )
}

export default FeaturesPage;