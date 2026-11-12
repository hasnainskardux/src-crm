import React, { useState, useRef, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Search,
  Plus,
  Bell,
  Mail,
  ChevronDown,
  User,
  Settings,
  RotateCcw,
  LogOut,
  MapPin,
  Building2,
  Users2,
  CalendarDays,
  BadgePercent
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    sidebarCollapsed,
    setIsGlobalSearchOpen,
    setIsQuickAddOpen,
    setIsNotificationsOpen,
    setIsMessagesOpen,
    notifications,
    conversations,
    setCurrentTab,
    resetAllDemoData,
    showToast
  } = useCrm();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuickAddDropdownOpen, setIsQuickAddDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickAddRef = useRef<HTMLDivElement>(null);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = conversations.filter(c => c.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (quickAddRef.current && !quickAddRef.current.contains(e.target as Node)) {
        setIsQuickAddDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between transition-all duration-300">
      {/* Global Search Input */}
      <div className="flex-1 max-w-xl">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-4 py-2 text-sm text-[#78889B] transition-colors group cursor-text"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-[#2E66F6] transition-colors" />
            <span className="truncate">Search properties, leads, contacts and more...</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-slate-400">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <div className="relative" ref={quickAddRef}>
          <button
            onClick={() => setIsQuickAddDropdownOpen(prev => !prev)}
            className="w-9 h-9 rounded-xl bg-[#2E66F6] hover:bg-[#2555D4] text-white flex items-center justify-center shadow-sm shadow-[#2E66F6]/25 hover:shadow transition-all"
            title="Quick Add"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>

          {isQuickAddDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Create New
              </div>
              <button
                onClick={() => {
                  setIsQuickAddDropdownOpen(false);
                  setCurrentTab('properties');
                  setIsQuickAddOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-[#2E66F6] transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#2E66F6]" />
                <span>Add Property</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickAddDropdownOpen(false);
                  setCurrentTab('leads');
                  setIsQuickAddOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-[#2E66F6] transition-colors"
              >
                <Users2 className="w-4 h-4 text-emerald-600" />
                <span>Add Lead</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickAddDropdownOpen(false);
                  setCurrentTab('calendar');
                  setIsQuickAddOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-[#2E66F6] transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-indigo-600" />
                <span>Schedule Visit</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickAddDropdownOpen(false);
                  setCurrentTab('offers');
                  setIsQuickAddOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-[#2E66F6] transition-colors"
              >
                <BadgePercent className="w-4 h-4 text-amber-600" />
                <span>Create Offer</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative w-9 h-9 rounded-xl text-slate-600 hover:text-[#2E66F6] hover:bg-slate-50 flex items-center justify-center border border-slate-200/70 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Messages Icon with Badge */}
        <button
          onClick={() => setIsMessagesOpen(true)}
          className="relative w-9 h-9 rounded-xl text-slate-600 hover:text-[#2E66F6] hover:bg-slate-50 flex items-center justify-center border border-slate-200/70 transition-colors"
          title="Direct Messages"
        >
          <Mail className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#2E66F6] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              9+
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="SRC Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-[#263238] leading-tight">Nayeem Azraf</span>
              <span className="text-[11px] text-[#78889B] leading-tight flex items-center gap-1">
                Super Admin
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">SRC Administrator</p>
                <p className="text-xs text-slate-500">hasnainskardux@gmail.com</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-[#2E66F6]" />
                  <span>Skardu, Gilgit-Baltistan, Pakistan</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setCurrentTab('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Admin Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setCurrentTab('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>CRM Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    resetAllDemoData();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <span>Reset Demo Data</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    showToast('Session Active', 'You are logged in as SRC Super Administrator.');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
