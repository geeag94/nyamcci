"use client";

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
  return (
    <div className="min-h-screen bg-[#F0F9FF] p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-[#1E293B]">
        날씨별 고양이 캐릭터 테스트
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {conditions.map(({ label, value }) => (
          <div
            key={value}
            className="flex flex-col items-center p-4 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <span className="text-sm font-medium text-[#64748B] mb-3">{label}</span>
            <CatCharacter condition={value} size={160} />
          </div>
        ))}
      </div>
    </div>
  );
}
