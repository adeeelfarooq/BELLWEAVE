import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import PageContainer from '../components/PageContainer';

gsap.registerPlugin(ScrollTrigger);

const standardPeriods = [
    { name: "P1", time: "08:30–09:15", type: "lesson" },
    { name: "P2", time: "09:15–10:00", type: "lesson" },
    { name: "Break", time: "10:00–10:15", type: "break" },
    { name: "P3", time: "10:15–11:00", type: "lesson" },
    { name: "P4", time: "11:00–11:45", type: "lesson" },
    { name: "Lunch", time: "11:45–12:30", type: "break" },
    { name: "P5", time: "12:30–13:15", type: "lesson" },
    { name: "P6", time: "13:15–14:00", type: "lesson" },
];

const halfDayPeriods = [
    { name: "P1", time: "08:30–09:15", type: "lesson" },
    { name: "P2", time: "09:15–10:00", type: "lesson" },
    { name: "Break", time: "10:00–10:15", type: "break" },
    { name: "P3", time: "10:15–11:00", type: "lesson" },
    { name: "P4", time: "11:00–11:45", type: "lesson" },
    { name: "Dismissal", time: "11:45", type: "end" },
];

// 🚀 FIX: Premium Light UI Pills 
const ScheduleBlock = ({ name, time, type }) => {
    let styles = "bg-white border-gray-200 text-[#0f172a]"; // default lesson
    let titleColor = "text-[#0f172a]";
    
    if (type === "break") {
        styles = "bg-[#0f6a31]/10 border-[#0f6a31]/20 text-[#0f6a31]";
        titleColor = "text-[#0f6a31]";
    }
    if (type === "end") {
        styles = "bg-red-50 border-red-200 text-red-600";
        titleColor = "text-red-600";
    }

    return (
        <div className={`flex flex-col px-3 py-2 rounded-xl border ${styles} min-w-[85px] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default`}>
            <span className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider ${titleColor}`}>{name}</span>
            <span className="text-[9px] lg:text-[10px] font-medium opacity-80 mt-0.5">{time}</span>
        </div>
    );
};

const FeatureStageOne = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // UI Card Parallax Animation (Fades in sharply and floats up)
        gsap.fromTo(".ui-card-stage-1", 
            { opacity: 0, y: 60, scale: 0.98 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

        // Floating Parallax effect on scroll for the card
        gsap.to(".ui-card-stage-1", {
            y: -40,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Text Fade Up Animation
        gsap.fromTo(".text-reveal-1",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        // 🚀 FIX: Exact Hero Section Background (Milk Yellow / Off-white)
        <section id="stage-build" ref={sectionRef} className="relative w-full bg-[#FAF6EF] text-[#0f172a] py-24 lg:py-36 overflow-hidden">
            
            {/* 🚀 FIX: Exact Hero Section GRID LINES & GLOW */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0f6a31]/10 blur-[120px] pointer-events-none"></div>

            <PageContainer className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
                
                {/* LEFT COLUMN: TEXT CONTENT */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:pr-8">
                    <span className="text-reveal-1 text-[#0f6a31] font-black text-4xl lg:text-5xl drop-shadow-sm tracking-tight inline-block w-max">
                        1.0
                    </span>
                    
                    <h2 className="text-reveal-1 text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-2 text-[#0f172a]">
                        Set up the campus.
                    </h2>
                    
                    <div className="text-reveal-1 flex flex-col gap-5 text-sm md:text-[15px] font-medium text-gray-600 leading-relaxed">
                        <p>
                            A timetable is not built out of constants. It is built out of what a campus actually does on a Wednesday.
                        </p>
                        <p>
                            <strong className="text-[#0f172a]">The bell schedule is configuration.</strong> Periods default to 45 minutes, with a 15-minute break after every two, plus lunch — and then you change all of it, per campus, per weekday. Ashford Grange runs a standard day on Monday, Tuesday, Thursday and Friday, and dismisses early on Wednesday. Days that share a skeleton share one schedule.
                        </p>
                        <p>
                            <strong className="text-[#0f172a]">The teaching week is not a setting anyone types.</strong> It is derived from whatever the bell schedules cover — Monday to Friday here, Monday to Saturday elsewhere. Leave counting keeps its own working week; that one you do set.
                        </p>
                        <p>
                            <strong className="text-[#0f172a]">Named periods hold no lessons.</strong> Homeroom, assembly, break, lunch, supervised study. They appear on the grid, labelled, taking up the room they really take up — and the generator is never allowed to schedule into them.
                        </p>
                        <p>
                            <strong className="text-[#0f172a]">Then the things that constrain it.</strong> Each cohort’s curriculum, each teacher's qualifications and load caps, and each room's capacity and feature tags.
                        </p>
                        
                        {/* Highlighted Quote / Rule Box */}
                        <div className="mt-2 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#0f6a31]/10 shadow-sm relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f6a31]"></div>
                            <p className="text-[13px] italic text-gray-600 font-medium leading-relaxed">
                                Tags are picked from a curated catalog, never free-typed: chem-lab, fume-hood, gym, projector. That is deliberate. The day somebody types <span className="font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 not-italic">gymnasium</span> is the day room matching quietly stops working, and nobody finds out until a class has nowhere to go.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: LUXURY SAAS CARD */}
                <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
                    
                    {/* 🚀 FIX: Premium White BookDemo-style Card */}
                    <div className="ui-card-stage-1 w-full max-w-xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden">
                        
                        {/* Subtle inner glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#0f6a31]/5 rounded-full blur-[80px] pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                            <h3 className="font-bold text-[#0f172a] tracking-wide text-sm">Bell schedules · Ashford Grange</h3>
                            <div className="flex gap-2 items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-[#0f6a31] animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-7 relative z-10">
                            
                            {/* Standard Day Row */}
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-end border-b border-dashed border-gray-200 pb-1.5">
                                    <span className="text-sm font-bold text-[#0f172a]">Standard</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mon · Tue · Thu · Fri</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {standardPeriods.map((p, i) => (
                                        <ScheduleBlock key={i} name={p.name} time={p.time} type={p.type} />
                                    ))}
                                </div>
                            </div>

                            {/* Half Day Row */}
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-end border-b border-dashed border-gray-200 pb-1.5">
                                    <span className="text-sm font-bold text-[#0f172a]">Half-day</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wed</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {halfDayPeriods.map((p, i) => (
                                        <ScheduleBlock key={i} name={p.name} time={p.time} type={p.type} />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer Note */}
                        <div className="mt-2 pt-5 border-t border-gray-100 flex gap-3 items-start relative z-10">
                            <svg className="w-5 h-5 text-[#0f6a31] shrink-0 mt-0.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-[11px] lg:text-xs text-gray-500 font-medium leading-relaxed">
                                Two schedules cover the week between them. Break and lunch are on the grid and labelled; <strong className="text-[#0f172a]">nothing is ever scheduled into them.</strong>
                            </p>
                        </div>

                    </div>
                </div>

            </PageContainer>
        </section>
    )
}

export default FeatureStageOne;