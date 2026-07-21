'use client';

import React from 'react';
import { FaChevronRight, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

interface RegisterFormProps {
  phoneNumber: string;
  fullName: string;
  setFullName: (val: string) => void;
  onRegisterSubmit: (e: React.FormEvent) => void;
  onEditPhone: () => void;
}

export default function RegisterForm({
  phoneNumber,
  fullName,
  setFullName,
  onRegisterSubmit,
  onEditPhone
}: RegisterFormProps) {
  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-neutral-800 mb-2">Complete Profile</h2>
        <p className="text-neutral-500 text-sm">
          Registering for <span className="font-bold text-neutral-800">+880 - {phoneNumber}</span>{' '}
          <button type="button" onClick={onEditPhone} className="text-blue-600 hover:underline font-semibold">Edit</button>
        </p>
      </div>

      {/* সাকসেসফুল ওটিপি স্টেট দেখানোর জন্য ডামি বক্স */}
      <div className="flex justify-between gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-xl font-bold rounded-xl border border-purabi-green/30 bg-green-50 text-purabi-green">
            {num}
          </div>
        ))}
      </div>

      <form onSubmit={onRegisterSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-600 mb-2">Enter Your Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. Saikot"
            className="w-full p-4 border border-neutral-200 rounded-2xl bg-neutral-50 focus:outline-none focus:border-purabi-brand text-neutral-800 font-medium"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-4 bg-purabi-brand hover:bg-purabi-brandHover text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98]">
          Proceed to Dashboard <FaChevronRight className="text-sm" />
        </button>
      </form>

      <div className="flex justify-center gap-5 text-neutral-400 mt-8 mb-6">
        <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebookF className="text-lg" /></a>
        <a href="#" className="hover:text-sky-500 transition-colors"><FaTwitter className="text-lg" /></a>
        <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram className="text-lg" /></a>
      </div>
       <p className="text-[11px] text-center text-neutral-500 leading-relaxed max-w-xs mx-auto">
        By Creating An Account Or Logging In, You Agree To <a href="#" className="underline font-bold text-purabi-brand">Our Terms Of Service</a> And <a href="#" className="underline font-bold text-purabi-brand">Privacy Policy.</a>
      </p>
    </div>
  );
}