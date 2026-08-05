// src/components/WhatItDoesSection.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: "01",
    title: "Builds a timetable that holds.",
    desc: "Every teacher, room and class stays conflict-free, automatically, every week of term. When something genuinely can't be scheduled, Bellweave says so instead of quietly forcing it in.",
    link: "Read the rules it never breaks",
  },
  {
    id: "02",
    title: "Covers the Monday someone's out.",
    desc: "The moment a teacher calls in sick, Bellweave finds the best-placed colleague to step in — or tells you plainly when nobody qualified is free, instead of guessing.",
    link: "See a real morning play out",
  },
  {
    id: "03",
    title: "Keeps an honest record.",
    desc: "Every change is logged: who, when, and why. The published plan is never quietly rewritten, so you can always account for what actually happened.",
    link: "See how the record works",
  },
];

// Compact fanned deck positions — buffer of 30px on top card so hover pop never clips
const cardConfig = [
  { rotate: -2, x: 0, y: 30, z: 30 },
  { rotate: -11, x: -30, y: 86, z: 20 },
  { rotate: -20, x: -58, y: 142, z: 10 },
];

const COLORS = {
  bg: "#211D1A",
  text: "#FAF6EF",
  gold: "#0f6a31",
  cardBg: "#FAF6EF",
  cardText: "#211D1A",
};

export default function WhatItDoesSection() {
  const sectionRef = useRef(null);
  const stackWrapperRef = useRef(null);

  const outerRefs = useRef([]);
  const innerRefs = useRef([]);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      line1Ref.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1, x: 0, duration: 2.2, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    gsap.fromTo(
      line2Ref.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0, duration: 2.2, delay: 0.15, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    gsap.fromTo(
      line3Ref.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 1.2, delay: 0.3, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    cardConfig.forEach((cfg, i) => {
      const outer = outerRefs.current[i];
      const inner = innerRefs.current[i];
      if (!outer || !inner) return;

      gsap.set(outer, {
        x: cfg.x,
        y: cfg.y + 100,
        opacity: 0,
        zIndex: cfg.z,
        force3D: true,
      });

      gsap.set(inner, {
        rotate: cfg.rotate,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
        force3D: true,
      });
    });

    cardConfig.forEach((cfg, i) => {
      const outer = outerRefs.current[i];
      if (!outer) return;
      gsap.to(outer, {
        y: cfg.y,
        opacity: 1,
        duration: 1.1,
        delay: i * 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: stackWrapperRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  const handleEnter = (i) => {
    const outer = outerRefs.current[i];
    const inner = innerRefs.current[i];

    gsap.set(outer, { zIndex: 50 });

    gsap.to(inner, {
      rotate: 0,
      x: -20,
      y: -20,
      scale: 1.06,
      boxShadow: "0 35px 70px rgba(0,0,0,0.55)",
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleLeave = (i) => {
    const outer = outerRefs.current[i];
    const inner = innerRefs.current[i];
    const cfg = cardConfig[i];

    gsap.to(inner, {
      rotate: cfg.rotate,
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
      duration: 0.5,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        gsap.set(outer, { zIndex: cfg.z });
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F0E9DD] w-full h-screen overflow-hidden flex flex-col lg:block"
    //   style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none opacity-20 blur-[140px]"
        style={{ backgroundColor: COLORS.gold }}
      ></div>
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      {/* TOP-LEFT HEADING — exact content: "What it actually does." */}
      <div className="relative lg:absolute top-0 lg:top-10 left-0 lg:left-16 z-20 max-w-md px-6 pt-8 lg:pt-0 lg:px-0 text-center lg:text-left mx-auto lg:mx-0 shrink-0">
        <div className="mb-2">
          <div className="overflow-hidden mb-1">
            <h1 ref={line1Ref} className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-none opacity-0">
              What it
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <h2
              ref={line2Ref}
              className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tight leading-none opacity-0"
              style={{ color: COLORS.gold }}
            >
              Actually
            </h2>
          </div>
          <div className="overflow-hidden">
            <h3 ref={line3Ref} className="text-xl sm:text-2xl lg:text-4xl font-black uppercase tracking-tight leading-none opacity-0">
              Does.
            </h3>
          </div>
        </div>
      </div>

      {/* CENTER — FANNED CARD DECK, always centered within whatever space remains inside the single screen */}
      <div
        ref={stackWrapperRef}
        className="relative z-10 w-full flex-1 min-h-0 flex items-center justify-center lg:h-full"
      >
        <div className="relative w-[240px] sm:w-[280px] h-[420px] sm:h-[480px]">
          {featuresData.map((f, i) => (
            <div
              key={f.id}
              ref={(el) => (outerRefs.current[i] = el)}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              className="absolute top-0 left-0 w-full h-[260px] sm:h-[300px] cursor-pointer"
            >
              <div
                ref={(el) => (innerRefs.current[i] = el)}
                className="w-full h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 will-change-transform flex flex-col"
                style={{
                  backgroundColor: COLORS.cardBg,
                  color: COLORS.cardText,
                }}
              >
                <span
                  className="block text-2xl sm:text-3xl font-extralight leading-none mb-2 sm:mb-3"
                  style={{ color: COLORS.gold }}
                >
                  {f.id}
                </span>

                <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight mb-2">
                  {f.title}
                </h3>

                <p className="text-[11px] sm:text-xs leading-relaxed mb-3" style={{ color: "rgba(33,29,26,0.65)" }}>
                  {f.desc}
                </p>

                <a
                  href="#"
                  className="group mt-auto inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wide"
                  style={{ color: COLORS.gold }}
                >
                  <span className="relative">
                    {f.link}
                    <span
                      className="absolute left-0 -bottom-1 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{ backgroundColor: COLORS.gold }}
                    ></span>
                  </span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}