'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Building2,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  Building,
  Footprints,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Sidebar({ isOpen, onClose, onOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { title: 'Hero', icon: Sparkles, href: '/admin/hero' },
    { title: 'Popular Courses', icon: BookOpen, href: '/admin/courses' },
    { title: 'E-Learning Institute', icon: Building2, href: '/admin/institute' },
    { title: 'Successful Students', icon: GraduationCap, href: '/admin/students' },
    { title: 'Students Feedback', icon: MessageSquare, href: '/admin/feedback' },
    { title: 'Questions', icon: HelpCircle, href: '/admin/questions' },
    { title: 'Companies', icon: Building, href: '/admin/companies' },
    { title: 'Footer', icon: Footprints, href: '/admin/footer' },
  ];

  // Simple Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      onClose();
      // সরাসরি লগইন পেজে রিডাইরেক্ট করবে
      window.location.replace('/');
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={onOpen}
          className="p-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B23B25] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
                P
              </div>
              <div>
                <h1 className="text-lg font-black text-[#A1331F] tracking-wide uppercase leading-none">
                  PRO EDU
                </h1>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  Control Portal
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#B23B25] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Section */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#B23B25]/10 text-[#B23B25] font-bold flex items-center justify-center text-xs shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-800 truncate leading-tight">Admin User</p>
              <p className="text-[10px] text-slate-400 truncate">admin@proedu.com</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40 lg:hidden"
        />
      )}
    </>
  );
}