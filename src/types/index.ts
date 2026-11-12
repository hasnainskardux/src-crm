export type NavigationItem = 
  | 'dashboard'
  | 'properties'
  | 'projects'
  | 'leads'
  | 'offers'
  | 'agreements'
  | 'calendar'
  | 'activities'
  | 'contacts'
  | 'brokers'
  | 'campaigns'
  | 'documents'
  | 'settings'
  | 'help';

export type PropertyStatus = 'Available' | 'Pending' | 'Approved' | 'Rented' | 'Sold';
export type WebsiteStatus = 'Published' | 'Unpublished';
export type PropertyType = 
  | 'Apartment' 
  | 'Townhouse' 
  | 'Warehouse' 
  | 'Condominium' 
  | 'Multifamily' 
  | 'Land' 
  | 'Office' 
  | 'Mountain Villa'
  | 'Commercial';

export interface Property {
  id: string;
  ref: string; // e.g. #5001
  name: string;
  type: PropertyType;
  salesType: 'Sale' | 'Rent' | 'Both';
  price: number; // in PKR
  rentalPrice?: number; // PKR per month
  address: string;
  city: string;
  region: string; // e.g. Gilgit-Baltistan
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  landArea?: string; // e.g. "4 Acres" or "1 Kanal"
  status: PropertyStatus;
  websiteStatus: WebsiteStatus;
  images: string[];
  featured: boolean;
  description: string;
  assignedAgent: string;
  ownerName: string;
  ownerContact: string;
  distances?: {
    school?: string;
    hospital?: string;
    center?: string;
  };
  createdAt: string;
}

export type LeadStage = 
  | 'New' 
  | 'Contacted' 
  | 'Interested' 
  | 'Qualified' 
  | 'Meeting Scheduled' 
  | 'Negotiation' 
  | 'Converted' 
  | 'Lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  interestedPropertyId?: string;
  interestedPropertyName: string;
  budget: number; // PKR
  source: 'Website' | 'WhatsApp' | 'Facebook' | 'Instagram' | 'Referral' | 'Phone Call';
  assignedAgent: string;
  stage: LeadStage;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  image: string;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  startingPrice: number; // PKR
  completionDate: string;
  status: 'Planning' | 'Under Construction' | 'Completed' | 'Upcoming';
  description: string;
}

export interface Offer {
  id: string;
  offerRef: string;
  customerName: string;
  propertyId: string;
  propertyName: string;
  offerAmount: number; // PKR
  askingPrice: number; // PKR
  offerDate: string;
  assignedAgent: string;
  status: 'New' | 'Under Review' | 'Accepted' | 'Rejected' | 'Negotiating';
  notes: string;
}

export interface Agreement {
  id: string;
  agreementRef: string;
  customerName: string;
  propertyId: string;
  propertyName: string;
  type: 'Sale Agreement' | 'Rental Agreement' | 'Booking Agreement' | 'Property Management Agreement';
  startDate: string;
  expiryDate: string;
  amount: number; // PKR
  status: 'Active' | 'Draft' | 'Expired' | 'Terminated';
  documentUrl?: string;
}

export type AppointmentType = 
  | 'Property Visit' 
  | 'Customer Meeting' 
  | 'Agent Appointment' 
  | 'Booking Check-in' 
  | 'Booking Check-out' 
  | 'Follow-up Call';

export interface Appointment {
  id: string;
  title: string;
  customer: string;
  property: string;
  assignedAgent: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  type: AppointmentType;
  location: string;
  notes?: string;
}

export interface Activity {
  id: string;
  type: 'Property Added' | 'Lead Created' | 'Customer Contacted' | 'Visit Scheduled' | 'Offer Received' | 'Agreement Signed' | 'Payment Received';
  user: string;
  target: string;
  timestamp: string;
  details: string;
  propertyRef?: string;
}

export type ContactType = 'Buyer' | 'Seller' | 'Property Owner' | 'Tenant' | 'Investor' | 'Organization';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  type: ContactType;
  organization?: string;
  assignedAgent: string;
  notes: string;
  totalDeals: number;
  avatar?: string;
}

export interface Broker {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  assignedPropertiesCount: number;
  totalDeals: number;
  commissionRate: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Facebook Ads' | 'Instagram Marketing' | 'Email Campaigns' | 'WhatsApp Campaigns' | 'Property Promotions';
  startDate: string;
  endDate: string;
  budget: number; // PKR
  spent: number;
  leadsGenerated: number;
  conversionRate: string;
  status: 'Active' | 'Paused' | 'Completed';
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Property Documents' | 'Customer Documents' | 'Agreements' | 'Invoices' | 'Identity Documents' | 'Other Documents';
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  propertyRef?: string;
  customerName?: string;
}

export interface SalesReportRecord {
  id: string;
  customerName: string;
  customerAvatar: string;
  propertyName: string;
  salesType: 'Sale' | 'Rent';
  price: number; // PKR
  status: 'Paid' | 'Pending' | 'Processing';
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactAvatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  propertyRef?: string;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'lead' | 'offer' | 'agreement' | 'appointment' | 'system';
}
