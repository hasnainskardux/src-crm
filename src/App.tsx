/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { QuickAddModal } from './components/layout/QuickAddModal';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { MessagesDrawer } from './components/layout/MessagesDrawer';
import { ToastContainer } from './components/common/Toast';

import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PropertiesView } from './components/properties/PropertiesView';
import { AddPropertyModal } from './components/properties/AddPropertyModal';
import { PropertyDetailModal } from './components/properties/PropertyDetailModal';
import { SendMailModal } from './components/properties/SendMailModal';
import { ProjectsView } from './components/projects/ProjectsView';
import { LeadsView } from './components/leads/LeadsView';
import { OffersView } from './components/offers/OffersView';
import { AgreementsView } from './components/agreements/AgreementsView';
import { CalendarView } from './components/calendar/CalendarView';
import { ActivitiesView } from './components/activities/ActivitiesView';
import { ContactsView } from './components/contacts/ContactsView';
import { BrokersView } from './components/brokers/BrokersView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { DocumentsView } from './components/documents/DocumentsView';
import { SettingsView } from './components/settings/SettingsView';
import { HelpView } from './components/help/HelpView';

const MainLayout: React.FC = () => {
  const { currentTab, sidebarCollapsed } = useCrm();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'properties':
        return <PropertiesView />;
      case 'projects':
        return <ProjectsView />;
      case 'leads':
        return <LeadsView />;
      case 'offers':
        return <OffersView />;
      case 'agreements':
        return <AgreementsView />;
      case 'calendar':
        return <CalendarView />;
      case 'activities':
        return <ActivitiesView />;
      case 'contacts':
        return <ContactsView />;
      case 'brokers':
        return <BrokersView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'documents':
        return <DocumentsView />;
      case 'settings':
        return <SettingsView />;
      case 'help':
        return <HelpView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#263238] flex">
      {/* Sticky Sidebar taking true layout space */}
      <Sidebar />

      {/* Main Content Area (Navbar + Active Dashboard View) */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <TopNavbar />

        <main className="flex-1 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Modals & Interactive Overlays */}
      <GlobalSearchModal />
      <QuickAddModal />
      <NotificationsDrawer />
      <MessagesDrawer />
      <AddPropertyModal />
      <PropertyDetailModal />
      <SendMailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CrmProvider>
      <MainLayout />
    </CrmProvider>
  );
}
