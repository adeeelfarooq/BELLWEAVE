import React from 'react';
import PageContainer from './PageContainer';

// 🚀 OPTIMIZATION: TimelineItem needs transform-gpu because it animates in via GSAP
const TimelineItem = ({ time, children, isLast = false }) => (
    <div className="relative pl-8 md:pl-12 pb-8 timeline-item opacity-0 translate-y-4 transform-gpu will-change-[transform,opacity]">
        {/* Timeline Line */}
        {!isLast && <div className="absolute top-2 left-[11px] md:left-[19px] bottom-0 w-[2px] bg-gray-200"></div>}
        
        {/* Timeline Dot */}
        <div className="absolute top-1 left-1 md:left-3 w-[22px] h-[22px] rounded-full bg-white border-[4px] border-[#0f6a31] shadow-sm z-10"></div>
        
        {/* Timestamp */}
        <div className="absolute top-1.5 -left-12 md:-left-6 text-[11px] font-bold text-gray-400">{time}</div>
        
        {/* Content */}
        <div className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed pt-0.5 transform-gpu">
            {children}
        </div>
    </div>
);

const ClassDetail = ({ text }) => (
    <div className="inline-block bg-white border border-gray-200 px-3 py-1.5 rounded-md text-[12px] font-bold text-[#0f172a] shadow-sm my-2 font-mono tracking-tight">
        {text}
    </div>
);

