import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Activity } from '../../types';
import {
  Activity as ActivityIcon,
  Search,
  Filter,
  Building2,
  Users2,
  Calendar,
  BadgePercent,
  FileCheck2,
  DollarSign,
  User,
  Clock
} from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  const { activities } = useCrm();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter(a => {
    const matchesType = selectedType === 'All' || a.type === selectedType;
    const matchesSearch =
      a.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'Property Added':
        return <Building2 className="w-4 h-4 text-[#2E66F6]" />;
      case 'Lead Created':
        return <Users2 className="w-4 h-4 text-emerald-600" />;
      case 'Visit Scheduled':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      case 'Offer Received':
        return <BadgePercent className="w-4 h-4 text-amber-600" />;
      case 'Agreement Signed':
        return <FileCheck2 className="w-4 h-4 text-purple-600" />;
      case 'Payment Received':
        return <DollarSign className="w-4 h-4 text-emerald-700" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#263238]">System Activity Log</h1>
        <p className="text-sm text-[#78889B] mt-0.5">
          Real-time chronological timeline of agent operations, lead movements, and customer transactions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search activity records..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter Type:</span>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer"
          >
            <option value="All">All Activities</option>
            <option value="Property Added">Property Added</option>
            <option value="Lead Created">Lead Created</option>
            <option value="Visit Scheduled">Visit Scheduled</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Agreement Signed">Agreement Signed</option>
            <option value="Payment Received">Payment Received</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {filteredActivities.map(act => (
            <div key={act.id} className="relative group">
              {/* Dot Icon */}
              <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#2E66F6] flex items-center justify-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2E66F6]" />
              </div>

              {/* Card */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      {getActivityIcon(act.type)}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{act.type}</h4>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-medium text-slate-600">{act.user}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium tabular-nums">
                    {act.timestamp}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                  <p>{act.details}</p>
                </div>

                {act.target && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Target Entity:</span>
                    <span className="font-semibold text-[#2E66F6]">{act.target}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
