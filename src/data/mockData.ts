import { 
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
  SalesReportRecord, 
  Conversation,
  NotificationItem 
} from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    ref: '#5001',
    name: 'Luxury Mountain Residence',
    type: 'Apartment',
    salesType: 'Both',
    price: 8365000,
    rentalPrice: 45000,
    address: '3605 Parker Rd., Hussain Chowk',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2971, lng: 75.6333 },
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    status: 'Available',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Breathtaking residence with panoramic Karakoram mountain views, modern cedar wood interiors, insulated double-glazed windows, and central heating perfect for Skardu winters.',
    assignedAgent: 'Nayeem Azraf',
    ownerName: 'Mirza Tariq Ali',
    ownerContact: '+92 345 5678901',
    distances: {
      school: '1.2 km',
      hospital: '2.5 km',
      center: '800 m'
    },
    createdAt: '2026-03-01'
  },
  {
    id: 'prop-2',
    ref: '#5002',
    name: 'Skardu Valley Townhouse',
    type: 'Townhouse',
    salesType: 'Sale',
    price: 7155000,
    rentalPrice: 50000,
    address: '8558 Green Rd., Satpara Road',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2842, lng: 75.6412 },
    bedrooms: 5,
    bathrooms: 4,
    sqft: 2000,
    status: 'Pending',
    websiteStatus: 'Unpublished',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Spacious 5-bedroom alpine townhouse situated along Satpara Lake stream. Includes solar backup, private organic garden, and parking for 3 vehicles.',
    assignedAgent: 'Zainab Balti',
    ownerName: 'Begum Farida Khan',
    ownerContact: '+92 300 9876543',
    distances: {
      school: '2.0 km',
      hospital: '3.1 km',
      center: '1.5 km'
    },
    createdAt: '2026-03-04'
  },
  {
    id: 'prop-3',
    ref: '#5003',
    name: 'Alpine Heights Villa & Complex',
    type: 'Apartment',
    salesType: 'Both',
    price: 9880000,
    rentalPrice: 75000,
    address: '775 Rolling Green Rd., Airport Avenue',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.3351, lng: 75.5398 },
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1000,
    status: 'Approved',
    websiteStatus: 'Unpublished',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'Premium serviced alpine apartment close to Skardu International Airport. High rental yield for tourists and corporate travelers visiting northern Pakistan.',
    assignedAgent: 'Ali Murtaza',
    ownerName: 'Haji Ghulam Rasool',
    ownerContact: '+92 312 4567890',
    distances: {
      school: '3.5 km',
      hospital: '4.0 km',
      center: '5.0 km'
    },
    createdAt: '2026-03-05'
  },
  {
    id: 'prop-4',
    ref: '#5004',
    name: 'Harmony Condominium Suite',
    type: 'Condominium',
    salesType: 'Sale',
    price: 5200000,
    rentalPrice: 25000,
    address: '7529 E. Pecan St., Aliabad',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.3012, lng: 75.6219 },
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    status: 'Pending',
    websiteStatus: 'Unpublished',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Sprawling condo residence with swimming pool access, landscaped terraces, and 24/7 security. Prime Aliabad residential hub.',
    assignedAgent: 'Nayeem Azraf',
    ownerName: 'Dr. Asif Mehdi',
    ownerContact: '+92 333 1122334',
    distances: {
      school: '600 m',
      hospital: '1.2 km',
      center: '1.0 km'
    },
    createdAt: '2026-03-08'
  },
  {
    id: 'prop-5',
    ref: '#5005',
    name: 'Riverside Multifamily Estate',
    type: 'Multifamily',
    salesType: 'Rent',
    price: 8400000,
    rentalPrice: 40000,
    address: '8080 Railroad St., Indus Bank View',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.3129, lng: 75.6184 },
    bedrooms: 4,
    bathrooms: 2,
    sqft: 1200,
    status: 'Rented',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'Tranquil duplex family home overlooking the junction of the Indus and Shigar rivers. Fully occupied with guaranteed annual rental contracts.',
    assignedAgent: 'Fatima Skardu',
    ownerName: 'Malik Jahangir',
    ownerContact: '+92 344 7788990',
    distances: {
      school: '1.5 km',
      hospital: '2.8 km',
      center: '1.8 km'
    },
    createdAt: '2026-03-10'
  },
  {
    id: 'prop-6',
    ref: '#5006',
    name: 'Executive Commercial Office Suites',
    type: 'Office',
    salesType: 'Sale',
    price: 9250000,
    rentalPrice: 55000,
    address: '775 Rolling Green Rd., Commercial Avenue',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2995, lng: 75.6378 },
    bedrooms: 2,
    bathrooms: 2,
    sqft: 800,
    status: 'Approved',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'Modern turn-key corporate office floor equipped with fiber-optic internet connection, conference facility, backup generator, and reception desk.',
    assignedAgent: 'Ali Murtaza',
    ownerName: 'SRC Holdings Ltd.',
    ownerContact: '+92 5815 450123',
    distances: {
      school: '1.0 km',
      hospital: '1.5 km',
      center: '300 m'
    },
    createdAt: '2026-03-12'
  },
  {
    id: 'prop-7',
    ref: '#5007',
    name: 'Shangrila Orchard & Farm Land',
    type: 'Land',
    salesType: 'Sale',
    price: 1475000,
    rentalPrice: 15000,
    address: '3890 Poplar Dr., Lower Kachura Lake',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.4385, lng: 75.4667 },
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    landArea: '4 Acres',
    status: 'Pending',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Prime agricultural and resort development land right by Shangrila lake. Features mature apricot and apple trees, fresh glacial water spring, and road frontage.',
    assignedAgent: 'Zainab Balti',
    ownerName: 'Subedar Major (R) Hassan',
    ownerContact: '+92 355 6677889',
    distances: {
      school: '4.0 km',
      hospital: '6.5 km',
      center: '12 km'
    },
    createdAt: '2026-03-15'
  },
  {
    id: 'prop-8',
    ref: '#5008',
    name: 'Katpana Desert View Chalet',
    type: 'Apartment',
    salesType: 'Sale',
    price: 1800000,
    rentalPrice: 20000,
    address: '7529 E. Pecan St., Katpana Sands',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.3214, lng: 75.5925 },
    bedrooms: 2,
    bathrooms: 1,
    sqft: 600,
    status: 'Available',
    websiteStatus: 'Unpublished',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'Cozy modern stone cottage bordering the famous Cold Desert of Skardu. Ideal holiday getaway or Airbnb investment property.',
    assignedAgent: 'Nayeem Azraf',
    ownerName: 'Raza Balti',
    ownerContact: '+92 301 2233445',
    distances: {
      school: '2.5 km',
      hospital: '3.8 km',
      center: '3.0 km'
    },
    createdAt: '2026-03-18'
  },
  {
    id: 'prop-9',
    ref: '#5009',
    name: 'SRC Logistics Warehouse Depot',
    type: 'Warehouse',
    salesType: 'Both',
    price: 2345000,
    rentalPrice: 23000,
    address: '8558 Green Rd., Industrial Sector',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2901, lng: 75.6120 },
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1000,
    status: 'Pending',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'High-ceiling industrial warehouse with dedicated heavy truck loading dock, insulated roof panels, and attached office quarters.',
    assignedAgent: 'Ali Murtaza',
    ownerName: 'Karakoram Logistics Group',
    ownerContact: '+92 300 4455667',
    distances: {
      school: '3.0 km',
      hospital: '4.5 km',
      center: '4.0 km'
    },
    createdAt: '2026-03-20'
  },
  {
    id: 'prop-10',
    ref: '#5010',
    name: 'Modern Duplex Residence',
    type: 'Multifamily',
    salesType: 'Sale',
    price: 5570000,
    rentalPrice: 32500,
    address: '8080 Railroad St., New Sadpara Colony',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2890, lng: 75.6450 },
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1200,
    status: 'Approved',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Newly constructed contemporary duplex with custom woodwork from local cedar, spacious balconies facing northern snow peaks, and garage.',
    assignedAgent: 'Fatima Skardu',
    ownerName: 'Ibrahim Chughtai',
    ownerContact: '+92 334 8899001',
    distances: {
      school: '1.1 km',
      hospital: '2.0 km',
      center: '1.4 km'
    },
    createdAt: '2026-03-22'
  },
  {
    id: 'prop-11',
    ref: '#5011',
    name: 'Valley View Executive Penthouse',
    type: 'Apartment',
    salesType: 'Sale',
    price: 3240000,
    rentalPrice: 32400,
    address: '3605 Parker Rd., Upper Hussain Chowk',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.2985, lng: 75.6320 },
    bedrooms: 5,
    bathrooms: 4,
    sqft: 1800,
    status: 'Sold',
    websiteStatus: 'Unpublished',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    description: 'Top-tier 5-bedroom penthouse suite with private elevator access, rooftop terrace overlooking Kharpocho Fort, and premium fixtures.',
    assignedAgent: 'Nayeem Azraf',
    ownerName: 'Syed Ali Shah',
    ownerContact: '+92 313 7766554',
    distances: {
      school: '800 m',
      hospital: '1.9 km',
      center: '600 m'
    },
    createdAt: '2026-03-25'
  },
  {
    id: 'prop-12',
    ref: '#5012',
    name: 'SRC Premium Valley Residency',
    type: 'Apartment',
    salesType: 'Both',
    price: 3000000,
    rentalPrice: 28000,
    address: '8558 Green Rd., Upper Kachura View',
    city: 'Skardu',
    region: 'Gilgit-Baltistan',
    country: 'Pakistan',
    coordinates: { lat: 35.4410, lng: 75.4520 },
    bedrooms: 2,
    bathrooms: 2,
    sqft: 800,
    status: 'Available',
    websiteStatus: 'Published',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    description: 'Designer residential flat within the signature SRC Valley community. Complete with communal gym, heated water supply, and high-speed Wi-Fi.',
    assignedAgent: 'Zainab Balti',
    ownerName: 'Muhammad Salman',
    ownerContact: '+92 342 9988776',
    distances: {
      school: '1.4 km',
      hospital: '2.6 km',
      center: '1.2 km'
    },
    createdAt: '2026-03-28'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'SRC Mountain Residency',
    location: 'Hussain Chowk, Skardu',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 64,
    availableUnits: 18,
    soldUnits: 46,
    startingPrice: 4500000,
    completionDate: 'December 2026',
    status: 'Under Construction',
    description: 'Flagship gated community offering luxury apartments with panoramic views of the Karakoram range and modern alpine architecture.'
  },
  {
    id: 'proj-2',
    name: 'Skardu Valley Heights',
    location: 'Satpara Road, Skardu',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 42,
    availableUnits: 12,
    soldUnits: 30,
    startingPrice: 6200000,
    completionDate: 'August 2026',
    status: 'Under Construction',
    description: 'Exclusive multi-storey residential enclave featuring smart home automation, solar heating, and underground parking.'
  },
  {
    id: 'proj-3',
    name: 'Alpine Luxury Homes',
    location: 'Upper Kachura Lake, Skardu',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 20,
    availableUnits: 6,
    soldUnits: 14,
    startingPrice: 12500000,
    completionDate: 'Completed',
    status: 'Completed',
    description: 'Custom handcrafted wooden chalet villas nestled in the apple orchards surrounding Upper Kachura Lake.'
  },
  {
    id: 'proj-4',
    name: 'SRC Commercial Plaza',
    location: 'Airport Road, Skardu',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 36,
    availableUnits: 28,
    soldUnits: 8,
    startingPrice: 8500000,
    completionDate: 'March 2027',
    status: 'Planning',
    description: 'State-of-the-art corporate offices, retail outlets, and financial institution facilities serving northern trade routes.'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ammar ibn Yasir',
    phone: '+92 300 1234567',
    email: 'ammar.yasir@example.com',
    interestedPropertyName: 'Luxury Mountain Residence (#5001)',
    budget: 8500000,
    source: 'Website',
    assignedAgent: 'Nayeem Azraf',
    stage: 'Negotiation',
    nextFollowUp: '2026-11-14',
    notes: 'Requested final revision on payment milestones. Keen on immediate booking.',
    createdAt: '2026-11-01'
  },
  {
    id: 'lead-2',
    name: 'Abu Talha al-Ansari',
    phone: '+92 312 9876543',
    email: 'abu.talha@example.com',
    interestedPropertyName: 'Skardu Valley Townhouse (#5002)',
    budget: 7200000,
    source: 'WhatsApp',
    assignedAgent: 'Zainab Balti',
    stage: 'Meeting Scheduled',
    nextFollowUp: '2026-11-13',
    notes: 'Site visit scheduled for tomorrow 2:00 PM with his family.',
    createdAt: '2026-11-02'
  },
  {
    id: 'lead-3',
    name: 'Miqdad ibn Aswad',
    phone: '+92 333 4567890',
    email: 'miqdad.aswad@example.com',
    interestedPropertyName: 'Alpine Heights Villa (#5003)',
    budget: 9900000,
    source: 'Referral',
    assignedAgent: 'Ali Murtaza',
    stage: 'Qualified',
    nextFollowUp: '2026-11-15',
    notes: 'Overseas Pakistani investor living in UAE. Ready to transfer down payment via bank transfer.',
    createdAt: '2026-11-03'
  },
  {
    id: 'lead-4',
    name: 'Amir ibn Fuhayra',
    phone: '+92 345 6789012',
    email: 'amir.fuhayra@example.com',
    interestedPropertyName: 'Harmony Condominium Suite (#5004)',
    budget: 5300000,
    source: 'Facebook',
    assignedAgent: 'Nayeem Azraf',
    stage: 'Interested',
    nextFollowUp: '2026-11-16',
    notes: 'Inquired about rental yields and condominium management fees.',
    createdAt: '2026-11-04'
  },
  {
    id: 'lead-5',
    name: 'Sa\'d ibn Mu\'adh',
    phone: '+92 301 2345678',
    email: 'sad.muadh@example.com',
    interestedPropertyName: 'Riverside Multifamily Estate (#5005)',
    budget: 8500000,
    source: 'Website',
    assignedAgent: 'Fatima Skardu',
    stage: 'Converted',
    nextFollowUp: '2026-11-18',
    notes: 'Agreement signed and security deposit received. Moved to onboarding.',
    createdAt: '2026-10-25'
  },
  {
    id: 'lead-6',
    name: 'Talha ibn Ubaydillah',
    phone: '+92 321 3456789',
    email: 'talha.u@example.com',
    interestedPropertyName: 'Executive Commercial Office (#5006)',
    budget: 9500000,
    source: 'Instagram',
    assignedAgent: 'Ali Murtaza',
    stage: 'Contacted',
    nextFollowUp: '2026-11-14',
    notes: 'Sent project brochure and video walkthrough on WhatsApp.',
    createdAt: '2026-11-05'
  },
  {
    id: 'lead-7',
    name: 'Abbad ibn Bishr',
    phone: '+92 344 5678901',
    email: 'abbad.bishr@example.com',
    interestedPropertyName: 'Shangrila Orchard & Land (#5007)',
    budget: 1500000,
    source: 'Phone Call',
    assignedAgent: 'Zainab Balti',
    stage: 'New',
    nextFollowUp: '2026-11-13',
    notes: 'Called inquiring about 4-acre land boundary demarcation.',
    createdAt: '2026-11-07'
  },
  {
    id: 'lead-8',
    name: 'Dr. Tariq Gilgiti',
    phone: '+92 300 7890123',
    email: 'tariq.g@example.com',
    interestedPropertyName: 'Katpana Desert View Chalet (#5008)',
    budget: 2000000,
    source: 'Website',
    assignedAgent: 'Nayeem Azraf',
    stage: 'Interested',
    nextFollowUp: '2026-11-17',
    notes: 'Seeking summer holiday vacation retreat.',
    createdAt: '2026-11-08'
  },
  {
    id: 'lead-9',
    name: 'Syed Raza Baltistani',
    phone: '+92 315 8901234',
    email: 'raza.balti@example.com',
    interestedPropertyName: 'SRC Logistics Warehouse (#5009)',
    budget: 2400000,
    source: 'Referral',
    assignedAgent: 'Ali Murtaza',
    stage: 'Negotiation',
    nextFollowUp: '2026-11-15',
    notes: 'Negotiating a 3-year commercial lease with annual escalation clause.',
    createdAt: '2026-11-09'
  },
  {
    id: 'lead-10',
    name: 'Fatima Zahra Khan',
    phone: '+92 332 9012345',
    email: 'fz.khan@example.com',
    interestedPropertyName: 'Modern Duplex Residence (#5010)',
    budget: 5600000,
    source: 'Facebook',
    assignedAgent: 'Fatima Skardu',
    stage: 'Qualified',
    nextFollowUp: '2026-11-16',
    notes: 'Pre-approved loan with Bank of Khyber for real estate purchase.',
    createdAt: '2026-11-10'
  },
  {
    id: 'lead-11',
    name: 'Kashif Mehmood',
    phone: '+92 303 1122445',
    email: 'kashif.m@example.com',
    interestedPropertyName: 'SRC Premium Valley Residency (#5012)',
    budget: 3100000,
    source: 'Website',
    assignedAgent: 'Zainab Balti',
    stage: 'Meeting Scheduled',
    nextFollowUp: '2026-11-15',
    notes: 'Meeting at SRC Skardu office to review master plan.',
    createdAt: '2026-11-11'
  },
  {
    id: 'lead-12',
    name: 'Hassan Murtaza',
    phone: '+92 346 3344556',
    email: 'hassan.m@example.com',
    interestedPropertyName: 'Alpine Heights Villa (#5003)',
    budget: 9500000,
    source: 'WhatsApp',
    assignedAgent: 'Nayeem Azraf',
    stage: 'Lost',
    nextFollowUp: '2026-11-20',
    notes: 'Opted for residential plot in Islamabad instead. Keep in monthly newsletter.',
    createdAt: '2026-10-15'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    offerRef: 'OFF-2026-001',
    customerName: 'Ammar ibn Yasir',
    propertyId: 'prop-1',
    propertyName: 'Luxury Mountain Residence (#5001)',
    offerAmount: 8200000,
    askingPrice: 8365000,
    offerDate: '2026-11-08',
    assignedAgent: 'Nayeem Azraf',
    status: 'Negotiating',
    notes: 'Owner countered at PKR 8,280,000 with included appliances.'
  },
  {
    id: 'off-2',
    offerRef: 'OFF-2026-002',
    customerName: 'Abu Talha al-Ansari',
    propertyId: 'prop-2',
    propertyName: 'Skardu Valley Townhouse (#5002)',
    offerAmount: 7000000,
    askingPrice: 7155000,
    offerDate: '2026-11-09',
    assignedAgent: 'Zainab Balti',
    status: 'Under Review',
    notes: 'Submitted bank financial guarantee. Awaiting seller concurrence.'
  },
  {
    id: 'off-3',
    offerRef: 'OFF-2026-003',
    customerName: 'Miqdad ibn Aswad',
    propertyId: 'prop-3',
    propertyName: 'Alpine Heights Villa (#5003)',
    offerAmount: 9880000,
    askingPrice: 9880000,
    offerDate: '2026-11-05',
    assignedAgent: 'Ali Murtaza',
    status: 'Accepted',
    notes: 'Full asking price accepted. Agreement drafting in progress.'
  },
  {
    id: 'off-4',
    offerRef: 'OFF-2026-004',
    customerName: 'Syed Raza Baltistani',
    propertyId: 'prop-9',
    propertyName: 'SRC Logistics Warehouse (#5009)',
    offerAmount: 2200000,
    askingPrice: 2345000,
    offerDate: '2026-11-10',
    assignedAgent: 'Ali Murtaza',
    status: 'New',
    notes: 'Initial formal bid submitted along with company profile.'
  },
  {
    id: 'off-5',
    offerRef: 'OFF-2026-005',
    customerName: 'Fatima Zahra Khan',
    propertyId: 'prop-10',
    propertyName: 'Modern Duplex Residence (#5010)',
    offerAmount: 5400000,
    askingPrice: 5570000,
    offerDate: '2026-11-07',
    assignedAgent: 'Fatima Skardu',
    status: 'Under Review',
    notes: 'Seller review pending until Friday.'
  }
];

