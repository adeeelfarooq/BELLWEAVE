import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// Ensure you have GSAP Club plugins (SplitText) installed in your project
import { SplitText, ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import AnimatedHoverText from "../components/AnimatedHoverText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        // Splitting the text for that premium letter-by-letter entrance
        const titleSplit = new SplitText(".hero-title", { type: "chars" });

        const tl = gsap.timeline({
            delay: 0.5,
            defaults: { force3D: true }
        });

        // Intro Animation
        tl.to(".hero-content", {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
        })
        .to(".hero-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out"
        }, "-=0.1")
        .from(titleSplit.chars, {
            yPercent: 150,
            opacity: 0,
            stagger: 0.03,
            ease: "power3.out"
        }, "-=0.5");

        // ScrollTrigger: When scrolling down, the whole section shrinks and rotates
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: "top top",
                end: "bottom top",
                scrub: 1, 
                invalidateOnRefresh: true, 
                fastScrollEnd: true, 
            },
            defaults: { force3D: true } 
        });

        heroTl.to(".hero-container", {
            rotate: 4, 
            scale: 0.92,
            yPercent: 20,
            borderRadius: "40px", 
            ease: "none" 
        });

        return () => {
            titleSplit.revert();
        };

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef} className="bg-brand-dark"> 
            
            {/* INLINE STYLE FOR HORIZONTAL MARQUEE ANIMATION */}
            <style>
                {`
                    @keyframes marquee-scroll {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-horizontal {
                        display: inline-block;
                        white-space: nowrap;
                        animation: marquee-scroll 20s linear infinite;
                    }
                `}
            </style>

            <section id="hero-container" className='bg-milk-yellow'>
                <div className='hero-container' style={{ willChange: "transform" }}>
                    
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none"></div>
                        
                    {/* Added !pt-16 to move content slightly up so it fits on all screens */}
                    <div className='hero-content opacity-0 flex flex-col justify-center !pt-16' style={{ willChange: "transform, opacity" }}>
                        
                        <div className='md:overflow-hidden px-4'>
                            {/* Adjusted font sizes to keep it in 2 lines perfectly */}
                            <h1 className='hero-title text-brand-dark !text-[2.8rem] md:!text-[4.5rem] lg:!text-[5.5rem] !leading-[1.1]'>
                                School scheduling <br className="hidden sm:block" /> that tells you the truth
                            </h1>
                        </div>
                        
                        {/* Angled Scrolling Tape - reduced vertical margins with !my-4 md:!my-6 */}
                        <div 
                            style={{
                                clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
                                willChange: "clip-path" 
                            }}
                            className="hero-text-scroll w-[110%] -ml-[5%] !my-4 md:!my-6">
                            
                            <div className="hero-subtitle overflow-hidden flex whitespace-nowrap">
                                {/* HORIZONTAL SCROLLING LINE WITH BELLWEAVE SERVICES */}
                                <div className="animate-marquee-horizontal !normal-case">
                                    <h1 className="inline-block px-4 !text-2xl md:!text-4xl">
                                        Conflict-Free Timetables • Honest Substitutions • Full Audit Trail • Multi-Campus Scheduling • Conflict-Free Timetables • Honest Substitutions • Full Audit Trail • Multi-Campus Scheduling •
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        {/* BELLWEAVE ACTUAL DESCRIPTION - widened max-w to 3xl to reduce lines */}
                        <h2 className="font-sans text-gray-500 text-center max-w-3xl md:text-lg text-sm leading-relaxed mt-2 px-4 font-medium">
                            Bellweave builds your school's timetable, keeps every teacher, room and class conflict-free, and finds the right cover the moment someone calls in sick — or tells you honestly when no one is available.
                        </h2>
                        
                        {/* UPDATED BUTTON: Gooey effects removed, AnimatedLink added, cursor-pointer added */}
                        <div className="hero-button relative inline-flex items-center justify-center group !mt-6 md:!mt-8 cursor-pointer py-4">
                            
                            {/* Simple solid background instead of gooey filter */}
                            <div className="absolute inset-0 bg-brand-primary rounded-full pointer-events-none"></div>

                            <div className="relative z-10 text-white font-bold uppercase tracking-widest m-0 px-4">
                                {/* AnimatedLink component with white hover color to match button theme */}
                                <AnimatedHoverText text="BOOK A DEMO"  />
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;