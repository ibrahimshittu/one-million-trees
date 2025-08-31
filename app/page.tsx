"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import DonationSection from "@/components/DonationSection";
import StatsSection from "@/components/StatsSection";
import ImpactNews from "@/components/ImpactNews";
import Footer from "@/components/Footer";

const TreeMap = dynamic(() => import("@/components/TreeMap"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_20%_15%,#dcfce7_0%,transparent_55%),radial-gradient(circle_at_80%_85%,#bbf7d0_0%,transparent_60%)]">
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <StatsSection />
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/40 to-transparent pointer-events-none" />
        <TreeMap />
      </div>
  <ImpactNews />
      <DonationSection />
      <Footer />
    </main>
  );
}
