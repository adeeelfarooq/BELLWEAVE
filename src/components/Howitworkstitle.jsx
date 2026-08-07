import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const Howitworkstitle = () => {
    const containerRef = useRef(null);

    useGSAP(()=>{
        const firstF = new SplitText(".first-text-split" , { type: "chars" })
        const secondF = new SplitText(".second-text-split" , { type: "chars" })
        
        gsap.from(firstF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            force3D: true, // 🚀 OPTIMIZATION: Added GPU rendering for character animations
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: containerRef.current, 
                start: "top 85%", 
            }
        })

        gsap.to(".flavor-text-scroll" , {
            duration: 1.5 , 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            force3D: true, // 🚀 OPTIMIZATION
            scrollTrigger:{
                trigger: containerRef.current,
                start: "top 75%",
            }
        })

        gsap.from(secondF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            force3D: true, // 🚀 OPTIMIZATION
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: containerRef.current,
                start: "top 65%",
            }
        })

        // 🚀 CRITICAL FIX: SplitText creates extra DOM nodes. Failing to revert it causes memory leaks!
        return () => {
            firstF.revert();
            secondF.revert();
        };
    }, { scope: containerRef })

  return (
    <div ref={containerRef} className='flex flex-col justify-center h-full w-full max-w-lg'>
      
      <div className='text-5xl md:text-7xl xl:text-[7.5rem] font-black uppercase tracking-tight flex flex-col items-center gap-2 md:gap-4'>
        {/* 🚀 OPTIMIZATION: Added transform-gpu and will-change-transform */}
        <div className="overflow-hidden py-1 first-text-split transform-gpu will-change-transform">
          <h1 className='text-[#0f172a]'>How</h1>
        </div>
        
        <div 
          style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} 
          className="flavor-text-scroll -rotate-3 transform-gpu will-change-transform"
        >
          <div className="bg-[#0f6a31] flex justify-center items-center px-4 py-1 md:px-6 md:py-2">
              <h2 className='text-[#FAF6EF]'>It</h2>
          </div>
        </div>
        
        {/* 🚀 OPTIMIZATION: Added transform-gpu and will-change-transform */}
        <div className="overflow-hidden py-1 second-text-split transform-gpu will-change-transform">
          <h1 className='text-[#0f172a]'>Works.</h1>
        </div>
      </div>

      <div className="mt-10 md:mt-16 text-center">
        {/* 🚀 OPTIMIZATION: Transform-gpu so text renders crispy during parent scroll */}
        <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed mb-6 transform-gpu">
          Four stages, one system. The full mechanism — including the thirteen rules it will never break — lives on the features page.
        </p>
      </div>

    </div>
  )
}

export default Howitworkstitle