export const INITIAL_AGREEMENTS: Agreement[] = [
  {
    id: 'agr-1',
    agreementRef: 'AGR-SKD-019',
    customerName: 'Sa\'d ibn Mu\'adh',
    propertyId: 'prop-5',
    propertyName: 'Riverside Multifamily Estate (#5005)',
    type: 'Rental Agreement',
    startDate: '2026-11-01',
    expiryDate: '2027-10-31',
    amount: 480000,
    status: 'Active',
    documentUrl: '#'
  },
  {
    id: 'agr-2',
    agreementRef: 'AGR-SKD-018',
    customerName: 'Syed Ali Shah',
    propertyId: 'prop-11',
    propertyName: 'Valley View Executive Penthouse (#5011)',
    type: 'Sale Agreement',
    startDate: '2026-10-15',
    expiryDate: '2026-12-15',
    amount: 3240000,
    status: 'Active',
    documentUrl: '#'
  },
  {
    id: 'agr-3',
    agreementRef: 'AGR-SKD-017',
    customerName: 'Karakoram Logistics Group',
    propertyId: 'prop-9',
    propertyName: 'SRC Logistics Warehouse (#5009)',
    type: 'Property Management Agreement',
    startDate: '2026-06-01',
    expiryDate: '2027-05-31',
    amount: 276000,
    status: 'Active',
    documentUrl: '#'
  },
  {
    id: 'agr-4',
    agreementRef: 'AGR-SKD-016',
    customerName: 'Miqdad ibn Aswad',
    propertyId: 'prop-3',
    propertyName: 'Alpine Heights Villa (#5003)',
    type: 'Booking Agreement',
    startDate: '2026-11-10',
    expiryDate: '2026-12-10',
    amount: 9880000,
    status: 'Draft',
    documentUrl: '#'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    title: 'Site Visit: Luxury Residence',
    customer: 'Ammar ibn Yasir',
    property: 'Luxury Mountain Residence (#5001)',
    assignedAgent: 'Nayeem Azraf',
    date: '2026-11-12',
    startTime: '10:00',
    endTime: '11:30',
    type: 'Property Visit',
    location: 'Hussain Chowk, Skardu',
    notes: 'Client will bring architectural consultant.'
  },
  {
    id: 'app-2',
    title: 'Agreement Signing Meeting',
    customer: 'Miqdad ibn Aswad',
    property: 'Alpine Heights Villa (#5003)',
    assignedAgent: 'Ali Murtaza',
    date: '2026-11-12',
    startTime: '14:00',
    endTime: '15:00',
    type: 'Customer Meeting',
    location: 'SRC Headquarters, Skardu',
    notes: 'Legal counsel will be present for stamp paper execution.'
  },
  {
    id: 'app-3',
    title: 'Family Inspection Tour',
    customer: 'Abu Talha al-Ansari',
    property: 'Skardu Valley Townhouse (#5002)',
    assignedAgent: 'Zainab Balti',
    date: '2026-11-13',
    startTime: '14:00',
    endTime: '15:30',
    type: 'Property Visit',
    location: 'Satpara Road, Skardu',
    notes: 'Tour of organic garden and heating installation.'
  },
  {
    id: 'app-4',
    title: 'Follow-up Call: Commercial Lease',
    customer: 'Syed Raza Baltistani',
    property: 'SRC Logistics Warehouse (#5009)',
    assignedAgent: 'Ali Murtaza',
    date: '2026-11-14',
    startTime: '11:00',
    endTime: '11:45',
    type: 'Follow-up Call',
    location: 'Phone / Google Meet',
    notes: 'Review revised security deposit terms.'
  },
  {
    id: 'app-5',
    title: 'Check-in Inspection: Riverside Estate',
    customer: 'Sa\'d ibn Mu\'adh',
    property: 'Riverside Multifamily Estate (#5005)',
    assignedAgent: 'Fatima Skardu',
    date: '2026-11-15',
    startTime: '09:30',
    endTime: '10:30',
    type: 'Booking Check-in',
    location: 'Aliabad, Skardu',
    notes: 'Handover of entrance keys and inventory list.'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    type: 'Offer Received',
    user: 'Nayeem Azraf',
    target: 'Luxury Mountain Residence (#5001)',
    timestamp: '10 minutes ago',
    details: 'Received formal counter-offer of PKR 8,280,000 from Ammar ibn Yasir.',
    propertyRef: '#5001'
  },
  {
    id: 'act-2',
    type: 'Visit Scheduled',
    user: 'Zainab Balti',
    target: 'Skardu Valley Townhouse (#5002)',
    timestamp: '45 minutes ago',
    details: 'Scheduled site visit with Abu Talha al-Ansari for tomorrow 2:00 PM.',
    propertyRef: '#5002'
  },
  {
    id: 'act-3',
    type: 'Payment Received',
    user: 'Super Admin',
    target: 'Riverside Multifamily Estate (#5005)',
    timestamp: '2 hours ago',
    details: 'Confirmed receipt of monthly rental payment PKR 40,000 via Meezan Bank.',
    propertyRef: '#5005'
  },
  {
    id: 'act-4',
    type: 'Agreement Signed',
    user: 'Ali Murtaza',
    target: 'Valley View Penthouse (#5011)',
    timestamp: '5 hours ago',
    details: 'Sale deed executed with Syed Ali Shah for PKR 3,240,000.',
    propertyRef: '#5011'
  },
  {
    id: 'act-5',
    type: 'Lead Created',
    user: 'System Webhook',
    target: 'Katpana Desert View Chalet (#5008)',
    timestamp: 'Yesterday at 4:20 PM',
    details: 'New inbound inquiry from Dr. Tariq Gilgiti via website listing.',
    propertyRef: '#5008'
  },
  {
    id: 'act-6',
    type: 'Property Added',
    user: 'SRC Administrator',
    target: 'SRC Premium Valley Residency (#5012)',
    timestamp: '2 days ago',
    details: 'Listed new 2-bedroom executive apartment at Upper Kachura View for PKR 3,000,000.',
    propertyRef: '#5012'
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt-1',
    name: 'Ammar ibn Yasir',
    email: 'ammar.yasir@example.com',
    phone: '+92 300 1234567',
    whatsapp: '+92 300 1234567',
    address: 'Sector F-7/2, Islamabad',
    city: 'Islamabad',
    type: 'Buyer',
    organization: 'Yasir Enterprises',
    assignedAgent: 'Nayeem Azraf',
    notes: 'Interested in mountain retreat investments across Baltistan.',
    totalDeals: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'cnt-2',
    name: 'Abu Talha al-Ansari',
    email: 'abu.talha@example.com',
    phone: '+92 312 9876543',
    whatsapp: '+92 312 9876543',
    address: 'Near Old Jamia Masjid, Skardu',
    city: 'Skardu',
    type: 'Buyer',
    assignedAgent: 'Zainab Balti',
    notes: 'Seeking 5-bedroom residence for joint family.',
    totalDeals: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'cnt-3',
    name: 'Mirza Tariq Ali',
    email: 'tariq.ali@skarduhomes.pk',
    phone: '+92 345 5678901',
    whatsapp: '+92 345 5678901',
    address: 'Hussain Chowk, Skardu',
    city: 'Skardu',
    type: 'Property Owner',
    assignedAgent: 'Nayeem Azraf',
    notes: 'Owner of Luxury Mountain Residence (#5001).',
    totalDeals: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'cnt-4',
    name: 'Karakoram Logistics Group',
    email: 'operations@karakoramlogistics.pk',
    phone: '+92 300 4455667',
    whatsapp: '+92 300 4455667',
    address: 'Industrial Zone, Skardu',
    city: 'Skardu',
    type: 'Organization',
    assignedAgent: 'Ali Murtaza',
    notes: 'Commercial warehousing partner and corporate tenant.',
    totalDeals: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
  }
];

