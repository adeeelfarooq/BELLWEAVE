import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

// BELLWEAVE PERSONA DATA
const personasData = [
  {
    id: 1,
    role: "Head teachers & deputies",
    desc: "The whole term in one place — no surprises on a Monday morning.",
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422A12.083 12.083 0 0121 15.5c0 3.038-4.03 5.5-9 5.5s-9-2.462-9-5.5c0-1.14.507-2.29 1.84-3.422L12 14z" />
      </svg>
    ),
  },
  {
    id: 2,
    role: "Business managers",
    desc: "One campus or many, scheduled the same honest way.",
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 3,
    role: "Timetablers & schedulers",
    desc: "Build it once, trust it every single week.",
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    role: "IT & systems leads",
    desc: "A system that says what it did, not just what it meant to do.",
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function BuiltForSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Heading Word-by-word color reveal
    const splitText = new SplitText(".persona-heading", {
      type: "words",
      wordsClass: "word-item transform-gpu will-change-transform",
    });

    const words = splitText.words;
    gsap.set(words, { color: "#666", opacity: 0.5 });

    words.forEach((word, i) => {
      gsap.to(word, {
        color: "#0f172a",
        opacity: 1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".persona-heading",
          start: `top+=${i * 50} 65%`,
          end: `top+=${i * 50 + 50} 100%`,
          scrub: 1,
        },
      });
    });

    // 2. Subtitle fade in (Using fromTo for safety)
    gsap.fromTo(".persona-subtitle", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".persona-subtitle",
          start: "top 85%",
          once: true,
        },
      }
    );

    // 3. Cards Pin + One-by-One Entrance (FIXED LOGIC - Using fromTo)
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", 
        scrub: 1.5,
        pin: true,
      }
    });

    // 🚀 FIX: fromTo explicitly defines start and end values so React Strict Mode doesn't break it
    pinTl.fromTo(".persona-card", 
      { 
        y: 400, // Cards will strictly start 400px below
        opacity: 0 
      },
      { 
        y: 0, // And accurately settle at their original place
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        force3D: true,
      }
    );

    return () => splitText.revert();
  }, { scope: containerRef });

  // Page fully load hone par ScrollTrigger positions refresh
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#FAF6EF] text-brand-dark h-screen w-full flex flex-col justify-center px-6 md:px-14 py-6 relative overflow-hidden"
    >
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl flex flex-col justify-center items-center mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl   mb-8 md:mb-12">
          <h1 className="persona-heading  hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-4">
            Built for whoever owns the timetable.
          </h1>
          <p className="persona-subtitle text-gray-500 text-center text-sm md:text-lg leading-relaxed font-medium">
            Head teacher, deputy head, business manager, or the person who actually builds the grid every term — Bellweave is built around them.
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="persona-grid grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {personasData.map((p) => (
            <div 
              key={p.id} 
              className="persona-card group bg-white border border-gray-100 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Box */}
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3 md:mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                {p.icon}
              </div>

              {/* Role Title */}
              <h3 className="text-sm md:text-lg font-bold text-brand-dark mb-1.5 md:mb-3 leading-snug">
                {p.role}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium hidden sm:block">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}