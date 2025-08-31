'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mockTrees } from '@/data/mockTrees'
import { Tree } from '@/types/tree'
import TreeDetailModal from './TreeDetailModal'
import { Card } from '@/components/ui/card'
import { TreePine, MapPin, Activity } from 'lucide-react'

const TreeMap = () => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Center map on Nigeria with appropriate zoom
    const map = L.map(mapContainerRef.current, {
      center: [9.0820, 8.6753],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      maxBounds: [
        [4.0, 2.5],  // Southwest Nigeria
        [14.0, 15.0] // Northeast Nigeria
      ]
    })
    mapRef.current = map

    // Use a better tile layer with more detail
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    // Add Nigeria GeoJSON boundary (simplified) with proper typing
    const nigeriaBounds: GeoJSON.Feature<GeoJSON.Polygon> = {
      type: "Feature" as const,
      properties: { name: "Nigeria" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [2.668, 4.273], [3.3, 4.5], [4.0, 5.3], [4.5, 6.0],
          [5.0, 6.5], [6.0, 6.8], [7.0, 7.3], [8.0, 8.5],
          [9.0, 9.2], [10.0, 10.5], [11.0, 11.8], [12.0, 13.0],
          [13.0, 13.5], [14.0, 13.4], [14.5, 12.8], [14.2, 11.5],
          [13.5, 10.8], [13.3, 10.0], [12.8, 9.0], [12.0, 8.0],
          [11.0, 7.0], [10.0, 6.5], [9.0, 6.0], [8.0, 5.5],
          [7.0, 5.0], [6.0, 4.8], [5.0, 4.5], [4.0, 4.3],
          [3.0, 4.2], [2.668, 4.273]
        ]]
      }
    }

    // Add Nigeria boundary with green fill
    L.geoJSON(nigeriaBounds, {
      style: {
        color: '#16a34a',
        weight: 3,
        opacity: 0.8,
        fillColor: '#f0fdf4',
        fillOpacity: 1
      }
    }).addTo(map)
    
    // Create a mask to hide everything outside Nigeria
    const worldBounds: GeoJSON.Feature<GeoJSON.Polygon> = {
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          // Outer ring - world bounds
          [
            [-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]
          ],
          // Inner ring - Nigeria bounds (reversed for hole)
          [
            [2.668, 4.273], [3.0, 4.2], [4.0, 4.3], [5.0, 4.5],
            [6.0, 4.8], [7.0, 5.0], [8.0, 5.5], [9.0, 6.0],
            [10.0, 6.5], [11.0, 7.0], [12.0, 8.0], [12.8, 9.0],
            [13.3, 10.0], [13.5, 10.8], [14.2, 11.5], [14.5, 12.8],
            [14.0, 13.4], [13.0, 13.5], [12.0, 13.0], [11.0, 11.8],
            [10.0, 10.5], [9.0, 9.2], [8.0, 8.5], [7.0, 7.3],
            [6.0, 6.8], [5.0, 6.5], [4.5, 6.0], [4.0, 5.3],
            [3.3, 4.5], [2.668, 4.273]
          ]
        ]
      }
    }
    
    // Add the mask to hide areas outside Nigeria
    L.geoJSON(worldBounds, {
      style: {
        color: 'transparent',
        fillColor: '#ffffff',
        fillOpacity: 0.95,
        weight: 0
      }
    }).addTo(map)

    // Custom tree icon with better design
    const createTreeIcon = (status: string) => {
      const colors = {
        healthy: '#16a34a',
        growing: '#3b82f6',
        planted: '#eab308',
        'needs-attention': '#f97316'
      }
      
      return L.divIcon({
        html: `
          <div class="tree-marker-wrapper">
            <div class="tree-marker-pulse" style="background-color: ${colors[status as keyof typeof colors] || colors.healthy}"></div>
            <div class="tree-marker" style="background-color: ${colors[status as keyof typeof colors] || colors.healthy}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L8 7h3v4h2V7h3L12 2zm0 6l-4 5h3v7h2v-7h3l-4-5z"/>
              </svg>
            </div>
          </div>
        `,
        className: 'custom-tree-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      })
    }

    // Add tree markers
    mockTrees.forEach(tree => {
      const marker = L.marker(
        [tree.location.lat, tree.location.lng], 
        { icon: createTreeIcon(tree.status) }
      ).addTo(map)

      marker.on('click', () => {
        setSelectedTree(tree)
        setIsModalOpen(true)
      })

      // Enhanced popup
      const popupContent = `
        <div class="tree-popup">
          <div class="tree-popup-header">
            <h3 class="tree-popup-title">${tree.name}</h3>
            <span class="tree-popup-badge tree-popup-badge-${tree.status}">${tree.status}</span>
          </div>
          <p class="tree-popup-species">${tree.species}</p>
          <div class="tree-popup-info">
            <div class="tree-popup-info-item">
              <span class="tree-popup-label">Location:</span>
              <span>${tree.location.city}, ${tree.location.state}</span>
            </div>
            <div class="tree-popup-info-item">
              <span class="tree-popup-label">Carbon Offset:</span>
              <span>${tree.carbonOffset} kg/year</span>
            </div>
            ${tree.donorName ? `
              <div class="tree-popup-info-item">
                <span class="tree-popup-label">Sponsored by:</span>
                <span>${tree.donorName}</span>
              </div>
            ` : ''}
          </div>
          <button class="tree-popup-button" onclick="window.viewTreeDetails('${tree.id}')">
            View Details
          </button>
        </div>
      `

      marker.bindPopup(popupContent, {
        className: 'custom-tree-popup',
        maxWidth: 280,
        minWidth: 250
      })
    })

    // Nigerian states with tree density
    const nigerianStates = [
      { name: 'Lagos', coords: [6.5244, 3.3792], trees: 15420 },
      { name: 'Abuja (FCT)', coords: [9.0765, 7.3986], trees: 12350 },
      { name: 'Kano', coords: [11.9962, 8.5136], trees: 8920 },
      { name: 'Rivers', coords: [4.8156, 7.0498], trees: 11200 },
      { name: 'Oyo', coords: [7.3775, 3.9470], trees: 9850 },
      { name: 'Kaduna', coords: [10.5264, 7.4388], trees: 7630 },
      { name: 'Cross River', coords: [5.8702, 8.5988], trees: 14200 },
      { name: 'Plateau', coords: [9.8965, 8.8583], trees: 6540 },
      { name: 'Enugu', coords: [6.4254, 7.4941], trees: 5320 },
      { name: 'Delta', coords: [5.8904, 5.6804], trees: 8760 },
      { name: 'Borno', coords: [11.8333, 13.1500], trees: 4230 },
      { name: 'Sokoto', coords: [13.0059, 5.2476], trees: 3890 }
    ]

    // Add state circles with better visualization
    nigerianStates.forEach(state => {
      const radius = Math.sqrt(state.trees) * 800
      
      const circle = L.circle(state.coords as [number, number], {
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.15,
        radius: radius,
        weight: 1.5
      }).addTo(map)

      circle.bindTooltip(`
        <div style="text-align: center; font-weight: 600;">
          ${state.name}<br/>
          <span style="color: #16a34a; font-size: 18px;">${state.trees.toLocaleString()}</span><br/>
          <span style="font-size: 12px; color: #6b7280;">trees planted</span>
        </div>
      `, {
        permanent: false,
        direction: 'top',
        className: 'state-tooltip'
      })
    })

    // Make view details function available globally
    if (typeof window !== 'undefined') {
      (window as any).viewTreeDetails = (id: string) => {
        const tree = mockTrees.find(t => t.id === id)
        if (tree) {
          setSelectedTree(tree)
          setIsModalOpen(true)
        }
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <>
      <section id="map" className="relative h-screen bg-gray-50">
        {/* Map Controls and Info Cards */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 p-5 max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nigeria Tree Map</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Explore our reforestation efforts across Nigeria. Click on markers for details.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Growing</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Planted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Needs Care</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="pointer-events-auto flex gap-3">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{mockTrees.length}</p>
                  <p className="text-sm text-gray-600">Trees Tracked</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Active States</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div ref={mapContainerRef} className="w-full h-full" />
      </section>

      <TreeDetailModal 
        tree={selectedTree} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx global>{`
        .custom-tree-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .tree-marker-wrapper {
          position: relative;
          width: 30px;
          height: 30px;
        }
        
        .tree-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg) translate(-50%, -50%);
          transform-origin: 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .tree-marker svg {
          transform: rotate(45deg);
        }
        
        .tree-marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse-tree 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-tree {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        .custom-tree-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        
        .custom-tree-popup .leaflet-popup-content {
          margin: 0;
          width: 100% !important;
        }
        
        .tree-popup {
          padding: 16px;
        }
        
        .tree-popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .tree-popup-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        
        .tree-popup-badge {
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .tree-popup-badge-healthy {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .tree-popup-badge-growing {
          background: #dbeafe;
          color: #2563eb;
        }
        
        .tree-popup-badge-planted {
          background: #fef3c7;
          color: #d97706;
        }
        
        .tree-popup-species {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 12px 0;
          font-style: italic;
        }
        
        .tree-popup-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .tree-popup-info-item {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
        
        .tree-popup-label {
          color: #6b7280;
          font-weight: 500;
        }
        
        .tree-popup-button {
          width: 100%;
          padding: 8px 16px;
          background: linear-gradient(to right, #16a34a, #15803d);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .tree-popup-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .state-tooltip {
          background: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 8px 12px;
        }
      `}</style>
    </>
  )
}

export default TreeMap