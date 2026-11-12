import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Property, PropertyType, PropertyStatus, WebsiteStatus } from '../../types';
import { X, Upload, Building2, MapPin, DollarSign, Bed, Bath, Maximize } from 'lucide-react';

export const AddPropertyModal: React.FC = () => {
  const { isAddPropertyOpen, setIsAddPropertyOpen, addProperty } = useCrm();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Apartment' as PropertyType,
    salesType: 'Sale' as 'Sale' | 'Rent' | 'Both',
    price: 6500000,
    rentalPrice: 35000,
    address: 'Hussain Chowk, Skardu',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    landArea: '',
    status: 'Available' as PropertyStatus,
    websiteStatus: 'Published' as WebsiteStatus,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Alpine residential property with views of Karakoram peaks and modern heating facilities.',
    assignedAgent: 'Nayeem Azraf',
    ownerName: 'Mirza Tariq Ali',
    ownerContact: '+92 345 5678901'
  });

  if (!isAddPropertyOpen) return null;

  const handleSubmit = (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;

    addProperty({
      ...formData,
      websiteStatus: asDraft ? 'Unpublished' : formData.websiteStatus,
      coordinates: { lat: 35.2971, lng: 75.6333 },
      distances: { school: '1.5 km', hospital: '2.0 km', center: '1.0 km' }
    });

    setIsAddPropertyOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E66F6] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Add New Property</h2>
              <p className="text-xs text-slate-500">Register a new residential or commercial listing in Skardu</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddPropertyOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={e => handleSubmit(e, false)} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alpine View Residence"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Type
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as PropertyType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6] bg-white"
              >
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Condominium">Condominium</option>
                <option value="Multifamily">Multifamily</option>
                <option value="Mountain Villa">Mountain Villa</option>
                <option value="Office">Office</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Land">Land Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Pricing & Sales Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Sales Type
              </label>
              <select
                value={formData.salesType}
                onChange={e => setFormData({ ...formData, salesType: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6] bg-white"
              >
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
                <option value="Both">Both (Sale & Rent)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Selling Price (PKR) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Rental Price (PKR/month)
              </label>
              <input
                type="number"
                value={formData.rentalPrice}
                onChange={e => setFormData({ ...formData, rentalPrice: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
          </div>

          {/* Location & Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. 3605 Parker Rd., Satpara Road"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / District
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
          </div>

          {/* Specs: Bedrooms, Bathrooms, Sqft */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bedrooms
              </label>
              <input
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bathrooms
              </label>
              <input
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Area (Sqft)
              </label>
              <input
                type="number"
                value={formData.sqft}
                onChange={e => setFormData({ ...formData, sqft: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              placeholder="Provide architectural highlights, heating features, views..."
            />
          </div>

          {/* Owner & Assigned Agent */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assigned Agent
              </label>
              <select
                value={formData.assignedAgent}
                onChange={e => setFormData({ ...formData, assignedAgent: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6] bg-white"
              >
                <option value="Nayeem Azraf">Nayeem Azraf (Super Admin)</option>
                <option value="Zainab Balti">Zainab Balti</option>
                <option value="Ali Murtaza">Ali Murtaza</option>
                <option value="Fatima Skardu">Fatima Skardu</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Owner Name
              </label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Owner Contact Phone
              </label>
              <input
                type="text"
                value={formData.ownerContact}
                onChange={e => setFormData({ ...formData, ownerContact: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
              />
            </div>
          </div>

          {/* Status & Featured */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Listing Status
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rented">Rented</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-5">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#2E66F6] focus:ring-[#2E66F6]"
              />
              <span className="text-sm font-medium text-slate-700">Mark as Featured Property</span>
            </label>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsAddPropertyOpen(false)}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={e => handleSubmit(e, true)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={e => handleSubmit(e, false)}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4] shadow-sm shadow-[#2E66F6]/20 transition-all"
            >
              Save Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
