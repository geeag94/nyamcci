"use client";

import { motion } from "framer-motion";
import { WeatherCondition } from "@/src/types/weather";

interface CatCharacterProps {
  condition: WeatherCondition;
  size?: number;
  animated?: boolean;
}

export default function CatCharacter({ condition, size = 200, animated = true }: CatCharacterProps) {
  const s = size;
  // 얼굴 중심을 더 아래로 배치
  const cx = s / 2;
  const cy = s / 2 + 10;

  const renderExpression = () => {
    switch (condition) {
      case "sunny":
        return (
          <g>
            {/* 눈웃음 - 기쁨 */}
            <motion.path
              d={`M${cx - 38} ${cy - 5} Q${cx - 28} ${cy - 20} ${cx - 18} ${cy - 5}`}
              stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none"
            />
            <motion.path
              d={`M${cx + 18} ${cy - 5} Q${cx + 28} ${cy - 20} ${cx + 38} ${cy - 5}`}
              stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none"
            />
            {/* 볼 빨갛게 */}
            <ellipse cx={cx - 52} cy={cy + 10} rx="12" ry="8" fill="#FCA5A5" opacity="0.5" />
            <ellipse cx={cx + 52} cy={cy + 10} rx="12" ry="8" fill="#FCA5A5" opacity="0.5" />
            {/* 입 - 활짝 웃음 */}
            <path d={`M${cx - 16} ${cy + 24} Q${cx} ${cy + 40} ${cx + 16} ${cy + 24}`} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );
      case "cloudy":
        return (
          <g>
            {/* 졸린 눈 - 반달 */}
            <path d={`M${cx - 38} ${cy - 5} Q${cx - 28} ${cy + 5} ${cx - 18} ${cy - 5}`} stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d={`M${cx + 18} ${cy - 5} Q${cx + 28} ${cy + 5} ${cx + 38} ${cy - 5}`} stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* 작은 입 */}
            <ellipse cx={cx} cy={cy + 28} rx="5" ry="4" fill="#1E293B" />
          </g>
        );
      case "overcast":
        return (
          <g>
            {/* 우울한 눈 */}
            <circle cx={cx - 28} cy={cy - 2} r="10" fill="#1E293B" />
            <circle cx={cx + 28} cy={cy - 2} r="10" fill="#1E293B" />
            {/* 눈썹 내림 */}
            <path d={`M${cx - 38} ${cy - 18} Q${cx - 28} ${cy - 22} ${cx - 18} ${cy - 18}`} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d={`M${cx + 18} ${cy - 18} Q${cx + 28} ${cy - 22} ${cx + 38} ${cy - 18}`} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* ㅅ 모양 입 */}
            <path d={`M${cx - 10} ${cy + 30} L${cx} ${cy + 18} L${cx + 10} ${cy + 30}`} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );
      case "rain":
      case "shower":
        return (
          <g>
            {/* 슬픈 눈 */}
            <circle cx={cx - 28} cy={cy - 2} r="10" fill="#1E293B" />
            <circle cx={cx + 28} cy={cy - 2} r="10" fill="#1E293B" />
            {/* 눈물 */}
            <motion.g animate={animated ? { y: [0, 6, 0], opacity: [1, 0.5, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>
              <circle cx={cx - 28} cy={cy + 14} r="4" fill="#60A5FA" opacity="0.8" />
              <circle cx={cx + 28} cy={cy + 14} r="4" fill="#60A5FA" opacity="0.8" />
            </motion.g>
            {/* ㅠ 모양 입 */}
            <path d={`M${cx - 14} ${cy + 32} Q${cx} ${cy + 26} ${cx + 14} ${cy + 32}`} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        );
      case "snow":
        return (
          <g>
            {/* 춥게 떨리는 눈 */}
            <motion.g animate={animated ? { x: [-1.5, 1.5, -1.5] } : {}} transition={{ duration: 0.15, repeat: Infinity }}>
              <circle cx={cx - 28} cy={cy - 2} r="10" fill="#1E293B" />
              <circle cx={cx + 28} cy={cy - 2} r="10" fill="#1E293B" />
              <path d={`M${cx - 10} ${cy + 30} L${cx} ${cy + 20} L${cx + 10} ${cy + 30}`} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
            </motion.g>
            {/* 빨간 볼 */}
            <ellipse cx={cx - 52} cy={cy + 10} rx="14" ry="10" fill="#FCA5A5" opacity="0.6" />
            <ellipse cx={cx + 52} cy={cy + 10} rx="14" ry="10" fill="#FCA5A5" opacity="0.6" />
          </g>
        );
      case "thunder":
        return (
          <g>
            {/* 놀란 큰 눈 + 하이라이트 */}
            <circle cx={cx - 28} cy={cy - 2} r="14" fill="#1E293B" />
            <circle cx={cx - 30} cy={cy - 6} r="5" fill="white" />
            <circle cx={cx + 28} cy={cy - 2} r="14" fill="#1E293B" />
            <circle cx={cx + 26} cy={cy - 6} r="5" fill="white" />
            {/* 눈썹 올림 */}
            <path d={`M${cx - 40} ${cy - 22} Q${cx - 28} ${cy - 30} ${cx - 16} ${cy - 22}`} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d={`M${cx + 16} ${cy - 22} Q${cx + 28} ${cy - 30} ${cx + 40} ${cy - 22}`} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* 오 모양 입 */}
            <circle cx={cx} cy={cy + 34} r="10" fill="none" stroke="#1E293B" strokeWidth="4" />
          </g>
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
        viewBox={`0 0 ${s} ${s}`}
      >
        {/* 귀 (왼쪽) */}
        <motion.path
          d={`M${cx - 60} ${cy - 20} C${cx - 70} ${cy - 80}, ${cx - 20} ${cy - 100}, ${cx - 5} ${cy - 50} C${cx - 15} ${cy - 40}, ${cx - 50} ${cy - 30}, ${cx - 60} ${cy - 20}Z`}
          fill="#D1D5DB"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinejoin="round"
          animate={animated ? { rotate: [-2, 2, -2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: `${cx - 35}px ${cy - 55}px` }}
        />
        
        {/* 귀 (오른쪽) */}
        <motion.path
          d={`M${cx + 60} ${cy - 20} C${cx + 70} ${cy - 80}, ${cx + 20} ${cy - 100}, ${cx + 5} ${cy - 50} C${cx + 15} ${cy - 40}, ${cx + 50} ${cy - 30}, ${cx + 60} ${cy - 20}Z`}
          fill="#D1D5DB"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinejoin="round"
          animate={animated ? { rotate: [2, -2, 2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: `${cx + 35}px ${cy - 55}px` }}
        />

        {/* 귀 안쪽 - 분홍색 */}
        <path d={`M${cx - 52} ${cy - 30} C${cx - 60} ${cy - 70}, ${cx - 28} ${cy - 85}, ${cx - 15} ${cy - 48}Z`} fill="#FDA4AF" />
        <path d={`M${cx - 46} ${cy - 40} C${cx - 52} ${cy - 65}, ${cx - 30} ${cy - 75}, ${cx - 22} ${cy - 48}Z`} fill="#FBCFE8" opacity="0.5" />
        {/* 귀 안쪽 선들 */}
        <path d={`M${cx - 44} ${cy - 55} Q${cx - 40} ${cy - 48} ${cx - 42} ${cy - 40}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d={`M${cx - 38} ${cy - 58} Q${cx - 34} ${cy - 50} ${cx - 36} ${cy - 42}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d={`M${cx - 32} ${cy - 60} Q${cx - 28} ${cy - 52} ${cx - 30} ${cy - 44}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

        <path d={`M${cx + 52} ${cy - 30} C${cx + 60} ${cy - 70}, ${cx + 28} ${cy - 85}, ${cx + 15} ${cy - 48}Z`} fill="#FDA4AF" />
        <path d={`M${cx + 46} ${cy - 40} C${cx + 52} ${cy - 65}, ${cx + 30} ${cy - 75}, ${cx + 22} ${cy - 48}Z`} fill="#FBCFE8" opacity="0.5" />
        <path d={`M${cx + 44} ${cy - 55} Q${cx + 40} ${cy - 48} ${cx + 42} ${cy - 40}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d={`M${cx + 38} ${cy - 58} Q${cx + 34} ${cy - 50} ${cx + 36} ${cy - 42}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d={`M${cx + 32} ${cy - 60} Q${cx + 28} ${cy - 52} ${cx + 30} ${cy - 44}`} stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* 머리 (얼굴) */}
        <ellipse cx={cx} cy={cy + 8} rx="72" ry="62" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />

        {/* 머리 줄무늬 */}
        <path d={`M${cx - 55} ${cy - 40} Q${cx - 40} ${cy - 32} ${cx - 30} ${cy - 48}`} stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M${cx - 25} ${cy - 52} Q${cx - 10} ${cy - 38} ${cx + 5} ${cy - 52}`} stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M${cx + 15} ${cy - 50} Q${cx + 30} ${cy - 35} ${cx + 45} ${cy - 48}`} stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M${cx - 65} ${cy - 12} Q${cx - 50} ${cy - 5} ${cx - 60} ${cy + 12}`} stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d={`M${cx + 58} ${cy - 8} Q${cx + 68} ${cy} ${cx + 60} ${cy + 15}`} stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d={`M${cx - 62} ${cy + 22} Q${cx - 50} ${cy + 32} ${cx - 58} ${cy + 42}`} stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d={`M${cx + 55} ${cy + 25} Q${cx + 65} ${cy + 35} ${cx + 58} ${cy + 45}`} stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* 눈 주변 흰색 */}
        <ellipse cx={cx - 30} cy={cy - 2} rx="28" ry="30" fill="white" opacity="0.9" />
        <ellipse cx={cx + 30} cy={cy - 2} rx="28" ry="30" fill="white" opacity="0.9" />

        {/* 코 */}
        <ellipse cx={cx} cy={cy + 16} rx="7" ry="5" fill="#1E293B" />

        {/* 수염 (왼쪽) */}
        <line x1={cx - 68} y1={cy + 5} x2={cx - 42} y2={cy + 2} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1={cx - 72} y1={cy + 16} x2={cx - 40} y2={cy + 14} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1={cx - 68} y1={cy + 27} x2={cx - 42} y2={cy + 24} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* 수염 (오른쪽) */}
        <line x1={cx + 68} y1={cy + 5} x2={cx + 42} y2={cy + 2} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1={cx + 72} y1={cy + 16} x2={cx + 40} y2={cy + 14} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1={cx + 68} y1={cy + 27} x2={cx + 42} y2={cy + 24} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* 표정 */}
        {renderExpression()}

      </svg>
    </div>
  );
}
