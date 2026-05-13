"use client";

import { Bell, BellOff, Send } from "lucide-react";
import { motion } from "framer-motion";
import { usePush } from "@/src/contexts/PushContext";

export default function PushNotificationToggle() {
  const { isSupported, isSubscribed, subscribe, unsubscribe, sendTestNotification } = usePush();

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
        <BellOff className="w-4 h-4" />
        이 브라우저는 푸시 알림을 지원하지 않아요
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isSubscribed ? "bg-[#60A5FA]/10" : "bg-[#F0F9FF]"
            }`}
          >
            <Bell
              className={`w-5 h-5 ${isSubscribed ? "text-[#60A5FA]" : "text-[#94A3B8]"}`}
            />
          </div>
          <div>
            <h3 className="font-medium text-[#1E293B]">푸시 알림</h3>
            <p className="text-xs text-[#64748B]">
              {isSubscribed ? "알림을 받고 있어요" : "날씨 알림을 받아보세요"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSubscribed && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendTestNotification}
              className="p-2 rounded-full bg-[#F0F9FF] text-[#60A5FA] hover:bg-[#60A5FA]/10"
              title="테스트 알림 보내기"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isSubscribed ? unsubscribe : subscribe}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isSubscribed
                ? "bg-[#FCA5A5]/10 text-[#FCA5A5] hover:bg-[#FCA5A5]/20"
                : "bg-[#60A5FA] text-white hover:bg-[#3B82F6]"
            }`}
          >
            {isSubscribed ? "해제" : "구독"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
