import React from 'react';
import PageContainer from './PageContainer';

// Reusable Detail Row for the Audit Card
const AuditRow = ({ label, value, isStatus, isVersion }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
        <span className="text-[12px] font-bold text-gray-400 w-1/3">{label}</span>
        <div className="w-2/3 flex justify-end text-right">
            {isStatus ? (
                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border bg-[#0f6a31]/10 text-[#0f6a31] border-[#0f6a31]/20">
                    {value}
                </span>
            ) : isVersion ? (
                <span className="font-mono text-[12px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {value}
                </span>
            ) : (
                <span className={`text-[13px] font-bold ${label === 'Session' ? 'font-mono tracking-tight text-[#0f172a]' : 'text-[#0f172a]'}`}>
                    {value}
                </span>
            )}
        </div>
    </div>
);

const FeatureStageFour = () => {
    return (
        // 🚀 OPTIMIZATION: Main container gets transform-gpu to prevent overlap scroll jank
        <section id="stage-account" className="w-full min-h-dvh bg-[#FAF6EF] text-[#0f172a] py-24 lg:py-36 overflow-hidden border-t border-black/5 will-change-transform transform-gpu">
            
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            {/* 🚀 OPTIMIZATION: Heavy background blurs offloaded to GPU */}
            <div className="absolute top-[10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none transform-gpu"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0f6a31]/5 blur-[120px] pointer-events-none transform-gpu"></div>

            <PageContainer className="flex flex-col gap-24 lg:gap-32 relative z-10 w-full h-full">
                
                {/* TOP PART: Intro & Audit Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
                    
                    <div className="lg:col-span-6 flex flex-col gap-5 lg:pr-8">
                        {/* 🚀 OPTIMIZATION: All GSAP targets (text-reveal-4) get transform-gpu for smooth rendering */}
                        <span className="text-reveal-4 text-[#0f6a31] font-black text-4xl lg:text-5xl drop-shadow-sm tracking-tight inline-block w-max opacity-0 transform-gpu will-change-[transform,opacity]">
                            4.0
                        </span>
                        
                        <h2 className="text-reveal-4 text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-2 text-[#0f172a] opacity-0 transform-gpu will-change-[transform,opacity]">
                            Answer for it later.
                        </h2>
                        
                        <div className="text-reveal-4 flex flex-col gap-5 text-sm md:text-[15px] font-medium text-gray-600 leading-relaxed opacity-0 transform-gpu will-change-[transform,opacity]">
                            <p>Two layers. One is the plan; the other is the week that actually happened. Keeping them apart is what makes a year auditable instead of merely finished.</p>
                            <p><strong className="text-[#0f172a]">Layer 1 — the base timetable.</strong> The plan. Generated, versioned, published. It says 9A have English with Ms L. Price at P3 on Mondays, and it goes on saying that. It does not know Mr T. Bell was ill, and it should not.</p>
                            <p><strong className="text-[#0f172a]">Layer 2 — what happened on the date.</strong> Monday’s substitution lives here, on the occurrence. Which is exactly why next Monday needs no undoing: the plan was never edited, so it simply reasserts itself.</p>
                            
                            <div className="mt-2 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                                <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                                    Every override — substitution, room change, cancellation — and every flag and every manual resolution is audited: who, when, before, after. Including which hard rules a human chose to waive, and the reason they gave.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AUDIT LOG PREMIUM CARD */}
                    <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
                        {/* 🚀 OPTIMIZATION: Large animated card offloaded to Graphics Card */}
                        <div className="ui-card-stage-4 w-full max-w-xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-100 flex flex-col gap-4 relative overflow-hidden opacity-0 transform-gpu will-change-transform">
                            
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none transform-gpu"></div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                                <h3 className="font-bold text-[#0f172a] tracking-wide text-sm flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Audit entry
                                </h3>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Log</div>
                            </div>

                            <div className="flex flex-col relative z-10">
                                <AuditRow label="When" value="Mon 13 Jul 2026 · 08:52" />
                                <AuditRow label="Who" value="Imran R." />
                                <AuditRow label="Session" value="9A · English · P3 · 10:15–11:00" />
                                <AuditRow label="Before" value="Ms L. Price" />
                                <AuditRow label="After" value="Mr J. Hale" />
                                <AuditRow label="Status" value="substituted" isStatus />
                                <AuditRow label="Version" value="v11" isVersion />
                            </div>

                            <div className="mt-2 pt-4 border-t border-gray-100 flex gap-3 items-start relative z-10 bg-gray-50 -mx-8 -mb-8 p-6">
                                <p className="text-[11px] lg:text-xs text-gray-500 font-medium leading-relaxed">
                                    The version is not decoration. It records the published timetable this override was made against — which is what lets a republish tell a stale override from a sound one, rather than guessing.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* MIDDLE PART: Republishing Logic */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center mt-6">
                    
                    <div className="lg:col-span-6 lg:order-2 flex flex-col gap-5 lg:pl-8 text-reveal-4 opacity-0 transform-gpu will-change-[transform,opacity]">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a] leading-[1.1]">
                            Republishing is where most systems quietly lose the truth.
                        </h2>
                        
                        <div className="flex flex-col gap-5 text-sm md:text-[15px] font-medium text-gray-600 leading-relaxed mt-2">
                            <p>Half-way through term the curriculum changes, a teacher leaves, and you have to generate and publish again. The new base plan does not know about the fortnight of overrides sitting on top of the old one.</p>
                            <p>This is the moment a scheduling system either keeps its record or silently rewrites history.</p>
                            <p><strong className="text-[#0f172a]">Past occurrences are immutable. Frozen.</strong> A republish never rewrites a day that has already happened — whatever was taught, by whom, in which room, stays exactly as recorded, including the days that went wrong.</p>
                            <p><strong className="text-[#0f172a]">Future overrides are re-validated, never silently dropped.</strong> If the new base moved or removed the session an override was attached to, the override is not deleted and it is not blindly re-applied.</p>
                            <p>Because every override remembers its version, a mismatch is detectable rather than inferred. That is the difference between a system that can be audited and a system that merely looks tidy.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-6 lg:order-1 relative w-full flex justify-center lg:justify-start">
                        {/* 🚀 OPTIMIZATION: Card GPU rendering */}
                        <div className="ui-card-stage-4 w-full max-w-xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-100 flex flex-col gap-5 relative overflow-hidden opacity-0 transform-gpu will-change-transform">
                            
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                                <h3 className="font-bold text-[#0f172a] tracking-wide text-sm">Republish status</h3>
                                <div className="flex gap-2 items-center">
                                    <span className="font-mono text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">v11</span>
                                    <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    <span className="font-mono text-[11px] font-bold text-[#0f6a31] bg-[#0f6a31]/10 px-2 py-1 rounded">v12</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Past */}
                                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Past</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-bold text-[#0f172a]">Frozen.</span>
                                        <span className="text-[12px] font-medium text-gray-500">Untouched by the republish.</span>
                                    </div>
                                </div>

                                {/* Future */}
                                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Future</span>
                                    <span className="text-[13px] font-bold text-[#0f172a]">Re-validated against v12.</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    <div className="p-4 rounded-xl border border-[#0f6a31]/20 bg-[#0f6a31]/5 flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-[#0f6a31] uppercase tracking-widest">Matched</span>
                                        <span className="text-[12px] font-medium text-gray-600 leading-snug">Override retained. The slot survived the change.</span>
                                    </div>
                                    <div className="p-4 rounded-xl border border-orange-200 bg-orange-50 flex flex-col gap-2">
                                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Moved</span>
                                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest w-max">needsReview</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] lg:text-xs text-gray-500 font-medium leading-relaxed mt-2 italic">
                                A future override whose base session moved between v11 and v12. It is not dropped and not silently re-applied — it waits for a human.
                            </p>

                        </div>
                    </div>

                </div>

                {/* BOTTOM PART: Outro */}
                <div className="max-w-3xl mx-auto text-center mt-4 lg:mt-6 flex flex-col gap-6 text-reveal-4 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 opacity-0 transform-gpu will-change-[transform,opacity]">
                    <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed">
                        Nine statuses carry a session’s life on the day — all of them Layer 2. The base plan has no status at all; it only says what should happen. These say what did: <span className="font-mono text-[12px] bg-gray-100 text-gray-600 px-1 rounded">scheduled</span>, <span className="font-mono text-[12px] bg-[#0f6a31]/10 text-[#0f6a31] px-1 rounded">substituted</span>, <span className="font-mono text-[12px] bg-blue-50 text-blue-600 px-1 rounded">roomChanged</span>, <span className="font-mono text-[12px] bg-red-50 text-red-600 px-1 rounded">needsCoverage</span>, <span className="font-mono text-[12px] bg-red-50 text-red-600 px-1 rounded">needsRoom</span>, <span className="font-mono text-[12px] bg-orange-50 text-orange-600 px-1 rounded">needsReview</span>, <span className="font-mono text-[12px] bg-blue-50 text-blue-600 px-1 rounded">resolved</span>, <span className="font-mono text-[12px] bg-gray-100 text-gray-600 px-1 rounded">cancelled</span>, <span className="font-mono text-[12px] bg-purple-50 text-purple-600 px-1 rounded">oneOff</span>.
                    </p>
                    <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed">
                        <strong className="text-[#0f172a]">Three of them exist purely to say “a person needs to look at this”.</strong>
                    </p>
                </div>

            </PageContainer>
        </section>
    );
};

export default FeatureStageFour;