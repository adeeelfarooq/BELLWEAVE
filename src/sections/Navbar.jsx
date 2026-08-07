import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 🚀 FIX: React Router k hooks import kiye hain
import { Link, useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
    const logoRef = useRef(null);
    
    // 🚀 FIX: Navigation hooks initialize kiye
    const navigate = useNavigate();
    const location = useLocation();

    useGSAP(() => {
        // 🚀 THE MAGIC FIX: React Router jab naya page render karta hai to thora fraction of second lagta hai. 
        // Timeout ensure karta hai k DOM poori tarah paint ho jaye phir GSAP triggers lagaye.
        setTimeout(() => {
            // 🚀 SMART SELECTOR: Wo sab sections jin ka background dark hai wahan logo white hoga!
            let darkSections = gsap.utils.toArray("#feature-hero, #book-demo, footer, .bg-brand-dark");

            // 🚀 BUG FIX: Landing Page Hero k parent par bhi .bg-brand-dark hai, isliye hum usay filter kar rahay hain
            // taake Landing Page k shuru mein logo black/original hi rahay!
            darkSections = darkSections.filter(sec => !sec.querySelector('#hero-container'));

            darkSections.forEach((sec) => {
                ScrollTrigger.create({
                    trigger: sec, 
                    start: "top 8%", // Jab dark section navbar k qareeb pohanchay
                    end: "bottom 8%", // Jab dark section cross ho jaye
                    
                    // 🚀 OPTIMIZATION: overwrite: "auto" lagaya hai taake fast scroll par clash na ho
                    onEnter: () => gsap.to(logoRef.current, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }), 
                    onLeave: () => gsap.to(logoRef.current, { filter: "none", duration: 0.3, overwrite: "auto" }), 
                    onEnterBack: () => gsap.to(logoRef.current, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }), 
                    onLeaveBack: () => gsap.to(logoRef.current, { filter: "none", duration: 0.3, overwrite: "auto" }), 
                });
            });

            ScrollTrigger.refresh();
        }, 100);

    }, { dependencies: [location.pathname] }); // 🚀 CRITICAL FIX: Page change hone par ye dubara trigger hoga!

    // 🚀 THE FIX: Smart click handler banaya
    const handleScrollToDemo = (e) => {
        e.preventDefault(); // Default jump ko roka
        
        if (location.pathname === '/') {
            // Agar Home page pe hain to direct GSAP se scroll karega
            gsap.to(window, {
                duration: 2.5,
                scrollTo: "#book-demo", 
                ease: "power3.inOut" 
            });
        } else {
            // Agar Features (ya kisi aur) page pe hain, to Home page k #book-demo pe bhej dega
            navigate('/#book-demo');
        }
    };

    return (
        // 🚀 OPTIMIZATION: transform-gpu to offload navbar rendering to Graphics card
        <div className="fixed top-0 left-0 w-full z-[20000] pointer-events-none flex justify-center transform-gpu">
            
            <div className="w-full max-w-[1536px] relative h-0">
                
                <nav className='absolute top-0 left-0 z-[19999] md:p-8 p-5 pointer-events-none'>
                    <a href="/" className="pointer-events-auto block group">
                        <img 
                            ref={logoRef} 
                            src="/images/Bellweave.webp" 
                            alt="Bellweave Logo" 
                            // 🚀 OPTIMIZATION: will-change-[filter] ensures changing colors is buttery smooth
                            className="md:h-9 h-7 w-auto object-contain drop-shadow-sm group-hover:opacity-70 transition-all duration-300 transform-gpu will-change-[filter]" 
                        />
                    </a>
                </nav>

                {/* 🚀 FIX: <a> tag ko <Link> se badal diya aur href="#contact" ko to="/#book-demo" kar diya */}
                <Link 
                    onClick={handleScrollToDemo}
                    to="/#book-demo" 
                    className="absolute mt-6 pointer-events-auto z-[20000] scale-90 md:scale-100 max-md:text-xs md:text-sm inline-flex items-center justify-center bg-white text-brand-dark font-extrabold max-md:right-[2%] md:right-[3%] md:top-[4%] max-md:top-[3%] px-8 py-3.5 uppercase tracking-widest rounded-full transition-all duration-300 ease-in-out hover:bg-brand-primary hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] group transform-gpu"
                >
                    Get Started
                </Link>

            </div>
        </div>
    );
}

export default NavBar;