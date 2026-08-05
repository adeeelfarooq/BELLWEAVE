import React from 'react';

const NavBar = () => {
    return (
        <>
            {/* FLOATING CTA BUTTON (Top Right) */}
            <a 
                href="#contact" 
                className="fixed z-[20000] scale-90 md:scale-100 max-md:text-xs md:text-sm inline-flex items-center justify-center bg-white text-brand-dark font-extrabold max-md:right-[2%] md:right-[3%] md:top-[4%] max-md:top-[3%] px-8 py-3.5 uppercase tracking-widest rounded-full transition-all duration-300 ease-in-out hover:bg-brand-primary hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]  group"
            >
                Get Started
            </a>

            {/* FLOATING LOGO (Top Left) */}
            {/* pointer-events-none isliye diya hai taake nav tag background ke clicks ko block na kare */}
            <nav className='fixed top-0 left-0 z-[19999] md:p-8 p-5 pointer-events-none'>
                {/* pointer-events-auto button/logo ko clickable banata hai */}
                <a href="/" className="pointer-events-auto block group">
                    <img 
                        src="/images/Bellweave.webp" 
                        alt="Bellweave Logo" 
                        className="md:h-9 h-7 w-auto object-contain drop-shadow-sm group-hover:opacity-70 transition-all duration-300" 
                    />
                </a>
            </nav>
        </>
    );
}

export default NavBar;