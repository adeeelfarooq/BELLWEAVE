import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import PageContainer from '../components/PageContainer';

gsap.registerPlugin(ScrollTrigger);

// 🚀 Data for 13 Hard Constraints
const hardRules = [
    { id: "H1", text: "A teacher is in at most one session per (date, period)." },
    { id: "H2", text: "A room hosts at most one session per (date, period)." },
    { id: "H3", text: "A cohort has at most one non-elective session per (date, period)." },
    { id: "H4", text: "A student is in at most one session per (date, period)." },
    { id: "H5", text: "A session’s room has all the feature tags the lesson requires — the subject’s own, plus anything the curriculum adds." },
    { id: "H6", text: "Room capacity ≥ the number of students attending." },
    { id: "H7", text: "The teacher is qualified for the subject." },
    { id: "H8", text: "The teacher is available — weekly window, and not inside an absence." },
    { id: "H9", text: "The room is available — no closure and no booking." },
    { id: "H10", text: "A teacher never exceeds max periods per day / per week." },
    { id: "H11", text: "All options of an elective block are scheduled in the same period(s)." },
    { id: "H12", text: "A session’s teacher and room are on the same campus as its cohort." },
    { id: "H13", text: "A multi-period session occupies consecutive teaching periods, with one room and one teacher." },
];

// 🚀 Data for 4 Soft Goals
const softGoals = [
    { id: "S1", text: "Balance teacher load evenly across the week." },
    { id: "S2", text: "Spread a subject across the week rather than clustering it on one day." },
    { id: "S3", text: "Honour teacher preferences — preferred rooms, avoid-early." },
    { id: "S4", text: "Prefer the homeroom teacher for the cohort’s core subjects. Configurable; off by default." },
];

