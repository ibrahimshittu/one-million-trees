'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, TreePine, Users, Globe, Leaf } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const [treeCount, setTreeCount] = useState(127400)

  useEffect(() => {
    const interval = setInterval(() => {
      setTreeCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50/30">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-transparent"></div>
      </div>
      
      <div className="absolute top-20 left-10 animate-pulse">
        <TreePine className="w-16 h-16 text-green-200" />
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse delay-300">
        <Leaf className="w-20 h-20 text-green-200" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse delay-700">
        <TreePine className="w-12 h-12 text-green-300" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
          >
            <Leaf className="w-4 h-4" />
            Join Nigeria's Largest Reforestation Movement
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Plant <span className="text-primary bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">One Million Trees</span>
            <br />Across Nigeria
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Every tree planted helps combat climate change, prevents erosion, and creates a sustainable future for generations to come.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="#donate">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#map">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-green-600 text-green-700 hover:bg-green-50">
                Explore Tree Map
                <Globe className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-green-100">
              <TreePine className="w-10 h-10 text-green-600 mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{treeCount.toLocaleString()}</h3>
              <p className="text-gray-600">Trees Planted</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-green-100">
              <Globe className="w-10 h-10 text-green-600 mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">28</h3>
              <p className="text-gray-600">States Covered</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-green-100">
              <Users className="w-10 h-10 text-green-600 mb-3 mx-auto" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">45.7k+</h3>
              <p className="text-gray-600">Active Donors</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}