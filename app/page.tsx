'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import DonationSection from '@/components/DonationSection'
import StatsSection from '@/components/StatsSection'

const TreeMap = dynamic(() => import('@/components/TreeMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsSection />
      <TreeMap />
      <DonationSection />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">One Million Trees</h3>
              <p className="text-gray-400">
                Restoring Nigeria's forests, one tree at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#donate" className="hover:text-green-400 transition-colors">Donate</a></li>
                <li><a href="#map" className="hover:text-green-400 transition-colors">Tree Map</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Impact Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Climate Action</li>
                <li>Biodiversity</li>
                <li>Soil Conservation</li>
                <li>Community Development</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Join our mission to plant one million trees across Nigeria.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 One Million Trees Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}