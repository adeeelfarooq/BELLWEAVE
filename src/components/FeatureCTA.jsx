import React, { useRef } from 'react';
// 🚀 FIX: React Router se Link import kiya
import { Link } from 'react-router-dom';
// 🚀 FIX: GSAP imports add kiye hain
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageContainer from '../components/PageContainer';
import AnimatedHoverText from '../components/AnimatedHoverText';

gsap.registerPlugin(ScrollTrigger);

const FeatureCTA = () => {
    // 🚀 FIX: Heading ko target karne ke liye ref banaya
    const headingRef = useRef(null);

    useGSAP(() => {
        // 🚀 FIX: Left to Right animation with Scrub
        gsap.fromTo(headingRef.current,
            { opacity: 0, x: -100 }, // Shuru mein hide aur 100px left par
            {
                opacity: 1,
                x: 0, // Wapis apni original jagah par aayega
                ease: "power2.out",
                force3D: true, // 🚀 OPTIMIZATION: Hardware acceleration for scrub animation
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 95%", // Jab screen mein neechay se enter ho
                    end: "top 60%", // Animation complete hone ka point
                    scrub: 1 // 🚀 FIX: Scrub laga diya taake scroll k sath chale
                }
            }
        );
    });

    return (
        <section className="w-full bg-[#0f172a] py-16 md:py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
            
            {/* Subtle Green Glow on the Left (Behind Heading) */}
            {/* 🚀 OPTIMIZATION: Added transform-gpu to offload heavy blur to Graphics Card */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-[#0f6a31]/10 blur-[150px] pointer-events-none transform-gpu"></div>

            <PageContainer className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    {/* LEFT COLUMN: HEADING */}
                    {/* 🚀 OPTIMIZATION: Added transform-gpu & will-change to prepare browser for smooth slide */}
                    <div ref={headingRef} className="flex flex-col text-center md:text-left transform-gpu will-change-[transform,opacity]">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#0f6a31] to-emerald-400">
                            Ready to see it <br className="hidden lg:block"/> 
                            against your own <br className="hidden lg:block"/> 
                            timetable?
                        </h2>
                    </div>

                    {/* RIGHT COLUMN: BUTTON */}
                    {/* 🚀 OPTIMIZATION: Added GPU classes for the parent-triggered cta-reveal animation */}
                    <div className="flex justify-center md:justify-end cta-reveal opacity-0 transform-gpu will-change-[transform,opacity]">
                        <Link to="/#book-demo" className="hero-button relative inline-flex items-center justify-center group cursor-pointer py-4 lg:py-5 !shadow-none" style={{ boxShadow: 'none' }}>
                            <div className="absolute inset-0 bg-brand-primary rounded-full pointer-events-none !shadow-none"></div>
                            <div className="relative z-10 text-white font-bold uppercase tracking-widest m-0 px-8 lg:px-10">
                                <AnimatedHoverText text="BOOK A DEMO" />
                            </div>
                        </Link>
                    </div>

                </div>
            </PageContainer>
        </section>
    );
};

export default FeatureCTA;