"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { treeStats } from "@/data/mockTrees";
import { TreePine, TrendingUp, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { formatTime } from "@/lib/utils";

export default function StatsSection() {
  const [animatedStats, setAnimatedStats] = useState({
    trees: 0,
    carbon: 0,
    donations: 0,
    states: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        trees: Math.floor(treeStats.totalTrees * progress),
        carbon: Math.floor(treeStats.totalCarbonOffset * progress),
        donations: Math.floor(treeStats.totalDonations * progress),
        states: Math.floor(treeStats.totalStates * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            Our Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Growing Nigeria&apos;s Green Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we&apos;re making a measurable difference in combating
            climate change and restoring Nigeria&apos;s forests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TreePine className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-gray-600">
                  Trees Planted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">
                  {animatedStats.trees.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">and counting...</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Activity className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-gray-600">
                  CO₂ Offset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">
                  {(animatedStats.carbon / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-gray-500 mt-2">kg per year</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-gray-600">
                  Total Raised
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">
                  ₦{(animatedStats.donations / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-gray-500 mt-2">in donations</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-gray-600">
                  States Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">
                  {animatedStats.states}
                </p>
                <p className="text-sm text-gray-500 mt-2">out of 36 states</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treeStats.topDonors.map((donor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                        ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            : index === 1
                            ? "bg-gradient-to-r from-gray-400 to-gray-500"
                            : index === 2
                            ? "bg-gradient-to-r from-orange-600 to-orange-700"
                            : "bg-gradient-to-r from-green-500 to-green-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{donor.name}</p>
                        <p className="text-sm text-gray-500">
                          {donor.trees.toLocaleString()} trees
                        </p>
                      </div>
                    </div>
                    {index < 3 && (
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0
                          ? "Champion"
                          : index === 1
                          ? "Leader"
                          : "Partner"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treeStats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0
                      ${
                        activity.type === "planted"
                          ? "bg-green-500"
                          : activity.type === "donated"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    />
                    <div className="flex-grow">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {mounted ? formatTime(activity.timestamp) : "Recently"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
