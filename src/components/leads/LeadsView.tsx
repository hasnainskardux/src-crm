import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Lead, LeadStage } from '../../types';
import {
  Users2,
  Plus,
  Kanban,
  Table as TableIcon,
  Search,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  ArrowRight,
  X,
  Building2,
  Filter
} from 'lucide-react';

const STAGES: LeadStage[] = [
  'New',
  'Contacted',
  'Interested',
  'Qualified',
  'Meeting Scheduled',
  'Negotiation',
  'Converted',
  'Lost'
];

export const LeadsView: React.FC = () => {
  const {
    leads,
    addLead,
    updateLeadStage,
    deleteLead,
    formatPKR,
    showToast
  } = useCrm();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '+92 300 0000000',
    email: '',
    interestedPropertyName: 'Luxury Mountain Residence (#5001)',
    budget: 8000000,
    source: 'Website' as Lead['source'],
    assignedAgent: 'Nayeem Azraf',
    stage: 'New' as LeadStage,
    nextFollowUp: '2026-11-20',
    notes: 'Interested in property inspection tour.'
  });

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery) ||
    l.interestedPropertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name.trim()) return;
    addLead(newLeadData);
    setIsAddLeadOpen(false);
    setNewLeadData({
      name: '',
      phone: '+92 300 0000000',
      email: '',
      interestedPropertyName: 'Luxury Mountain Residence (#5001)',
      budget: 8000000,
      source: 'Website',
      assignedAgent: 'Nayeem Azraf',
      stage: 'New',
      nextFollowUp: '2026-11-20',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Leads Management</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Track customer acquisition pipeline, qualification stages, and follow-up schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Kanban / Table */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white text-[#2E66F6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-[#2E66F6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Inbound</span>
          <div className="text-xl font-bold text-slate-800 mt-1 tabular-nums">{leads.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Qualified Leads</span>
          <div className="text-xl font-bold text-[#2E66F6] mt-1 tabular-nums">
            {leads.filter(l => l.stage === 'Qualified' || l.stage === 'Meeting Scheduled').length}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">In Negotiation</span>
          <div className="text-xl font-bold text-amber-600 mt-1 tabular-nums">
            {leads.filter(l => l.stage === 'Negotiation').length}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Converted Deals</span>
          <div className="text-xl font-bold text-emerald-600 mt-1 tabular-nums">
            {leads.filter(l => l.stage === 'Converted').length}
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by customer name, email, phone or property..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6] shadow-xs"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'kanban' ? (
        /* KANBAN BOARD */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px]">
            {STAGES.map(stage => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage);

              return (
                <div
                  key={stage}
                  className="w-72 shrink-0 bg-slate-100/70 rounded-2xl p-3 flex flex-col max-h-[75vh]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{stage}</span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 tabular-nums">
                        {stageLeads.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards List */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                    {stageLeads.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        No leads in {stage}
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div
                          key={lead.id}
                          className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#2E66F6]/60 transition-all space-y-2.5 group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2E66F6] transition-colors">
                                {lead.name}
                              </h4>
                              <p className="text-xs font-semibold text-slate-700 mt-0.5 tabular-nums">
                                {formatPKR(lead.budget)}
                              </p>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {lead.source}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 space-y-1">
                            <div className="flex items-center gap-1.5 truncate">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{lead.interestedPropertyName}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>Next: {lead.nextFollowUp}</span>
                            </div>
                          </div>

                          {/* Quick Stage Mover */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-400 truncate">
                              {lead.assignedAgent}
                            </span>
                            <div className="flex items-center gap-1">
                              <select
                                value={lead.stage}
                                onChange={e => updateLeadStage(lead.id, e.target.value as LeadStage)}
                                className="text-[11px] font-medium bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 cursor-pointer text-slate-600 hover:border-slate-300"
                              >
                                {STAGES.map(s => (
                                  <option key={s} value={s}>
                                    Move: {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LEADS TABLE */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-[#78889B]">
                  <th className="py-3 px-4 font-medium">Customer Name</th>
                  <th className="py-3 px-3 font-medium">Contact</th>
                  <th className="py-3 px-3 font-medium">Interested Property</th>
                  <th className="py-3 px-3 font-medium">Budget</th>
                  <th className="py-3 px-3 font-medium">Source</th>
                  <th className="py-3 px-3 font-medium">Assigned Agent</th>
                  <th className="py-3 px-3 font-medium">Status / Stage</th>
                  <th className="py-3 px-3 font-medium">Next Follow-up</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 text-xs block">
                        {lead.name}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600">
                      <div>{lead.phone}</div>
                      <div className="text-slate-400 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-700 font-medium max-w-[200px] truncate">
                      {lead.interestedPropertyName}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800 text-xs tabular-nums whitespace-nowrap">
                      {formatPKR(lead.budget)}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[11px]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600">
                      {lead.assignedAgent}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={lead.stage}
                        onChange={e => updateLeadStage(lead.id, e.target.value as LeadStage)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-blue-50 text-[#2E66F6]"
                      >
                        {STAGES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500 tabular-nums">
                      {lead.nextFollowUp}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Add New Lead</h3>
              <button onClick={() => setIsAddLeadOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadData.name}
                  onChange={e => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLeadData.phone}
                    onChange={e => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={e => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Budget (PKR)
                </label>
                <input
                  type="number"
                  value={newLeadData.budget}
                  onChange={e => setNewLeadData({ ...newLeadData, budget: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Source</label>
                  <select
                    value={newLeadData.source}
                    onChange={e => setNewLeadData({ ...newLeadData, source: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Stage</label>
                  <select
                    value={newLeadData.stage}
                    onChange={e => setNewLeadData({ ...newLeadData, stage: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    {STAGES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] hover:bg-[#2555D4] rounded-xl shadow-sm shadow-[#2E66F6]/20"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
