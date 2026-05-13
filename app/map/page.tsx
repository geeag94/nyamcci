"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "@/src/components/layout/MainLayout";

const WeatherMap = dynamic(() => import("@/src/components/map/WeatherMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] rounded-3xl bg-white animate-pulse" />
  ),
});

export default function MapPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MainLayout>
        <div className="h-[60vh] rounded-3xl bg-white animate-pulse" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <WeatherMap />
    </MainLayout>
  );
}
