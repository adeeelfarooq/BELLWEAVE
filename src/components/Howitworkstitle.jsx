import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const Howitworkstitle = () => {

    useGSAP(()=>{
        const firstF = new SplitText(".first-text-split" , { type: "chars" })
        const secondF = new SplitText(".second-text-split" , { type: "chars" })
        
        gsap.from(firstF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 60%",
            }
        })

        gsap.to(".flavor-text-scroll" , {
            duration: 1.5 , 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger:{
                trigger:".flavor-section",
                start: "top 50%",
            }
        })

        gsap.from(secondF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 40%",
            }
        })
    })

  return (
    <div className='flex flex-col justify-center h-full w-full max-w-lg'>
      
      {/* Title Animation Setup */}
      <div className='text-5xl md:text-7xl xl:text-[7.5rem] font-black uppercase tracking-tight flex flex-col items-center gap-2 md:gap-4'>
        <div className="overflow-hidden py-1 first-text-split">
          <h1 className='text-[#0f172a]'>How</h1>
        </div>
        
        {/* Accent Color Background Box */}
        <div 
          style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} 
          className="flavor-text-scroll -rotate-3"
        >
          <div className="bg-[#0f6a31] flex justify-center items-center px-4 py-1 md:px-6 md:py-2">
              <h2 className='text-[#FAF6EF]'>It</h2>
          </div>
        </div>
        
        <div className="overflow-hidden py-1 second-text-split">
          <h1 className='text-[#0f172a]'>Works.</h1>
        </div>
      </div>

      {/* Intro Text (Button removed from here) */}
      <div className="mt-10 md:mt-16 text-center">
        <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed mb-6">
          Four stages, one system. The full mechanism — including the thirteen rules it will never break — lives on the features page.
        </p>
      </div>

    </div>
  )
}

export default Howitworkstitle 