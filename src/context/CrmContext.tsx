import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationItem,
  Property,
  Project,
  Lead,
  Offer,
  Agreement,
  Appointment,
  Activity,
  Contact,
  Broker,
  Campaign,
  DocumentItem,
  Conversation,
  NotificationItem,
  LeadStage
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_PROJECTS,
  INITIAL_LEADS,
  INITIAL_OFFERS,
  INITIAL_AGREEMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_CONTACTS,
  INITIAL_BROKERS,
  INITIAL_CAMPAIGNS,
  INITIAL_DOCUMENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface CrmContextType {
  currentTab: NavigationItem;
  setCurrentTab: (tab: NavigationItem) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

  // Modals & Panels
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isQuickAddOpen: boolean;
  setIsQuickAddOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isMessagesOpen: boolean;
  setIsMessagesOpen: (open: boolean) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Selected item modals
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  isPropertyDetailOpen: boolean;
  setIsPropertyDetailOpen: (open: boolean) => void;
  isAddPropertyOpen: boolean;
  setIsAddPropertyOpen: (open: boolean) => void;
  isEditPropertyOpen: boolean;
  setIsEditPropertyOpen: (open: boolean) => void;
  isSendMailOpen: boolean;
  setIsSendMailOpen: (open: boolean) => void;
  selectedAgreement: Agreement | null;
  setSelectedAgreement: (agr: Agreement | null) => void;
  isAgreementDetailOpen: boolean;
  setIsAgreementDetailOpen: (open: boolean) => void;

  // Data Collections
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'ref' | 'createdAt'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  togglePropertyStatus: (id: string) => void;

  projects: Project[];
  addProject: (proj: Omit<Project, 'id'>) => void;

  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (lead: Lead) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  deleteLead: (id: string) => void;

  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'offerRef'>) => void;
  updateOfferStatus: (id: string, status: Offer['status']) => void;

  agreements: Agreement[];
  addAgreement: (agreement: Omit<Agreement, 'id' | 'agreementRef'>) => void;
  updateAgreementStatus: (id: string, status: Agreement['status']) => void;

  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id'>) => void;
  deleteAppointment: (id: string) => void;

  activities: Activity[];
  addActivity: (act: Omit<Activity, 'id' | 'timestamp'>) => void;

  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'totalDeals'>) => void;
  updateContact: (contact: Contact) => void;

  brokers: Broker[];
  addBroker: (broker: Omit<Broker, 'id' | 'totalDeals'>) => void;

  campaigns: Campaign[];
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;

  conversations: Conversation[];
  sendMessage: (convId: string, text: string) => void;
  markConversationAsRead: (convId: string) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Reset Demo Data
  resetAllDemoData: () => void;
  formatPKR: (amount: number) => string;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export const formatPKR = (amount: number): string => {
  return 'PKR ' + amount.toLocaleString('en-PK');
};

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Modals
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPropertyDetailOpen, setIsPropertyDetailOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false);
  const [isSendMailOpen, setIsSendMailOpen] = useState(false);

  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);
  const [isAgreementDetailOpen, setIsAgreementDetailOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('src_crm_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('src_crm_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('src_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('src_crm_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [agreements, setAgreements] = useState<Agreement[]>(() => {
    const saved = localStorage.getItem('src_crm_agreements');
    return saved ? JSON.parse(saved) : INITIAL_AGREEMENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('src_crm_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('src_crm_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('src_crm_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [brokers, setBrokers] = useState<Broker[]>(() => {
    const saved = localStorage.getItem('src_crm_brokers');
    return saved ? JSON.parse(saved) : INITIAL_BROKERS;
  });

  const [campaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('src_crm_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('src_crm_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('src_crm_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('src_crm_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('src_crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('src_crm_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('src_crm_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('src_crm_agreements', JSON.stringify(agreements));
  }, [agreements]);

  useEffect(() => {
    localStorage.setItem('src_crm_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('src_crm_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('src_crm_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('src_crm_brokers', JSON.stringify(brokers));
  }, [brokers]);

  useEffect(() => {
    localStorage.setItem('src_crm_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('src_crm_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('src_crm_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Property Actions
  const addProperty = (newProp: Omit<Property, 'id' | 'ref' | 'createdAt'>) => {
    const nextRefNumber = 5000 + properties.length + 1;
    const ref = `#${nextRefNumber}`;
    const id = `prop-${Date.now()}`;
    const property: Property = {
      ...newProp,
      id,
      ref,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [property, ...prev]);
    addActivity({
      type: 'Property Added',
      user: 'SRC Administrator',
      target: `${property.name} (${property.ref})`,
      details: `New listing registered in ${property.city} with price ${formatPKR(property.price)}.`,
      propertyRef: property.ref
    });
    showToast('Property Added', `${property.name} has been published successfully.`);
  };

  const updateProperty = (updated: Property) => {
    setProperties(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (selectedProperty?.id === updated.id) {
      setSelectedProperty(updated);
    }
    showToast('Property Updated', `Listing ${updated.ref} was updated.`);
  };

  const deleteProperty = (id: string) => {
    const target = properties.find(p => p.id === id);
    setProperties(prev => prev.filter(p => p.id !== id));
    if (selectedProperty?.id === id) {
      setIsPropertyDetailOpen(false);
      setSelectedProperty(null);
    }
    showToast('Property Deleted', `${target?.name || 'Property'} was removed.`, 'warning');
  };

  const togglePropertyStatus = (id: string) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'Available' ? 'Pending' : p.status === 'Pending' ? 'Approved' : 'Available';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Project Actions
  const addProject = (proj: Omit<Project, 'id'>) => {
    const id = `proj-${Date.now()}`;
    setProjects(prev => [{ ...proj, id }, ...prev]);
    showToast('Project Created', `${proj.name} development has been initiated.`);
  };

  // Lead Actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const id = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
    addActivity({
      type: 'Lead Created',
      user: 'SRC Administrator',
      target: newLead.name,
      details: `Inquired regarding ${newLead.interestedPropertyName || 'General inquiries'}.`
    });
    showToast('Lead Created', `Added ${newLead.name} to the pipeline.`);
  };

  const updateLead = (updated: Lead) => {
    setLeads(prev => prev.map(l => (l.id === updated.id ? updated : l)));
    showToast('Lead Updated', `Lead profile for ${updated.name} updated.`);
  };

  const updateLeadStage = (id: string, stage: LeadStage) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === id) {
          return { ...l, stage };
        }
        return l;
      })
    );
    showToast('Pipeline Updated', `Lead moved to ${stage}`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Lead Removed', 'Lead record has been deleted.', 'warning');
  };

  // Offer Actions
  const addOffer = (offerData: Omit<Offer, 'id' | 'offerRef'>) => {
    const id = `off-${Date.now()}`;
    const offerRef = `OFF-2026-${String(offers.length + 1).padStart(3, '0')}`;
    const newOffer: Offer = { ...offerData, id, offerRef };
    setOffers(prev => [newOffer, ...prev]);
    addActivity({
      type: 'Offer Received',
      user: offerData.assignedAgent,
      target: offerData.propertyName,
      details: `Formal bid of ${formatPKR(offerData.offerAmount)} submitted by ${offerData.customerName}.`
    });
    showToast('Offer Registered', `Offer ${offerRef} added.`);
  };

  const updateOfferStatus = (id: string, status: Offer['status']) => {
    setOffers(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
    showToast('Offer Status', `Offer marked as ${status}.`);
  };

  // Agreement Actions
  const addAgreement = (agrData: Omit<Agreement, 'id' | 'agreementRef'>) => {
    const id = `agr-${Date.now()}`;
    const agreementRef = `AGR-SKD-${String(agreements.length + 20).padStart(3, '0')}`;
    const newAgr: Agreement = { ...agrData, id, agreementRef };
    setAgreements(prev => [newAgr, ...prev]);
    addActivity({
      type: 'Agreement Signed',
      user: 'SRC Administrator',
      target: agrData.propertyName,
      details: `${agrData.type} prepared for ${agrData.customerName}.`
    });
    showToast('Agreement Created', `Contract ${agreementRef} registered.`);
  };

  const updateAgreementStatus = (id: string, status: Agreement['status']) => {
    setAgreements(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    showToast('Agreement Updated', `Status changed to ${status}.`);
  };

  // Appointments
  const addAppointment = (appData: Omit<Appointment, 'id'>) => {
    const id = `app-${Date.now()}`;
    const newApp: Appointment = { ...appData, id };
    setAppointments(prev => [newApp, ...prev]);
    addActivity({
      type: 'Visit Scheduled',
      user: appData.assignedAgent,
      target: appData.property,
      details: `${appData.type} with ${appData.customer} on ${appData.date} at ${appData.startTime}.`
    });
    showToast('Appointment Scheduled', `${appData.title} added to calendar.`);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    showToast('Appointment Cancelled', 'Appointment removed from schedule.', 'info');
  };

  // Activities
  const addActivity = (actData: Omit<Activity, 'id' | 'timestamp'>) => {
    const id = `act-${Date.now()}`;
    const newAct: Activity = {
      ...actData,
      id,
      timestamp: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Contacts
  const addContact = (cntData: Omit<Contact, 'id' | 'totalDeals'>) => {
    const id = `cnt-${Date.now()}`;
    const newCnt: Contact = { ...cntData, id, totalDeals: 0 };
    setContacts(prev => [newCnt, ...prev]);
    showToast('Contact Saved', `${newCnt.name} added to contacts.`);
  };

  const updateContact = (updated: Contact) => {
    setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    showToast('Contact Updated', `${updated.name} details saved.`);
  };

  // Brokers
  const addBroker = (brkData: Omit<Broker, 'id' | 'totalDeals'>) => {
    const id = `brk-${Date.now()}`;
    const newBrk: Broker = { ...brkData, id, totalDeals: 0 };
    setBrokers(prev => [newBrk, ...prev]);
    showToast('Broker Added', `${newBrk.name} registered.`);
  };

  // Documents
  const addDocument = (docData: Omit<DocumentItem, 'id' | 'uploadedAt'>) => {
    const id = `doc-${Date.now()}`;
    const newDoc: DocumentItem = {
      ...docData,
      id,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast('Document Uploaded', `${newDoc.name} stored in demo vault.`);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document Removed', 'File removed from vault.', 'info');
  };

  // Messages
  const sendMessage = (convId: string, text: string) => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === convId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            senderName: 'SRC Administrator',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
          };
          return {
            ...c,
            lastMessage: text,
            time: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const markConversationAsRead = (convId: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === convId ? { ...c, unread: false } : c))
    );
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.');
  };

  // Reset demo
  const resetAllDemoData = () => {
    localStorage.removeItem('src_crm_properties');
    localStorage.removeItem('src_crm_projects');
    localStorage.removeItem('src_crm_leads');
    localStorage.removeItem('src_crm_offers');
    localStorage.removeItem('src_crm_agreements');
    localStorage.removeItem('src_crm_appointments');
    localStorage.removeItem('src_crm_activities');
    localStorage.removeItem('src_crm_contacts');
    localStorage.removeItem('src_crm_brokers');
    localStorage.removeItem('src_crm_documents');
    localStorage.removeItem('src_crm_conversations');
    localStorage.removeItem('src_crm_notifications');

    setProperties(INITIAL_PROPERTIES);
    setProjects(INITIAL_PROJECTS);
    setLeads(INITIAL_LEADS);
    setOffers(INITIAL_OFFERS);
    setAgreements(INITIAL_AGREEMENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setActivities(INITIAL_ACTIVITIES);
    setContacts(INITIAL_CONTACTS);
    setBrokers(INITIAL_BROKERS);
    setDocuments(INITIAL_DOCUMENTS);
    setConversations(INITIAL_CONVERSATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);

    showToast('Demo Data Reset', 'All records have been restored to initial demo state.', 'info');
  };

  return (
    <CrmContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isQuickAddOpen,
        setIsQuickAddOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isMessagesOpen,
        setIsMessagesOpen,
        activeConversationId,
        setActiveConversationId,
        selectedProperty,
        setSelectedProperty,
        isPropertyDetailOpen,
        setIsPropertyDetailOpen,
        isAddPropertyOpen,
        setIsAddPropertyOpen,
        isEditPropertyOpen,
        setIsEditPropertyOpen,
        isSendMailOpen,
        setIsSendMailOpen,
        selectedAgreement,
        setSelectedAgreement,
        isAgreementDetailOpen,
        setIsAgreementDetailOpen,
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePropertyStatus,
        projects,
        addProject,
        leads,
        addLead,
        updateLead,
        updateLeadStage,
        deleteLead,
        offers,
        addOffer,
        updateOfferStatus,
        agreements,
        addAgreement,
        updateAgreementStatus,
        appointments,
        addAppointment,
        deleteAppointment,
        activities,
        addActivity,
        contacts,
        addContact,
        updateContact,
        brokers,
        addBroker,
        campaigns,
        documents,
        addDocument,
        deleteDocument,
        conversations,
        sendMessage,
        markConversationAsRead,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        toasts,
        showToast,
        dismissToast,
        resetAllDemoData,
        formatPKR
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
