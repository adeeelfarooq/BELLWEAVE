import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FeatureHero from '../components/FeaturesHero';
import FeatureStageOne from '../components/FeatureStageOne';
import FeatureStageTwo from '../components/FeatureStageTwo';
import FeatureStageThree from '../components/FeatureStageThree';
import FeatureStageFour from '../components/FeatureStageFour';
import FeatureCTA from '../components/FeatureCTA';

gsap.registerPlugin(ScrollTrigger);

const FeatureStages = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // ==========================================
        // 1. HERO ANIMATIONS
        // ==========================================
        // 🚀 OPTIMIZATION: Added force3D for smoother initialization
        const tlHero = gsap.timeline({ delay: 0.2, defaults: { force3D: true } });
        tlHero.fromTo(".stage-tag", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" })
              .to(".feature-hero-title-line", { y: "0%", rotation: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out" }, "-=0.4")
              .fromTo(".feature-hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
              .fromTo(".feature-hero-btn-wrapper", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        // ==========================================
        // 2. HERO TO STAGE 1 (RIGHT-TO-LEFT SLIDE)
        // ==========================================
        gsap.set(".stage-1-panel", { xPercent: 100 });

        const slideTl = gsap.timeline({ paused: true, defaults: { force3D: true } }); // 🚀 OPTIMIZATION: force3D
        
        slideTl.to(".stage-1-panel", { xPercent: 0, ease: "power3.out", duration: 0.8 })
               .fromTo(".text-reveal-1", { opacity: 0, x: 40 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4")
               .fromTo(".ui-card-stage-1", { opacity: 0, x: 80, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.5");

        ScrollTrigger.create({
            trigger: ".hero-stage1-wrapper",
            start: "top top",
            end: "bottom bottom", 
            pin: ".hero-fixed-bg", 
            pinSpacing: false 
        });

        ScrollTrigger.create({
            trigger: ".hero-stage1-wrapper",
            start: "top -10px", 
            onEnter: () => slideTl.play(), 
            onLeaveBack: () => slideTl.reverse(), 
        });

        // ==========================================
        // 3. VERTICAL OVERLAP (Stacking Stages 1 to 4)
        // ==========================================
        const overlapSections = gsap.utils.toArray('.overlap-section');

        overlapSections.forEach((section, index) => {
            if (index !== overlapSections.length - 1) { 
                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom", 
                    pin: true, 
                    pinSpacing: false, 
                });
            }
        });

        // ==========================================
        // 4. INTERNAL UI ANIMATIONS (Stages 2 to 4)
        // ==========================================
        // 🚀 OPTIMIZATION: Added force3D: true to all these loops to prevent scroll lag on mobile when UI elements fade in
        const textElements = gsap.utils.toArray(".text-reveal-2, .text-reveal-3, .text-reveal-4");
        textElements.forEach((elem) => {
            gsap.fromTo(elem, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", force3D: true, scrollTrigger: { trigger: elem, start: "top 85%" } });
        });

        const uiCards = gsap.utils.toArray(".ui-card-stage-2, .ui-card-stage-3, .ui-card-stage-4");
        uiCards.forEach((card) => {
            gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", force3D: true, scrollTrigger: { trigger: card, start: "top 85%" } });
        });

        gsap.fromTo(".rule-card", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: "power2.out", force3D: true, scrollTrigger: { trigger: ".rules-grid", start: "top 85%" } });
        gsap.fromTo(".soft-goal-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", force3D: true, scrollTrigger: { trigger: ".soft-goals-grid", start: "top 85%" } });
        gsap.fromTo(".timeline-item", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", force3D: true, scrollTrigger: { trigger: ".timeline-item", start: "top 80%" } });
        gsap.fromTo(".cta-reveal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", force3D: true, scrollTrigger: { trigger: ".cta-reveal", start: "top 90%" } });

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef} className="relative w-full bg-brand-dark overflow-hidden">
            
            {/* ========================================== */}
            {/* SCENE 1: Hero & Stage 1 (Right to Left Slide) */}
            {/* ========================================== */}
            {/* 🚀 OPTIMIZATION: transform-gpu to offload overlap logic to Graphics Card */}
            <div className="hero-stage1-wrapper overlap-section relative z-[10] w-full transform-gpu">
                <div className="grid grid-cols-1 grid-rows-1 w-full relative">
                    
                    <div className="hero-fixed-bg col-start-1 row-start-1 self-start w-full h-screen bg-brand-dark">
                        <FeatureHero />
                    </div>
                    
                    {/* 🚀 OPTIMIZATION: will-change-transform taake right-to-left slide kabhi lag na kare */}
                    <div className="stage-1-panel col-start-1 row-start-1 w-full z-[15] will-change-transform transform-gpu">
                        <FeatureStageOne />
                    </div>

                </div>
            </div>

            {/* ========================================== */}
            {/* STAGE 2 (Overlaps Stage 1 exactly from bottom) */}
            {/* ========================================== */}
            {/* 🚀 FIX: Reduced opacity from 0.12 to 0.06 for a very light and airy shadow */}
            <div id="stage-2" className="overlap-section relative z-[20] w-full bg-[#FAF6EF] rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] transform-gpu will-change-transform">
               <FeatureStageTwo  />
            </div>

            {/* ========================================== */}
            {/* STAGE 3 (Overlaps Stage 2 exactly from bottom) */}
            {/* ========================================== */}
            <div id="stage-3" className="overlap-section relative z-[30] w-full bg-[#FAF6EF] rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] transform-gpu will-change-transform">
               <FeatureStageThree />
            </div>

            {/* ========================================== */}
            {/* STAGE 4 (Overlaps Stage 3 exactly from bottom) */}
            {/* ========================================== */}
            <div id="stage-4" className="overlap-section relative z-[40] w-full bg-[#FAF6EF] rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] transform-gpu will-change-transform">
               <FeatureStageFour />
            </div>

            {/* ========================================== */}
            {/* CTA SECTION (Overlaps Stage 4 exactly from bottom) */}
            {/* ========================================== */}
            {/* 🚀 FIX: Dark section shadow also reduced for a softer blend */}
            <div className="relative z-[50] w-full bg-brand-dark rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.15)] transform-gpu will-change-transform">
               <FeatureCTA />
            </div>

        </div>
    );
};

export default FeatureStages;