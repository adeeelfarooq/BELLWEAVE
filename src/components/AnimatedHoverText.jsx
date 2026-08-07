import React from 'react';

// Custom Component Fix: Added 'transform-gpu' and 'backface-hidden' to prevent color dimming/blurring during motion
const AnimatedHoverText = ({ text, hoverColor = "text-[#0f172a]" }) => {
  return (
    // 'group' yahan se hata diya kyunke ab parent <button> par 'group' laga hua hai
    <div className="flex justify-center items-center cursor-pointer overflow-hidden">
      {text.split('').map((char, index) => (
        <div key={index} className="relative flex flex-col">
          {/* 1. Visible Character */}
          {/* 🚀 FIX: 'md:group-hover:-translate-y-full' lagaya taake mobile par stuck/animate na ho */}
          <span
            className="block transform-gpu backface-hidden transition-transform duration-300 ease-in-out md:group-hover:-translate-y-full will-change-transform"
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>

          {/* 2. Hidden Character */}
          {/* 🚀 FIX: Yahan bhi 'md:group-hover' lagaya */}
          <span
            className={`absolute top-full left-0 block transform-gpu backface-hidden transition-transform duration-300 ease-in-out md:group-hover:-translate-y-full will-change-transform ${hoverColor}`}
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimatedHoverText;