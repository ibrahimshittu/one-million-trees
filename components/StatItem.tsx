"use client";

import React from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  subLabel?: string;
  className?: string;
}

export default function StatItem({
  icon,
  value,
  label,
  subLabel,
  className = "",
}: StatItemProps) {
  return (
    <div
      className={`flex-1 flex flex-col items-center text-center px-6 py-4 relative md:after:absolute md:after:right-0 md:after:bottom-0 md:after:h-28 md:after:w-px md:after:bg-gray-200/70 md:last:after:hidden ${className}`}
    >
      <div className="mb-4">
        <div className="w-16 h-16 rounded-full bg-white ring-1 ring-gray-200 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold tracking-tight text-gray-900 mb-2 tabular-nums">
        {value}
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      {subLabel && <div className="text-sm text-gray-500">{subLabel}</div>}
    </div>
  );
}
