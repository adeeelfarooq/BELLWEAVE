import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

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
            
            // 🚀 FIX: Pin distance ko overlap k liye manage kiya hai
            const scrollDistance = scrollAmount + 1200; // Asal scroll ki length
            const holdPinDistance = window.innerHeight + 400; // BookDemo ko upar anay ka extra time dene k liye

            const tL = gsap.timeline({
                scrollTrigger:{
                    trigger: ".flavor-section",
                    start: "top top", 
                    pin: true,
                    // end point barha diya taake overlap ki jagah mil jaye
                    end: `+=${scrollDistance + holdPinDistance}px`, 
                    scrub: 1,
                }
            })
            
            // Step 1: Slider horizontal scroll hoga
            tL.to(".horizontal-scroll-container" , {
                x: `-${scrollAmount + 700}px`, 
                ease: "none", 
                duration: scrollDistance // Ratio set kiya taake animation perfectly speed mein ho
            })
            
            // Step 2: 🚀 THE MAGIC HOLD! (Empty tween) 
            // Jab slider end par pohanch jayega, toh ye section hilega nahi balky pinned rahega
            // is extra duration ke dauran agla BookDemo section overlaps karta hua upar aa jayega!
            tL.to({}, { duration: holdPinDistance });
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