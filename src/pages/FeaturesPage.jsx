import React, { useRef } from 'react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import FeatureStages from '../sections/FeatureStages';

// 🚀 OPTIMIZATION: Plugin register karna zaroori hai taake direct page load pe error na aaye
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const FeaturesPage = () => {
  const pageRef = useRef(null);

  useGSAP(() => {
    // 🚀 Mobile Lag & Resize Jitter Fix
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 🚀 CRITICAL FIX: Isay ek variable me store kiya taake cleanup ke waqt destroy kiya ja sake
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper-features',
      content: '#smooth-content-features',
      smooth: 1.5, 
      effects: true,
      smoothTouch: 0.1, 
      // 🚀 OPTIMIZATION: Mobile touch par normalizeScroll OFF rakha hai taake scrolling stuck na ho
      normalizeScroll: ScrollTrigger.isTouch ? false : true,
    });

    // 2. SAB SE BARA FIX (Sections Merging & Stuck Issue)
    // Jab images aur heavy elements load ho jayen, toh GSAP ko refresh karo
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); // 1 second ka delay taa ke sab kuch render ho jaye

    // Resize event pe bhi refresh karo (agar user screen choti bari kare)
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // 🚀 CRITICAL OPTIMIZATION: Memory Leak & React Router Fix
    // Jab user Home page wapis jayega, ye old smoother destroy ho jayega, warna website break ho sakti thi.
    return () => {
      if (smoother) smoother.kill();
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };

  }, { scope: pageRef }); 

  return (
    <main ref={pageRef} className="bg-[#0f172a]">
      {/* Navbar yahan bhi chahiye taake dusre page pe bhi dikhay */}
      <Navbar />
      
      <div id="smooth-wrapper-features">   
        <div id="smooth-content-features">
          <FeatureStages/>
          <Footer/>
        </div>
      </div>
    </main>
  )
}

export default FeaturesPage;