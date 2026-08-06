import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import AnimatedHoverText from '../components/AnimatedHoverText'

gsap.registerPlugin(ScrollTrigger);

const BookDemoSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const formRef = useRef(null);
    const formElementsRef = useRef([]);

    const addToFormElements = (el) => {
        if (el && !formElementsRef.current.includes(el)) {
            formElementsRef.current.push(el);
        }
    };

    useGSAP(() => {
        
        // 🚀 FIX: Overlap Effect Here! (Pichle section k upar slide karke aayega)
        gsap.set(sectionRef.current, {
            
            marginTop: "-100dvh", // Is value ko aap -20vh ya -30vh kar sakte hain agar aur zyada upar chadhaana ho
            zIndex: 50, // Z-index zaroori hai taake ye pichle section k uper dikhay, uske neechay na chup jaye
        });

        gsap.fromTo(textRef.current.children, 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, 
                y: 0, 
                stagger: 0.2, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "top 30%", 
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(formRef.current,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(formElementsRef.current,
            { opacity: 0, x: 20 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%", 
                    end: "top 15%",
                    scrub: 1,
                }
            }
        );

    }, { scope: sectionRef });

    return (
        // ❌ Koi classes/UI change nahi kiye gaye ❌
        <section id='book-demo' ref={sectionRef}  className="relative w-full min-h-screen flex items-center bg-[#0f172a] text-[#FAF6EF] py-16 px-6 md:px-14 overflow-x-hidden">
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#0f6a31]/20 blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                
                <div ref={textRef} className="w-full lg:w-5/12 flex flex-col gap-3 lg:gap-5 text-center lg:text-left shrink-0">
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#0f6a31] to-emerald-400">
                        Book a <br />
                        Demo.
                    </h1>
                    
                    <p className="text-gray-400 text-sm leading-relaxed font-medium mt-1 max-w-xl mx-auto lg:mx-0">
                        Bellweave is in development. If any of that sounded like your school’s year, we would like to walk you through the working system and hear where it is wrong.
                    </p>
                </div>

                <div className="w-full lg:w-7/12 max-w-2xl mx-auto flex-1 min-h-0">
                    <div ref={formRef} className="bg-[#FAF6EF] rounded-3xl p-5 lg:p-7 shadow-2xl relative w-full">
                        
                        <form className="flex flex-col gap-3 md:gap-4" onSubmit={(e) => e.preventDefault()}>
                            
                            <div className="hidden" aria-hidden="true">
                                <label>Company (leave this blank)</label>
                                <input type="text" name="company" tabIndex="-1" autoComplete="off" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                <div ref={addToFormElements} className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wide">Your name</label>
                                    <input 
                                        type="text" 
                                        placeholder="J. Carter" 
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6a31] focus:border-transparent transition-all shadow-sm text-sm"
                                    />
                                </div>
                                <div ref={addToFormElements} className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wide">Your role</label>
                                    <select 
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f6a31] focus:border-transparent transition-all shadow-sm appearance-none cursor-pointer text-sm"
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="text-gray-400">Choose one…</option>
                                        <option value="Head Teacher">Head Teacher</option>
                                        <option value="Deputy Head">Deputy Head</option>
                                        <option value="Business Manager">Business Manager</option>
                                        <option value="Timetabler">Timetabler / Scheduler</option>
                                        <option value="IT Lead">IT & Systems Lead</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                <div ref={addToFormElements} className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wide">School</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ashford Grange" 
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6a31] focus:border-transparent transition-all shadow-sm text-sm"
                                    />
                                </div>
                                <div ref={addToFormElements} className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wide">Email address</label>
                                    <input 
                                        type="email" 
                                        placeholder="name@school.uk" 
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6a31] focus:border-transparent transition-all shadow-sm text-sm"
                                    />
                                </div>
                            </div>

                            <div ref={addToFormElements} className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wide">Campuses <span className="text-gray-400 normal-case font-medium">(optional)</span></label>
                                <input 
                                    type="number" 
                                    placeholder="2" 
                                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6a31] focus:border-transparent transition-all shadow-sm text-sm"
                                />
                                <span className="text-[10px] text-gray-500 font-medium ml-1">
                                    Bellweave schedules each campus separately.
                                </span>
                            </div>

                            <div ref={addToFormElements} className="mt-1 md:mt-2 flex flex-col items-center gap-2">
                                <button 
                                    type="submit" 
                                    className="group flex justify-center items-center w-full bg-[#0f6a31] text-white font-bold uppercase tracking-widest py-3 rounded-full shadow-[0_10px_20px_rgba(15,106,49,0.3)] transition-all duration-300 cursor-pointer pointer-events-auto"
                                >
                                    <AnimatedHoverText text="BOOK A DEMO" />
                                </button>
                                <span className="text-[10px] text-gray-500 font-medium text-center">
                                    This really sends — a person reads every request.
                                </span>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default BookDemoSection