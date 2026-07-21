'use client';

import React, { useState, useRef } from 'react';
import { FaTimes, FaSave, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { UserProfile } from '@/types/user';

interface EditProfileModalProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onClose: () => void;
}

export default function EditProfileModal({ userProfile, setUserProfile, onClose }: EditProfileModalProps) {
  const [tempProfile, setTempProfile] = useState({ ...userProfile });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cloudinary credentials (bylxfdh4 & purabi-insurance)
  const CLOUDINARY_CLOUD_NAME = 'bylxfdh4'; 
  const CLOUDINARY_UPLOAD_PRESET = 'purabi-insurance'; 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.secure_url) {
        setTempProfile((prev) => ({ ...prev, avatar: data.secure_url }));
      } else {
        alert('Upload failed. Please check Cloudinary settings.');
        console.error('Cloudinary Error:', data);
      }
    } catch (err) {
      console.error('Connection error:', err);
      alert('Error uploading image to Cloudinary.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({ ...tempProfile });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-none w-full max-w-4xl p-6 md:p-8 max-h-[95vh] overflow-y-auto relative shadow-lg border border-neutral-200">
        
        <div className="flex justify-between items-center border-b border-neutral-200 pb-4 mb-6">
          <h3 className="text-xl font-bold text-neutral-800">Edit Personal Information</h3>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-neutral-100 transition-all">
            <FaTimes className="text-neutral-500 text-lg" />
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Avatar Area */}
          <div className="flex items-center gap-4 bg-neutral-50 p-4 border border-neutral-200 rounded-none">
            <img src={tempProfile.avatar} alt="Preview" className="w-20 h-20 object-cover border border-neutral-300 shadow-sm"/>
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-2 transition-all rounded-none disabled:opacity-50"
              >
                {isUploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />}
                {isUploading ? 'Uploading to Cloudinary...' : 'Change Avatar'}
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Name</label>
              <input 
                type="text" 
                value={tempProfile.name} 
                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Mobile Number</label>
              <input 
                type="text" 
                value={tempProfile.phone} 
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Email</label>
              <input 
                type="email" 
                value={tempProfile.email} 
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Gender</label>
              <select 
                value={tempProfile.gender}
                onChange={(e) => setTempProfile({...tempProfile, gender: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Date of Birth</label>
              <input 
                type="date" 
                value={tempProfile.dob} 
                onChange={(e) => setTempProfile({...tempProfile, dob: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">NID</label>
              <input 
                type="text" 
                value={tempProfile.nid} 
                onChange={(e) => setTempProfile({...tempProfile, nid: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">City</label>
              <select 
                value={tempProfile.city}
                onChange={(e) => setTempProfile({...tempProfile, city: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Nationality</label>
              <select 
                value={tempProfile.nationality}
                onChange={(e) => setTempProfile({...tempProfile, nationality: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
              >
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Marital Status</label>
              <select 
                value={tempProfile.maritalStatus}
                onChange={(e) => setTempProfile({...tempProfile, maritalStatus: e.target.value})}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
              >
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1.5">Address</label>
              <textarea 
                value={tempProfile.address} 
                onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                rows={2}
                className="w-full p-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-500 text-neutral-800 font-medium text-sm"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-start pt-4 border-t border-neutral-200">
            <button type="submit" disabled={isUploading} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-none shadow-sm flex items-center gap-2 disabled:opacity-50">
              <FaSave /> Save Changes
            </button>
            <button type="button" onClick={onClose} className="px-5 py-2 bg-neutral-600 hover:bg-neutral-700 text-white font-semibold text-sm rounded-none shadow-sm flex items-center gap-2">
              <FaTimes /> Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}