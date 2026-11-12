import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Broker } from '../../types';
import {
  Briefcase,
  Plus,
  Phone,
  Mail,
  MapPin,
  Building2,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';

export const BrokersView: React.FC = () => {
  const { brokers, addBroker, showToast } = useCrm();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: 'Baltistan Real Estate Network',
    phone: '+92 300 0000000',
    email: '',
    location: 'Skardu City',
    assignedPropertiesCount: 3,
    commissionRate: '2.0%',
    status: 'Active' as Broker['status'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addBroker(formData);
    setIsAddOpen(false);
    setFormData({
      name: '',
      company: '',
      phone: '+92 300 0000000',
      email: '',
      location: 'Skardu City',
      assignedPropertiesCount: 1,
      commissionRate: '2.0%',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Brokers & External Agents</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Manage authorized referral brokers, commission splits, and external sales network partners.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Broker</span>
        </button>
      </div>

      {/* Grid of Brokers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {brokers.map(b => (
          <div
            key={b.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-[#2E66F6]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{b.name}</h3>
                  <p className="text-xs text-[#2E66F6] font-semibold">{b.company}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {b.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{b.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.location}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Properties</span>
                  <span className="font-bold text-slate-800 tabular-nums">{b.assignedPropertiesCount}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Deals</span>
                  <span className="font-bold text-slate-800 tabular-nums">{b.totalDeals}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Commission</span>
                  <span className="font-bold text-[#2E66F6]">{b.commissionRate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs">
              <button
                onClick={() => showToast('Direct Channel', `Initiating call to ${b.phone}`)}
                className="text-[#2E66F6] font-semibold hover:underline"
              >
                Contact Broker →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Broker Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Add Referral Broker</h3>
              <button onClick={() => setIsAddOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Broker Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Hussain"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Company / Agency</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Commission Rate</label>
                  <input
                    type="text"
                    value={formData.commissionRate}
                    onChange={e => setFormData({ ...formData, commissionRate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] hover:bg-[#2555D4] rounded-xl shadow-sm shadow-[#2E66F6]/20"
                >
                  Register Broker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
