"use client";

import { motion } from "framer-motion";
import { WeatherCondition } from "@/src/types/weather";

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  animated?: boolean;
}

export default function WeatherIcon({ condition, size = 64, animated = true }: WeatherIconProps) {
  const iconSize = size;
  const center = iconSize / 2;

  const renderIcon = () => {
    switch (condition) {
      case "sunny":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <motion.g animate={animated ? { rotate: 360 } : {}} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <circle cx={center} cy={center} r="12" fill="#FDE047" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1={center}
                  y1={center - 18}
                  x2={center}
                  y2={center - 24}
                  stroke="#FDE047"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${i * 45} ${center} ${center})`}
                />
              ))}
            </motion.g>
          </svg>
        );
      case "cloudy":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <motion.g animate={animated ? { x: [0, 4, 0] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <circle cx="28" cy="28" r="14" fill="#FDE047" opacity="0.6" />
              <path
                d="M20 36C20 30.4772 24.4772 26 30 26H38C43.5228 26 48 30.4772 48 36C48 41.5228 43.5228 46 38 46H30C24.4772 46 20 41.5228 20 36Z"
                fill="#E2E8F0"
              />
              <path
                d="M12 40C12 34.4772 16.4772 30 22 30H30C35.5228 30 40 34.4772 40 40C40 45.5228 35.5228 50 30 50H22C16.4772 50 12 45.5228 12 40Z"
                fill="#FFFFFF"
              />
            </motion.g>
          </svg>
        );
      case "overcast":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <motion.g animate={animated ? { x: [0, 3, 0] } : {}} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <path
                d="M14 38C14 32.4772 18.4772 28 24 28H32C37.5228 28 42 32.4772 42 38C42 43.5228 37.5228 48 32 48H24C18.4772 48 14 43.5228 14 38Z"
                fill="#CBD5E1"
              />
              <path
                d="M22 42C22 36.4772 26.4772 32 32 32H40C45.5228 32 50 36.4772 50 42C50 47.5228 45.5228 52 40 52H32C26.4772 52 22 47.5228 22 42Z"
                fill="#94A3B8"
              />
            </motion.g>
          </svg>
        );
      case "rain":
      case "shower":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <path
              d="M16 34C16 28.4772 20.4772 24 26 24H34C39.5228 24 44 28.4772 44 34C44 39.5228 39.5228 44 34 44H26C20.4772 44 16 39.5228 16 34Z"
              fill="#CBD5E1"
            />
            <path
              d="M24 38C24 32.4772 28.4772 28 34 28H42C47.5228 28 52 32.4772 52 38C52 43.5228 47.5228 48 42 48H34C28.4772 48 24 43.5228 24 38Z"
              fill="#94A3B8"
            />
            {[...Array(3)].map((_, i) => (
              <motion.line
                key={i}
                x1={22 + i * 10}
                y1={48}
                x2={20 + i * 10}
                y2={56}
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                animate={animated ? { y: [0, 4, 0], opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </svg>
        );
      case "snow":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <path
              d="M16 34C16 28.4772 20.4772 24 26 24H34C39.5228 24 44 28.4772 44 34C44 39.5228 39.5228 44 34 44H26C20.4772 44 16 39.5228 16 34Z"
              fill="#CBD5E1"
            />
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={22 + i * 10}
                cy={50}
                r="3"
                fill="#FFFFFF"
                animate={animated ? { y: [0, 6, 0], x: [-2, 2, -2], opacity: [1, 0.6, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
            ))}
          </svg>
        );
      case "thunder":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <path
              d="M16 34C16 28.4772 20.4772 24 26 24H34C39.5228 24 44 28.4772 44 34C44 39.5228 39.5228 44 34 44H26C20.4772 44 16 39.5228 16 34Z"
              fill="#64748B"
            />
            <motion.path
              d="M30 42L26 52H32L28 62"
              stroke="#FDE047"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={animated ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderIcon()}
    </div>
  );
}
