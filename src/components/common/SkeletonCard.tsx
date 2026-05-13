"use client";

import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl bg-[var(--color-card)] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-6 rounded-full bg-[#E2E8F0] animate-pulse" />
        
        {/* 고양이 스켈레톤 */}
        <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-30">
          <circle cx="90" cy="90" r="55" fill="#E2E8F0" />
          <path d="M40 60 L25 25 L60 50 Z" fill="#E2E8F0" />
          <path d="M140 60 L155 25 L120 50 Z" fill="#E2E8F0" />
          <circle cx="70" cy="80" r="6" fill="#CBD5E1" />
          <circle cx="110" cy="80" r="6" fill="#CBD5E1" />
          <path d="M80 105 Q90 115 100 105" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
        
        <div className="w-20 h-12 rounded-lg bg-[#E2E8F0] animate-pulse" />
        <div className="w-32 h-6 rounded-full bg-[#E2E8F0] animate-pulse" />
        <div className="grid grid-cols-3 gap-4 w-full mt-4 pt-4 border-t border-[#F0F9FF]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-4 rounded bg-[#E2E8F0] animate-pulse" />
              <div className="w-16 h-6 rounded bg-[#E2E8F0] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonForecast() {
  return (
    <div className="rounded-3xl bg-[var(--color-card)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="w-24 h-6 rounded bg-[#E2E8F0] animate-pulse mb-4" />
      <div className="flex gap-3 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 min-w-[60px] py-3 px-2 rounded-2xl bg-[#F0F9FF]"
          >
            <div className="w-10 h-3 rounded bg-[#E2E8F0] animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-[#E2E8F0] animate-pulse" />
            <div className="w-8 h-5 rounded bg-[#E2E8F0] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonDaily() {
  return (
    <div className="rounded-3xl bg-[var(--color-card)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="w-24 h-6 rounded bg-[#E2E8F0] animate-pulse mb-4" />
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 px-4 rounded-2xl bg-[#F0F9FF]"
          >
            <div className="w-16 h-4 rounded bg-[#E2E8F0] animate-pulse" />
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] animate-pulse" />
            </div>
            <div className="w-16 h-4 rounded bg-[#E2E8F0] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
