"use client";

import { useEffect, useRef, useState } from "react";
import { treeStats, mockTrees } from "@/data/mockTrees";
import { TreePine, TrendingUp, Users, Leaf, Target } from "lucide-react";
import StatItem from "@/components/StatItem";
import { motion, useInView } from "framer-motion";
import { formatTime } from "@/lib/utils";

// Lightweight count-up hook using rAF (avoids fixed intervals, respects visibility)
function useCountUp(
  target: number,
  duration = 1600,
  start = 0,
  startCounting = true
) {
  const [value, setValue] = useState(start);
  const frame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) return;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const loop = (ts: number) => {
      if (startTime.current == null) startTime.current = ts;
      const progress = Math.min(1, (ts - startTime.current) / duration);
      const eased = easeOutCubic(progress);
      setValue(Math.floor(start + (target - start) * eased));
      if (progress < 1) frame.current = requestAnimationFrame(loop);
    };
    frame.current = requestAnimationFrame(loop);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, start, startCounting]);
  return value;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Derived metrics distinct from hero section
  const uniqueSpecies = Array.from(
    new Set(mockTrees.map((t) => t.species))
  ).length;
  const healthyCount = mockTrees.filter((t) => t.status === "healthy").length;
  const healthyPercent = Math.round((healthyCount / mockTrees.length) * 100);

  const donations = useCountUp(treeStats.totalDonations, 1600, 0, inView);
  const states = useCountUp(treeStats.totalStates, 1600, 0, inView);
  const species = useCountUp(uniqueSpecies, 1400, 0, inView);
  const health = useCountUp(healthyPercent, 1400, 0, inView);

  return (
    <section className="py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium ring-1 ring-green-200/50 mb-6">
            <Target className="w-4 h-4" />
            Environmental Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Growing Nigeria&apos;s Green Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we&apos;re making a measurable difference in combating
            climate change and restoring Nigeria&apos;s forests.
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-0">
            <StatItem
              icon={<TrendingUp className="w-7 h-7 text-orange-600" />}
              value={`₦${(donations / 1_000_000).toFixed(1)}M`}
              label="Total Raised"
              subLabel="Fueling reforestation"
            />
            <StatItem
              icon={<Users className="w-7 h-7 text-purple-600" />}
              value={states.toString()}
              label="States Covered"
              subLabel="Nationwide reach"
            />
            <StatItem
              icon={<TreePine className="w-7 h-7 text-green-600" />}
              value={species.toString()}
              label="Species Diversity"
              subLabel="Unique native species"
            />
            <StatItem
              icon={<Leaf className="w-7 h-7 text-blue-600" />}
              value={`${health}%`}
              label="Healthy Trees"
              subLabel="Current vitality"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
              <span className="relative inline-flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              Top Contributors
            </h3>
            <ul className="space-y-5">
              {treeStats.topDonors.map((donor, index) => (
                <li key={donor.name} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm
                    ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-500"
                        : index === 2
                        ? "bg-orange-600"
                        : "bg-emerald-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 leading-tight">
                      {donor.name}
                    </p>
                    <p className="text-xs text-gray-500 tracking-wide uppercase">
                      {donor.trees.toLocaleString()} Trees
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Recent Activity
            </h3>
            <ul className="space-y-5">
              {treeStats.recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3">
                  <span
                    className={`mt-2 inline-block w-2 h-2 rounded-full
                    ${
                      activity.type === "planted"
                        ? "bg-green-500"
                        : activity.type === "donated"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {mounted ? formatTime(activity.timestamp) : "Recently"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Metric component removed in favor of shared StatItem
