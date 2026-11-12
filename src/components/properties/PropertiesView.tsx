import React, { useState, useMemo } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Property, PropertyStatus, PropertyType } from '../../types';
import {
  Search,
  Filter,
  Plus,
  Download,
  Bookmark,
  LayoutGrid,
  List,
  ChevronDown,
  Bed,
  Bath,
  Maximize,
  Mail,
  MoreVertical,
  Copy,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckSquare,
  Square,
  SlidersHorizontal
} from 'lucide-react';

export const PropertiesView: React.FC = () => {
  const {
    properties,
    setSelectedProperty,
    setIsPropertyDetailOpen,
    setIsAddPropertyOpen,
    setIsSendMailOpen,
    deleteProperty,
    formatPKR,
    showToast
  } = useCrm();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>(['prop-2', 'prop-4']); // sample selection matching screenshot
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);

  const itemsPerPage = 8;

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || p.type === selectedType;
        const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest') return a.price - b.price;
        if (sortBy === 'highest') return b.price - a.price;
        if (sortBy === 'oldest') return a.createdAt.localeCompare(b.createdAt);
        return b.createdAt.localeCompare(a.createdAt); // newest
      });
  }, [properties, searchQuery, selectedType, selectedStatus, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedPropertyIds.length === paginatedProperties.length) {
      setSelectedPropertyIds([]);
    } else {
      setSelectedPropertyIds(paginatedProperties.map(p => p.id));
    }
  };

  const toggleSelectProperty = (id: string) => {
    setSelectedPropertyIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const copyRef = (ref: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ref);
    showToast('Copied', `Reference ID ${ref} copied.`);
  };

  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'Available':
        return 'bg-blue-50 text-[#2E66F6] border-blue-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rented':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Sold':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Primary Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Properties</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Manage your real estate listings, availability, and client enquiries across Skardu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(prev => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setIsExportOpen(false);
                    showToast('Export Ready', 'Exported 12 properties to CSV.');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Export as CSV (.csv)
                </button>
                <button
                  onClick={() => {
                    setIsExportOpen(false);
                    showToast('PDF Prepared', 'Generated PDF Property Portfolio.');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Export as PDF (.pdf)
                </button>
                <button
                  onClick={() => {
                    setIsExportOpen(false);
                    window.print();
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Print Listings
                </button>
              </div>
            )}
          </div>

          {/* Add Property Button */}
          <button
            onClick={() => setIsAddPropertyOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar matching Screenshots 1, 3, 4 */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input, Save Search, Bookmark */}
        <div className="flex items-center flex-wrap gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-9 pr-4 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6]"
            />
          </div>

          {/* Save Search dropdown */}
          <div className="relative">
            <button
              onClick={() => showToast('Search Saved', 'Custom search preset saved to your account.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-600 transition-colors"
            >
              <span>Save Search</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Bookmark icon */}
          <button
            onClick={() => showToast('Bookmarked', 'Added to bookmarked searches.')}
            className="p-1.5 text-slate-400 hover:text-[#2E66F6] hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-colors"
            title="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Bulk Action, View Mode Switcher, Filter, Sort By */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Bulk Action */}
          <div className="relative">
            <button
              onClick={() => setIsBulkActionOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-600 transition-colors"
            >
              <span>Bulk Action</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isBulkActionOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setIsBulkActionOpen(false);
                    showToast('Bulk Updated', `Published ${selectedPropertyIds.length} properties.`);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Publish Selected ({selectedPropertyIds.length})
                </button>
                <button
                  onClick={() => {
                    setIsBulkActionOpen(false);
                    showToast('Bulk Updated', `Unpublished ${selectedPropertyIds.length} properties.`);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Unpublish Selected
                </button>
                <button
                  onClick={() => {
                    setIsBulkActionOpen(false);
                    if (confirm(`Delete ${selectedPropertyIds.length} selected items?`)) {
                      selectedPropertyIds.forEach(id => deleteProperty(id));
                      setSelectedPropertyIds([]);
                    }
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {/* View Toggles (Grid / List) */}
          <div className="flex items-center p-0.5 bg-slate-100/90 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-[#2E66F6] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[#2E66F6] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-xs transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter</span>
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Filter Properties
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedType('All');
                      setSelectedStatus('All');
                    }}
                    className="text-[11px] text-[#2E66F6] hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Property Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="All">All Types</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Multifamily">Multifamily</option>
                      <option value="Office">Office</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Land">Land Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={e => setSelectedStatus(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Available">Available</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rented">Rented</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-slate-700 shadow-xs cursor-pointer focus:outline-none"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content: Grid View or List View */}
      {viewMode === 'grid' ? (
        /* 4-COLUMN PROPERTY GRID MATCHING SCREENSHOTS 1 & 3 */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedProperties.map(property => {
            const isSelected = selectedPropertyIds.includes(property.id);

            return (
              <div
                key={property.id}
                onClick={() => {
                  setSelectedProperty(property);
                  setIsPropertyDetailOpen(true);
                }}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top-left Checkbox */}
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      toggleSelectProperty(property.id);
                    }}
                    className="absolute top-3 left-3 w-6 h-6 rounded-md bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer hover:bg-slate-900 transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#2E66F6]" />
                    ) : (
                      <Square className="w-4 h-4 text-white/80" />
                    )}
                  </div>

                  {/* Top-right 3-dots Menu */}
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                      setIsPropertyDetailOpen(true);
                    }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer hover:bg-slate-900 transition-colors"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Carousel Indicator Dots */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Price and Ref ID */}
                    <div className="flex items-center justify-between">
                      <div className="text-base font-bold text-[#263238] tabular-nums">
                        {formatPKR(property.price)}
                      </div>
                      <button
                        onClick={e => copyRef(property.ref, e)}
                        className="flex items-center gap-1 text-xs font-semibold text-[#2E66F6] hover:text-[#2555D4]"
                        title="Copy Reference ID"
                      >
                        <span>{property.ref}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Property Type & Location */}
                    <p className="text-xs text-slate-500 mt-1 font-medium capitalize">
                      {property.type} for {property.salesType.toLowerCase()}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 truncate font-medium">
                      {property.address}
                    </p>
                  </div>

                  {/* Specs: Beds, Baths, Sqft */}
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-slate-400" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-slate-400" />
                      <span>{property.sqft ? `${property.sqft} sqft` : property.landArea || '4 Acres'}</span>
                    </div>
                  </div>

                  {/* Send Mail Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                      setIsSendMailOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Send Mail</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* PROPERTY LIST VIEW MATCHING SCREENSHOT 4 */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-[#78889B]">
                  <th className="py-3 px-4 w-10">
                    <button onClick={toggleSelectAll} className="flex items-center">
                      {selectedPropertyIds.length === paginatedProperties.length && paginatedProperties.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#2E66F6]" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-3 font-medium">Featured</th>
                  <th className="py-3 px-3 font-medium">Location</th>
                  <th className="py-3 px-3 font-medium">Property Type</th>
                  <th className="py-3 px-3 font-medium">Ref</th>
                  <th className="py-3 px-3 font-medium">Status</th>
                  <th className="py-3 px-3 font-medium">Selling Price</th>
                  <th className="py-3 px-3 font-medium">Rental Price</th>
                  <th className="py-3 px-3 font-medium">Website Status</th>
                  <th className="py-3 px-3 w-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProperties.map(property => {
                  const isSelected = selectedPropertyIds.includes(property.id);

                  return (
                    <tr
                      key={property.id}
                      onClick={() => {
                        setSelectedProperty(property);
                        setIsPropertyDetailOpen(true);
                      }}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleSelectProperty(property.id)}
                          className="flex items-center"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#2E66F6]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-3">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-14 h-10 rounded-lg object-cover shadow-2xs group-hover:scale-105 transition-transform"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-800 text-xs block">
                          {property.address}
                        </span>
                        <span className="text-[11px] text-slate-400">{property.city}</span>
                      </td>

                      <td className="py-3.5 px-3 text-xs text-slate-600 font-medium">
                        {property.type}
                      </td>

                      <td className="py-3.5 px-3">
                        <button
                          onClick={e => copyRef(property.ref, e)}
                          className="flex items-center gap-1 text-xs font-semibold text-[#2E66F6] hover:underline"
                        >
                          <span>{property.ref}</span>
                          <Copy className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-slate-900 text-xs tabular-nums">
                        {formatPKR(property.price)}
                      </td>

                      <td className="py-3.5 px-3 text-xs text-slate-600 tabular-nums">
                        {property.rentalPrice ? `${formatPKR(property.rentalPrice)}/month` : '—'}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`text-xs font-medium ${
                            property.websiteStatus === 'Published'
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {property.websiteStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setIsPropertyDetailOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Footer matching Screenshot */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-slate-500 font-medium">
          Showing 1 - {Math.min(paginatedProperties.length, properties.length)} of {properties.length} entries
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-[#EFF4FF] text-[#2E66F6] font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-slate-400 text-xs">...</span>
          <button
            onClick={() => setCurrentPage(8)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100`}
          >
            8
          </button>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
