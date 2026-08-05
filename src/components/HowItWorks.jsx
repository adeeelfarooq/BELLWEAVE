import React from 'react'
import Howitworkstitle from '../componentsss/Howitworkstitle'
import Howitworksslider from '../componentsss/Howitworksslider'


const HowItWorksSection = () => {
  return (
    // Background color set to match the dark luxury theme
    <section className='flavor-section max-md:mb-20 overflow-hidden bg-[#211D1A] text-[#FAF6EF]'>
        {/* We animate this inner wrapper for horizontal scroll */}
        <div className="horizontal-scroll-container h-screen flex lg:flex-row flex-col items-center relative w-[max-content]">
            
            {/* Left Title Area */}
            <div className="lg:w-[45vw] w-screen flex-none h-80 lg:h-full flex flex-col justify-center px-6 md:px-16 pt-20 md:pt-0">
               <Howitworkstitle/>
            </div>

            {/* Right Slider Area */}
            <div className="h-full flex items-center pr-20">
                <Howitworksslider/>
            </div>
            
        </div>
    </section>
  )
}

export default HowItWorksSection