"use client";

import { WeatherCondition } from "@/src/types/weather";

interface CatCharacterProps {
  condition: WeatherCondition;
  size?: number;
}

export default function CatCharacter({ condition, size = 220 }: CatCharacterProps) {
  const s = size;

  // 날씨별 이미지 매핑
  const imageMap: Record<WeatherCondition, string> = {
    sunny: "/cat-sunny.png",
    cloudy: "/cat-cloudy.png",
    overcast: "/cat-overcast.png",
    rain: "/cat-rain.png",
    snow: "/cat-snow.png",
    shower: "/cat-shower.png",
    thunder: "/cat-thunder.png",
  };

  const imageUrl = `${imageMap[condition]}?v=3`;

  return (
    <div className="flex items-center justify-center">
      <img
        src={imageUrl}
        alt={`날씨: ${condition}`}
        width={s}
        height={s}
        className="object-contain"
        style={{ maxHeight: `${s}px`, width: 'auto' }}
      />
    </div>
  );
}
