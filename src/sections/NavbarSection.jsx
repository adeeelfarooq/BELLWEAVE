import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// 🚀 FIX: ScrollTrigger register karna zaroori hai
gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
    // 🚀 FIX: Logo ko target karne ke liye ref banaya
    const logoRef = useRef(null);

    useGSAP(() => {
        // 🚀 THE MAGIC: Jab #book-demo section screen ke top par aayega, logo white ho jayega
        ScrollTrigger.create({
            trigger: "#book-demo", // Ye dark sections ki shuruwat hai
            start: "top 5%", // Jab section navbar ke bilkul peeche pohnchay
            onEnter: () => gsap.to(logoRef.current, { filter: "brightness(0) invert(1)", duration: 0.3 }), // Safed (White) kar do
            onLeaveBack: () => gsap.to(logoRef.current, { filter: "none", duration: 0.3 }), // Wapis upar janay pe normal kar do
        });
    });

    return (
        // 🚀 FIX: Master Fixed Wrapper (Ye hamesha screen k top pe rahega)
        <div className="fixed top-0 left-0 w-full z-[20000] pointer-events-none flex justify-center">
            
            {/* 🚀 FIX: Container Limit (Zoom out karne pe ye kono me nahi bhagega, balky layout k sath center me rahega) */}
            <div className="w-full max-w-[1536px] relative h-0">
                
                {/* FLOATING LOGO (Top Left) */}
                {/* 🚀 FIX: Isko 'fixed' se 'absolute' kar diya taake ye container k hisaab se position lay */}
                <nav className='absolute top-0 left-0 z-[19999] md:p-8 p-5 pointer-events-none'>
                    <a href="/" className="pointer-events-auto block group">
                        <img 
                            ref={logoRef} 
                            src="/images/Bellweave.webp" 
                            alt="Bellweave Logo" 
                            className="md:h-9 h-7 w-auto object-contain drop-shadow-sm group-hover:opacity-70 transition-all duration-300" 
                        />
                    </a>
                </nav>

                {/* FLOATING CTA BUTTON (Top Right) */}
                {/* 🚀 FIX: Isko bhi 'fixed' se 'absolute' kar diya */}
                <a 
                    href="#contact" 
                    className="absolute mt-6 pointer-events-auto z-[20000] scale-90 md:scale-100 max-md:text-xs md:text-sm inline-flex items-center justify-center bg-white text-brand-dark font-extrabold max-md:right-[2%] md:right-[3%] md:top-[4%] max-md:top-[3%] px-8 py-3.5 uppercase tracking-widest rounded-full transition-all duration-300 ease-in-out hover:bg-brand-primary hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] group"
                >
                    Get Started
                </a>

            </div>
        </div>
    );
}

export default NavBar;