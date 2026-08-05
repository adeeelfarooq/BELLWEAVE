import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

// ---------- BELLWEAVE 4 STAGES DATA ----------
// Rotation aur trans hata diye hain taake cards seedhay (straight) aayen
export const howitworkslists = [
  {
    step: "1.0",
    Caption: "Build",
    desc: "Set up the campus: bell schedules, curriculum, teachers, rooms.",
    image: "Build", 
  },
  {
    step: "2.0",
    Caption: "Publish",
    desc: "Generate a draft against every rule that governs your week; publish only what it can defend.",
    image: "Publish", 
  },
  {
    step: "3.0",
    Caption: "Repair",
    desc: "When plans change, find the right cover — or say honestly when there isn’t one.",
    image: "Repair", 
  },
  {
    step: "4.0",
    Caption: "Account",
    desc: "Keep the plan and what actually happened separate, so the term can be audited.",
    image: "Account", 
  },
];

const Howitworksslider = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const sliderRef = useRef();

    useGSAP(()=>{
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if(!isTablet){
            const tL = gsap.timeline({
                scrollTrigger:{
                    trigger: ".flavor-section",
                    start: "top top", 
                    pin: true,
                    end: `+=${scrollAmount + 1200}px`,
                    scrub: 1,
                }
            })
            
            tL.to(".horizontal-scroll-container" , {
                x: `-${scrollAmount + 700}px`, 
                ease: "none", 
            })
        }
        
        const titleTl = gsap.timeline({
            scrollTrigger:{
                trigger:".flavor-section",
                start:'top top',
                end:"bottom 80%",
                scrub: true,
            }
        })
        titleTl.to(".first-text-split" , {
            xPercent: -30,
            ease: "power1.inOut",
        }).to(".flavor-text-scroll" , {
            xPercent: -52,
            ease: "power1.inOut", 
        }, "<").to(".second-text-split" , {
            xPercent: -10,
            ease: "power1.inOut",
        } , "<")
    })

  return (
    <div ref={sliderRef} className='slider-wrapper flex items-center h-full pl-10 md:pl-20'>
        <div className="flavors flex gap-10 md:gap-20 items-center h-full">
            {
                howitworkslists.map((flavor)=>(
                    <div 
                        key={flavor.step} 
                        // Cards ki width/height barhai hai aur -translate-y-12 se card ko thora upar kiya hai
                        className={`z-30 lg:w-[32vw] w-80 lg:h-[70vh] md:w-[60vw] md:h-[60vh] h-[450px] flex-none relative flex flex-col -translate-y-8 md:-translate-y-4`}
                    >
                        {/* Image section ko h-[65%] kar k images ko pehlay se zyada bara kar diya hai */}
                        <div className="w-full h-[60%] md:h-[65%] rounded-2xl overflow-hidden mb-6 shadow-xl">
                            <img 
                                src={`/images/${flavor.image}.png`} 
                                alt={flavor.Caption} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        {/* Content area */}
                        <div className="flex flex-col flex-1">
                            <span className="text-[#0f6a31] font-black text-2xl mb-1 drop-shadow-md">
                                {flavor.step}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#0f172a] uppercase tracking-tight mb-3"> 
                                {flavor.Caption} 
                            </h1>
                            <p className="text-gray-500 font-medium text-xs md:text-sm leading-relaxed">
                                {flavor.desc}
                            </p>
                        </div>
                            
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Howitworksslider