'use client';

import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 🌟 menuItems অ্যারেতে নতুন 'hero' অবজেক্টটি যুক্ত করা হয়েছে
  const menuItems = [
    { id: 'profile', label: 'Profile Details' },
    { id: 'orders', label: 'My Orders' },
    { id: 'policies', label: 'My Polices' },
    { id: 'claims', label: 'My Claims' },
    { id: 'settings', label: 'Settings' },
    { id: 'hero', label: 'Manage Hero Section' }, 
  ];

  const handleMenuClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* MOBILE TRIGGER BUTTON - মোবাইল ভিউয়ের হ্যামবার্গার ট্রিগার */}
      <div className="md:hidden flex items-center justify-between bg-white border border-neutral-200 p-3 mb-4 shadow-sm">
        <span className="font-bold text-sm text-neutral-700 uppercase tracking-wider">
          {menuItems.find(item => item.id === activeTab)?.label || 'Menu'}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none text-2xl"
        >
          <FiMenu />
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY & SIDEBAR - মোবাইলের ড্রয়ার মেনু */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative flex flex-col w-72 max-w-xs h-full bg-white shadow-xl z-10 p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-neutral-400 text-xs uppercase tracking-widest">Navigation</h3>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 text-xl"
              >
                <FiX />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full text-left px-5 py-3.5 font-semibold text-sm transition-all border-l-4 ${
                      isActive
                        ? 'bg-[#A3371F] text-white border-[#A3371F]'
                        : 'bg-transparent text-neutral-600 hover:bg-neutral-100 border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* DESKTOP VIEW SIDEBAR - ব্যাকগ্রাউন্ড বক্স এবং বর্ডার সম্পূর্ণ রিমুভড */}
      <aside className="hidden md:flex flex-col w-full gap-1 bg-transparent">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-3.5 font-semibold text-sm transition-all rounded-md border-l-4 outline-none select-none ${
                isActive
                  ? 'bg-[#A3371F] text-white border-[#A3371F] shadow-xs'
                  : 'bg-transparent text-neutral-600 border-transparent hover:bg-[#A3371F]/10 hover:text-[#A3371F]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </aside>
    </div>
  );
}