const FeatureStageTwo = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // UI Card Parallax Animation
        gsap.fromTo(".ui-card-stage-2", 
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

        // Floating Parallax effect
        gsap.to(".ui-card-stage-2", {
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
        gsap.fromTo(".text-reveal-2",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

        // Grid Cards (13 Rules) Reveal Animation
        gsap.fromTo(".rule-card",
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".rules-grid",
                    start: "top 80%",
                }
            }
        );
        
        // Soft Goals Reveal
        gsap.fromTo(".soft-goal-card",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".soft-goals-grid",
                    start: "top 85%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        // 🚀 FIX: Exact Background Match with Stage 1.0 (Grid + Milk Yellow)
        <section id="stage-publish" ref={sectionRef} className="relative w-full bg-[#FAF6EF] text-[#0f172a] py-24 lg:py-36 overflow-hidden border-t border-black/5">
            
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0f6a31]/10 blur-[120px] pointer-events-none"></div>

            <PageContainer className="flex flex-col gap-24 lg:gap-32 relative z-10 w-full h-full">
                
                {/* 🚀 TOP PART: Intro & Feasibility Report Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: TEXT CONTENT */}
                    <div className="lg:col-span-6 flex flex-col gap-5 lg:pr-8">
                        <span className="text-reveal-2 text-[#0f6a31] font-black text-4xl lg:text-5xl drop-shadow-sm tracking-tight inline-block w-max">
                            2.0
                        </span>
                        
                        <h2 className="text-reveal-2 text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-2 text-[#0f172a]">
                            Publish what you can defend.
                        </h2>
                        
                        <div className="text-reveal-2 flex flex-col gap-5 text-sm md:text-[15px] font-medium text-gray-600 leading-relaxed">
                            <p>
                                Generation runs per campus, per term. What comes back is a draft — and a list of everything it refused to do.
                            </p>
                            <p>
                                <strong className="text-[#0f172a]">The generator cannot break a hard rule. Not quietly, not loudly, not at all.</strong>
                            </p>
                            <p>
                                That sentence is the whole product. There are thirteen hard constraints. They are not preferences, and they are not weighted — they hold, or the slot stays empty.
                            </p>
                            <p>
                                When everything cannot be satisfied at once, Bellweave does not quietly produce a timetable that looks fine and isn’t. It leaves the period unassigned, flags it, and tells you exactly what it collided with.
                            </p>
                            <p>
                                <strong className="text-[#0f172a]">Only a human may waive a hard rule</strong> — and only with a recorded reason, naming which rules were waived. There is no other door.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PREMIUM FEASIBILITY REPORT CARD */}
                    <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
                        
                        {/* 🚀 FIX: Clean, White, Shadow-2xl Luxury Box */}
                        <div className="ui-card-stage-2 w-full max-w-xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden">
                            
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                                <h3 className="font-bold text-[#0f172a] tracking-wide text-sm">Feasibility report <span className="font-medium text-gray-400">· one unplaced period</span></h3>
                                <div className="flex gap-2 items-center bg-red-50 px-3 py-1.5 rounded-full border border-red-100 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Alert</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 relative z-10">
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-red-100 w-max">Unassigned</span>
                                    <h4 className="text-sm font-bold text-[#0f172a]">Grade-9 Chemistry <span className="font-medium text-gray-400">— period 3 unplaced</span></h4>
                                </div>

                                {/* Clean Code-like Error Box */}
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-[13px] font-medium text-gray-600 leading-relaxed shadow-sm">
                                    “Grade-9 Chemistry needs a chem-lab in period 3, but the only chem-lab room is already taken by 10-B chemistry.”
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-gray-500 leading-relaxed">
                                    <span>Collides with</span>
                                    <span className="bg-[#0f6a31]/10 text-[#0f6a31] px-2 py-0.5 rounded uppercase font-bold text-[11px] border border-[#0f6a31]/20">H5</span>
                                    <span>— the room must carry every feature the lesson requires — and the only room that does is already occupied that period (</span>
                                    <span className="bg-[#0f6a31]/10 text-[#0f6a31] px-2 py-0.5 rounded uppercase font-bold text-[11px] border border-[#0f6a31]/20">H2</span>
                                    <span>).</span>
                                </div>

                            </div>

                            <div className="mt-2 pt-5 border-t border-gray-100 flex gap-3 items-start relative z-10">
                                <svg className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-[11px] lg:text-xs text-gray-500 font-medium leading-relaxed">
                                    Every unplaced period comes back with a diagnosed reason written like this one. Not a shrug. <strong className="text-[#0f172a]">The sentence that tells you what to go and fix.</strong>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 🚀 MIDDLE PART: The 13 Hard Constraints (Clean Luxury Grid) */}
                <div className="flex flex-col gap-10 lg:gap-14">
                    
                    <div className="text-reveal-2 text-center max-w-2xl mx-auto flex flex-col gap-2">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a]">
                            The thirteen. Never violated.
                        </h2>
                        <p className="text-[15px] font-medium text-gray-500">
                            Not by generation, not by a substitution, not by a room change.
                        </p>
                    </div>

                    <div className="rules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                        {hardRules.map((rule, index) => (
                            <div key={index} className="rule-card bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(15,106,49,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                                <div className="text-[#0f6a31] font-black text-xl tracking-tight">
                                    {rule.id}
                                </div>
                                <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                    {rule.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🚀 BOTTOM PART: The 4 Soft Goals (Frosted Dashed Design) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-6">
                    
                    <div className="lg:col-span-5 flex flex-col gap-5 text-reveal-2 lg:pr-8">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a] leading-[1.1]">
                            Four soft goals bend.<br/> The thirteen do not.
                        </h2>
                        <p className="text-[15px] font-medium text-gray-600 leading-relaxed">
                            These are optimised and weighted, and the weights are yours to set. When one of them loses, nothing breaks — the timetable is simply a little less elegant than it could have been.
                        </p>
                    </div>

                    <div className="lg:col-span-7 soft-goals-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {softGoals.map((goal, index) => (
                            <div key={index} className="soft-goal-card bg-white/40 backdrop-blur-sm p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0f6a31]/40 hover:bg-white transition-all duration-300 flex flex-col gap-4">
                                <div className="text-gray-400 font-bold text-lg tracking-tight">
                                    {goal.id}
                                </div>
                                <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                    {goal.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🚀 Outro Paragraphs */}
                <div className="max-w-3xl mx-auto text-center mt-6 lg:mt-10 flex flex-col gap-6 text-reveal-2 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0f172a]">
                        Draft, review, publish.
                    </h2>
                    <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed">
                        The draft and its feasibility report land together, so the review is a real one: here is the week, and here are the periods it could not place, each with the sentence explaining why. You fix the inputs and run it again, or you resolve the gaps by hand and record that you did.
                    </p>
                    <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed">
                        <strong className="text-[#0f172a]">Publishing versions the result.</strong> That version number matters later — every override made against a published timetable remembers which version it was made against, which is what makes stage 4.0 possible at all.
                    </p>
                </div>

            </PageContainer>
        </section>
    )
}

export default FeatureStageTwo;