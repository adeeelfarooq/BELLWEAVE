import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

// ---------- BELLWEAVE 4 STAGES DATA ----------
export const howitworkslists = [
  {
    step: "1.0",
    Caption: "Build",
    desc: "Set up the campus: bell schedules, curriculum, teachers, rooms.",
    image: "stage1", // Apni 1st image ka naam yahan likhein
    trans: "md:translate-y-10 md:-translate-x-5 translate-y-10 -translate-x-2",
    rotation: "md:rotate-[-4deg] rotate-0 max-md:scale-90",
  },
  {
    step: "2.0",
    Caption: "Publish",
    desc: "Generate a draft against every rule that governs your week; publish only what it can defend.",
    image: "stage2", // Apni 2nd image ka naam yahan likhein
    trans: "translate-x-1 translate-y-4 md:scale-100 scale-95",
    rotation: "md:rotate-[4deg] rotate-0 md:scale-105 scale-100",
  },
  {
    step: "3.0",
    Caption: "Repair",
    desc: "When plans change, find the right cover — or say honestly when there isn’t one.",
    image: "stage3", // Apni 3rd image ka naam yahan likhein
    trans: "md:-translate-x-10 md:-translate-y-2 max-md:scale-105 -translate-x-5 translate-y-3",
    rotation: "md:rotate-[-4deg] rotate-0 md:mt-10 max-md:scale-90",
  },
  {
    step: "4.0",
    Caption: "Account",
    desc: "Keep the plan and what actually happened separate, so the term can be audited.",
    image: "stage4", // Apni 4th image ka naam yahan likhein
    trans: "md:translate-x-5 md:translate-y-6 max-md:scale-95 translate-x-2 translate-y-0",
    rotation: "md:rotate-[3deg] rotate-0 md:mt-5",
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
                    start: "top top", // Pin at exactly top
                    pin: true,
                    end: `+=${scrollAmount + 1200}px`,
                    scrub: 1,
                }
            })
            // 🚀 FIX: Template mein ".flavor-section" move ho raha tha, 
            // maine safely inner wrapper ko move kiya taake pin break na ho.
            tL.to(".horizontal-scroll-container" , {
                x: `-${scrollAmount + 400}px`, 
                ease: "none", // Horizontal scroll hamesha 'none' ease k sath perfect lagta hai
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
            xPercent: -22,
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
                        className={`z-30 lg:w-[28vw] w-80 lg:h-[65vh] md:w-[60vw] md:h-[50vh] h-[400px] flex-none relative ${flavor.rotation} ${flavor.trans}`}
                    >
                        {/* Beautiful Modern SaaS Card inside the rotated container */}
                        <div className="w-full h-full bg-[#FAF6EF] rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between border border-white/10 overflow-hidden">
                            
                            {/* Image Placeholder - Aapki 4 Images yahan ayengi */}
                            <div className="w-full h-[45%] md:h-[50%] rounded-xl overflow-hidden mb-6 bg-gray-200">
                                <img 
                                    src={`/images/${flavor.image}.webp`} 
                                    alt={flavor.Caption} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                                <span className="text-[#0f6a31] font-black text-2xl mb-1">
                                    {flavor.step}
                                </span>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#211D1A] uppercase tracking-tight mb-3"> 
                                    {flavor.Caption} 
                                </h1>
                                <p className="text-[#211D1A]/70 font-medium text-xs md:text-sm leading-relaxed">
                                    {flavor.desc}
                                </p>
                            </div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Howitworksslider