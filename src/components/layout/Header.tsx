"use client";

import { Search, MapPin } from "lucide-react";
import ThemeToggle from "@/src/components/common/ThemeToggle";
import { useLocationStore } from "@/src/stores/locationStore";
import Link from "next/link";

export default function Header() {
  const { currentLocation } = useLocationStore();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-foreground dark:text-white">
            {currentLocation?.name || "위치 선택"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/search"
            className="p-2 rounded-full bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
          >
            <Search className="w-5 h-5 text-text-muted" />
          </Link>
        </div>
      </div>
    </header>
  );
}
