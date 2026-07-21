'use client';

import React, { useState, useRef } from 'react';
import { UserProfile } from '@/types/user';

interface ProfileDetailsProps {
  userProfile: UserProfile;
  setUserProfile?: React.Dispatch<React.SetStateAction<UserProfile>>; // গ্লোবাল স্টেট আপডেট করার জন্য অপশনাল
  onEditClick: () => void;
}

export default function ProfileDetails({ userProfile, setUserProfile, onEditClick }: ProfileDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ১. ইমেজ ক্লিক করলে হিডেন ফাইল ইনপুট ট্রিগার করার হ্যান্ডলার
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ২. ইমেজ ফাইল সিলেক্ট হলে সরাসরি ক্লাউডিনারি ও মঙ্গোডিবি-তে আপলোড করার মেইন ফাংশন
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // (ক) ক্লাউডিনারি গেটওয়েতে ফাইল পাঠানো
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed: " + uploadData.error);
        setIsUploading(false);
        return;
      }

      const newAvatarUrl = uploadData.url;
      console.log("📸 New Avatar Link from Cloudinary:", newAvatarUrl);

      // (খ) ইমেজের নতুন লিংক সহ পুরো প্রোফাইল ডেটা MongoDB-তে আপডেট করা
      const updatedProfile = {
        ...userProfile,
        avatar: newAvatarUrl
      };

      const dbRes = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const dbData = await dbRes.json();

      if (dbData.success) {
        alert("🎉 Profile Picture successfully synced with MongoDB Database!");
        // যদি প্যারেন্ট থেকে setUserProfile পাস করা থাকে তবে ফ্রন্টএন্ড স্টেট সাথে সাথে বদলে যাবে
        if (setUserProfile) {
          setUserProfile(dbData.user);
        } else {
          window.location.reload(); // ব্যাকআপ রিফ্রেশ
        }
      } else {
        alert("Database error: " + dbData.error);
      }

    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Something went wrong while updating profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 shadow-xs p-6 md:p-8 rounded-none">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* HEADER WITH AVATAR AND DYNAMIC NAME */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">My Details</h2>
        
        <div className="flex items-center gap-4">
          
          {/* ক্লিকযোগ্য ডায়নামিক অ্যাভাটার কন্টেইনার */}
          <div 
            onClick={handleAvatarClick} 
            className="relative w-16 h-16 rounded-full border border-neutral-200 cursor-pointer group overflow-hidden select-none"
            title="Click to change profile picture"
          >
            <img 
              src={userProfile.avatar || '/Saikot.jpg'} 
              alt={userProfile.name} 
              className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-40' : 'group-hover:opacity-75'}`}
            />
            {/* হোভার এফেক্ট ও লোডিং ইন্ডিকেটর ওভারলে */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-white font-bold text-center px-1">
                {isUploading ? '...' : 'CHANGE'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-neutral-900 leading-tight">
              {userProfile.name}
            </h3>
            <button 
              type="button"
              onClick={onEditClick}
              className="mt-1.5 px-3 py-1 bg-[#A3371F] hover:bg-[#8A2E1A] text-white font-semibold text-[11px] uppercase tracking-wider rounded-none cursor-pointer transition-all active:scale-95"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <hr className="border-neutral-200/60 my-6" />

      {/* DYNAMIC ACCOUNT INFORMATION TABLE */}
      <div>
        <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">
          Account Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          
          {/* COLUMN LEFT */}
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Name</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.name}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Email</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800 break-all">{userProfile.email}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">City</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.city}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">NID</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.nid}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Gender</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.gender}</span>
            </div>
          </div>

          {/* COLUMN RIGHT */}
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Mobile Number</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.phone}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Address</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.address}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Nationality</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.nationality}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Date of Birth</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.dob}</span>
            </div>
            
            <div className="flex items-start">
              <span className="w-28 text-neutral-500 shrink-0">Marital Status</span>
              <span className="text-neutral-400 mr-2">:</span>
              <span className="font-semibold text-neutral-800">{userProfile.maritalStatus}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}