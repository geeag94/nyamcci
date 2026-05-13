"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface PushContextType {
  isSupported: boolean;
  isSubscribed: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  sendTestNotification: () => void;
}

const PushContext = createContext<PushContextType>({
  isSupported: false,
  isSubscribed: false,
  subscribe: async () => {},
  unsubscribe: async () => {},
  sendTestNotification: () => {},
});

export function usePush() {
  return useContext(PushContext);
}

export function PushProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    
    const supported =
      "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    setIsSupported(supported);

    if (supported) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsSubscribed(!!subscription);
        });
      });
    }
  }, []);

  const subscribe = useCallback(async () => {
    if (!isSupported || typeof window === "undefined") return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEl62iSMfV_Lz8g2U7X4b0z0F0aX8l3yJ3eR2mN1oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9iJ0kL1mN2oP3qR4sT5"
        ) as BufferSource,
      });

      console.log("Push subscription:", subscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error("Push subscription failed:", error);
    }
  }, [isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!isSupported || typeof window === "undefined") return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Push unsubscription failed:", error);
    }
  }, [isSupported]);

  const sendTestNotification = useCallback(() => {
    if (typeof window === "undefined") return;
    
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("냥씨 알림 테스트", {
        body: "오늘은 비가 올 것 같아요! 우산을 챙기세요",
        icon: "/icons/icon.svg",
        badge: "/icons/icon.svg",
      });
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <PushContext.Provider
      value={{ isSupported, isSubscribed, subscribe, unsubscribe, sendTestNotification }}
    >
      {children}
    </PushContext.Provider>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
