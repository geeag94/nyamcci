"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CatCharacter from "@/src/components/common/CatCharacter";
import { WeatherCondition } from "@/src/types/weather";

function TestContent() {
  const searchParams = useSearchParams();
  const weather = searchParams.get("weather") || "1";

  const weatherMap: Record<string, WeatherCondition> = {
    "1": "sunny",
    "2": "cloudy",
    "3": "overcast",
    "4": "rain",
    "5": "shower",
    "6": "snow",
    "7": "thunder",
  };

  const condition = weatherMap[weather] || "sunny";
  const labelMap: Record<WeatherCondition, string> = {
    sunny: "맑음 (Sunny)",
    cloudy: "구름많음 (Cloudy)",
    overcast: "흐림 (Overcast)",
    rain: "비 (Rain)",
    shower: "소나기 (Shower)",
    snow: "눈 (Snow)",
    thunder: "번개 (Thunder)",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="bg-card rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center">
        <h1 className="text-2xl font-bold text-foreground dark:text-white mb-2">
          날씨별 고양이 테스트
        </h1>
        <p className="text-text-muted dark:text-gray-300 mb-6">
          {labelMap[condition]}
        </p>

        <CatCharacter condition={condition} size={280} />

        <div className="mt-8 grid grid-cols-4 gap-3 max-w-md mx-auto">
          {Object.entries(weatherMap).map(([key, value]) => (
            <a
              key={key}
              href={`/test?weather=${key}`}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                condition === value
                  ? "bg-primary text-white"
                  : "bg-background text-text-muted hover:bg-primary/10"
              }`}
            >
              {key}
            </a>
          ))}
        </div>

        <div className="mt-4 text-xs text-text-muted dark:text-gray-400">
          URL 직접 입력: /test?weather=1~7
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-foreground dark:text-white">로딩중...</div>}>
      <TestContent />
    </Suspense>
  );
}
