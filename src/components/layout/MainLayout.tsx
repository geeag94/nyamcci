"use client";

import Header from "./Header";
import BottomNav from "./BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F0F9FF] max-w-md mx-auto">
      <Header />
      <main className="px-4 pb-24 pt-2">{children}</main>
      <BottomNav />
    </div>
  );
}
