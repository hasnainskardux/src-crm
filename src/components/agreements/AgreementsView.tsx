import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Agreement } from '../../types';
import {
  FileCheck2,
  Plus,
  Search,
  FileText,
  Calendar,
  Building2,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Printer
} from 'lucide-react';

export const AgreementsView: React.FC = () => {
  const { agreements, addAgreement, updateAgreementStatus, formatPKR, showToast } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewAgreement, setPreviewAgreement] = useState<Agreement | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    propertyId: 'prop-1',
    propertyName: 'Luxury Mountain Residence (#5001)',
    type: 'Sale Agreement' as Agreement['type'],
    startDate: '2026-11-15',
    expiryDate: '2027-11-15',
    amount: 8365000,
    status: 'Active' as Agreement['status']
  });

  const filteredAgreements = agreements.filter(
    a =>
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.agreementRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return;
    addAgreement(formData);
    setIsAddOpen(false);
    setFormData({
      customerName: '',
      propertyId: 'prop-1',
      propertyName: 'Luxury Mountain Residence (#5001)',
      type: 'Sale Agreement',
      startDate: '2026-11-15',
      expiryDate: '2027-11-15',
      amount: 8365000,
      status: 'Active'
    });
  };

  const getStatusBadge = (status: Agreement['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Draft':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Expired':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Terminated':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Legal Agreements & Deeds</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Manage binding purchase contracts, tenancy deeds, and title transfer documentation.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Agreement</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agreements by customer, ref (AGR-SKD-019), type or property..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6] shadow-xs"
          />
        </div>
      </div>

      {/* Agreements Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-[#78889B]">
                <th className="py-3 px-4 font-medium">Agreement Ref</th>
                <th className="py-3 px-3 font-medium">Customer Name</th>
                <th className="py-3 px-3 font-medium">Property</th>
                <th className="py-3 px-3 font-medium">Agreement Type</th>
                <th className="py-3 px-3 font-medium">Duration</th>
                <th className="py-3 px-3 font-medium">Contract Value</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAgreements.map(agr => (
                <tr key={agr.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-xs text-[#2E66F6]">
                    {agr.agreementRef}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 text-xs">
                    {agr.customerName}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-700 max-w-[200px] truncate">
                    {agr.propertyName}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-600 font-medium">
                    {agr.type}
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-500 tabular-nums">
                    {agr.startDate} → {agr.expiryDate}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 text-xs tabular-nums">
                    {formatPKR(agr.amount)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        agr.status
                      )}`}
                    >
                      {agr.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewAgreement(agr)}
                        className="p-1.5 text-slate-500 hover:text-[#2E66F6] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview PDF Agreement"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          showToast('Downloaded', `Downloaded ${agr.agreementRef}.pdf`);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#2E66F6] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF-Style Preview Drawer / Modal */}
      {previewAgreement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#2E66F6]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {previewAgreement.agreementRef} — {previewAgreement.type}
                  </h3>
                  <span className="text-xs text-slate-400">Formal Legal Document Preview</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewAgreement(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Styled like legal stamp paper) */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-800 text-xs font-serif leading-relaxed bg-[#FCFCFD]">
              {/* Document Header Stamp */}
              <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
                <div className="text-base font-bold tracking-widest uppercase font-sans text-[#2E66F6]">
                  SRC REAL ESTATE AGENCY & HOLDINGS
                </div>
                <div className="text-[11px] text-slate-600 font-sans">
                  REGISTERED REAL ESTATE BROKERAGE · SKARDU, GILGIT-BALTISTAN, PAKISTAN
                </div>
                <div className="text-sm font-bold uppercase underline pt-2">
                  {previewAgreement.type}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Document Reference: {previewAgreement.agreementRef}
                </div>
              </div>

              {/* Parties */}
              <div className="space-y-3 font-sans text-xs">
                <p>
                  This Deed of Agreement is entered into on this day between <strong>SRC Real Estate Agency</strong> (Party of the First Part, Represented by Super Admin Nayeem Azraf) and:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Client / Second Party:</span>
                      <strong>{previewAgreement.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Property Subject:</span>
                      <strong>{previewAgreement.propertyName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Effective Date:</span>
                      <span>{previewAgreement.startDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Consideration:</span>
                      <strong className="text-[#2E66F6]">{formatPKR(previewAgreement.amount)}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-slate-600 leading-relaxed">
                  <p>
                    1. <strong>Scope & Possession:</strong> The seller agrees to hand over clear physical possession of the specified property situated in Skardu district without any encumbrances.
                  </p>
                  <p>
                    2. <strong>Financial Settlement:</strong> The buyer covenants to pay the total sum via verified banking channels (Meezan Bank / Bank of Khyber).
                  </p>
                  <p>
                    3. <strong>Jurisdiction:</strong> Any legal interpretations or dispute resolutions shall fall under the jurisdiction of the district courts of Skardu, Gilgit-Baltistan.
                  </p>
                </div>

                {/* Signatures */}
                <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
                  <div className="border-t border-slate-300 pt-2">
                    <p className="font-bold">First Party (SRC Real Estate)</p>
                    <span className="text-slate-400 text-[10px]">Authorized Signature & Stamp</span>
                  </div>
                  <div className="border-t border-slate-300 pt-2">
                    <p className="font-bold">{previewAgreement.customerName}</p>
                    <span className="text-slate-400 text-[10px]">Client Signature</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Status: {previewAgreement.status}</span>
              <button
                onClick={() => setPreviewAgreement(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Agreement Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Create New Agreement</h3>
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
                  placeholder="e.g. Sa'd ibn Mu'adh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Subject Property
                </label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={e => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Agreement Type
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Sale Agreement">Sale Agreement</option>
                  <option value="Rental Agreement">Rental Agreement</option>
                  <option value="Booking Agreement">Booking Agreement</option>
                  <option value="Property Management Agreement">Property Management Agreement</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Total Contract Amount (PKR)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
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
                  Generate Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
