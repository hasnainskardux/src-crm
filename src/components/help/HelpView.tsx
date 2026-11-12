import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  HelpCircle,
  Building2,
  Users2,
  Calendar,
  FileCheck2,
  Search,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';

export const HelpView: React.FC = () => {
  const { setCurrentTab, resetAllDemoData } = useCrm();

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Client Presentation & Help Guide</h1>
          <span className="text-xs bg-blue-50 text-[#2E66F6] px-2.5 py-0.5 rounded-full font-bold">
            SRC Skardu
          </span>
        </div>
        <p className="text-sm text-[#78889B] mt-0.5">
          Step-by-step walkthrough for demonstrating the SRC Real Estate CRM experience to stakeholders.
        </p>
      </div>

      {/* Feature Showcase Checklist */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Key Features to Demonstrate</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setCurrentTab('dashboard')}
            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#2E66F6]" />
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2E66F6]">
                1. Executive Dashboard
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Interactive sales growth curve (PKR scale), live tooltip on June data point, recent transaction logs, and customer chat previews.
            </p>
          </div>

          <div
            onClick={() => setCurrentTab('properties')}
            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#2E66F6]" />
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2E66F6]">
                2. Grid & List Property Views
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Seamlessly toggle between the 4-column card grid and the data table. Demonstrate copying reference IDs (#5001) and sending property emails.
            </p>
          </div>

          <div
            onClick={() => setCurrentTab('leads')}
            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-[#2E66F6]" />
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2E66F6]">
                3. Lead Pipeline Kanban
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Move leads through stages from New to Contacted, Qualified, and Negotiation. Switch to table view for bulk analysis.
            </p>
          </div>

          <div
            onClick={() => setCurrentTab('agreements')}
            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#2E66F6]" />
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2E66F6]">
                4. Legal Deed Preview
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Click the eye icon on any contract in Agreements to preview the formal stamp-paper style legal document for Skardu district courts.
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-slate-900">Keyboard Shortcuts</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span className="text-slate-600">Open Global Search across all listings and leads</span>
            <kbd className="px-2 py-1 bg-white border border-slate-200 rounded font-mono font-bold text-slate-700">
              ⌘ K / Ctrl + K
            </kbd>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span className="text-slate-600">Close active modal, drawer or image gallery</span>
            <kbd className="px-2 py-1 bg-white border border-slate-200 rounded font-mono font-bold text-slate-700">
              ESC
            </kbd>
          </div>
        </div>
      </div>

      {/* Presentation Info */}
      <div className="bg-blue-50/60 rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
        <MapPin className="w-6 h-6 text-[#2E66F6] shrink-0 mt-1" />
        <div className="space-y-1 text-xs text-slate-700">
          <h4 className="font-bold text-slate-900 text-sm">SRC Headquarters Location</h4>
          <p>
            Skardu, Gilgit-Baltistan, Pakistan · Serving high-altitude residential developments, commercial centers, and Karakoram tourism holdings.
          </p>
        </div>
      </div>
    </div>
  );
};
