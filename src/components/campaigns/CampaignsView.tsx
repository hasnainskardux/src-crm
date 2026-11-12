import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Campaign } from '../../types';
import {
  Megaphone,
  Plus,
  TrendingUp,
  Users2,
  Calendar,
  DollarSign,
  BarChart3,
  Share2
} from 'lucide-react';

export const CampaignsView: React.FC = () => {
  const { campaigns, formatPKR, showToast } = useCrm();

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Marketing Campaigns</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Omni-channel marketing initiatives across Meta ads, WhatsApp broadcasts, and VIP email newsletters.
          </p>
        </div>

        <button
          onClick={() => showToast('New Campaign', 'Campaign drafting studio opened.')}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Allocated Budget</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {formatPKR(totalBudget)}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Spent: {formatPKR(totalSpent)}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Leads Generated</span>
          <div className="text-2xl font-bold text-[#2E66F6] mt-1 tabular-nums">
            {totalLeads} Inbound Leads
          </div>
          <p className="text-xs text-emerald-600 mt-0.5 font-medium">+18% vs previous month</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Avg. Conversion Rate</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
            5.8%
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Above real estate benchmark</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-[#78889B]">
                <th className="py-3 px-4 font-medium">Campaign Name</th>
                <th className="py-3 px-3 font-medium">Type</th>
                <th className="py-3 px-3 font-medium">Flight Duration</th>
                <th className="py-3 px-3 font-medium">Budget</th>
                <th className="py-3 px-3 font-medium">Spent</th>
                <th className="py-3 px-3 font-medium">Leads Generated</th>
                <th className="py-3 px-3 font-medium">Conversion Rate</th>
                <th className="py-3 px-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map(cmp => (
                <tr key={cmp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-xs text-slate-900">
                    {cmp.name}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-[#2E66F6] font-medium">
                    {cmp.type}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-500 tabular-nums">
                    {cmp.startDate} → {cmp.endDate}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 text-xs tabular-nums">
                    {formatPKR(cmp.budget)}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-600 tabular-nums">
                    {formatPKR(cmp.spent)}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-800 text-xs tabular-nums">
                    {cmp.leadsGenerated}
                  </td>
                  <td className="py-3.5 px-3 text-xs font-semibold text-emerald-600">
                    {cmp.conversionRate}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {cmp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
