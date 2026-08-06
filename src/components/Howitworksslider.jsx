import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

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
            
            // 🚀 DESKTOP (No changes - perfectly working)
            const scrollDistance = scrollAmount + 1200; 
            const holdPinDistance = window.innerHeight + 400; 

            const tL = gsap.timeline({
                scrollTrigger:{
                    trigger: ".flavor-section",
                    start: "top top", 
                    pin: true,
                    end: `+=${scrollDistance + holdPinDistance}px`, 
                    scrub: 1,
                }
            })
            
            tL.to(".horizontal-scroll-container" , {
                x: `-${scrollAmount + 700}px`, 
                ease: "none", 
                duration: scrollDistance 
            })
            
            tL.to({}, { duration: holdPinDistance });
            
        } else {
            
            // 🚀 FIX: MOBILE OVERLAP LOGIC (Footer Bug Fixed!)
            // Ab default Pin behaviour on hai jis se BookDemo ka marginTop Footer ko nahi khainchay ga.
            ScrollTrigger.create({
                trigger: ".flavor-section", // Pura section target kiya
                start: "bottom bottom", 
                pin: true, // Default pinSpacing true rahega
                end: () => `+=${window.innerHeight}`, // Exact 1 screen overlap k liye jagah
                invalidateOnRefresh: true,
            });
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
    // 🚀 FIX: `pb-[100dvh]` hata diya taake height naturally manage ho
    <div ref={sliderRef} className='slider-wrapper flex lg:items-center lg:h-full w-full lg:pl-10'>
        <div className="flavors flex flex-col lg:flex-row gap-10 md:gap-20 lg:items-center w-full lg:h-full">
            {
                howitworkslists.map((flavor)=>(
                    <div 
                        key={flavor.step} 
                        className={`z-30 lg:w-[32vw] w-full max-w-sm mx-auto lg:mx-0 lg:h-[70vh] h-[450px] flex-none relative flex flex-col lg:-translate-y-4`}
                    >
                        <div className="w-full h-[60%] md:h-[65%] rounded-2xl overflow-hidden mb-6 shadow-xl">
                            <img 
                                src={`/images/${flavor.image}.png`} 
                                alt={flavor.Caption} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

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