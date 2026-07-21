'use client';

import React, { useRef } from 'react';
import { FaChevronRight, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

interface OtpVerificationProps {
  phoneNumber: string;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  onEditPhone: () => void;
  onVerifyOtp: (e: React.FormEvent) => void;
}

export default function OtpVerification({
  phoneNumber,
  otp,
  setOtp,
  onEditPhone,
  onVerifyOtp
}: OtpVerificationProps) {
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // টাইপ করার সাথে সাথে পরের ইনপুট বক্সে অটো ফোকাস হবে
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // ব্যাকস্পেস চাপলে আগের বক্সে ফোকাস ফিরে যাবে
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-neutral-800 mb-2">OTP Verification</h2>
        <p className="text-neutral-500 text-sm">
          Enter The OTP Sent To <span className="font-bold text-neutral-800">+880 - {phoneNumber || '1768-179927'}</span>{' '}
          <button type="button" onClick={onEditPhone} className="text-blue-600 hover:underline font-semibold">Edit</button>
        </p>
      </div>

      <form onSubmit={onVerifyOtp} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { otpRefs.current[idx] = el; }}
              type="text"
              maxLength={1}
              className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold rounded-xl border focus:outline-none transition-all ${
                digit ? 'border-purabi-green text-purabi-green bg-green-50/50' : 'border-neutral-200 bg-neutral-50 focus:border-purabi-brand'
              }`}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-500 font-medium">Don't Receive The OTP?</span>
          <button type="button" className="text-blue-600 hover:underline font-semibold">Resend OTP</button>
        </div>

        <button type="submit" className="w-full py-4 bg-purabi-brand hover:bg-purabi-brandHover text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98]">
          Verify OTP <FaChevronRight className="text-sm" />
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