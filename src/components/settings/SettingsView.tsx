import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Settings,
  Building2,
  User,
  ShieldCheck,
  Bell,
  Calendar,
  MapPin,
  Database,
  Plug,
  Layers,
  RotateCcw,
  CheckCircle2,
  Lock,
  ExternalLink,
  MessageSquare,
  CreditCard,
  BarChart2,
  Mail
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { resetAllDemoData, showToast } = useCrm();

  const [activeTab, setActiveTab] = useState<'business' | 'integrations' | 'team' | 'expansion'>('business');

  const integrationsList = [
    {
      name: 'Supabase Database',
      desc: 'Hosted PostgreSQL database with Row-Level Security (RLS) for real-time listing synchronization.',
      icon: Database,
      category: 'Data Storage'
    },
    {
      name: 'Google Calendar API',
      desc: 'Two-way synchronization for property viewings, agent schedules, and client inspection tours.',
      icon: Calendar,
      category: 'Productivity'
    },
    {
      name: 'Google Maps Platform',
      desc: 'Interactive geospatial satellite mapping, pin cluster drops, and distance-to-school algorithms.',
      icon: MapPin,
      category: 'Geospatial'
    },
    {
      name: 'WhatsApp Business Cloud API',
      desc: 'Instant lead alerts, automated property brochure dispatches, and tenant payment receipts via WhatsApp.',
      icon: MessageSquare,
      category: 'Messaging'
    },
    {
      name: 'Email SMTP / Resend API',
      desc: 'Automated transactional email workflows for agreement PDFs, monthly rental invoices, and weekly digests.',
      icon: Mail,
      category: 'Communications'
    },
    {
      name: 'Payment Gateway (1Link / Meezan / Stripe)',
      desc: 'Online payment reconciliation for booking deposits, token money, and property management fees.',
      icon: CreditCard,
      category: 'Financial'
    },
    {
      name: 'Google Analytics 4',
      desc: 'Web listing traffic metrics, lead attribution sources, and marketing conversion analytics.',
      icon: BarChart2,
      category: 'Analytics'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Settings & Configurations</h1>
        <p className="text-sm text-[#78889B] mt-0.5">
          Manage business profile, system parameters, team permissions, and future cloud integrations.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('business')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'business'
              ? 'border-[#2E66F6] text-[#2E66F6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Business Profile
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'integrations'
              ? 'border-[#2E66F6] text-[#2E66F6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Integrations Architecture</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-[#2E66F6] rounded">
            Coming Soon
          </span>
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'team'
              ? 'border-[#2E66F6] text-[#2E66F6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Team & RBAC
        </button>
        <button
          onClick={() => setActiveTab('expansion')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'expansion'
              ? 'border-[#2E66F6] text-[#2E66F6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Multi-Business Expansion
        </button>
      </div>

      {/* Tab: Business Profile */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Agency Master Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  readOnly
                  value="SRC Real Estate Agency & Holdings"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Type
                </label>
                <input
                  type="text"
                  readOnly
                  value="Real Estate Agency & Property Development"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  readOnly
                  value="Skardu, Gilgit-Baltistan, Pakistan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Operational Currency
                </label>
                <input
                  type="text"
                  readOnly
                  value="PKR (Pakistani Rupee - ₨)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Standard Timezone
                </label>
                <input
                  type="text"
                  readOnly
                  value="Asia/Karachi (PKT - UTC+05:00)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lead Admin Email
                </label>
                <input
                  type="text"
                  readOnly
                  value="hasnainskardux@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Demo Reset Panel */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Demo Data Reset</h4>
                <p className="text-xs text-slate-500">
                  Restore all CRM properties, leads, appointments, and offers to their original pristine demo state.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => resetAllDemoData()}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Demo Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Integrations Architecture (Coming Soon cards matching Prompt Section 16) */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2E66F6] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Future Integration Readiness:</strong> The frontend schema, TypeScript models, and mock data service layers have been architected to allow direct backend integration with Supabase, Google Calendar, and WhatsApp Business API without refactoring the UI.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {integrationsList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2E66F6] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" /> Coming Soon
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Connector Ready</span>
                    <button
                      disabled
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/70"
                    >
                      Connect in Phase 2
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Team & RBAC */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Assigned Team Members & Roles</h3>
          <div className="divide-y divide-slate-100">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2E66F6] text-white flex items-center justify-center font-bold text-sm">
                  NA
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nayeem Azraf</h4>
                  <p className="text-xs text-slate-500">hasnainskardux@gmail.com</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2E66F6]">
                Super Administrator
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  ZB
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zainab Balti</h4>
                  <p className="text-xs text-slate-500">zainab@src.pk</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Senior Listing Agent
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  AM
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ali Murtaza</h4>
                  <p className="text-xs text-slate-500">ali.m@src.pk</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Commercial Leasing Specialist
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Multi-Business Expansion (Prompt Section 18) */}
      {activeTab === 'expansion' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-[#2E66F6]" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Multi-Business Future Expansion</h3>
              <p className="text-xs text-slate-500">
                SRC brand extension architecture for hotels, travel & tourism, and commerce in Baltistan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Hotels & Alpine Resorts</h4>
              <p className="text-xs text-slate-500">Room availability calendars, booking engines, and tourist lodging management.</p>
              <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400">Modular Subdomain Ready</span>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Travel & Northern Tourism</h4>
              <p className="text-xs text-slate-500">K2 base camp expedition packages, jeep rentals, and flight charters.</p>
              <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400">Modular Subdomain Ready</span>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Restaurants & Dining</h4>
              <p className="text-xs text-slate-500">Reservation management for valley restaurants and cafes.</p>
              <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400">Modular Subdomain Ready</span>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Balti Handicrafts & E-commerce</h4>
              <p className="text-xs text-slate-500">Direct export of dried apricots, gemstones, and handmade woolen shawls.</p>
              <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400">Modular Subdomain Ready</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
