import React from 'react';
import PageContainer from '../components/PageContainer';
import AnimatedHoverText from '../components/AnimatedHoverText';

const FeatureCTA = () => {
    return (
        <section className="w-full bg-[#0f172a] py-16 md:py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
            
            {/* Subtle Green Glow on the Left (Behind Heading) */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-[#0f6a31]/10 blur-[150px] pointer-events-none"></div>

            <PageContainer className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    {/* LEFT COLUMN: HEADING */}
                    <div className="flex flex-col text-center md:text-left cta-reveal opacity-0">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#0f6a31] to-emerald-400">
                            Ready to see it <br className="hidden lg:block"/> 
                            against your own <br className="hidden lg:block"/> 
                            timetable?
                        </h2>
                    </div>

                    {/* RIGHT COLUMN: BUTTON */}
                    <div className="flex justify-center md:justify-end cta-reveal opacity-0">
                        <div className="hero-button relative inline-flex items-center justify-center group cursor-pointer py-4 lg:py-5 !shadow-none" style={{ boxShadow: 'none' }}>
                            <div className="absolute inset-0 bg-brand-primary rounded-full pointer-events-none !shadow-none"></div>
                            <div className="relative z-10 text-white font-bold uppercase tracking-widest m-0 px-8 lg:px-10">
                                <AnimatedHoverText text="BOOK A DEMO" />
                            </div>
                        </div>
                    </div>

                </div>
            </PageContainer>
        </section>
    );
};

export default FeatureCTA;