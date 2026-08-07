import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// 🚀 OPTIMIZATION: Faltu useMediaQuery nikal diya jo mobile pe jhatkay de raha tha
import { SplitText, ScrollTrigger, ScrollToPlugin } from "gsap/all";
import AnimatedHoverText from "../components/AnimatedHoverText";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

// 🚀 OPTIMIZATION: Styles ko bahar nikal diya taake bar bar calculate na hon
const marqueeStyles = `
    @keyframes marquee-scroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee-horizontal {
        display: inline-block;
        white-space: nowrap;
        animation: marquee-scroll 20s linear infinite;
        will-change: transform; /* 🚀 Mobile scroll performance boost */
    }
`;

const Hero = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const titleSplit = new SplitText(".hero-title", { type: "chars" });

        const tl = gsap.timeline({
            delay: 0.2, // 🚀 Thora delay kam kiya taake blank screen na dikhay
            defaults: { force3D: true }
        });

        tl.to(".hero-content", {
            opacity: 1,
            y: 0,
            ease: "power2.out", 
        })
        .to(".hero-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out"
        }, "-=0.1")
        .from(titleSplit.chars, {
            yPercent: 120, 
            opacity: 0,
            stagger: 0.02, 
            ease: "power3.out",
            force3D: true // 🚀 OPTIMIZATION: Text hardware acceleration
        }, "-=0.6");

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
            transformOrigin: "center center", 
            ease: "none" 
        });

        return () => {
            titleSplit.revert();
        };

    }, { scope: containerRef }); 

    const handleScrollToDemo = () => {
        gsap.to(window, {
            duration: 2.5,
            scrollTo: "#book-demo",
            ease: "power3.inOut" 
        });
    };

    return (
        <div ref={containerRef} className="bg-brand-dark"> 
            
            <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

            <section id="hero-container" className='bg-[#0f6a31]'>
                <div className='hero-container' style={{ willChange: "transform, border-radius" }}>
                    
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none transform-gpu"></div>
                        
                    <div className='hero-content opacity-0 flex flex-col justify-center !pt-16' style={{ willChange: "transform, opacity" }}>
                        
                        {/* 🚀 FIX: md:overflow-hidden hata kar overflow-hidden lagaya (mobile par bhi overflow hidden hoga) */}
                        {/* 🚀 FIX: Mobile font size 1.65rem se 1.5rem kiya taake chhoti screens par bilkul 2 lines mein fit ho */}
                        <div className='overflow-hidden px-4'>
                            <h1 className='hero-title transform-gpu text-brand-dark !text-[1.5rem] sm:!text-[2.8rem] md:!text-[4.5rem] lg:!text-[5.5rem] !leading-[1.1]'>
                                <span className="block whitespace-nowrap">School scheduling</span>
                                <span className="block whitespace-nowrap">that tells you the truth</span>
                            </h1>
                        </div>
                        
                        <div 
                            style={{
                                clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
                                willChange: "clip-path" 
                            }}
                            className="hero-text-scroll w-[110%] -ml-[5%] !my-4 md:!my-6">
                            
                            <div className="hero-subtitle overflow-hidden flex whitespace-nowrap transform-gpu">
                                <div className="animate-marquee-horizontal !normal-case">
                                    <h1 className="inline-block px-4 !text-2xl md:!text-4xl">
                                        Conflict-Free Timetables • Honest Substitutions • Full Audit Trail • Multi-Campus Scheduling • Conflict-Free Timetables • Honest Substitutions • Full Audit Trail • Multi-Campus Scheduling •
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <h2 className="font-sans text-gray-500 text-center max-w-3xl md:text-lg text-sm leading-relaxed mt-2 px-4 font-medium transform-gpu">
                            Bellweave builds your school's timetable, keeps every teacher, room and class conflict-free, and finds the right cover the moment someone calls in sick — or tells you honestly when no one is available.
                        </h2>
                        
                        <div 
                            onClick={handleScrollToDemo}
                            className="hero-button relative inline-flex items-center justify-center group !mt-6 md:!mt-8 cursor-pointer py-4 !shadow-none transform-gpu will-change-[transform,opacity]"
                            style={{ boxShadow: 'none' }}
                        >
                            
                            <div className="absolute inset-0 bg-brand-primary rounded-full pointer-events-none !shadow-none"></div>

                            <div className="relative z-10 text-white font-bold uppercase tracking-widest m-0 px-4">
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