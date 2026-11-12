import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { INITIAL_SALES_REPORTS } from '../../data/mockData';
import {
  Building2,
  Tag,
  Key,
  Users2,
  Calendar,
  ChevronDown,
  MoreVertical,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    properties,
    leads,
    conversations,
    setCurrentTab,
    setSelectedProperty,
    setIsPropertyDetailOpen,
    setIsMessagesOpen,
    setActiveConversationId,
    formatPKR
  } = useCrm();

  const [dateFilter, setDateFilter] = useState<'This Week' | 'Today' | 'This Month' | 'This Year' | 'Custom'>('This Week');
  const [salesGrowthPeriod, setSalesGrowthPeriod] = useState<'Yearly' | 'Monthly'>('Yearly');
  const [salesReportPeriod, setSalesReportPeriod] = useState<'Yearly' | 'Monthly'>('Yearly');
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(5); // default June tooltip as in screenshot

  const propertiesForSale = properties.filter(p => p.salesType === 'Sale' || p.salesType === 'Both').length;
  const propertiesForRent = properties.filter(p => p.salesType === 'Rent' || p.salesType === 'Both').length;

  // Chart data points matching screenshot curve
  // Screenshot months: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
  // Values scaled roughly relative to $100M - $1M
  const monthlyData = [
    { month: 'Jan', val: 18, amountStr: 'PKR 18,000,000' },
    { month: 'Feb', val: 24, amountStr: 'PKR 24,000,000' },
    { month: 'Mar', val: 21, amountStr: 'PKR 21,000,000' },
    { month: 'Apr', val: 29, amountStr: 'PKR 29,000,000' },
    { month: 'May', val: 25, amountStr: 'PKR 25,000,000' },
    { month: 'Jun', val: 54, amountStr: 'PKR 34,000,000', label: 'Jun, 2026' }, // Highlighted in screenshot
    { month: 'Jul', val: 22, amountStr: 'PKR 22,000,000' },
    { month: 'Aug', val: 38, amountStr: 'PKR 38,000,000' },
    { month: 'Sep', val: 32, amountStr: 'PKR 32,000,000' },
    { month: 'Oct', val: 45, amountStr: 'PKR 45,000,000' },
    { month: 'Nov', val: 39, amountStr: 'PKR 39,000,000' },
    { month: 'Dec', val: 48, amountStr: 'PKR 48,000,000' }
  ];

  // SVG coordinates calculation for responsive high precision line
  const svgWidth = 700;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const maxVal = 70;

  const points = monthlyData.map((d, index) => {
    const x = paddingX + (index * (svgWidth - 2 * paddingX)) / (monthlyData.length - 1);
    const y = svgHeight - paddingY - (d.val / maxVal) * (svgHeight - 2 * paddingY);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    return `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  // Recent 3 properties for widget
  const recentProperties = properties.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Date Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Dashboard</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Your friendly solution for easy property lead and listing management in Skardu, Pakistan.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative inline-block text-left">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value as any)}
                className="appearance-none bg-white border border-slate-200/90 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
                <option value="Custom">Custom Range</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-[#2E66F6] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+0.38%</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-[#78889B]">Total properties</span>
            <div className="text-2xl font-bold text-[#263238] mt-0.5 tabular-nums">
              59
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Higher than last month</p>
          </div>
        </div>

        {/* Properties For Sale */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-[#2E66F6] flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+4.3%</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-[#78889B]">Properties for sale</span>
            <div className="text-2xl font-bold text-[#263238] mt-0.5 tabular-nums">
              23
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Higher than last month</p>
          </div>
        </div>

        {/* Properties For Rent */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-[#2E66F6] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>-0.12%</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-[#78889B]">Properties for rent</span>
            <div className="text-2xl font-bold text-[#263238] mt-0.5 tabular-nums">
              36
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Less than last month</p>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-[#2E66F6] flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+0.38%</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-[#78889B]">New leads</span>
            <div className="text-2xl font-bold text-[#263238] mt-0.5 tabular-nums">
              320
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Higher than last month</p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Sales Growth & Sales Reports */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sales Growth Chart Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#263238]">Sales Growth</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly revenue trends in PKR</p>
              </div>
              <div className="relative">
                <select
                  value={salesGrowthPeriod}
                  onChange={e => setSalesGrowthPeriod(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Chart Area */}
            <div className="mt-4 relative">
              <div className="flex">
                {/* Y-axis labels matching screenshot: $100M, $50M, $30M, $20M, $10M, $5M, $1M */}
                <div className="w-14 flex flex-col justify-between text-[11px] font-semibold text-slate-400 pb-8 text-right pr-2 select-none h-56">
                  <span>PKR 100M</span>
                  <span>PKR 50M</span>
                  <span>PKR 30M</span>
                  <span>PKR 20M</span>
                  <span>PKR 10M</span>
                  <span>PKR 5M</span>
                  <span>PKR 1M</span>
                </div>

                {/* SVG Chart Graphic */}
                <div className="flex-1 relative overflow-hidden">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-56 overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2E66F6" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#2E66F6" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid guide lines */}
                    {[0.1, 0.25, 0.45, 0.65, 0.85].map((pct, i) => (
                      <line
                        key={i}
                        x1={paddingX}
                        y1={svgHeight * pct}
                        x2={svgWidth - paddingX}
                        y2={svgHeight * pct}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Gradient Area Fill */}
                    <path d={areaD} fill="url(#chartGradient)" />

                    {/* Main Blue Stroke Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#2E66F6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {points.map((pt, idx) => {
                      const isSelected = activeTooltipIndex === idx;
                      return (
                        <g key={idx} className="cursor-pointer" onClick={() => setActiveTooltipIndex(idx)}>
                          {isSelected && (
                            <line
                              x1={pt.x}
                              y1={pt.y}
                              x2={pt.x}
                              y2={svgHeight - paddingY}
                              stroke="#2E66F6"
                              strokeDasharray="3 3"
                              strokeWidth="1.5"
                              opacity="0.6"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? 6 : 4}
                            fill="#FFFFFF"
                            stroke="#2E66F6"
                            strokeWidth={isSelected ? 3 : 2}
                            className="transition-all hover:scale-125"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Tooltip Popover (Floating above June by default, matching screenshot) */}
                  {activeTooltipIndex !== null && points[activeTooltipIndex] && (
                    <div
                      className="absolute z-10 -translate-x-1/2 pointer-events-none"
                      style={{
                        left: `${(points[activeTooltipIndex].x / svgWidth) * 100}%`,
                        top: `${Math.max(10, (points[activeTooltipIndex].y / svgHeight) * 100 - 32)}%`
                      }}
                    >
                      <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-lg border border-slate-200/80 px-3 py-1.5 text-center">
                        <div className="text-xs font-bold text-[#263238] tabular-nums">
                          {points[activeTooltipIndex].amountStr}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {points[activeTooltipIndex].month}, 2026
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Month Labels on X-Axis */}
                  <div className="flex justify-between px-3 pt-2 text-[11px] font-semibold text-slate-400 select-none">
                    {monthlyData.map((d, i) => (
                      <span
                        key={d.month}
                        onClick={() => setActiveTooltipIndex(i)}
                        className={`cursor-pointer transition-colors ${
                          activeTooltipIndex === i ? 'text-[#2E66F6] font-bold' : 'hover:text-slate-600'
                        }`}
                      >
                        {d.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Reports Table Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#263238]">Sales Reports</h3>
                <p className="text-xs text-slate-400 mt-0.5">Recent property transactions and bookings</p>
              </div>
              <div className="relative">
                <select
                  value={salesReportPeriod}
                  onChange={e => setSalesReportPeriod(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-medium text-[#78889B]">
                    <th className="py-3 px-3 font-medium">Sales To</th>
                    <th className="py-3 px-3 font-medium">Property Name</th>
                    <th className="py-3 px-3 font-medium">Sales Type</th>
                    <th className="py-3 px-3 font-medium">Price</th>
                    <th className="py-3 px-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {INITIAL_SALES_REPORTS.map(record => (
                    <tr key={record.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={record.customerAvatar}
                            alt={record.customerName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800 text-sm whitespace-nowrap">
                            {record.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-xs whitespace-nowrap">
                        {record.propertyName}
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-xs">
                        {record.salesType}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800 text-xs tabular-nums whitespace-nowrap">
                        {formatPKR(record.price)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): New Properties & Messages */}
        <div className="lg:col-span-4 space-y-6">
          {/* New Properties Panel */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#263238]">New Properties</h3>
              <button
                onClick={() => setCurrentTab('properties')}
                className="text-xs font-semibold text-[#2E66F6] hover:underline"
              >
                All Properties
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-1">
              {recentProperties.map(property => (
                <div
                  key={property.id}
                  onClick={() => {
                    setSelectedProperty(property);
                    setIsPropertyDetailOpen(true);
                  }}
                  className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-14 h-12 rounded-xl object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 tabular-nums">
                        {formatPKR(property.price)}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {property.address}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                      setIsPropertyDetailOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Panel matching Screenshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#263238]">Messages</h3>
              <button
                onClick={() => setIsMessagesOpen(true)}
                className="p-1 text-slate-400 hover:text-[#2E66F6] rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-1">
              {conversations.slice(0, 5).map(conv => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setIsMessagesOpen(true);
                  }}
                  className="py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-blue-50/40 p-2 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={conv.contactAvatar}
                        alt={conv.contactName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {conv.unread && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2E66F6] ring-2 ring-white rounded-full" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#2E66F6] transition-colors truncate">
                        {conv.contactName}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 tabular-nums shrink-0">
                    {conv.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
