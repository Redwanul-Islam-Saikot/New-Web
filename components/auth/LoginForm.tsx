'use client';

import React from 'react';
import { FaGoogle, FaChevronRight, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

// টাইপ সেফটি এবং ফুল ডাইনামিক ইন্টারঅ্যাকশনের জন্য ইন্টারফেস
interface LoginFormProps {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  onSendOtp: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

export default function LoginForm({ 
  phoneNumber, 
  setPhoneNumber, 
  onSendOtp, 
  onGoogleLogin 
}: LoginFormProps) {
  
  return (
    <div className="w-full max-w-md animate-fadeIn">
      {/* হেডার টেক্সট */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-neutral-800 mb-2">Welcome Back</h2>
        <p className="text-neutral-500 text-sm">Don't Share Your Login Credential</p>
      </div>

      {/* মোবাইল নাম্বার ফর্ম */}
      <form onSubmit={onSendOtp} className="space-y-5">
        <div className="flex items-center border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50 focus-within:border-purabi-brand transition-all">
          <span className="px-4 text-neutral-600 font-semibold border-r border-neutral-200">+880</span>
          <input 
            type="tel" 
            placeholder="Enter Your Mobile Number" 
            className="w-full p-4 bg-transparent focus:outline-none font-medium text-neutral-800 placeholder:text-neutral-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-purabi-brand hover:bg-purabi-brandHover text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purabi-brand/10 transition-all transform active:scale-[0.98]"
        >
          Send OTP <FaChevronRight className="text-sm" />
        </button>
      </form>

      {/* ডিভাইডার */}
      <div className="flex items-center my-6 text-neutral-400 text-xs font-semibold">
        <div className="flex-1 h-[1px] bg-neutral-200"></div>
        <span className="px-3">OR</span>
        <div className="flex-1 h-[1px] bg-neutral-200"></div>
      </div>

      {/* গুগল সোশ্যাল লগইন */}
      <button 
        onClick={onGoogleLogin} 
        className="w-full py-3.5 border border-neutral-200 rounded-2xl flex items-center justify-center gap-3 text-neutral-700 hover:bg-neutral-50 transition-all font-medium mb-6"
      >
        <FaGoogle className="text-red-500 text-lg" /> Continue With Google
      </button>

      {/* অন্যান্য সোশ্যাল আইকন */}
      <div className="flex justify-center gap-5 text-neutral-400 mb-8">
        <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebookF className="text-lg" /></a>
        <a href="#" className="hover:text-sky-500 transition-colors"><FaTwitter className="text-lg" /></a>
        <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram className="text-lg" /></a>
      </div>

      {/* টার্মস ও পলিসি নোটিশ */}
      <p className="text-[11px] text-center text-neutral-500 leading-relaxed max-w-xs mx-auto">
        By Creating An Account Or Logging In, You Agree To <a href="#" className="underline font-bold text-purabi-brand">Our Terms Of Service</a> And <a href="#" className="underline font-bold text-purabi-brand">Privacy Policy.</a>
      </p>
    </div>
  );
}