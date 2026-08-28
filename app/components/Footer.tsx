import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#4A0027] text-white font-sans border-t border-rose-950/20">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10 flex flex-col items-center">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-4">
          <div className="mb-2">
            {/* Custom Logo Icon */}
            <svg
              className="w-10 h-10 fill-white"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 20 20 H 70 C 85 20, 85 50, 70 50 H 45 V 38 H 70 C 73 38, 73 32, 70 32 H 32 V 68 H 70 C 80 68, 80 80, 70 80 H 20 Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-wider uppercase">
            Dazzling Diva
          </h2>
        </div>

        {/* Brand Tagline Description */}
        <p className="text-center text-xs md:text-sm text-pink-100/80 max-w-xl leading-relaxed mb-12">
          We Only Carry Designs We Believe In Ethically And Aesthetically -
          Original, Authentic Pieces That Are Made To Last.
        </p>

        {/* 5 Column Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs text-pink-100/90">
          {/* Column 1: Address & Contact */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              {/* Location Pin Icon */}
              <svg
                className="w-4 h-4 text-white shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6-5.686-6-10A6 6 0 0118 11c0 4.314-6 10-6 10z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 13a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <span>
                29 SE 2nd Ave, Miami Florida 33131, United States
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Email Icon */}
              <svg
                className="w-4 h-4 text-white shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>info@dazzling.com</span>
            </div>

            <div className="pt-2">
              <span className="text-sm font-bold text-white tracking-wider">
                (+92) 3942 7879
              </span>
            </div>
          </div>

          {/* Column 2: PAGES */}
          <div>
            <h3 className="font-bold uppercase text-white tracking-wider mb-4">
              PAGES
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:underline">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/bundle-products" className="hover:underline">
                  Bundle Products
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:underline">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SHOPPING */}
          <div>
            <h3 className="font-bold uppercase text-white tracking-wider mb-4">
              SHOPPING
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  Shop by Category
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: INFORMATION */}
          <div>
            <h3 className="font-bold uppercase text-white tracking-wider mb-4">
              INFORMATION
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/track-order" className="hover:underline">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:underline">
                  Corporate Enquires
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: ACCOUNT */}
          <div>
            <h3 className="font-bold uppercase text-white tracking-wider mb-4">
              ACCOUNT
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/account" className="hover:underline">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:underline">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="bg-[#8A0041] py-4 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-white">
            Copyright ©{" "}
            <span className="text-purple-300 font-semibold">Orbixon</span>{" "}
            2026. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-white">
            {/* Facebook */}
            <a href="#" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.808V8z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-white font-medium">
            <Link href="/terms" className="hover:underline">
              Teams & Condition
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy & Policy
            </Link>
            <Link href="/refund" className="hover:underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}