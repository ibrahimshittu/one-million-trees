"use client";

import { Tree } from "@/types/tree";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Ruler,
  TreePine,
  Heart,
  Share2,
  Download,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";
import Image from "next/image";

interface TreeDetailModalProps {
  tree: Tree | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TreeDetailModal({
  tree,
  isOpen,
  onClose,
}: TreeDetailModalProps) {
  if (!tree) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "growing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const handleAdopt = () => {
    console.log("Adopting tree:", tree.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tree.name} - One Million Trees Nigeria`,
        text: `Check out this ${tree.species} tree planted in ${tree.location.city}, ${tree.location.state}!`,
        url: window.location.href,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold mb-1">
                {tree.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{tree.species}</p>
            </div>
            <Badge
              className={`${getStatusColor(tree.status)} px-2 py-1 text-xs`}
            >
              {tree.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="impact" className="text-xs">
              Environmental Impact
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {tree.image && (
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={tree.image}
                  alt={tree.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardHeader className="pb-2 px-0 pt-0">
                  <CardTitle className="text-base">Tree Information</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Species</p>
                      <p className="text-sm font-medium">{tree.species}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="text-sm font-medium">
                        {tree.height} meters
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p className="text-sm font-medium">
                        {tree.age} year{tree.age !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="pb-2 px-0 pt-0">
                  <CardTitle className="text-base">Location Details</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm font-medium">
                        {tree.location.address || "Isaac Boro Park"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">City</p>
                      <p className="text-sm font-medium">
                        {tree.location.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">State</p>
                      <p className="text-sm font-medium">
                        {tree.location.state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {tree.donorName && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border rounded-xl border-green-200 p-4">
                <div className="pb-4 px-0 pt-0">
                  <div className="text-base flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    Sponsored By
                  </div>
                </div>
                <div className="p-0">
                  <p className="font-semibold text-base">{tree.donorName}</p>
                  {tree.donorMessage && (
                    <p className="text-sm text-muted-foreground mt-1 italic">
                      &quot;{tree.donorMessage}&quot;
                    </p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="impact" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card className="p-3">
                <CardHeader className="pb-2 px-0 pt-0">
                  <Wind className="w-6 h-6 text-blue-500 mb-1" />
                  <CardTitle className="text-sm">Carbon Offset</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xl font-bold">{tree.carbonOffset} kg</p>
                  <p className="text-xs text-muted-foreground">
                    CO₂ absorbed per year
                  </p>
                </CardContent>
              </Card>

              <Card className="p-3">
                <CardHeader className="pb-2 px-0 pt-0">
                  <Droplets className="w-6 h-6 text-cyan-500 mb-1" />
                  <CardTitle className="text-sm">Water Retention</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xl font-bold">~2,000 L</p>
                  <p className="text-xs text-muted-foreground">
                    Water retained annually
                  </p>
                </CardContent>
              </Card>

              <Card className="p-3">
                <CardHeader className="pb-2 px-0 pt-0">
                  <Sun className="w-6 h-6 text-yellow-500 mb-1" />
                  <CardTitle className="text-sm">Oxygen Production</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xl font-bold">~118 kg</p>
                  <p className="text-xs text-muted-foreground">
                    Oxygen produced per year
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="p-4">
              <CardHeader className="pb-2 px-0 pt-0">
                <CardTitle className="text-base">
                  Environmental Benefits
                </CardTitle>
                <CardDescription className="text-sm">
                  This tree contributes to multiple environmental improvements
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 text-sm">✓</span>
                    <span className="text-sm">
                      Helps prevent soil erosion and improves soil quality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 text-sm">✓</span>
                    <span className="text-sm">
                      Provides habitat for local wildlife and biodiversity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 text-sm">✓</span>
                    <span className="text-sm">
                      Reduces local temperature through shade and transpiration
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4 space-y-4">
            <Card className="p-4">
              <CardHeader className="pb-2 px-0 pt-0">
                <CardTitle className="text-base">Tree Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Planted</p>
                      <p className="text-xs text-muted-foreground">
                        {tree.plantedDate}
                      </p>
                      <p className="text-xs mt-0.5">
                        Planted by {tree.plantedBy}
                      </p>
                    </div>
                  </div>

                  {tree.donorName && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-0.5 h-12 bg-gray-200"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Adopted</p>
                        <p className="text-xs text-muted-foreground">
                          Sponsored by {tree.donorName}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Last Updated</p>
                      <p className="text-xs text-muted-foreground">
                        {tree.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          {!tree.donorName && (
            <Button onClick={handleAdopt} className="flex-1 text-sm">
              <Heart className="w-3 h-3 mr-2" />
              Adopt (₦{tree.adoptionPrice.toLocaleString()})
            </Button>
          )}
          <Button variant="outline" onClick={handleShare} className="text-sm">
            <Share2 className="w-3 h-3 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="text-sm">
            <Download className="w-3 h-3 mr-2" />
            Certificate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