export const INITIAL_BROKERS: Broker[] = [
  {
    id: 'brk-1',
    name: 'Rehan Shah',
    company: 'Baltistan Prime Realtors',
    phone: '+92 333 5566778',
    email: 'rehan@baltistanprime.pk',
    location: 'Skardu City',
    assignedPropertiesCount: 6,
    totalDeals: 14,
    commissionRate: '2.5%',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'brk-2',
    name: 'Sobia Karim',
    company: 'Northern Lands Consultancy',
    phone: '+92 345 9988112',
    email: 'sobia@northernlands.pk',
    location: 'Gilgit & Skardu',
    assignedPropertiesCount: 4,
    totalDeals: 9,
    commissionRate: '2.0%',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'brk-3',
    name: 'Jamil Akhtar',
    company: 'K2 Estate Associates',
    phone: '+92 301 6655443',
    email: 'jamil@k2estate.pk',
    location: 'Shigar & Skardu',
    assignedPropertiesCount: 3,
    totalDeals: 7,
    commissionRate: '2.0%',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-1',
    name: 'Skardu Summer Mountain Homes 2026',
    type: 'Facebook Ads',
    startDate: '2026-05-01',
    endDate: '2026-08-31',
    budget: 450000,
    spent: 310000,
    leadsGenerated: 142,
    conversionRate: '4.8%',
    status: 'Active'
  },
  {
    id: 'cmp-2',
    name: 'Luxury Chalet Walkthrough Reels',
    type: 'Instagram Marketing',
    startDate: '2026-06-15',
    endDate: '2026-09-15',
    budget: 250000,
    spent: 190000,
    leadsGenerated: 98,
    conversionRate: '6.2%',
    status: 'Active'
  },
  {
    id: 'cmp-3',
    name: 'Overseas Pakistanis GCC VIP Newsletter',
    type: 'Email Campaigns',
    startDate: '2026-04-01',
    endDate: '2026-11-01',
    budget: 120000,
    spent: 95000,
    leadsGenerated: 46,
    conversionRate: '8.7%',
    status: 'Active'
  },
  {
    id: 'cmp-4',
    name: 'SRC Commercial Plaza Launch',
    type: 'Property Promotions',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    budget: 350000,
    spent: 80000,
    leadsGenerated: 34,
    conversionRate: '3.5%',
    status: 'Active'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Property-Deed_Luxury-Mountain-Residence_5001.pdf',
    category: 'Property Documents',
    fileSize: '3.4 MB',
    fileType: 'PDF',
    uploadedAt: '2026-11-01',
    propertyRef: '#5001'
  },
  {
    id: 'doc-2',
    name: 'FBR-Tax-Clearance-Certificate_2026.pdf',
    category: 'Identity Documents',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    uploadedAt: '2026-10-28',
    customerName: 'Ammar ibn Yasir'
  },
  {
    id: 'doc-3',
    name: 'Sale-Purchase-Agreement_Sadpara-Colony.pdf',
    category: 'Agreements',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    uploadedAt: '2026-11-04',
    propertyRef: '#5010'
  },
  {
    id: 'doc-4',
    name: 'Invoice-INV-2026-118-Brokerage-Commission.pdf',
    category: 'Invoices',
    fileSize: '840 KB',
    fileType: 'PDF',
    uploadedAt: '2026-11-08'
  },
  {
    id: 'doc-5',
    name: 'Architectural-Blueprints-SRC-Plaza.dwg.pdf',
    category: 'Property Documents',
    fileSize: '12.5 MB',
    fileType: 'PDF',
    uploadedAt: '2026-10-15'
  }
];

