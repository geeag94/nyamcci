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
  appleWebApp: {
    capable: true,
    title: "냥씨",
    statusBarStyle: "default",
  },
  applicationName: "냥씨",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#60A5FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="냥씨" />
        <meta name="msapplication-TileColor" content="#60A5FA" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="min-h-screen h-full bg-background font-sans">
        <ServiceWorkerRegister />
        <PushProvider>
          <NetworkStatusProvider>{children}</NetworkStatusProvider>
        </PushProvider>
      </body>
    </html>
  );
}
