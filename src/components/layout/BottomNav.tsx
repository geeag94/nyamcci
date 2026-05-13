"use client";

import { Home, Map, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/map", icon: Map, label: "지도" },
  { href: "/favorites", icon: Heart, label: "즐겨찾기" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-[#F0F9FF]">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-colors ${
                isActive
                  ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
