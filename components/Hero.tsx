"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TreePine, Users, Globe, Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  // Fixed numbers (no continuous random updates) for a calmer, trustworthy presentation
  const treeCount = 127400;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f6fef9]">
      {/* Enhanced layered green background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,#dcfce7_0%,rgba(220,252,231,0)_55%),radial-gradient(circle_at_82%_70%,#bbf7d0_0%,rgba(187,247,208,0)_60%),radial-gradient(circle_at_60%_20%,#d9f99d_0%,rgba(217,249,157,0)_55%),linear-gradient(to_bottom,#ffffff,#f0fdf4)]" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.07),transparent_70%)] mix-blend-multiply" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#059669_1px,transparent_1px),linear-gradient(to_bottom,#059669_1px,transparent_1px)] bg-[size:160px_160px]" />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'.8\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'160\\' height=\\'160\\' filter=\\'url(%23n)\\' opacity=\\'.35'/></svg>')",
            backgroundSize: "320px 320px",
          }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur text-green-700 rounded-full text-xs uppercase tracking-wide font-semibold shadow ring-1 ring-green-200 mb-6"
          >
            <Leaf className="w-4 h-4" /> Nigeria Reforestation Initiative
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Plant{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              One Million Trees
            </span>
            <br />
            Across Nigeria
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Every tree combats climate change, restores biodiversity and builds
            a sustainable future for communities nationwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
            <Link href="#donate" className="inline-flex">
              <Button className="py-6 px-6 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700">
                Donate Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#map" className="inline-flex">
              <Button
                variant="outline"
                className="py-6 px-6 text-lg font-semibold rounded-xl border-green-600 text-green-700 hover:bg-green-50"
              >
                Explore Tree Map <Globe className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Inline stats similar to reference (icon disc + value + label with separators) */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:items-start justify-center md:divide-x md:divide-gray-200/60">
              <StatItem
                icon={<TreePine className="w-7 h-7 text-green-600" />}
                value={treeCount.toLocaleString()}
                label="Trees Planted"
                subLabel="Toward 1,000,000 Goal"
              />
              <StatItem
                icon={<Users className="w-7 h-7 text-green-600" />}
                value="45,725+"
                label="Active Donors"
                subLabel="Community Supporters"
              />
              <StatItem
                icon={<Leaf className="w-7 h-7 text-green-600" />}
                value={`${Math.floor(
                  (treeCount * 22) / 1000
                ).toLocaleString()} t/yr`}
                label="CO₂ Offset"
                subLabel="Estimated Annually"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subLabel?: string;
}

const StatItem = ({ icon, value, label, subLabel }: StatItemProps) => (
  <div className="flex-1 flex flex-col items-center text-center px-8 py-8 relative">
    <div className="mb-6">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm ring-1 ring-gray-200 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3 tabular-nums">
      {value}
    </div>
    <div className="text-sm md:text-base font-medium text-gray-800 mb-0.5">
      {label}
    </div>
    {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
  </div>
);
