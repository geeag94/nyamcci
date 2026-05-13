"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 로딩용 귀여운 고양이 */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* 귀 */}
          <motion.path
            d="M25 45 L15 15 L45 35 Z"
            fill="#FDE047"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ transformOrigin: "30px 35px" }}
          />
          <motion.path
            d="M95 45 L105 15 L75 35 Z"
            fill="#FDE047"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ transformOrigin: "90px 35px" }}
          />
          {/* 얼굴 */}
          <circle cx="60" cy="65" r="45" fill="#FEF9C3" stroke="#1E293B" strokeWidth="2.5" />
          {/* 귀 안쪽 */}
          <path d="M28 40 L22 22 L38 32 Z" fill="#F9A8D4" />
          <path d="M92 40 L98 22 L82 32 Z" fill="#F9A8D4" />
          {/* 눈 - 깜빡임 */}
          <motion.g
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
          >
            <circle cx="45" cy="58" r="4" fill="#1E293B" />
            <circle cx="75" cy="58" r="4" fill="#1E293B" />
          </motion.g>
          {/* 입 */}
          <path d="M52 78 Q60 85 68 78" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* 볼 */}
          <circle cx="35" cy="70" r="6" fill="#F9A8D4" opacity="0.5" />
          <circle cx="85" cy="70" r="6" fill="#F9A8D4" opacity="0.5" />
        </svg>
      </motion.div>
      <motion.p
        className="text-sm text-[#64748B] font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        날씨 정보를 불러오는 중...
      </motion.p>
    </div>
  );
}
