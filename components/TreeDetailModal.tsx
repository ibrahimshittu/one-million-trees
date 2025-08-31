'use client'

import { Tree } from '@/types/tree'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, 
  Calendar, 
  Ruler, 
  TreePine, 
  User, 
  Heart,
  Share2,
  Download,
  Droplets,
  Wind,
  Sun
} from 'lucide-react'
import Image from 'next/image'

interface TreeDetailModalProps {
  tree: Tree | null
  isOpen: boolean
  onClose: () => void
}

export default function TreeDetailModal({ tree, isOpen, onClose }: TreeDetailModalProps) {
  if (!tree) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200'
      case 'growing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'planted': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-orange-100 text-orange-800 border-orange-200'
    }
  }

  const handleAdopt = () => {
    console.log('Adopting tree:', tree.id)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tree.name} - One Million Trees Nigeria`,
        text: `Check out this ${tree.species} tree planted in ${tree.location.city}, ${tree.location.state}!`,
        url: window.location.href
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">{tree.name}</DialogTitle>
              <p className="text-muted-foreground">{tree.species}</p>
            </div>
            <Badge className={`${getStatusColor(tree.status)} px-3 py-1`}>
              {tree.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {tree.image && (
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <Image
                  src={tree.image}
                  alt={tree.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Tree Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TreePine className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Species</p>
                      <p className="font-medium">{tree.species}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">{tree.height} meters</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{tree.age} year{tree.age !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Location Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{tree.location.address || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">{tree.location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="font-medium">{tree.location.state}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {tree.donorName && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    Sponsored By
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">{tree.donorName}</p>
                  {tree.donorMessage && (
                    <p className="text-muted-foreground mt-2 italic">"{tree.donorMessage}"</p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="impact" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <Wind className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Carbon Offset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{tree.carbonOffset} kg</p>
                  <p className="text-sm text-muted-foreground">CO₂ absorbed per year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Droplets className="w-8 h-8 text-cyan-500 mb-2" />
                  <CardTitle className="text-lg">Water Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">~2,000 L</p>
                  <p className="text-sm text-muted-foreground">Water retained annually</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Sun className="w-8 h-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-lg">Oxygen Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">~118 kg</p>
                  <p className="text-sm text-muted-foreground">Oxygen produced per year</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Benefits</CardTitle>
                <CardDescription>
                  This tree contributes to multiple environmental improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Helps prevent soil erosion and improves soil quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Provides habitat for local wildlife and biodiversity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Reduces local temperature through shade and transpiration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Filters air pollutants and improves air quality</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tree Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-16 bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Planted</p>
                      <p className="text-sm text-muted-foreground">{tree.plantedDate}</p>
                      <p className="text-sm mt-1">Planted by {tree.plantedBy}</p>
                    </div>
                  </div>
                  
                  {tree.donorName && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-0.5 h-16 bg-gray-200"></div>
                      </div>
                      <div>
                        <p className="font-semibold">Adopted</p>
                        <p className="text-sm text-muted-foreground">Sponsored by {tree.donorName}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Last Updated</p>
                      <p className="text-sm text-muted-foreground">{tree.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          {!tree.donorName && (
            <Button onClick={handleAdopt} className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Adopt This Tree (₦{tree.adoptionPrice.toLocaleString()})
            </Button>
          )}
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Certificate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}