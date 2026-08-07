import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const textToAnimate = "A school scheduling and timetable management system. Multi-campus, per term. It generates the base timetable against thirteen hard constraints and four soft goals, ranks qualified substitutes when a teacher is out and eligible rooms when a room is, and holds the plan apart from what actually happened so a year can be accounted for. When it cannot satisfy everything, it leaves the period unassigned, names the reason in a sentence, and waits for a person. Only a human may waive a hard rule, and only on the record.";

// 🚀 OPTIMIZATION: Styles ko component ke bahar nikal diya taake React har render pe inhe wapis re-calculate na kare.
const footerStyles = `
    @keyframes shine-sweep {
        0% { background-position: 100% 0; }
        25% { background-position: 0% 0; }
        100% { background-position: 0% 0; }
    }
    .animate-shine-sweep {
        background: linear-gradient(
            120deg, 
            #0f6a31 40%, 
            #86efac 50%, 
            #0f6a31 60%
        );
        background-size: 300% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        
        animation: shine-sweep 3s ease-in-out infinite;
        animation-play-state: paused;
        will-change: background-position; /* 🚀 OPTIMIZATION: Browser ko pehle hi bata diya ke ye animate hoga, taake lag na lagay */
    }
    
    .is-visible .animate-shine-sweep {
        animation-play-state: running;
    }
`;

const Footer = () => {
    const footerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%", 
            }
        });

        // 1. Heading Reveal: Masked Slide Up
        tl.to(".brand-heading-inner",
            { 
                y: "0%", 
                rotation: 0, 
                opacity: 1, 
                duration: 1.4, 
                ease: "expo.out",
                force3D: true // 🚀 OPTIMIZATION: Hardware acceleration for mobile
            }
        )
        
        // 2. Bottom Links Fade In
        .to(".footer-bottom",
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power3.out",
                force3D: true // 🚀 OPTIMIZATION: Hardware acceleration
            },
            "-=0.8" 
        );

        ScrollTrigger.create({
            trigger: footerRef.current,
            start: "top 100%", 
            end: "bottom 0%", 
            toggleClass: "is-visible" 
        });

    }, { scope: footerRef });

    return (
        <footer 
            className="w-full bg-[#0b1120] text-[#FAF6EF] px-6 md:px-14 pb-16 relative z-10"
            style={{
                marginTop: "-50px", 
                paddingTop: "calc(4rem + 50px)" 
            }}
        >
            {/* 🚀 OPTIMIZATION: Injected optimized styles safely */}
            <style dangerouslySetInnerHTML={{ __html: footerStyles }} />

            <div ref={footerRef} className="max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
                
                {/* Brand Name - Light Sweep */}
                <div className="mb-6 md:mb-8 overflow-hidden py-1">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[#0f6a31]">
                        {/* 🚀 OPTIMIZATION: Added transform-gpu to offload animation to GPU */}
                        <div className="brand-heading-inner translate-y-[120%] origin-bottom-left rotate-[4deg] opacity-0 will-change-transform transform-gpu animate-shine-sweep">
                            Bellweave
                        </div>
                    </h2>
                </div>

                {/* Manifesto / Description */}
                <div className="max-w-4xl mb-12 md:mb-20">
                    <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed md:leading-loose font-medium transform-gpu">
                        {textToAnimate}
                    </p>
                </div>

                {/* Bottom Links */}
                {/* 🚀 OPTIMIZATION: Added will-change-[transform,opacity] and transform-gpu */}
                <div className="footer-bottom opacity-0 translate-y-5 w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4 will-change-[transform,opacity] transform-gpu">
                    
                    <span className="order-2 sm:order-1 text-xs text-gray-600 font-medium">
                        &copy; {new Date().getFullYear()} Bellweave - All Rights Reserved
                    </span>
                    
                    <a href="#" className="order-1 sm:order-2 text-xs text-gray-500 hover:text-[#0f6a31] transition-colors font-bold uppercase tracking-wider">
                        Privacy
                    </a>

                </div>

            </div>
        </footer>
    )
}

export default Footer