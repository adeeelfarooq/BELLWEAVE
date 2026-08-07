import React from 'react';
import { Link } from 'react-router-dom'; 
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import PageContainer from '../components/PageContainer';
import AnimatedHoverText from '../components/AnimatedHoverText';

gsap.registerPlugin(ScrollToPlugin);

const stages = [
    { num: "1.0", name: "build", link: "#stage-build" },
    { num: "2.0", name: "publish", link: "#stage-publish" },
    { num: "3.0", name: "repair", link: "#stage-repair" },
    { num: "4.0", name: "account", link: "#stage-account" },
];

const FeatureHero = () => {

    const handleStageClick = (e, targetId) => {
        e.preventDefault(); 

        if (targetId === "#stage-build") {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: 150, autoKill: true }, 
                ease: "power3.inOut"
            });
        } else {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: targetId, autoKill: true },
                ease: "power3.inOut"
            });
        }
    };

    return (
        <section id="feature-hero" className="hero-panel col-start-1 row-start-1 self-start w-full h-dvh flex flex-col justify-center text-white overflow-hidden relative z-0">
            {/* 🚀 OPTIMIZATION: Added transform-gpu to prevent heavy blur lag on mobile scroll */}
            <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] rounded-full bg-brand-primary/10 blur-[150px] pointer-events-none transform-gpu"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none transform-gpu"></div>

            <PageContainer className="z-10 flex flex-col items-center text-center">
                {/* 🚀 FIX: flex-wrap hata kar flex-nowrap kar diya, aur mobile k liye gap thora kam kiya taake 4 buttons aik line me fit aa jayein */}
                <div className="flex flex-nowrap w-full justify-center gap-1.5 sm:gap-3 md:gap-6 mb-4 md:mb-6 overflow-hidden">
                    {stages.map((stage, i) => (
                        <a 
                            href={stage.link} 
                            key={i} 
                            onClick={(e) => handleStageClick(e, stage.link)}
                            // 🚀 FIX: Mobile k liye padding (px-2 py-1.5) aur text (text-[9px]) ko tweak kiya, aur whitespace-nowrap lagaya taake text na tootay
                            className="stage-tag group flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-brand-primary/30 transition-all duration-300 cursor-pointer transform-gpu will-change-transform"
                        >
                            <span className="text-brand-primary group-hover:text-emerald-400 transition-colors">{stage.num}</span>
                            <span className="text-gray-400 group-hover:text-white transition-colors">{stage.name}</span>
                        </a>
                    ))}
                </div>

                <div className="mb-2 px-2 flex flex-col items-center">
                    <div className="overflow-hidden py-1">
                        {/* 🚀 OPTIMIZATION: Added transform-gpu for buttery smooth GSAP text reveal */}
                        <h1 className="feature-hero-title-line transform-gpu translate-y-[120%] origin-bottom-left rotate-[4deg] opacity-0 will-change-transform !text-[1.8rem] sm:!text-[2.8rem] md:!text-[4.5rem] lg:!text-[5.5rem] font-black uppercase tracking-tight !leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#0f6a31] to-emerald-400 pb-2">
                            The year,
                        </h1>
                    </div>
                    <div className="overflow-hidden py-1">
                        <h1 className="feature-hero-title-line transform-gpu translate-y-[120%] origin-bottom-left rotate-[4deg] opacity-0 will-change-transform !text-[1.8rem] sm:!text-[2.8rem] md:!text-[4.5rem] lg:!text-[5.5rem] font-black uppercase tracking-tight !leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#0f6a31] to-emerald-400 pb-2">
                            in four stages.
                        </h1>
                    </div>
                </div>

                {/* 🚀 OPTIMIZATION: Added transform-gpu and will-change to prepare browser for opacity/translate animation */}
                <p className="feature-hero-desc transform-gpu will-change-[transform,opacity] text-gray-400 text-center max-w-3xl md:text-lg text-sm leading-relaxed mt-2 px-4 font-medium">
                    Bellweave builds a school’s timetable, then keeps it honest — through the Monday a teacher calls in sick.
                </p>

                <div className="feature-hero-btn-wrapper transform-gpu will-change-[transform,opacity] !mt-6 md:!mt-8">
                    <Link to="/#book-demo" className="hero-button relative inline-flex items-center justify-center group cursor-pointer py-4 !shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="absolute inset-0 bg-brand-primary rounded-full pointer-events-none !shadow-none"></div>
                        <div className="relative z-10 text-white font-bold uppercase tracking-widest m-0 px-8">
                            <AnimatedHoverText text="BOOK A DEMO" />
                        </div>
                    </Link>
                </div>
            </PageContainer>
        </section>
    );
};

export default FeatureHero;