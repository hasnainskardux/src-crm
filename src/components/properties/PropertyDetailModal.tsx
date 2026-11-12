import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  User,
  Phone,
  Mail,
  Share2,
  Trash2,
  Edit3,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedProperty,
    isPropertyDetailOpen,
    setIsPropertyDetailOpen,
    deleteProperty,
    setIsSendMailOpen,
    formatPKR,
    showToast
  } = useCrm();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isPropertyDetailOpen || !selectedProperty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#2E66F6] bg-blue-50 px-2.5 py-1 rounded-lg">
              {selectedProperty.ref}
            </span>
            <h2 className="text-lg font-bold text-slate-900 truncate max-w-md">
              {selectedProperty.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Link Copied', 'Property link copied to clipboard.');
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to remove this property listing?')) {
                  deleteProperty(selectedProperty.id);
                }
              }}
              className="p-2 text-red-500 hover:text-red-700 rounded-xl hover:bg-red-50 transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPropertyDetailOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 md:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 group">
              <img
                src={selectedProperty.images[activeImageIndex] || selectedProperty.images[0]}
                alt={selectedProperty.name}
                className="w-full h-full object-cover transition-all"
              />
              {selectedProperty.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex(prev =>
                        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex(prev =>
                        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-4 bg-slate-900/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg">
                Photo {activeImageIndex + 1} of {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#2E66F6] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing, Status & Key Details Grid */}
          <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <span className="text-xs font-medium text-slate-500">Selling Price</span>
              <div className="text-xl font-bold text-slate-900 mt-0.5 tabular-nums">
                {formatPKR(selectedProperty.price)}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Rental Price</span>
              <div className="text-lg font-bold text-slate-800 mt-0.5 tabular-nums">
                {selectedProperty.rentalPrice
                  ? `${formatPKR(selectedProperty.rentalPrice)}/mo`
                  : 'N/A'}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Property Status</span>
              <div className="mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2E66F6] border border-blue-200">
                  {selectedProperty.status}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Website Status</span>
              <div className="mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {selectedProperty.websiteStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Location & Address
                </h4>
                <div className="flex items-start gap-2.5 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4 text-[#2E66F6] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{selectedProperty.address}</p>
                    <p className="text-xs text-slate-500">
                      {selectedProperty.city}, {selectedProperty.region}, {selectedProperty.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Distances Widget matching Screenshot 2 */}
              {selectedProperty.distances && (
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <span className="text-xs font-bold text-slate-500">Proximity & Access</span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">School</span>
                      <span className="font-semibold text-slate-800">{selectedProperty.distances.school}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Hospital</span>
                      <span className="font-semibold text-slate-800">{selectedProperty.distances.hospital}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Center</span>
                      <span className="font-semibold text-slate-800">{selectedProperty.distances.center}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Property Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>
            </div>

            {/* Specifications & Stakeholders */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Specifications
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                    <Bed className="w-4 h-4 text-[#2E66F6]" />
                    <div>
                      <span className="text-xs text-slate-500 block">Bedrooms</span>
                      <span className="text-sm font-bold text-slate-800">{selectedProperty.bedrooms} Beds</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                    <Bath className="w-4 h-4 text-[#2E66F6]" />
                    <div>
                      <span className="text-xs text-slate-500 block">Bathrooms</span>
                      <span className="text-sm font-bold text-slate-800">{selectedProperty.bathrooms} Baths</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                    <Maximize className="w-4 h-4 text-[#2E66F6]" />
                    <div>
                      <span className="text-xs text-slate-500 block">Area</span>
                      <span className="text-sm font-bold text-slate-800">
                        {selectedProperty.sqft ? `${selectedProperty.sqft} sqft` : selectedProperty.landArea || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner & Agent Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Stakeholders
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Owner</span>
                    <span className="font-semibold text-slate-800">{selectedProperty.ownerName}</span>
                    <span className="text-slate-500 block">{selectedProperty.ownerContact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Assigned Agent</span>
                    <span className="font-semibold text-slate-800">{selectedProperty.assignedAgent}</span>
                    <span className="text-[#2E66F6] block">SRC Skardu Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setIsPropertyDetailOpen(false)}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsPropertyDetailOpen(false);
                setIsSendMailOpen(true);
              }}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-slate-500" />
              <span>Send Mail</span>
            </button>
            <button
              onClick={() => {
                showToast('Edit Mode', 'You can modify property specifications.');
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4] flex items-center gap-2 shadow-sm shadow-[#2E66F6]/20 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
