'use client';

import React, { useState } from 'react';
import AuthSlider from './AuthSlider';
import LoginForm from './LoginForm';
import OtpVerification from './OtpVerification';
import RegisterForm from './RegisterForm';
import { UserProfile } from '@/types/user';

interface AuthFlowProps {
  setIsLoggedIn: (status: boolean) => void;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function AuthFlow({ setIsLoggedIn, setUserProfile }: AuthFlowProps) {
  // অথেনটিকেশন স্টেটসমূহ এখানে চলে এসেছে
  const [authStep, setAuthStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [fullName, setFullName] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return alert('Valid phone number is required!');
    setAuthStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) return alert('Enter full 6-digit OTP');
    
    // ডামি কন্ডিশন
    if (phoneNumber.includes('1768179927') || phoneNumber.includes('1768-179927')) {
      setIsLoggedIn(true);
    } else {
      setAuthStep(3);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return alert('Please enter your name');
    
    setUserProfile(prev => ({
      ...prev,
      name: fullName,
      phone: `+880 ${phoneNumber}`
    }));
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl p-6 flex flex-col md:flex-row gap-6 relative min-h-[620px] overflow-hidden">
      <AuthSlider />
      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-6 px-4 md:px-10">
        {authStep === 1 && (
          <LoginForm 
            phoneNumber={phoneNumber} 
            setPhoneNumber={setPhoneNumber} 
            onSendOtp={handleSendOtp}
            onGoogleLogin={handleGoogleLogin}
          />
        )}
        {authStep === 2 && (
          <OtpVerification 
            phoneNumber={phoneNumber} 
            otp={otp} 
            setOtp={setOtp} 
            onEditPhone={() => setAuthStep(1)}
            onVerifyOtp={handleVerifyOtp}
          />
        )}
        {authStep === 3 && (
          <RegisterForm 
            phoneNumber={phoneNumber}
            fullName={fullName} 
            setFullName={setFullName} 
            onRegisterSubmit={handleRegisterSubmit}
            onEditPhone={() => setAuthStep(1)}
          />
        )}
      </div>
    </div>
  );
}