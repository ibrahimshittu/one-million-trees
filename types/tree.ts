export interface Tree {
  id: string
  name: string
  species: string
  plantedDate: string
  plantedBy: string
  location: {
    lat: number
    lng: number
    state: string
    city: string
    address?: string
  }
  status: 'healthy' | 'growing' | 'needs-attention' | 'planted'
  age: number
  height: number
  image?: string
  donorName?: string
  donorMessage?: string
  adoptionPrice: number
  carbonOffset: number
  lastUpdated: string
}

export interface TreeStats {
  totalTrees: number
  totalStates: number
  totalCarbonOffset: number
  totalDonations: number
  topDonors: Array<{
    name: string
    trees: number
    avatar?: string
  }>
  recentActivity: Array<{
    id: string
    type: 'planted' | 'donated' | 'adopted'
    message: string
    timestamp: string
  }>
}

export interface DonationTier {
  id: string
  name: string
  price: number
  trees: number
  benefits: string[]
  popular?: boolean
}