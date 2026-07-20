import React from 'react';

export default function EdgeToEdgeBanner() {
  return (
    /* 
      The parent container is now set to full width (w-full) with no padding,
      ensuring the image covers the screen from the absolute left to the absolute right.
    */
    <section className="relative w-full aspect-[21/9] min-h-[380px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-[#2D0B14]">
      
      {/* Background Image - Stretching full width */}
      <img
        src="/Flash12.png" 
        alt="Discover Festive Wardrobe"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Deep Maroon Bottom Vignette Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a050f] via-[#2a050f]/10 to-transparent opacity-95" />

      {/* Center-Bottom Overlay Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pb-8 md:pb-16 px-4 text-center text-white">
        
        {/* Category / Subtitle */}
        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium mb-3 opacity-80">
          THREE PIECES
        </span>

        {/* Main Headline */}
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-[950px] mb-6 font-sans">
          Discover Festive Wardrobe Now On Sale Don’t Miss Out
        </h1>

        {/* CTA Button */}
        <div className="mb-2">
          <button className="bg-white text-[#2D0B14] font-semibold text-xs sm:text-sm px-8 py-3 rounded-full shadow-md hover:bg-neutral-100 transition-all active:scale-95 duration-150">
            Shop Now
          </button>
        </div>
        
      </div>
    </section>
  );
}