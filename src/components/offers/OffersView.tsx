import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Offer } from '../../types';
import {
  BadgePercent,
  Plus,
  Search,
  Building2,
  Calendar,
  User,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  X
} from 'lucide-react';

export const OffersView: React.FC = () => {
  const { offers, addOffer, updateOfferStatus, formatPKR, showToast } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    propertyId: 'prop-1',
    propertyName: 'Luxury Mountain Residence (#5001)',
    offerAmount: 8200000,
    askingPrice: 8365000,
    offerDate: '2026-11-12',
    assignedAgent: 'Nayeem Azraf',
    status: 'New' as Offer['status'],
    notes: 'Submitted bank deposit guarantee.'
  });

  const filteredOffers = offers.filter(
    o =>
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.offerRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return;
    addOffer(formData);
    setIsAddOpen(false);
    setFormData({
      customerName: '',
      propertyId: 'prop-1',
      propertyName: 'Luxury Mountain Residence (#5001)',
      offerAmount: 8200000,
      askingPrice: 8365000,
      offerDate: '2026-11-12',
      assignedAgent: 'Nayeem Azraf',
      status: 'New',
      notes: ''
    });
  };

  const getStatusBadge = (status: Offer['status']) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Negotiating':
        return 'bg-blue-50 text-[#2E66F6] border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'New':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Offers & Negotiations</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Manage buyer purchase bids, seller approvals, and active counter-proposals.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Offer</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search offers by customer name, ref (OFF-2026-001) or property..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6] shadow-xs"
          />
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-[#78889B]">
                <th className="py-3 px-4 font-medium">Offer Ref</th>
                <th className="py-3 px-3 font-medium">Customer</th>
                <th className="py-3 px-3 font-medium">Target Property</th>
                <th className="py-3 px-3 font-medium">Offer Amount</th>
                <th className="py-3 px-3 font-medium">Asking Price</th>
                <th className="py-3 px-3 font-medium">Date</th>
                <th className="py-3 px-3 font-medium">Assigned Agent</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOffers.map(offer => (
                <tr key={offer.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-xs text-[#2E66F6]">
                    {offer.offerRef}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 text-xs">
                    {offer.customerName}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-700 max-w-[200px] truncate">
                    {offer.propertyName}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 text-xs tabular-nums">
                    {formatPKR(offer.offerAmount)}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-500 tabular-nums">
                    {formatPKR(offer.askingPrice)}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-500 tabular-nums">
                    {offer.offerDate}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-600">
                    {offer.assignedAgent}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {offer.status !== 'Accepted' && (
                        <button
                          onClick={() => updateOfferStatus(offer.id, 'Accepted')}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                        >
                          Accept
                        </button>
                      )}
                      {offer.status !== 'Rejected' && (
                        <button
                          onClick={() => updateOfferStatus(offer.id, 'Rejected')}
                          className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Offer Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Register New Offer</h3>
              <button onClick={() => setIsAddOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Ammar ibn Yasir"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Target Property
                </label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={e => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Offer Amount (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.offerAmount}
                    onChange={e => setFormData({ ...formData, offerAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Asking Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.askingPrice}
                    onChange={e => setFormData({ ...formData, askingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Agent
                  </label>
                  <input
                    type="text"
                    value={formData.assignedAgent}
                    onChange={e => setFormData({ ...formData, assignedAgent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
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
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
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
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
