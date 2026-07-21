'use client';

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiUpload, FiX } from 'react-icons/fi';

interface HeroData {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl: string;
  isActive: boolean;
}

export default function HeroManager() {
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchHeroes = async () => {
    try {
      const res = await fetch('/api/hero');
      const result = await res.json();
      if (result.success) setHeroes(result.data);
    } catch (err) {
      console.error('Failed to fetch heroes:', err);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success) finalImageUrl = uploadData.url;
      } else if (editingId) {
        const currentHero = heroes.find(h => h._id === editingId);
        finalImageUrl = currentHero ? currentHero.imageUrl : '';
      }

      if (!finalImageUrl && !editingId) throw new Error('Image is required for new banner');

      const payload = { title, subtitle, videoUrl, imageUrl: finalImageUrl, isActive };

      if (editingId) {
        const res = await fetch(`/api/hero/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) alert('🎉 Banner Updated Successfully!');
      } else {
        const res = await fetch('/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) alert('🎉 New Banner Created!');
      }

      closeAndResetForm();
      fetchHeroes();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (hero: HeroData) => {
    setEditingId(hero._id);
    setTitle(hero.title);
    setSubtitle(hero.subtitle);
    setVideoUrl(hero.videoUrl);
    setIsActive(hero.isActive);
    setPreviewUrl(hero.imageUrl);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      const res = await fetch(`/api/hero/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('🗑️ Banner Deleted!');
        fetchHeroes();
      }
    } catch (error) {
      alert('Delete failed');
    }
  };

  const closeAndResetForm = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setVideoUrl('');
    setIsActive(false);
    setImageFile(null);
    setPreviewUrl(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 text-sm">
      {/* TOP HEADER BLOCK */}
      <div className="flex justify-between items-center bg-white p-6 border border-neutral-200/60 rounded-xl shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-neutral-800">Total Heroes ({heroes.length})</h2>
          <p className="text-xs text-neutral-400 mt-1">Control and live sync dynamic banners on your homepage</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#A3371F] hover:bg-[#8A2E1A] text-white font-bold text-sm rounded-lg shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <FiPlus className="text-base" />
          <span>Add Hero</span>
        </button>
      </div>

      {/* EXISTENT HERO CARDS LIST */}
      {heroes.length === 0 ? (
        <div className="p-12 text-center bg-white border border-dashed border-neutral-300 rounded-xl text-neutral-400 font-medium">
          No active hero slider nodes found in database. Click "Add Hero" to deploy one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map((hero) => (
            <div key={hero._id} className="bg-white border border-neutral-200/70 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between group">
              <div className="h-48 bg-neutral-900 relative flex items-center justify-center text-white p-6 overflow-hidden">
                <img 
                  src={hero.imageUrl} 
                  alt={hero.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-800/20" />
                <div className="relative z-10 w-full flex flex-col justify-between h-full">
                  <span className="self-start text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded text-neutral-300 backdrop-blur-xs">
                    Cloudinary Managed
                  </span>
                  <h4 className="text-base font-black leading-tight line-clamp-2 max-w-[85%] text-white uppercase tracking-wide">
                    {hero.title}
                  </h4>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-neutral-800 text-base truncate">{hero.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-medium">{hero.subtitle}</p>
                  <div className="text-xs space-y-1 pt-2 border-t border-neutral-100 text-neutral-600">
                    <p className="truncate"><span className="font-bold text-neutral-700">Video Link:</span> {hero.videoUrl || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-neutral-100">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hero.isActive ? 'bg-green-50 text-green-700' : 'bg-neutral-50 text-neutral-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hero.isActive ? 'bg-green-600' : 'bg-neutral-400'}`} />
                    {hero.isActive ? 'Live Active' : 'Inactive'}
                  </span>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => startEdit(hero)}
                      className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit size={15} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(hero._id)}
                      className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs" onClick={closeAndResetForm} />
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button 
              type="button" 
              onClick={closeAndResetForm}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg bg-neutral-50 border border-neutral-100 z-20 cursor-pointer"
            >
              <FiX size={18} />
            </button>

            <form onSubmit={handleSubmit} className="flex-1 p-6 md:p-8 overflow-y-auto space-y-5">
              <div>
                <div className="flex items-center gap-2 text-amber-600">
                  <span className="text-lg">🎛️</span>
                  <h3 className="text-lg font-bold text-neutral-800">
                    {editingId ? '⚡ Edit Mode' : 'Provision New Hero Node'}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">Input precise copy text and dimensions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">Main Title</label>
                  <input type="text" placeholder="Headline text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-[#A3371F]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">Watch Video URL</label>
                  <input type="text" placeholder="https://..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-[#A3371F]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">Subtitle / Description</label>
                <textarea rows={3} placeholder="Description here..." value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-[#A3371F] resize-none" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2">
                  <input type="checkbox" id="modalActiveChk" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#A3371F] cursor-pointer" />
                  <label htmlFor="modalActiveChk" className="font-semibold text-neutral-700 text-xs cursor-pointer select-none">Set as Active Live Banner</label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 block">Background Graphic Asset</label>
                <label className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-amber-300 bg-amber-50/30 hover:bg-amber-50 rounded-lg text-xs font-bold text-amber-700 transition-colors cursor-pointer">
                  <FiUpload />
                  <span>Upload Image File</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {imageFile && <span className="text-xs text-neutral-500 ml-2 font-mono">{imageFile.name}</span>}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-lg disabled:opacity-50 cursor-pointer">
                  {loading ? 'Processing...' : '💾 Save Configuration'}
                </button>
                <button type="button" onClick={closeAndResetForm} className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold text-sm rounded-lg">Cancel</button>
              </div>
            </form>

            {/* PREVIEW PANEL */}
            <div className="w-full md:w-80 bg-neutral-50 border-l border-neutral-100 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Realtime Client Preview</h4>
                <div className="w-full aspect-square bg-[#0b1220] rounded-xl p-5 flex flex-col justify-end text-white relative overflow-hidden shadow-inner">
                  {previewUrl && <img src={previewUrl} alt="Live Preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <p className="text-[9px] text-amber-400 font-bold tracking-wider uppercase">{isActive ? '🟢 LIVE' : '⚪ PREVIEW'}</p>
                    <h5 className="text-xs font-black uppercase line-clamp-2">{title || 'MAIN TITLE HEADLINE'}</h5>
                    <p className="text-[9px] text-neutral-300 line-clamp-2 leading-tight">{subtitle || 'Your subtitle description text...'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-[11px] text-neutral-500">
                <p className="font-bold text-amber-900 mb-1">🛠️ Engine Deployment Status</p>
                Visibility token: <span className="font-bold text-neutral-800">{isActive ? 'active' : 'inactive'}</span>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}