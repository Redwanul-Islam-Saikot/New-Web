"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
  Store,
  Compass,
  ChevronDown,
  Sparkles,
  Percent,
  Heart,
} from "lucide-react";

// app ফোল্ডারের বাইরের components থেকে app এর ভেতরে ইমপোর্ট
import { useCartStore } from "../app/store/useCartStore";
import { useWishlist } from "../app/hooks/useWishlist";

export default function Navbar() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cart & Wishlist States
  const cart = useCartStore((state) => state.cart);
  const { wishlistCount } = useWishlist();

  // Hydration Error এড়ানোর জন্য Mounted Check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cart Count Calculation
  const cartCount = mounted
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="w-full bg-white text-[#1a1a1a] shadow-xs">
      {/* 1. Top Announcement Bar */}
      {showAnnouncement && (
        <div className="relative flex items-center justify-center bg-[#4a0e35] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
          <span>
            ⏳ Limited Time! Enjoy 15% OFF on Regular Items — Online Only. Shop
            Before It Ends!
          </span>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Close Announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 2. Main Header */}
      <div className="border-b border-gray-100 bg-[#f9f9f9]/80 px-4 py-3.5 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: Hamburger Icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-800 transition hover:text-[#4a0e35]"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7 stroke-[1.75]" />
              )}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/TopLogo.png"
              alt="Dazzling Diva Logo"
              width={220}
              height={45}
              priority
              className="h-7 w-auto object-contain sm:h-9"
            />
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/stores"
              className="hidden items-center gap-1.5 text-xs font-semibold text-gray-700 transition hover:text-[#4a0e35] md:flex sm:text-sm"
            >
              <Store className="h-4 w-4" />
              <span>Store</span>
            </Link>

            <Link
              href="/track-order"
              className="hidden items-center gap-1.5 text-xs font-semibold text-gray-700 transition hover:text-[#4a0e35] md:flex sm:text-sm"
            >
              <Compass className="h-4 w-4" />
              <span>Track Order</span>
            </Link>

            {/* Wishlist Icon with Badge */}
            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-gray-400"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4 text-gray-800" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Icon with Badge */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-gray-400"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4 text-gray-800" />
              {mounted && cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4a0e35] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <Link
              href="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-gray-400"
              aria-label="Account"
            >
              <User className="h-4 w-4 text-gray-800" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="overflow-x-auto border-b border-gray-100 bg-white px-4 py-3 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-3 no-scrollbar">
          <button className="flex shrink-0 items-center justify-between gap-3 rounded-full border border-gray-200 bg-[#f9f9f9] px-4 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-100 sm:text-sm">
            <span>Select Category</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <Link
            href="/category/new-in"
            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-[#4a0e35] sm:text-sm"
          >
            <Sparkles className="h-4 w-4 fill-[#4a0e35] text-[#4a0e35]" />
            <span>New In</span>
          </Link>

          <Link
            href="/category/offers"
            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[#4a0e35] text-xs font-semibold transition hover:border-[#4a0e35] sm:text-sm"
          >
            <Percent className="h-4 w-4 fill-[#4a0e35] text-[#4a0e35]" />
            <span>Offers</span>
          </Link>

          <div className="relative min-w-[200px] max-w-md flex-1 shrink-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-200 bg-[#f9f9f9] py-2 pl-4 pr-10 text-xs text-gray-800 outline-none transition focus:border-gray-400 sm:text-sm"
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a0e35] text-white"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>

          <Link
            href="/products"
            className="shrink-0 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400 sm:text-sm"
          >
            All Products
          </Link>

          <Link
            href="/category/tops"
            className="shrink-0 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400 sm:text-sm"
          >
            Tops
          </Link>

          <Link
            href="/category/stitched-dress"
            className="shrink-0 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400 sm:text-sm"
          >
            Stitched Dress
          </Link>

          <Link
            href="/category/blouse"
            className="shrink-0 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400 sm:text-sm"
          >
            Blouse & Tops
          </Link>
        </div>
      </div>
    </header>
  );
}