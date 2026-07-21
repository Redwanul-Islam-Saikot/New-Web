'use client';

import React, { useState, useEffect } from 'react';

// স্লাইডারের ডাইনামিক ডেটা
const SLIDES = [
  { id: 1, image: '/Slide1.jpg', title: 'Home Insurance' },
  { id: 2, image: '/Slide2.jpg', title: 'Car Insurance' },
  { id: 3, image: '/Slide3.jpg', title: 'Accident Claim' },
  { id: 4, image: '/Slide4.jpg', title: 'Health Security' },
  { id: 5, image: '/Slide5.jpg', title: 'Family Protection' }
];

export default function AuthSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // অটো স্লাইডার ইফেক্ট (প্রতি ৫ সেকেন্ড পর পর ইমেজ চেঞ্জ হবে)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-1/2 relative rounded-[32px] overflow-hidden min-h-[350px] md:min-h-[550px] flex flex-col justify-between p-8 text-white">
      {/* ব্যাকগ্রাউন্ড ইমেজ ট্রানজিশন */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.45)), url(${slide.image})` 
          }}
        />
      ))}

      {/* স্লাইডারের উপরের ব্র্যান্ডিং পার্ট */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center">
          {/* লোগোটিকে একদম পারফেক্টলি পিওর হোয়াইট করতে brightness-0 invert-100 ব্যবহার করা হয়েছে */}
          <img 
            src="/Mask group.png" 
            alt="Purabi General Insurance Co. Ltd." 
            className="h-8 md:h-10 w-auto object-contain select-none brightness-0 invert"
            loading="eager"
          />
        </div>

        <div className="flex gap-4">
          <button className="px-5 py-1.5 rounded-full border border-white/60 text-sm font-medium hover:bg-white hover:text-black transition-all">
            Login
          </button>
          <button className="px-3 py-1.5 text-sm font-medium opacity-80 hover:opacity-100">
            Sign Up
          </button>
        </div>
      </div>

      {/* নিচের ক্যারোজেল ডট ইন্ডিকেটর */}
      <div className="relative z-10 flex gap-2 self-start mt-auto">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}