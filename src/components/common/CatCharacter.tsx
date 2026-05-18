"use client";

import { motion } from "framer-motion";
import { WeatherCondition } from "@/src/types/weather";

interface CatCharacterProps {
  condition: WeatherCondition;
  size?: number;
}

export default function CatCharacter({ condition, size = 220 }: CatCharacterProps) {
  const s = size;
  const vb = 400;

  const imageMap: Record<WeatherCondition, string> = {
    sunny: "/cat-sunny.png",
    cloudy: "/cat-cloudy.png",
    overcast: "/cat-overcast.png",
    rain: "/cat-rain.png",
    snow: "/cat-snow.png",
    shower: "/cat-shower.png",
    thunder: "/cat-thunder.png",
  };

  const imageUrl = `${imageMap[condition]}?v=14`;

  // 태양 컴포넌트
  const Sun = () => (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "320px 80px" }}
    >
      {/* 태양 본체 */}
      <circle cx="320" cy="80" r="35" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
      {/* 태양 광선 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <motion.line
          key={angle}
          x1="320"
          y1="80"
          x2={320 + 50 * Math.cos((angle * Math.PI) / 180)}
          y2={80 + 50 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFA500"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
        />
      ))}
    </motion.g>
  );

  // 구름 컴포넌트
  const Cloud = ({ x, y, scale = 1, delay = 0 }: { x: number; y: number; scale?: number; delay?: number }) => (
    <motion.g
      animate={{ x: [0, 15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx={x} cy={y} rx={40 * scale} ry={25 * scale} fill="white" opacity="0.9" />
      <ellipse cx={x - 25 * scale} cy={y + 10 * scale} rx={30 * scale} ry={20 * scale} fill="white" opacity="0.9" />
      <ellipse cx={x + 25 * scale} cy={y + 10 * scale} rx={30 * scale} ry={20 * scale} fill="white" opacity="0.9" />
      <ellipse cx={x} cy={y - 15 * scale} rx={25 * scale} ry={20 * scale} fill="white" opacity="0.9" />
    </motion.g>
  );

  // 어두운 구름 (흐림용)
  const DarkCloud = ({ x, y, scale = 1, delay = 0 }: { x: number; y: number; scale?: number; delay?: number }) => (
    <motion.g
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx={x} cy={y} rx={40 * scale} ry={25 * scale} fill="#B0C4DE" opacity="0.9" />
      <ellipse cx={x - 25 * scale} cy={y + 10 * scale} rx={30 * scale} ry={20 * scale} fill="#B0C4DE" opacity="0.9" />
      <ellipse cx={x + 25 * scale} cy={y + 10 * scale} rx={30 * scale} ry={20 * scale} fill="#B0C4DE" opacity="0.9" />
      <ellipse cx={x} cy={y - 15 * scale} rx={25 * scale} ry={20 * scale} fill="#B0C4DE" opacity="0.9" />
    </motion.g>
  );

  // 날씨별 배경 효과 (구름많음만 구름 표시)
  const WeatherEffects = () => {
    switch (condition) {
      case "cloudy":
        return (
          <>
            <Cloud x={80} y={70} scale={1.2} delay={0} />
            <Cloud x={320} y={90} scale={0.9} delay={1.5} />
            <Cloud x={200} y={50} scale={0.7} delay={3} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${vb} ${vb}`}
      >
        {/* 날씨 효과 (태양/구름) - 고양이 뒤에 */}
        <WeatherEffects />

        {/* 고양이 원본 이미지 */}
        <motion.image
          href={imageUrl}
          x="50"
          y="50"
          width="300"
          height="300"
          preserveAspectRatio="xMidYMid meet"
          animate={{
            y: [50, 44, 50, 47, 50],
            rotate: [-1, 1, -1, 0, -1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>
    </div>
  );
}
