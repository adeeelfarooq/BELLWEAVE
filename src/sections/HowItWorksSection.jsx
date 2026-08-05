import React from 'react'
import Howitworkstitle from '../components/Howitworkstitle'
import Howitworksslider from '../components/Howitworksslider'

const HowItWorksSection = () => {
  return (
    <section className='flavor-section max-md:mb-20 overflow-hidden bg-[#FAF6EF] text-[#0f172a] relative'>
        
        {/* PINNED BUTTON */}
        <div className="absolute z-[50] bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer">
            <a href="#" className="group inline-flex items-center justify-center gap-2 text-sm md:text-base font-bold tracking-wide text-[#0f6a31]">
                <span className="relative">
                    Read the full walkthrough
                    <span className="absolute left-0 -bottom-1 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-[#0f6a31]"></span>
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>

        {/* 🚀 FIX: Mobile par w-full aur flex-col taake content screen se bahar na jaye */}
        <div className="horizontal-scroll-container lg:h-screen min-h-screen flex lg:flex-row flex-col lg:items-center relative lg:w-[max-content] w-full">
            
            <div className="lg:w-[45vw] w-full flex-none lg:h-full flex flex-col justify-center px-6 md:px-16 pt-20 lg:pt-0 pb-10 lg:pb-0">
              <Howitworkstitle/>
            </div>

            <div className="lg:h-full flex lg:items-center lg:pr-20 w-full px-6 lg:px-0 pb-32 lg:pb-0">
                <Howitworksslider/>
            </div>
            
        </div>
    </section>
  )
}

export default HowItWorksSection