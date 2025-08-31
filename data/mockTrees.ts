import { Tree, TreeStats, DonationTier } from '@/types/tree'

export const mockTrees: Tree[] = [
  {
    id: '1',
    name: 'Hope Oak',
    species: 'Iroko (Milicia excelsa)',
    plantedDate: '2024-01-15',
    plantedBy: 'Green Initiative Lagos',
    location: {
      lat: 6.5244,
      lng: 3.3792,
      state: 'Lagos',
      city: 'Victoria Island',
      address: 'Conservation Park, VI'
    },
    status: 'healthy',
    age: 1,
    height: 2.5,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    donorName: 'Adewale Johnson',
    donorMessage: 'For a greener Lagos',
    adoptionPrice: 5000,
    carbonOffset: 22,
    lastUpdated: '2024-08-01'
  },
  {
    id: '2',
    name: 'Unity Mahogany',
    species: 'African Mahogany (Khaya senegalensis)',
    plantedDate: '2024-02-20',
    plantedBy: 'Abuja Environmental Society',
    location: {
      lat: 9.0765,
      lng: 7.3986,
      state: 'FCT',
      city: 'Abuja',
      address: 'Millennium Park'
    },
    status: 'growing',
    age: 0.5,
    height: 1.8,
    donorName: 'Fatima Abubakar',
    donorMessage: 'Growing with Nigeria',
    adoptionPrice: 5000,
    carbonOffset: 18,
    lastUpdated: '2024-08-15'
  },
  {
    id: '3',
    name: 'River Neem',
    species: 'Neem (Azadirachta indica)',
    plantedDate: '2024-03-10',
    plantedBy: 'Port Harcourt Green Club',
    location: {
      lat: 4.8156,
      lng: 7.0498,
      state: 'Rivers',
      city: 'Port Harcourt',
      address: 'Isaac Boro Park'
    },
    status: 'healthy',
    age: 0.4,
    height: 1.5,
    donorName: 'Chinedu Okonkwo',
    adoptionPrice: 5000,
    carbonOffset: 15,
    lastUpdated: '2024-08-20'
  },
  {
    id: '4',
    name: 'Kano Acacia',
    species: 'Acacia (Acacia nilotica)',
    plantedDate: '2024-04-05',
    plantedBy: 'Northern Greens Initiative',
    location: {
      lat: 11.9962,
      lng: 8.5136,
      state: 'Kano',
      city: 'Kano',
      address: 'Zoo Road Garden'
    },
    status: 'growing',
    age: 0.3,
    height: 1.2,
    donorName: 'Musa Ibrahim',
    donorMessage: 'Fighting desertification',
    adoptionPrice: 5000,
    carbonOffset: 12,
    lastUpdated: '2024-08-25'
  },
  {
    id: '5',
    name: 'Calabar Palm',
    species: 'Oil Palm (Elaeis guineensis)',
    plantedDate: '2024-05-12',
    plantedBy: 'Cross River Conservation',
    location: {
      lat: 4.9515,
      lng: 8.3220,
      state: 'Cross River',
      city: 'Calabar',
      address: 'Marina Resort Area'
    },
    status: 'healthy',
    age: 0.2,
    height: 1.0,
    donorName: 'Effiong Bassey',
    adoptionPrice: 5000,
    carbonOffset: 10,
    lastUpdated: '2024-08-28'
  },
  {
    id: '6',
    name: 'Ibadan Teak',
    species: 'Teak (Tectona grandis)',
    plantedDate: '2024-06-01',
    plantedBy: 'Oyo State Forestry',
    location: {
      lat: 7.3775,
      lng: 3.9470,
      state: 'Oyo',
      city: 'Ibadan',
      address: 'Agodi Gardens'
    },
    status: 'planted',
    age: 0.1,
    height: 0.8,
    donorName: 'Adebayo Oladele',
    donorMessage: 'For future generations',
    adoptionPrice: 5000,
    carbonOffset: 8,
    lastUpdated: '2024-08-30'
  },
  {
    id: '7',
    name: 'Jos Pine',
    species: 'Pine (Pinus caribaea)',
    plantedDate: '2024-01-20',
    plantedBy: 'Plateau Environmental Group',
    location: {
      lat: 9.8965,
      lng: 8.8583,
      state: 'Plateau',
      city: 'Jos',
      address: 'Wildlife Park'
    },
    status: 'healthy',
    age: 0.6,
    height: 2.0,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    donorName: 'Sarah Danladi',
    adoptionPrice: 5000,
    carbonOffset: 20,
    lastUpdated: '2024-08-15'
  },
  {
    id: '8',
    name: 'Enugu Bamboo',
    species: 'Giant Bamboo (Dendrocalamus giganteus)',
    plantedDate: '2024-03-25',
    plantedBy: 'Coal City Greens',
    location: {
      lat: 6.4254,
      lng: 7.4941,
      state: 'Enugu',
      city: 'Enugu',
      address: 'Nike Lake Resort'
    },
    status: 'growing',
    age: 0.4,
    height: 3.5,
    donorName: 'Chioma Eze',
    donorMessage: 'Growing strong like bamboo',
    adoptionPrice: 5000,
    carbonOffset: 25,
    lastUpdated: '2024-08-20'
  }
]

export const treeStats: TreeStats = {
  totalTrees: 127543,
  totalStates: 28,
  totalCarbonOffset: 2805946,
  totalDonations: 45782000,
  topDonors: [
    { name: 'MTN Foundation', trees: 5000 },
    { name: 'Dangote Group', trees: 3500 },
    { name: 'Access Bank', trees: 2000 },
    { name: 'Shell Nigeria', trees: 1800 },
    { name: 'GT Bank', trees: 1500 }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'planted',
      message: 'New Iroko tree planted in Lagos by Green Initiative',
      timestamp: '2024-08-31T10:30:00Z'
    },
    {
      id: '2',
      type: 'donated',
      message: 'Anonymous donated ₦50,000 for 10 trees',
      timestamp: '2024-08-31T09:15:00Z'
    },
    {
      id: '3',
      type: 'adopted',
      message: 'Fatima Abubakar adopted a Mahogany tree in Abuja',
      timestamp: '2024-08-31T08:45:00Z'
    }
  ]
}

export const donationTiers: DonationTier[] = [
  {
    id: 'seedling',
    name: 'Seedling Sponsor',
    price: 5000,
    trees: 1,
    benefits: [
      'Plant 1 tree',
      'Digital certificate',
      'Tree location on map',
      'Quarterly updates'
    ]
  },
  {
    id: 'grove',
    name: 'Grove Guardian',
    price: 20000,
    trees: 5,
    benefits: [
      'Plant 5 trees',
      'Named grove on map',
      'Premium certificate',
      'Monthly updates',
      'Photo documentation'
    ],
    popular: true
  },
  {
    id: 'forest',
    name: 'Forest Founder',
    price: 50000,
    trees: 15,
    benefits: [
      'Plant 15 trees',
      'Custom forest naming',
      'VIP certificate',
      'Weekly updates',
      'Video documentation',
      'Annual impact report'
    ]
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem Champion',
    price: 100000,
    trees: 35,
    benefits: [
      'Plant 35 trees',
      'Legacy forest naming',
      'Platinum certificate',
      'Real-time updates',
      'Drone footage',
      'Personal forest tour',
      'Lifetime impact tracking'
    ]
  }
]