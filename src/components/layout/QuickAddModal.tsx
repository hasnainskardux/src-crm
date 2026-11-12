import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Building2,
  Users2,
  CalendarDays,
  BadgePercent,
  FileCheck2
} from 'lucide-react';

export const QuickAddModal: React.FC = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    addProperty,
    addLead,
    addAppointment,
    addOffer,
    setCurrentTab
  } = useCrm();

  const [activeTab, setActiveTab] = useState<'property' | 'lead' | 'appointment' | 'offer'>('property');

  // Property fast fields
  const [propertyName, setPropertyName] = useState('');
  const [propertyPrice, setPropertyPrice] = useState(6500000);
  const [propertyAddress, setPropertyAddress] = useState('Hussain Chowk, Skardu');

  // Lead fast fields
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('+92 300 1234567');
  const [leadBudget, setLeadBudget] = useState(7500000);

  // Appointment fast fields
  const [appTitle, setAppTitle] = useState('');
  const [appDate, setAppDate] = useState('2026-11-14');
  const [appTime, setAppTime] = useState('14:00');

  // Offer fast fields
  const [offerCustomer, setOfferCustomer] = useState('');
  const [offerAmount, setOfferAmount] = useState(8200000);

  if (!isQuickAddOpen) return null;

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyName.trim()) return;
    addProperty({
      name: propertyName,
      type: 'Apartment',
      salesType: 'Sale',
      price: propertyPrice,
      rentalPrice: 35000,
      address: propertyAddress,
      city: 'Skardu',
      region: 'Gilgit-Baltistan',
      country: 'Pakistan',
      coordinates: { lat: 35.2971, lng: 75.6333 },
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      status: 'Available',
      websiteStatus: 'Published',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      description: 'Newly listed alpine residence in Skardu.',
      assignedAgent: 'Nayeem Azraf',
      ownerName: 'Mirza Tariq Ali',
      ownerContact: '+92 345 5678901'
    });
    setIsQuickAddOpen(false);
    setCurrentTab('properties');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;
    addLead({
      name: leadName,
      phone: leadPhone,
      email: `${leadName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      interestedPropertyName: 'Luxury Mountain Residence (#5001)',
      budget: leadBudget,
      source: 'Website',
      assignedAgent: 'Nayeem Azraf',
      stage: 'New',
      nextFollowUp: '2026-11-20',
      notes: 'Quick added lead via topbar action.'
    });
    setIsQuickAddOpen(false);
    setCurrentTab('leads');
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appTitle.trim()) return;
    addAppointment({
      title: appTitle,
      customer: 'Prospective Client',
      property: 'Luxury Mountain Residence (#5001)',
      assignedAgent: 'Nayeem Azraf',
      date: appDate,
      startTime: appTime,
      endTime: '15:00',
      type: 'Property Visit',
      location: 'Skardu City'
    });
    setIsQuickAddOpen(false);
    setCurrentTab('calendar');
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerCustomer.trim()) return;
    addOffer({
      customerName: offerCustomer,
      propertyId: 'prop-1',
      propertyName: 'Luxury Mountain Residence (#5001)',
      offerAmount: offerAmount,
      askingPrice: 8365000,
      offerDate: '2026-11-12',
      assignedAgent: 'Nayeem Azraf',
      status: 'New',
      notes: 'Quick submitted offer.'
    });
    setIsQuickAddOpen(false);
    setCurrentTab('offers');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base">Quick Add Record</h3>
          <button onClick={() => setIsQuickAddOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-1.5">
          <button
            onClick={() => setActiveTab('property')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'property'
                ? 'bg-white text-[#2E66F6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Property</span>
          </button>
          <button
            onClick={() => setActiveTab('lead')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'lead'
                ? 'bg-white text-[#2E66F6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Lead</span>
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'appointment'
                ? 'bg-white text-[#2E66F6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Visit</span>
          </button>
          <button
            onClick={() => setActiveTab('offer')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'offer'
                ? 'bg-white text-[#2E66F6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BadgePercent className="w-3.5 h-3.5" />
            <span>Offer</span>
          </button>
        </div>

        {/* Dynamic Form */}
        <div className="p-6">
          {activeTab === 'property' && (
            <form onSubmit={handlePropertySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alpine Residence Skardu"
                  value={propertyName}
                  onChange={e => setPropertyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={e => setPropertyPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Address</label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={e => setPropertyAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
                >
                  Create Listing
                </button>
              </div>
            </form>
          )}

          {activeTab === 'lead' && (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Hussain"
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={leadPhone}
                    onChange={e => setLeadPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Budget (PKR)</label>
                  <input
                    type="number"
                    value={leadBudget}
                    onChange={e => setLeadBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          )}

          {activeTab === 'appointment' && (
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Visit Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Site Inspection"
                  value={appTitle}
                  onChange={e => setAppTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={appDate}
                    onChange={e => setAppDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Time</label>
                  <input
                    type="time"
                    value={appTime}
                    onChange={e => setAppTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
                >
                  Book Visit
                </button>
              </div>
            </form>
          )}

          {activeTab === 'offer' && (
            <form onSubmit={handleOfferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ammar ibn Yasir"
                  value={offerCustomer}
                  onChange={e => setOfferCustomer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Bid Offer Amount (PKR)
                </label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={e => setOfferAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
