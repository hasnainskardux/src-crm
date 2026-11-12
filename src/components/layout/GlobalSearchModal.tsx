import React, { useState, useMemo } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Search,
  X,
  Building2,
  Users2,
  FolderKanban,
  UserSquare2,
  ArrowRight
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    properties,
    leads,
    projects,
    contacts,
    setSelectedProperty,
    setIsPropertyDetailOpen,
    setCurrentTab,
    formatPKR
  } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties.slice(0, 4);
    const q = searchQuery.toLowerCase();
    return properties.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [properties, searchQuery]);

  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads.slice(0, 3);
    const q = searchQuery.toLowerCase();
    return leads.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q)
    );
  }, [leads, searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects.slice(0, 2);
    const q = searchQuery.toLowerCase();
    return projects.filter(
      pr =>
        pr.name.toLowerCase().includes(q) ||
        pr.location.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts.slice(0, 3);
    const q = searchQuery.toLowerCase();
    return contacts.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [contacts, searchQuery]);

  if (!isGlobalSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-[#2E66F6]" />
          <input
            type="text"
            placeholder="Search listings by ID (#5001), address, lead name, project..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-base text-slate-800 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Properties Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Properties ({filteredProperties.length})
              </span>
              <button
                onClick={() => {
                  setIsGlobalSearchOpen(false);
                  setCurrentTab('properties');
                }}
                className="text-[#2E66F6] hover:underline flex items-center gap-1 text-[11px]"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              {filteredProperties.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProperty(p);
                    setIsPropertyDetailOpen(true);
                    setIsGlobalSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-[#2E66F6] transition-colors">
                          {p.name}
                        </span>
                        <span className="text-xs text-[#2E66F6] font-medium bg-blue-50 px-1.5 py-0.5 rounded">
                          {p.ref}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{p.address}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 tabular-nums">
                    {formatPKR(p.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leads Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5" /> Leads ({filteredLeads.length})
              </span>
              <button
                onClick={() => {
                  setIsGlobalSearchOpen(false);
                  setCurrentTab('leads');
                }}
                className="text-[#2E66F6] hover:underline flex items-center gap-1 text-[11px]"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              {filteredLeads.map(l => (
                <div
                  key={l.id}
                  onClick={() => {
                    setIsGlobalSearchOpen(false);
                    setCurrentTab('leads');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-sm font-semibold text-slate-800">{l.name}</span>
                    <p className="text-xs text-slate-500">
                      {l.email} · {l.interestedPropertyName}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {l.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects & Contacts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5" /> Projects
              </div>
              <div className="space-y-1">
                {filteredProjects.map(pr => (
                  <div
                    key={pr.id}
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      setCurrentTab('projects');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-800">{pr.name}</p>
                    <p className="text-xs text-slate-500">{pr.location}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <UserSquare2 className="w-3.5 h-3.5" /> Contacts
              </div>
              <div className="space-y-1">
                {filteredContacts.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      setCurrentTab('contacts');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.type} · {c.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Navigate with ⬆⬇ or mouse</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
