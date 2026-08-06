'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2, Edit, Plus, X, Eye, Upload, Loader2 } from 'lucide-react';

interface HeroBannerData {
  _id?: string;
  breadcrumb: string;
  titleRegular: string;
  titleBold: string;
  logoUrl: string;
  bgImageUrl: string;
}

export default function AdminAboutHero() {
  const [list, setList] = useState<HeroBannerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emptyFormState: HeroBannerData = {
    breadcrumb: '',
    titleRegular: '',
    titleBold: '',
    logoUrl: '',
    bgImageUrl: '',
  };

  const [form, setForm] = useState<HeroBannerData>(emptyFormState);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/overview/hero-banner', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setList(data.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoUrl' | 'bgImageUrl'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setForm(emptyFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: HeroBannerData) => {
    const targetId = item._id;
    if (!targetId) {
      alert('Error: Banner ID not found!');
      return;
    }
    setEditId(targetId);
    setForm({
      breadcrumb: item.breadcrumb || '',
      titleRegular: item.titleRegular || '',
      titleBold: item.titleBold || '',
      logoUrl: item.logoUrl || '',
      bgImageUrl: item.bgImageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `/api/overview/hero-banner/${editId}`
        : '/api/overview/hero-banner';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        setEditId(null);
        setForm(emptyFormState);
        fetchData();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      alert('Network or Server error!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id?: string) => {
    e.stopPropagation();
    if (!id) {
      alert('ID is missing for deletion!');
      return;
    }

    if (confirm('Are you sure you want to delete this hero banner?')) {
      try {
        const res = await fetch(`/api/overview/hero-banner/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok && data.success) {
          fetchData();
        } else {
          alert(data.message || 'Delete failed');
        }
      } catch (err) {
        alert('Could not delete item.');
      }
    }
  };

  return (
    <div className="lg:ml-72 p-6 space-y-6 transition-all duration-300 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Overview Hero Banners
          </h1>
          <p className="text-xs text-gray-500">
            Manage page header banners with dynamic content and image uploads.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-[#008751] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-sm"
        >
          <Plus size={16} /> Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div
              className="w-full bg-cover bg-center p-6 min-h-[160px] flex justify-between items-center relative"
              style={{ backgroundImage: item.bgImageUrl ? `url(${item.bgImageUrl})` : 'none' }}
            >
              <div className="bg-[#a3d9be]/90 p-4 rounded-lg w-full flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-800 uppercase">
                    {item.breadcrumb}
                  </p>
                  <h3 className="text-xl font-serif text-gray-800 mt-1">
                    <span className="font-light">{item.titleRegular}</span>{' '}
                    <span className="font-bold text-[#008751]">
                      {item.titleBold}
                    </span>
                  </h3>
                </div>
                {item.logoUrl && (
                  <img
                    src={item.logoUrl}
                    alt="Logo"
                    className="w-12 h-12 object-contain shrink-0"
                  />
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                ID: {item._id ? item._id.slice(-6) : 'N/A'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
            No hero banners found. Click <strong>"Add New Banner"</strong> to create one.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border overflow-hidden my-8">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h2 className="text-base font-bold text-gray-800">
                {editId ? 'Edit Hero Banner' : 'Add New Hero Banner'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700">Breadcrumb Text</label>
                  <input
                    type="text"
                    placeholder="e.g. HOME > ABOUT UAMC >> OVERVIEW"
                    value={form.breadcrumb}
                    onChange={(e) => setForm({ ...form, breadcrumb: e.target.value })}
                    className="w-full border p-2.5 rounded-lg text-xs mt-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Title (Regular Text)</label>
                  <input
                    type="text"
                    placeholder="e.g. About"
                    value={form.titleRegular}
                    onChange={(e) => setForm({ ...form, titleRegular: e.target.value })}
                    className="w-full border p-2.5 rounded-lg text-xs mt-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Title (Bold Text)</label>
                  <input
                    type="text"
                    placeholder="e.g. UAMC"
                    value={form.titleBold}
                    onChange={(e) => setForm({ ...form, titleBold: e.target.value })}
                    className="w-full border p-2.5 rounded-lg text-xs mt-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Logo Image</label>
                  <label className="cursor-pointer bg-gray-50 border p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                    <Upload size={14} /> Choose Logo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logoUrl')}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Background Image / Pattern</label>
                  <label className="cursor-pointer bg-gray-50 border p-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                    <Upload size={14} /> Choose Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'bgImageUrl')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {(form.breadcrumb || form.titleRegular || form.titleBold || form.logoUrl || form.bgImageUrl) && (
                <div className="border border-gray-200 rounded-xl p-4 bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                    <Eye size={14} /> Live Preview
                  </div>
                  <div
                    className="w-full bg-cover bg-center rounded-lg p-6 border flex justify-between items-center"
                    style={{ backgroundImage: form.bgImageUrl ? `url(${form.bgImageUrl})` : 'none' }}
                  >
                    <div className="bg-[#a3d9be]/90 p-4 rounded-lg w-full flex justify-between items-center shadow-sm">
                      <div>
                        <p className="text-[10px] font-bold text-gray-800 uppercase">
                          {form.breadcrumb || 'BREADCRUMB PREVIEW'}
                        </p>
                        <h3 className="text-xl font-serif text-gray-800 mt-1">
                          <span className="font-light">{form.titleRegular} </span>
                          <span className="font-bold text-[#008751]">{form.titleBold}</span>
                        </h3>
                      </div>
                      {form.logoUrl && (
                        <img
                          src={form.logoUrl}
                          alt="Logo"
                          className="w-12 h-12 object-contain shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#008751] hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition"
                >
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {editId ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}