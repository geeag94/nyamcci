"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function OfflineScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#F0F9FF] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 오프라인용 놀란 고양이 */}
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            {/* 귀 */}
            <path d="M35 60 L20 20 L55 45 Z" fill="#FDE047" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
            <path d="M125 60 L140 20 L105 45 Z" fill="#FDE047" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
            {/* 얼굴 */}
            <circle cx="80" cy="85" r="55" fill="#FEF9C3" stroke="#1E293B" strokeWidth="3" />
            {/* 귀 안쪽 */}
            <path d="M38 50 L30 28 L50 42 Z" fill="#F9A8D4" />
            <path d="M122 50 L130 28 L110 42 Z" fill="#F9A8D4" />
            {/* 눈 - 놀람 */}
            <circle cx="58" cy="75" r="10" fill="none" stroke="#1E293B" strokeWidth="3" />
            <circle cx="58" cy="75" r="4" fill="#1E293B" />
            <circle cx="102" cy="75" r="10" fill="none" stroke="#1E293B" strokeWidth="3" />
            <circle cx="102" cy="75" r="4" fill="#1E293B" />
            {/* 눈물 */}
            <circle cx="58" cy="92" r="5" fill="#60A5FA" opacity="0.6" />
            <circle cx="102" cy="92" r="5" fill="#60A5FA" opacity="0.6" />
            {/* 입 - 오 */}
            <circle cx="80" cy="105" r="10" fill="none" stroke="#1E293B" strokeWidth="3" />
            {/* 수염 */}
            <line x1="15" y1="85" x2="40" y2="80" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="95" x2="40" y2="90" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="145" y1="85" x2="120" y2="80" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="145" y1="95" x2="120" y2="90" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">
            인터넷이 끊겼어요!
          </h2>
          <p className="text-[#64748B]">
            네트워크 연결을 확인하고 다시 시도해주세요
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#60A5FA] text-white font-medium hover:bg-[#3B82F6] transition-colors shadow-[0_4px_12px_rgba(96,165,250,0.3)]"
        >
          <RefreshCw className="w-5 h-5" />
          다시 시도
        </motion.button>
      </motion.div>
    </div>
  );
}