export const INITIAL_SALES_REPORTS: SalesReportRecord[] = [
  {
    id: 'sr-1',
    customerName: 'Ammar ibn Yasir',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    propertyName: '7529 E. Pecan St.',
    salesType: 'Sale',
    price: 5200000,
    status: 'Paid',
    date: 'Jun 2026'
  },
  {
    id: 'sr-2',
    customerName: 'Abu Talha al-Ansari',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    propertyName: '3890 Poplar Dr.',
    salesType: 'Rent',
    price: 9750000,
    status: 'Pending',
    date: 'Jun 2026'
  },
  {
    id: 'sr-3',
    customerName: 'Miqdad ibn Aswad',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    propertyName: '3605 Parker Rd.',
    salesType: 'Sale',
    price: 4000000,
    status: 'Paid',
    date: 'May 2026'
  },
  {
    id: 'sr-4',
    customerName: 'Amir ibn Fuhayra',
    customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    propertyName: '775 Rolling Green Rd.',
    salesType: 'Sale',
    price: 3725000,
    status: 'Paid',
    date: 'May 2026'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Amr ibn al-Jamuh',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Monthly rent done',
    time: '1m',
    unread: true,
    propertyRef: '#5005',
    messages: [
      {
        id: 'm-1',
        senderId: 'contact',
        senderName: 'Amr ibn al-Jamuh',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'Assalam-o-Alaikum, I have transferred the monthly rent for Riverside Duplex.',
        timestamp: '11:42 AM',
        isMe: false
      },
      {
        id: 'm-2',
        senderId: 'me',
        senderName: 'SRC Administrator',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        text: 'Walaikum Assalam Amr! Thank you, let me confirm the Meezan receipt.',
        timestamp: '11:44 AM',
        isMe: true
      },
      {
        id: 'm-3',
        senderId: 'contact',
        senderName: 'Amr ibn al-Jamuh',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'Monthly rent done',
        timestamp: '11:48 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-2',
    contactName: 'Miqdad ibn Aswad',
    contactAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Monthly rent done',
    time: '1m',
    unread: true,
    propertyRef: '#5003',
    messages: [
      {
        id: 'm-4',
        senderId: 'contact',
        senderName: 'Miqdad ibn Aswad',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        text: 'Will the deed be delivered to my Islamabad residence?',
        timestamp: '10:15 AM',
        isMe: false
      },
      {
        id: 'm-5',
        senderId: 'me',
        senderName: 'SRC Administrator',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        text: 'Yes, via secure courier service right after registrar stamp.',
        timestamp: '10:30 AM',
        isMe: true
      },
      {
        id: 'm-6',
        senderId: 'contact',
        senderName: 'Miqdad ibn Aswad',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        text: 'Monthly rent done',
        timestamp: '10:55 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-3',
    contactName: 'Sa\'d ibn Mu\'adh',
    contactAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Monthly rent done',
    time: '1m',
    unread: false,
    propertyRef: '#5005',
    messages: [
      {
        id: 'm-7',
        senderId: 'contact',
        senderName: 'Sa\'d ibn Mu\'adh',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        text: 'Monthly rent done',
        timestamp: '9:00 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-4',
    contactName: 'Talha',
    contactAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Monthly rent done',
    time: '1m',
    unread: false,
    messages: [
      {
        id: 'm-8',
        senderId: 'contact',
        senderName: 'Talha',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        text: 'Monthly rent done',
        timestamp: 'Yesterday',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-5',
    contactName: 'Abbad ibn Bishr',
    contactAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Monthly rent done',
    time: '1m',
    unread: false,
    messages: [
      {
        id: 'm-9',
        senderId: 'contact',
        senderName: 'Abbad ibn Bishr',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        text: 'Monthly rent done',
        timestamp: 'Nov 10',
        isMe: false
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Offer Received',
    message: 'Ammar ibn Yasir submitted an offer of PKR 8,280,000 for Luxury Mountain Residence.',
    time: '10 min ago',
    read: false,
    type: 'offer'
  },
  {
    id: 'notif-2',
    title: 'Upcoming Visit Reminder',
    message: 'Site visit with Abu Talha al-Ansari scheduled tomorrow at 2:00 PM.',
    time: '1 hour ago',
    read: false,
    type: 'appointment'
  },
  {
    id: 'notif-3',
    title: 'Payment Cleared',
    message: 'Rental payment of PKR 40,000 for Riverside Estate has been verified.',
    time: '3 hours ago',
    read: true,
    type: 'system'
  }
];

export const MONTHLY_SALES_DATA = [
  { month: 'Jan', revenue: 18000000, label: 'Jan' },
  { month: 'Feb', revenue: 24000000, label: 'Feb' },
  { month: 'Mar', revenue: 21000000, label: 'Mar' },
  { month: 'Apr', revenue: 29000000, label: 'Apr' },
  { month: 'May', revenue: 25000000, label: 'May' },
  { month: 'Jun', revenue: 34000000, label: 'Jun' },
  { month: 'Jul', revenue: 22000000, label: 'Jul' },
  { month: 'Aug', revenue: 27000000, label: 'Aug' },
  { month: 'Sep', revenue: 23000000, label: 'Sep' },
  { month: 'Oct', revenue: 31000000, label: 'Oct' },
  { month: 'Nov', revenue: 28000000, label: 'Nov' },
  { month: 'Dec', revenue: 35000000, label: 'Dec' }
];

export const YEARLY_SALES_DATA = [
  { year: '2022', revenue: 165000000, label: '2022' },
  { year: '2023', revenue: 240000000, label: '2023' },
  { year: '2024', revenue: 310000000, label: '2024' },
  { year: '2025', revenue: 385000000, label: '2025' },
  { year: '2026', revenue: 420000000, label: '2026 (YTD)' }
];
