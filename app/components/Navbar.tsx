"use client";

import { useState } from "react";

const CATEGORIES = [
  "All Products",
  "Tops",
  "Stitched Dress",
  "Blouse & Co-ord",
  "Sharee",
  "Lehenga",
];

export default function Navbar() {
  const [showPromo, setShowPromo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {showPromo && (
        <div className="flex items-center justify-center gap-2 bg-[#5A0C3D] px-4 py-2 text-center sm:gap-3 sm:py-2.5">
          <p className="text-xs text-white sm:text-sm">
            Limited Time! Enjoy 15% OFF on Regular Items - Online Only. Shop
            Before It Ends!
          </p>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Close promo banner"
            className="shrink-0 text-white/90 hover:text-white"
          >
            X
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 bg-[#F8F8F8] px-4 py-4 sm:px-6 md:px-12">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
          className="flex flex-col items-start gap-1.5"
        >
          <span className="h-0.5 w-6 bg-black sm:w-8"></span>
          <span className="h-0.5 w-6 bg-black sm:w-8"></span>
          <span className="h-0.5 w-6 bg-black sm:w-8"></span>
        </button>

        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#5A0C3D] text-base font-bold text-[#5A0C3D] sm:h-9 sm:w-9 sm:text-lg">
            D
          </span>
          <span className="text-sm font-bold tracking-wide text-black sm:text-lg md:text-xl">
            DAZZLING DIVA
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <a
            href="/store"
            className="hidden items-center gap-2 text-sm font-medium text-black lg:flex"
          >
            Store
          </a>
          <a
            href="/track-order"
            className="hidden items-center gap-2 text-sm font-medium text-black lg:flex"
          >
            Track Order
          </a>
          <button
            aria-label="Cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white sm:h-10 sm:w-10"
          >
            Cart
          </button>
          <button
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white sm:h-10 sm:w-10"
          >
             User
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-black/10 bg-white px-4 py-3 lg:hidden">
          <a
            href="/store"
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5"
          >
            Store
          </a>
          <a
            href="/track-order"
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5"
          >
            Track Order
          </a>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-black/5 bg-white px-4 py-3 sm:px-6 md:flex-row md:items-center md:px-12">
        <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
          <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-[#F8F8F8] px-3 py-2 text-xs sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm">
            Select Category
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs sm:h-8 sm:w-8">
              v
            </span>
          </button>

          <button className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-black/20 bg-white px-3 py-2 text-xs sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm">
            New In
          </button>

          <button className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-black/20 bg-white px-3 py-2 text-xs sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm">
            Offers
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-black/20 bg-[#F8F8F8] py-1.5 pl-4 pr-1.5 md:w-64 lg:w-80">
          <input
            type="search"
            placeholder="search..."
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
          <button
            aria-label="Search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5A0C3D] text-white"
          >
            Q
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
          {CATEGORIES.map((item, i) => {
            const activeClass =
              "shrink-0 whitespace-nowrap rounded-full border border-black/20 bg-white font-medium text-black px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm";
            const normalClass =
              "shrink-0 whitespace-nowrap rounded-full border border-black/20 bg-white text-black px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm";
            return (
              <button
                key={item}
                className={i === 0 ? activeClass : normalClass}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
