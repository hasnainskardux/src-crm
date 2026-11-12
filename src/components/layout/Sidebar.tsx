import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { NavigationItem } from '../../types';
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  Users2,
  BadgePercent,
  FileCheck2,
  CalendarDays,
  Activity,
  UserSquare2,
  Briefcase,
  Megaphone,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavItemDef {
  id: NavigationItem;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    properties,
    leads,
    offers,
    appointments 
  } = useCrm();

  const mainNavItems: NavItemDef[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties', icon: Building2, badge: properties.length },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'leads', label: 'Leads', icon: Users2, badge: leads.length },
    { id: 'offers', label: 'Offers', icon: BadgePercent, badge: offers.length },
    { id: 'agreements', label: 'Agreements', icon: FileCheck2 },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays, badge: appointments.length },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'contacts', label: 'Contacts & Organizations', icon: UserSquare2 },
    { id: 'brokers', label: 'Brokers & External Agents', icon: Briefcase },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const bottomNavItems: NavItemDef[] = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <div 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Minimal geometric property logo */}
            <div className="w-9 h-9 rounded-xl bg-[#2E66F6] flex items-center justify-center text-white shadow-sm shadow-[#2E66F6]/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.5L2 10.5V20.5C2 21.05 2.45 21.5 3 21.5H9V14.5H15V21.5H21C21.55 21.5 22 21.05 22 20.5V10.5L12 2.5Z" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-[#263238]">SRC</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2E66F6] bg-blue-50 px-1.5 py-0.5 rounded">
                    CRM
                  </span>
                </div>
                <span className="text-[11px] text-[#78889B] font-medium leading-tight">
                  Skardu, Pakistan
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {mainNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#EFF4FF] text-[#2E66F6] font-semibold'
                    : 'text-[#78889B] hover:text-[#263238] hover:bg-slate-50'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#2E66F6]' : 'text-[#78889B]'}`} />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-[#2E66F6]/15 text-[#2E66F6]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav Items */}
      <div className="p-3 border-t border-slate-100 space-y-1 bg-white">
        {bottomNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#EFF4FF] text-[#2E66F6] font-semibold'
                  : 'text-[#78889B] hover:text-[#263238] hover:bg-slate-50'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#2E66F6]' : 'text-[#78889B]'}`} />
              {!sidebarCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