const StatusBadge = ({ status }) => {
    let styles = "";
    if (status === "substituted") styles = "bg-[#0f6a31]/10 text-[#0f6a31] border-[#0f6a31]/20";
    else if (status === "needsCoverage") styles = "bg-red-50 text-red-600 border-red-100";
    else if (status === "resolved") styles = "bg-blue-50 text-blue-600 border-blue-100";

    return (
        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${styles} ml-2`}>
            {status}
        </span>
    );
};

const FeatureStageThree = () => {
    return (
        // 🚀 OPTIMIZATION: Added transform-gpu to main container for smooth overlap
        <section id="stage-repair" className="w-full min-h-dvh bg-[#FAF6EF] text-[#0f172a] py-24 lg:py-36 overflow-hidden border-t border-black/5 will-change-transform transform-gpu">
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            {/* 🚀 OPTIMIZATION: Blur effects offloaded to GPU to prevent scroll jank */}
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none transform-gpu"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0f6a31]/5 blur-[120px] pointer-events-none transform-gpu"></div>

            <PageContainer className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 relative z-10">
                
                {/* LEFT COLUMN: THE TIMELINE NARRATIVE */}
                <div className="lg:col-span-7 flex flex-col lg:pr-8">
                    
                    {/* 🚀 OPTIMIZATION: Transform-gpu for text reveal animations */}
                    <div className="mb-10 text-reveal-3 opacity-0 transform-gpu will-change-[transform,opacity]">
                        <span className="text-[#0f6a31] font-black text-4xl lg:text-5xl drop-shadow-sm tracking-tight inline-block w-max mb-4">
                            3.0
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] text-[#0f172a]">
                            Monday, 13 July 2026.<br />
                            <span className="text-gray-500">Ashford Grange.</span>
                        </h2>
                        <p className="mt-4 text-[15px] font-medium text-gray-600 leading-relaxed">
                            Mr T. Bell calls in sick at 07:41, before anyone has unlocked a classroom. Here is the rest of the morning.
                        </p>
                    </div>

                    <div className="relative ml-10 md:ml-6 mt-4">
                        
                        <TimelineItem time="07:41">
                            <p>The absence lands. Unplanned, phoned in. It is recorded as an availability exception on the date — the same shape a planned leave takes, only later. Approved leave arrives through request, approval and a balance decrement, and the sessions it will hit surface weeks ahead so cover is arranged calmly. This one does not have that luxury.</p>
                        </TimelineItem>

                        <TimelineItem time="07:41">
                            <p>The affected sessions surface. Bellweave expands the published timetable for Monday and keeps every occurrence whose effective teacher is Mr T. Bell. Nothing has started yet, so the whole day is in scope.</p>
                        </TimelineItem>

                        <TimelineItem time="07:43">
                            <ClassDetail text="9A · Science (Biology) · P2 · 09:15–10:00 · Lab 3" />
                            <p className="mt-2">Candidates are gated. Four gates, all of which must pass: on the same campus as the cohort · qualified for the subject · free at that period and inside their own availability · and still under their load caps — for the day and for the week — once this period is added.</p>
                            <p className="mt-3">The survivors are ranked. Familiarity first, because that is what the students feel: a teacher who already takes this subject with this cohort ranks above one who merely knows the cohort, and both rank above a stranger. Fair workload breaks the tie — fewest recent substitutions, most headroom left under the caps.</p>
                            <p className="mt-3"><strong className="text-[#0f172a]">Ms A. Iqbal takes it.</strong> She already teaches 9A and Biology is her subject, so she ranks first. Mr S. Nolan is qualified too, but 9A would not know him — he ranks second and stays where he is.</p>
                            <div className="mt-3"><StatusBadge status="substituted" /></div>
                        </TimelineItem>

                        <TimelineItem time="08:04">
                            <p>Mr E. Mensah is out too — and he is the only Geography teacher on this campus. Same four gates, same morning.</p>
                            <ClassDetail text="8B · Geography · P5 · 12:30–13:15 · Room 09" />
                            <p className="mt-2">Nobody passes. The list comes back empty — not because the ranking is timid, but because there is no one to rank. Not “here is the closest match” — empty.</p>
                            <div className="mt-3"><StatusBadge status="needsCoverage" /></div>
                            <p className="mt-3">So that is what it says. The period is flagged and left open on the day’s board, and it stays there until a person deals with it. It is not handed to whoever was nearest and unqualified. Whatever the human then does — an out-of-gate substitute by override, supervised study, or cancelling the period outright — is recorded as the resolution that closed it, along with any hard rule they chose to waive.</p>
                        </TimelineItem>

                        <TimelineItem time="08:47">
                            <p>A third absence: Ms L. Price. By now P1 is running. Periods that have already started keep their original teacher — no exceptions — because the record has to stay true to who was actually stood in the room. Only what has not started yet goes up for coverage.</p>
                        </TimelineItem>

                        <TimelineItem time="08:52">
                            <ClassDetail text="9A · English · P3 · 10:15–11:00 · Room 07" />
                            <p className="mt-2">The admin picks Mr J. Hale. He already takes 9A for English on Thursdays, so the cohort knows him. It is written as an override on that occurrence, not on the plan. Audit entry: who, when, before, after.</p>
                            <p className="mt-3">The base timetable is untouched. Next Monday reverts to Ms L. Price on its own, without anyone remembering to undo anything.</p>
                            <div className="mt-3"><StatusBadge status="substituted" /></div>
                        </TimelineItem>

                        <TimelineItem time="09:10" isLast={true}>
                            <p>The Geography period is closed by hand. No substitute existed to offer, so a person decides: supervised study, with Ms T. Bianchi covering the room. The reason is recorded, the occurrence moves to resolved, and the gap is on the record rather than papered over.</p>
                            <div className="mt-3"><StatusBadge status="resolved" /></div>
                        </TimelineItem>

                    </div>

                    {/* Concluding Rules text */}
                    {/* 🚀 OPTIMIZATION: Transform-gpu */}
                    <div className="mt-8 text-reveal-3 opacity-0 transform-gpu will-change-[transform,opacity] flex flex-col gap-4 text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed bg-white/50 p-6 rounded-2xl border border-gray-100">
                        <p><strong className="text-[#0f172a]">Assignments commit sequentially.</strong> A substitute booked for one period is seen as busy when ranking the next — so the last decision of the morning is as sound as the first.</p>
                        <p>When a room goes out instead of a teacher, the shape holds. Eligible rooms are the ones on the same campus, with no closure and no booking, whose tag set covers everything the session requires, with capacity for the students attending, and free at that period. They are ranked tightest-capacity-fit first, so a class of twelve does not take the hall.</p>
                        <p>And a chem lab is never swapped for a gym. If the session needs chem-lab and every chem lab is closed or busy, no room is eligible, and the occurrence is flagged <span className="font-mono text-[12px] bg-red-50 text-red-600 px-1 rounded">needsRoom</span> for a human. The non-interchangeability is the feature. A system that would put a titration in the sports hall to keep its grid tidy is a system that is lying to you.</p>
                    </div>

                </div>

                {/* RIGHT COLUMN: UI CARD (CANDIDATES RANKED) */}
                {/* 🚀 OPTIMIZATION: Explicitly added transform-gpu to the sticky column so it behaves smoothly on iOS */}
                <div className="lg:col-span-5 relative w-full lg:sticky lg:top-32 h-max pt-8 lg:pt-0 transform-gpu">
                    
                    {/* 🚀 OPTIMIZATION: GSAP Animated Card Needs hardware acceleration */}
                    <div className="ui-card-stage-3 w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden opacity-0 transform-gpu will-change-transform">
                        
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#0f6a31]/5 rounded-full blur-[80px] pointer-events-none transform-gpu"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                            <h3 className="font-bold text-[#0f172a] tracking-wide text-[13px]">Candidates, ranked</h3>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Mon 13 July 2026
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 relative z-10">
                            
                            {/* Block 1 */}
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] font-bold text-[#0f172a] font-mono tracking-tight">9A · Science (Biology) · P2</span>
                                    <span className="text-[11px] font-bold text-red-500">— Mr T. Bell out</span>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    {/* Rank 1 */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl border border-[#0f6a31]/20 bg-[#0f6a31]/5">
                                        <div className="w-5 h-5 rounded-full bg-[#0f6a31] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[12px] font-bold text-[#0f172a]">Ms A. Iqbal</span>
                                            <span className="text-[11px] font-medium text-gray-600 leading-tight">Teaches 9A, and Biology is her subject — this subject, this cohort. <span className="font-bold text-gray-400">2/5 today.</span></span>
                                        </div>
                                    </div>
                                    {/* Rank 2 */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 opacity-60">
                                        <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[12px] font-bold text-gray-500">Mr S. Nolan</span>
                                            <span className="text-[11px] font-medium text-gray-400 leading-tight">Qualified in Biology, but does not take 9A — a stranger to the cohort. <span className="font-bold">3/5 today.</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                    <StatusBadge status="substituted" />
                                    <span className="text-[11px] font-bold text-gray-500">Ms A. Iqbal, assigned 07:46.</span>
                                </div>
                            </div>

                            <hr className="border-dashed border-gray-200" />

                            {/* Block 2 */}
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] font-bold text-[#0f172a] font-mono tracking-tight">8B · Geography · P5</span>
                                    <span className="text-[11px] font-bold text-red-500">— Mr E. Mensah out</span>
                                </div>
                                
                                <div className="p-4 rounded-xl border border-red-100 bg-red-50/50">
                                    <p className="text-[12px] font-medium text-red-800 leading-relaxed">
                                        No teacher passed all four gates. He is the only Geography teacher on this campus, so the list came back empty.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="w-max"><StatusBadge status="needsCoverage" /></div>
                                    <span className="text-[11px] font-bold text-gray-500 ml-2 mt-1">Open on the board until a person resolves it.</span>
                                </div>
                            </div>

                        </div>

                        {/* Footer Note */}
                        <div className="mt-2 pt-5 border-t border-gray-100 relative z-10 bg-gray-50 -mx-6 -mb-6 p-6">
                            <p className="text-[12px] text-gray-500 font-medium leading-relaxed italic">
                                Same gates, same morning, two answers. The second answer is allowed to be “nobody” — and that is the point. Where a campus has just one teacher qualified for a subject, no automated substitute can exist, and Bellweave would rather say so than invent one.
                            </p>
                        </div>

                    </div>
                </div>

            </PageContainer>
        </section>
    );
};

export default FeatureStageThree;