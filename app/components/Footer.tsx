"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FooterData {
  companyName: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  copyrightText: string;
}

export default function Footer() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        // সরাসরি অ্যাডমিন প্যানেলের ৩০০০ পোর্টে রিকোয়েস্ট পাঠানো হচ্ছে
        const res = await fetch("http://localhost:3000/api/admin/footer", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
          }
        });
        
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          if (json.success && json.data) {
            setData(json.data);
          }
        }
      } catch (err) {
        console.error("CORS or Connection Error from Admin Port:", err);
      }
    };
    
    fetchFooter();
  }, []);

  // ডাটা লোড হওয়ার আগ পর্যন্ত ব্যাকআপ বা ডিফল্ট ডাটা
  const companyName = data?.companyName || "Dazzling Diva";
  const aboutText = data?.aboutText || "Your premium destination for luxury fashion wear.";
  const contactEmail = data?.contactEmail || "info@dazzlingdiva.com";
  const contactPhone = data?.contactPhone || "+880 1700-000000";
  const address = data?.address || "Dhaka, Bangladesh";
  const copyrightText = data?.copyrightText || `© ${new Date().getFullYear()} Dazzling Diva. All Rights Reserved.`;

  return (
    <footer className="bg-[#2D0A23] text-stone-200 pt-12 pb-6 border-t border-stone-800 w-full block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold tracking-wide text-white">{companyName}</h3>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">{aboutText}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Shop Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/category/saree" className="hover:text-amber-400 transition-colors">Saree Collection</Link></li>
            <li><Link href="/category/three-piece" className="hover:text-amber-400 transition-colors">Three Piece</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Customer Care</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Our Brand</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Contact Hub</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><span className="text-stone-300 font-medium">Add:</span> {address}</li>
            <li><span className="text-stone-300 font-medium">Mail:</span> {contactEmail}</li>
            <li><span className="text-stone-300 font-medium">Call:</span> {contactPhone}</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-stone-500">{copyrightText}</p>
        <div className="flex gap-4 items-center">
          {data?.facebookUrl && (
            <a href={data.facebookUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-400 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}