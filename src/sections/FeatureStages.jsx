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
        const tlHero = gsap.timeline({ delay: 0.2 });
        tlHero.fromTo(".stage-tag", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" })
              .to(".feature-hero-title-line", { y: "0%", rotation: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out" }, "-=0.4")
              .fromTo(".feature-hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
              .fromTo(".feature-hero-btn-wrapper", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        // ==========================================
        // 2. HERO TO STAGE 1 (RIGHT-TO-LEFT SLIDE)
        // 🚀 FIX: NO PINNING! Natural scrolling continues.
        // ==========================================
        gsap.set(".stage-1-panel", { xPercent: 100 });

        const slideTl = gsap.timeline({ paused: true });
        
        // Thora fast slide (0.8s) taake scroll ke sath natural feel ho
        slideTl.to(".stage-1-panel", { xPercent: 0, ease: "power3.out", duration: 0.8 })
               .fromTo(".text-reveal-1", { opacity: 0, x: 40 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4")
               .fromTo(".ui-card-stage-1", { opacity: 0, x: 80, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.5");

        // 🚀 THE FIX: Pinning hata di gayi hai. Halka sa scroll hote hi ye simply animation play kar dega.
        ScrollTrigger.create({
            trigger: ".hero-stage1-wrapper",
            start: "top -10px", // Jaise hi 10px neechay scroll hoga
            onEnter: () => slideTl.play(), // Right se slide In ho jaye
            onLeaveBack: () => slideTl.reverse(), // Wapis Hero pe jao to slide out ho jaye
        });

        // ==========================================
        // 3. VERTICAL OVERLAP (Stacking Stages 1 to 4)
        // ==========================================
        const overlapSections = gsap.utils.toArray('.overlap-section');

        overlapSections.forEach((section, index) => {
            if (index !== overlapSections.length - 1) { // Stage 4 ko pin nahi karenge
                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom", // Jab section ka bottom hit kare
                    pin: true, // Wahin lock ho jaye
                    pinSpacing: false, // Aur agla section is k oopar chadha aaye
                });
            }
        });

        // ==========================================
        // 4. INTERNAL UI ANIMATIONS (Stages 2 to 4)
        // ==========================================
        const textElements = gsap.utils.toArray(".text-reveal-2, .text-reveal-3, .text-reveal-4");
        textElements.forEach((elem) => {
            gsap.fromTo(elem, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: elem, start: "top 85%" } });
        });

        const uiCards = gsap.utils.toArray(".ui-card-stage-2, .ui-card-stage-3, .ui-card-stage-4");
        uiCards.forEach((card) => {
            gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } });
        });

        gsap.fromTo(".rule-card", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".rules-grid", start: "top 85%" } });
        gsap.fromTo(".soft-goal-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".soft-goals-grid", start: "top 85%" } });
        gsap.fromTo(".timeline-item", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".timeline-item", start: "top 80%" } });
        gsap.fromTo(".cta-reveal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".cta-reveal", start: "top 90%" } });

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef} className="relative w-full bg-brand-dark overflow-hidden">
            
            {/* ========================================== */}
            {/* SCENE 1: Hero & Stage 1 (Right to Left Slide) */}
            {/* ========================================== */}
            <div className="hero-stage1-wrapper overlap-section relative z-[10] w-full">
                <div className="grid grid-cols-1 grid-rows-1 w-full relative">
                    
                    {/* 🚀 THE HERO FIX: sticky top-0 */}
                    {/* Is ki wajah se scroll pathar ki tarah lock rahega bina scroll ko roke! */}
                    <div className="col-start-1 row-start-1 self-start w-full h-screen sticky top-0 bg-brand-dark">
                        <FeatureHero />
                    </div>
                    
                    {/* Stage 1 Panel: Clean background without shadow */}
                    <div className="stage-1-panel col-start-1 row-start-1 w-full z-[15]">
                        <FeatureStageOne />
                    </div>

                </div>
            </div>

            {/* ========================================== */}
            {/* STAGE 2 (Overlaps Stage 1 exactly from bottom) */}
            {/* ========================================== */}
            <div className="overlap-section relative z-[20] w-full bg-[#FAF6EF] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[2.5rem]">
               <FeatureStageTwo />
            </div>

            {/* ========================================== */}
            {/* STAGE 3 (Overlaps Stage 2 exactly from bottom) */}
            {/* ========================================== */}
            <div className="overlap-section relative z-[30] w-full bg-[#FAF6EF] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[2.5rem]">
               <FeatureStageThree />
            </div>

            {/* ========================================== */}
            {/* STAGE 4 (Overlaps Stage 3 exactly from bottom) */}
            {/* ========================================== */}
            <div className="overlap-section relative z-[40] w-full bg-[#FAF6EF] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[2.5rem]">
               <FeatureStageFour />
            </div>

            {/* ========================================== */}
            {/* CTA SECTION (Overlaps Stage 4 exactly from bottom) */}
            {/* ========================================== */}
            <div className="relative z-[50] w-full bg-brand-dark shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[2.5rem]">
               <FeatureCTA />
            </div>

        </div>
    );
};

export default FeatureStages;