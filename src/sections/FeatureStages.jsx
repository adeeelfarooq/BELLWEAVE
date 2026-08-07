import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FeatureHero from './FeaturesHero';
import FeatureStageOne from './FeatureStageOne';
import FeatureStageTwo from './FeatureStageTwo';
import FeatureStageThree from './FeatureStageThree';
import FeatureStageFour from './FeatureStageFour';
import FeatureCTA from './FeatureCTA'; // 🚀 Naya Import!

gsap.registerPlugin(ScrollTrigger);

const FeatureStages = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // 1. Initial Hero Animations 
        const tlHero = gsap.timeline({ delay: 0.2 });
        tlHero.fromTo(".stage-tag", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" })
              .to(".feature-hero-title-line", { y: "0%", rotation: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "expo.out" }, "-=0.4")
              .fromTo(".feature-hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
              .fromTo(".feature-hero-btn-wrapper", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        // 2. Hide Stage 1 to the right initially
        gsap.set(".stage-1-panel", { xPercent: 100 });

        // 3. The Slide Animation Timeline (Auto-plays on scroll)
        const slideTl = gsap.timeline({ paused: true });
        
        slideTl.to(".stage-1-panel", 
            { xPercent: 0, ease: "power3.inOut", duration: 1.2 }
        )
        .fromTo(".text-reveal-1",
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
            "-=0.6" 
        )
        .fromTo(".ui-card-stage-1",
            { opacity: 0, x: 80, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            "-=0.6" 
        );

        let hasPlayed = false;

        // 4. The Perfect Pin Trigger for Stage 1
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top", 
            end: "+=400", 
            pin: true, 
            anticipatePin: 1, 
            onUpdate: (self) => {
                if (self.progress > 0.05 && !hasPlayed) {
                    slideTl.play();
                    hasPlayed = true;
                } 
                else if (self.progress <= 0.05 && hasPlayed) {
                    slideTl.reverse();
                    hasPlayed = false;
                }
            }
        });

        // ==========================================
        // STAGE 2 NORMAL SCROLL ANIMATIONS
        // ==========================================
        gsap.utils.toArray(".text-reveal-2").forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                  scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        gsap.fromTo(".ui-card-stage-2",
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: ".ui-card-stage-2", start: "top 85%" }
            }
        );

        gsap.fromTo(".rule-card",
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: ".rules-grid", start: "top 85%" }
            }
        );

        gsap.fromTo(".soft-goal-card",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: ".soft-goals-grid", start: "top 85%" }
            }
        );

        // ==========================================
        // STAGE 3 NORMAL SCROLL ANIMATIONS
        // ==========================================
        gsap.utils.toArray(".text-reveal-3").forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                  scrollTrigger: { trigger: elem, start: "top 85%" }
            }
            );
        });

        gsap.fromTo(".timeline-item",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
              scrollTrigger: { trigger: ".timeline-item", start: "top 80%" }
            }
        );

        gsap.fromTo(".ui-card-stage-3",
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: ".ui-card-stage-3", start: "top 85%" }
            }
        );

        // ==========================================
        // STAGE 4 NORMAL SCROLL ANIMATIONS
        // ==========================================
        gsap.utils.toArray(".text-reveal-4").forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                  scrollTrigger: { trigger: elem, start: "top 85%" }
            }
            );
        });

        gsap.utils.toArray(".ui-card-stage-4").forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 60, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
                  scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // ==========================================
        // 🚀 CTA SCROLL ANIMATIONS
        // ==========================================
        gsap.fromTo(".cta-reveal",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: ".cta-reveal", start: "top 90%" }
            }
        );

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-brand-dark">
            <div className="grid grid-cols-1 grid-rows-1 w-full relative">
               <FeatureHero />
               <FeatureStageOne />
            </div>
            
            <FeatureStageTwo />
            <FeatureStageThree />
            <FeatureStageFour />
            
            {/* 🚀 CTA INCLUDED HERE */}
            <FeatureCTA />
            
        </div>
    );
};

export default FeatureStages;