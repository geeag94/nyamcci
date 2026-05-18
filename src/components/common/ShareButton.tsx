"use client";

import { Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function ShareButton({
  title = "냥씨 - 귀여운 날씨",
  text = "귀엽고 발랄한 날씨 정보를 확인해보세요!",
  url = typeof window !== "undefined" ? window.location.href : "",
}: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        // 사용자가 공유를 취소한 경우
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("공유하기 실패:", error);
        }
      }
    } else {
      // Web Share API를 지원하지 않는 브라우저에서는 클립보드에 복사
      try {
        await navigator.clipboard.writeText(url);
        alert("링크가 클립보드에 복사되었어요!");
      } catch {
        alert("이 브라우저에서는 공유 기능을 지원하지 않아요");
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="p-2 rounded-full bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
      aria-label="공유하기"
    >
      <Share2 className="w-5 h-5 text-text-muted" />
    </motion.button>
  );
}
