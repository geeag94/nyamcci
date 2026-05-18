"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 이미 설치됐거나 오늘 이미 닫았으면 안 보여줌
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const lastDismissed = localStorage.getItem("install-prompt-dismissed");
    const today = new Date().toDateString();
    
    if (isStandalone || lastDismissed === today) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // iOS는 beforeinstallprompt가 없으므로 별도 체크
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && !isStandalone && lastDismissed !== today) {
      // iOS는 3초 후에 안내
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("install-prompt-dismissed", new Date().toDateString());
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 left-4 right-4 z-50 bg-card rounded-2xl shadow-lg border border-background p-4 max-w-md mx-auto"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                냥씨를 홈 화면에 추가하세요
              </h3>
              <p className="text-xs text-text-muted mt-1">
                {isIOS
                  ? "Safari 공유 버튼을 눌러 '홈 화면에 추가'를 선택하세요"
                  : "홈 화면에 추가해서 더 빠르게 날씨를 확인하세요"}
              </p>
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="mt-2 px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  설치하기
                </button>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg hover:bg-background transition-colors"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
