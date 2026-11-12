import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Project } from '../../types';
import {
  FolderKanban,
  Plus,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  PieChart,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, addProject, formatPKR, showToast } = useCrm();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: 'Hussain Chowk, Skardu',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 50,
    availableUnits: 20,
    soldUnits: 30,
    startingPrice: 5000000,
    completionDate: 'December 2026',
    status: 'Under Construction' as Project['status'],
    description: 'Master-planned development in Skardu with mountain panoramic views.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addProject(formData);
    setIsAddOpen(false);
    setFormData({
      name: '',
      location: 'Hussain Chowk, Skardu',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      totalUnits: 50,
      availableUnits: 20,
      soldUnits: 30,
      startingPrice: 5000000,
      completionDate: 'December 2026',
      status: 'Under Construction',
      description: ''
    });
  };

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Under Construction':
        return 'bg-blue-50 text-[#2E66F6] border-blue-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Planning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Upcoming':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Development Projects</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Master-planned commercial plazas, residential townships, and alpine resorts in Baltistan.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => {
          const soldPercentage = Math.round((proj.soldUnits / proj.totalUnits) * 100);

          return (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Cover Image & Status */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs ${getStatusBadge(
                      proj.status
                    )} bg-white/90`}
                  >
                    {proj.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                        Starting From
                      </span>
                      <span className="text-base font-bold tabular-nums">
                        {formatPKR(proj.startingPrice)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                        Completion
                      </span>
                      <span className="text-xs font-medium">{proj.completionDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2E66F6] transition-colors">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2E66F6]" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Units Inventory & Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Sales Progress</span>
                    <span className="font-bold text-slate-800 tabular-nums">
                      {proj.soldUnits} / {proj.totalUnits} Units Sold ({soldPercentage}%)
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2E66F6] rounded-full transition-all duration-500"
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{proj.availableUnits} Units Available</span>
                    <span>Direct Developer Booking</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">New Development Project</h3>
              <button onClick={() => setIsAddOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Karakoram Valley Residences"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Location in Skardu
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Total Units
                  </label>
                  <input
                    type="number"
                    value={formData.totalUnits}
                    onChange={e => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Available
                  </label>
                  <input
                    type="number"
                    value={formData.availableUnits}
                    onChange={e => setFormData({ ...formData, availableUnits: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Sold Units
                  </label>
                  <input
                    type="number"
                    value={formData.soldUnits}
                    onChange={e => setFormData({ ...formData, soldUnits: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Starting Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.startingPrice}
                    onChange={e => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={formData.completionDate}
                    onChange={e => setFormData({ ...formData, completionDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Planning">Planning</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Completed">Completed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
