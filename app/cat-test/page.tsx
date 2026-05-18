"use client";

import { useState } from "react";
import CatCharacter from "@/src/components/common/CatCharacter";
import { WeatherCondition } from "@/src/types/weather";

const conditions: { label: string; value: WeatherCondition }[] = [
  { label: "맑음 (Sunny)", value: "sunny" },
  { label: "구름많음 (Cloudy)", value: "cloudy" },
  { label: "흐림 (Overcast)", value: "overcast" },
  { label: "비 (Rain)", value: "rain" },
  { label: "눈 (Snow)", value: "snow" },
  { label: "소나기 (Shower)", value: "shower" },
  { label: "번개 (Thunder)", value: "thunder" },
];

export default function CatTestPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-foreground dark:text-white">
          날씨별 고양이 캐릭터 테스트
        </h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          이미지 새로고침
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {conditions.map(({ label, value }) => (
          <div
            key={`${value}-${refreshKey}`}
            className="flex flex-col items-center p-4 bg-card rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <span className="text-sm font-medium text-text-muted dark:text-gray-400 mb-3">{label}</span>
            <CatCharacter condition={value} size={160} />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-text-muted dark:text-gray-400 mt-6">
        이미지가 이상하게 보이면 &quot;이미지 새로고침&quot; 버튼을 눌러주세요
      </p>
    </div>
  );
}
