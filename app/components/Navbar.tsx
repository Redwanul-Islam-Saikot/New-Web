"use client";

import { useState } from "react";
import { Store, LocateFixed, ShoppingBag, UserRound, Search, ChevronDown } from "lucide-react";

// ক্যাটাগরি ও সেকশন আইডির তালিকা
const CATEGORIES = [
  { name: "All Products", targetId: "all-products" },
  { name: "Tops", targetId: "tops" },
  { name: "Stitched Dress", targetId: "stitched-dress" },
  { name: "Blouse & Co-ord", targetId: "blouse-coord" },
  { name: "Sharee", targetId: "sharee" },
  { name: "Lehenga", targetId: "lehenga" },
];

export default function Navbar() {
  const [showPromo, setShowPromo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Products");

  // স্ক্রোল হ্যান্ডলার ফাংশন
  const scrollToSection = (id: string, name: string) => {
    setActiveCategory(name);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full font-sans sticky top-0 z-50 bg-white shadow-xs">
      {/* Promo Banner */}
      {showPromo && (
        <div className="flex items-center justify-center gap-2 bg-[#5A0C3D] px-4 py-2.5 text-center text-white">
          <p className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-medium tracking-wide">
            <span>⏳</span> Limited Time! Enjoy 15% OFF on Regular Items — Online Only. Shop Before It Ends!
          </p>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Close promo banner"
            className="ml-2 text-sm text-white/80 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header / Upper Navbar */}
      <div className="flex items-center justify-between bg-[#F8F8F8] px-4 py-4 sm:px-8 md:px-12 border-b border-gray-200">
        {/* Left: Custom Hamburger Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
          className="flex flex-col items-start gap-1.5 cursor-pointer group"
        >
          <span className="h-[2.5px] w-8 bg-black transition-all"></span>
          <span className="h-[2.5px] w-6 bg-black transition-all"></span>
          <span className="h-[2.5px] w-4 bg-black transition-all"></span>
        </button>

        {/* Center: Brand Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <svg
            className="h-7 w-7 sm:h-8 sm:w-8 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M4 4h9a6 6 0 0 1 0 12H9v-5h4a1 1 0 0 0 0-2H4" />
            <path d="M4 20h9a9 9 0 0 0 0-18" />
          </svg>
          <span className="text-xl font-black tracking-wider text-black sm:text-2xl md:text-3xl uppercase">
            DAZZLING DIVA
          </span>
        </a>

        {/* Right Navigation & Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="/store"
            className="hidden items-center gap-2 text-base font-bold text-black hover:text-[#5A0C3D] lg:flex"
          >
            <Store className="w-5 h-5 text-black" />
            Store
          </a>

          <a
            href="/track-order"
            className="hidden items-center gap-2 text-base font-bold text-black hover:text-[#5A0C3D] lg:flex"
          >
            <LocateFixed className="w-5 h-5 text-black" />
            Track Order
          </a>

          {/* Cart Icon Button */}
          <button
            aria-label="Cart"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black hover:border-black transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Account Icon Button */}
          <button
            aria-label="Account"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black hover:border-black transition-all cursor-pointer"
          >
            <UserRound className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-black/10 bg-white px-4 py-3 lg:hidden">
          <a
            href="/store"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold hover:bg-black/5"
          >
            <Store className="w-5 h-5 text-black" />
            Store
          </a>
          <a
            href="/track-order"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold hover:bg-black/5"
          >
            <LocateFixed className="w-5 h-5 text-black" />
            Track Order
          </a>
        </div>
      )}

      {/* Lower Navbar */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto bg-white px-4 py-4 sm:px-8 md:px-12 scrollbar-none border-b border-gray-100">
        
        {/* Select Category Dropdown Button */}
        <button className="flex shrink-0 items-center gap-4 rounded-full border border-black/10 bg-[#F5F5F5] px-6 py-3 text-base font-bold text-black cursor-pointer">
          Select Category
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-xs">
            <ChevronDown className="w-4 h-4 text-black" />
          </span>
        </button>

        {/* New In Badge Button */}
        <button 
          onClick={() => scrollToSection("new-in", "New In")}
          className="flex shrink-0 items-center gap-2.5 rounded-full border border-black/15 bg-white px-6 py-3 text-base font-bold text-black hover:border-black transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-[#5A0C3D]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 3.6 4.2-1.2-0.6 4.3 4.1 1.7-2.3 3.7 2.3 3.7-4.1 1.7 0.6 4.3-4.2-1.2L12 22l-2.4-3.6-4.2 1.2 0.6-4.3-4.1-1.7 2.3-3.7-2.3-3.7 4.1-1.7-0.6-4.3 4.2 1.2z" />
            <text x="12" y="15" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">NEW</text>
          </svg>
          New In
        </button>

        {/* Offers Badge Button */}
        <button 
          onClick={() => scrollToSection("offers", "Offers")}
          className="flex shrink-0 items-center gap-2.5 rounded-full border border-black/15 bg-white px-6 py-3 text-base font-bold text-black hover:border-black transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-[#5A0C3D]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 3.6 4.2-1.2-0.6 4.3 4.1 1.7-2.3 3.7 2.3 3.7-4.1 1.7 0.6 4.3-4.2-1.2L12 22l-2.4-3.6-4.2 1.2 0.6-4.3-4.1-1.7 2.3-3.7-2.3-3.7 4.1-1.7-0.6-4.3 4.2 1.2z" />
            <text x="12" y="15.5" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">%</text>
          </svg>
          Offers
        </button>

        {/* Search Bar Input */}
        <div className="flex shrink-0 items-center gap-3 rounded-full border border-black/15 bg-[#F5F5F5] py-1.5 pl-6 pr-1.5 w-64 lg:w-80">
          <input
            type="search"
            placeholder="search..."
            className="w-full bg-transparent text-base text-black outline-none placeholder:text-gray-500 font-semibold"
          />
          <button
            aria-label="Search"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5A0C3D] text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Dynamic Connected Categories */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => scrollToSection(cat.targetId, cat.name)}
              className={`shrink-0 rounded-full border px-6 py-3 text-base font-bold transition-all cursor-pointer ${
                activeCategory === cat.name
                  ? "border-[#5A0C3D] bg-[#5A0C3D] text-white shadow-md"
                  : "border-black/15 bg-white text-black hover:border-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}