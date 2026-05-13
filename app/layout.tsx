import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/src/components/common/ServiceWorkerRegister";
import NetworkStatusProvider from "@/src/components/common/NetworkStatusProvider";
import { PushProvider } from "@/src/contexts/PushContext";

export const metadata: Metadata = {
  title: "냥씨 - 귀여운 날씨",
  description: "귀엽고 발랄한 날씨 정보",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#60A5FA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-screen h-full bg-[#F0F9FF] font-sans">
        <ServiceWorkerRegister />
        <PushProvider>
          <NetworkStatusProvider>{children}</NetworkStatusProvider>
        </PushProvider>
      </body>
    </html>
  );
}
