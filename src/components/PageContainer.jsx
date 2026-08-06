import React from 'react';

const PageContainer = ({ children, className = "" }) => {
    return (
        // 🚀 THE FIX FOR ALL ZOOM ISSUES: 
        // Ye container hamesha center me rahega aur ultra-wide screens par phatega nahi.
        <div className={`w-full max-w-[1536px] mx-auto relative px-6 md:px-14 ${className}`}>
            {children}
        </div>
    );
};

export default PageContainer;