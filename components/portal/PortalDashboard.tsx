'use client';

import HeroManager from './HeroManager';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileDetails from './ProfileDetails';
import { UserProfile } from '@/types/user';

interface PortalDashboardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

export default function PortalDashboard({
  userProfile,
  setUserProfile,
  isEditModalOpen,
  setIsEditModalOpen,
  handleLogout
}: PortalDashboardProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = window.location.origin + '/';
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF9] text-neutral-800 flex flex-col font-sans antialiased">
      
      {/* HEADER SECTION */}
      <header className="w-full bg-white px-4 md:px-24 py-5 flex justify-between items-center z-10">
        <div className="flex items-center">
          <img 
            src="/Mask group.png" 
            alt="Purabi General Insurance Co. Ltd." 
            className="h-10 md:h-12 w-auto object-contain select-none"
            loading="eager"
          />
        </div>
        
        <div>
          <button 
            type="button"
            onClick={handleGoHome}
            className="px-6 py-3 bg-[#F5E6E1] hover:bg-[#ECDAD3] text-[#A3371F] font-bold text-sm transition-all rounded-md cursor-pointer select-none"
          >
            Go Back To Home
          </button>
        </div>
      </header>

      {/* NOTIFICATION BAR */}
      <div className="w-full bg-[#FAF3EE] text-neutral-700 py-3 px-4 md:px-24 text-sm font-medium flex items-center justify-center text-center gap-2 border-b border-neutral-100">
        <span className="text-base">🔔</span>
        <p>2 Premium Payment Of <span className="font-bold text-neutral-900">৳25,000</span> Is Due For <span className="font-bold text-neutral-900">Policy No. 218242641</span> On <span className="font-bold text-neutral-900">25 July 2026</span></p>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full px-4 md:px-24 py-10 flex flex-col md:flex-row gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 shrink-0 bg-transparent rounded-lg">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* নতুন স্টাইলিশ প্রিমিয়াম লগআউট বাটন */}
          <button 
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 mt-6 px-5 py-3.5 text-sm font-bold text-red-600 bg-red-50/40 hover:bg-red-600 hover:text-white border border-red-200/50 hover:border-transparent rounded-xl transition-all duration-300 shadow-[0_2px_4px_rgba(239,68,68,0.04)] active:scale-98 cursor-pointer group"
          >
            <svg 
              className="w-5 h-5 text-red-500 group-hover:text-white transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout Account</span>
          </button>
        </div>

        {/* CONTENT INTERFACE */}
        <div className="flex-1 w-full">
          {activeTab === 'profile' && (
            <ProfileDetails 
              userProfile={userProfile} 
              onEditClick={() => setIsEditModalOpen(true)} 
            />
          )}
          {activeTab === 'orders' && <div className="p-8 bg-white border border-neutral-200/60 rounded-xl shadow-xs text-neutral-500 font-medium">My Orders Content</div>}
          {activeTab === 'policies' && <div className="p-8 bg-white border border-neutral-200/60 rounded-xl shadow-xs text-neutral-500 font-medium">My Policies Content</div>}
          {activeTab === 'claims' && <div className="p-8 bg-white border border-neutral-200/60 rounded-xl shadow-xs text-neutral-500 font-medium">My Claims Content</div>}
          {activeTab === 'settings' && <div className="p-8 bg-white border border-neutral-200/60 rounded-xl shadow-xs text-neutral-500 font-medium">Settings Content</div>}
          
          {/* 🌟 নতুন যোগ করা হিরো সেকশন কন্ডিশনাল রেন্ডারিং 🌟 */}
          {activeTab === 'hero' && <HeroManager />}
        </div>
      </main>

      {/* FOOTER & CHANNELS */}
      <footer className="w-full bg-[#FDFBF9] px-4 md:px-24 py-10 mt-auto">
        <div className="w-full space-y-8">
          
          {/* PAYMENT BRANDS GRID */}
          <div>
            <h5 className="text-xs font-semibold text-neutral-500 mb-4 tracking-wide uppercase">
              Payment Channels
            </h5>
            
            <div className="flex flex-col gap-3">
              {/* Row 1 */}
              <div className="flex flex-wrap gap-3 items-center justify-start md:justify-between">
                {[
                  { name: 'Visa', logo: '/Visa1.png' },
                  { name: 'Mastercard', logo: '/Master2.png' },
                  { name: 'Nagad', logo: '/Nagad3.png' },
                  { name: 'bKash', logo: '/Bkash4.png' },
                  { name: 'Rocket', logo: '/Rocket5.png' },
                  { name: 'Upay', logo: '/Upay6.png' },
                  { name: 'SureCash', logo: '/Sure7.png' },
                  { name: 'Taptap Send', logo: '/Taptap8.png' },
                  { name: 'Cellfin', logo: '/Cellfin9.png' },
                  { name: 'NBL', logo: '/NBL10.png' },
                  { name: 'City Bank', logo: '/CityBank11.png' }
                ].map((brand, idx) => (
                  <div 
                    key={idx} 
                    title={brand.name}
                    className="w-24 md:w-28 h-12 border border-neutral-200/60 bg-white flex items-center justify-center rounded-lg shadow-2xs overflow-hidden transition-all hover:border-neutral-300"
                  >
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap gap-3 items-center justify-start md:justify-center">
                {[
                  { name: 'Islami Bank', logo: '/IslamiBank12.png' },
                  { name: 'Brac Bank', logo: '/BrackBank13.png' },
                  { name: 'UCB', logo: '/UCB14.png' },
                  { name: 'EBL', logo: '/EBL15.png' }
                ].map((brand, idx) => (
                  <div 
                    key={idx} 
                    title={brand.name}
                    className="w-24 md:w-28 h-12 border border-neutral-200/60 bg-white flex items-center justify-center rounded-lg shadow-2xs overflow-hidden transition-all hover:border-neutral-300"
                  >
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRIVACY LINKS AND COPYRIGHT */}
          <div className="pt-6 border-t border-neutral-200/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm font-medium text-neutral-500">
            <div>
              Copyright © <span className="font-bold text-[#A3371F]">360D Soul Limited</span> 2026. All rights reserved.
            </div>
            
            <div className="flex gap-x-6 gap-y-2 text-neutral-600">
              <a href="#" className="hover:text-[#A3371F] transition-colors">Terms & Condition</a>
              <a href="#" className="hover:text-[#A3371F] transition-colors">Privacy & Policy</a>
              <a href="#" className="hover:text-[#A3371F] transition-colors">Refund Policy</a>
            </div>
          </div>

        </div>
      </footer>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {(() => {
            const EditProfileModal = require('./EditProfileModal').default;
            return (
              <EditProfileModal 
                userProfile={userProfile} 
                setUserProfile={setUserProfile} 
                onClose={() => setIsEditModalOpen(false)} 
              />
            );
          })()}
        </React.Suspense>
      )}
    </div>
  );
}