"use client";

import { motion } from "framer-motion";
import { MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/src/components/layout/MainLayout";
import { useFavoriteStore } from "@/src/stores/favoriteStore";
import { useLocationStore } from "@/src/stores/locationStore";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoriteStore();
  const { setLocation } = useLocationStore();

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-[#1E293B]">즐겨찾기</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F0F9FF] flex items-center justify-center">
              <MapPin className="w-10 h-10 text-[#94A3B8]" />
            </div>
            <p className="text-[#64748B]">아직 즐겨찾기한 지역이 없어요</p>
            <Link
              href="/search"
              className="px-6 py-2 rounded-full bg-[#60A5FA] text-white font-medium hover:bg-[#3B82F6] transition-colors"
            >
              지역 검색하기
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {favorites.map((favorite, index) => (
              <motion.div
                key={favorite.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
              >
                <Link
                  href="/"
                  onClick={() => setLocation(favorite.location)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="w-10 h-10 rounded-full bg-[#60A5FA]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <span className="text-[#1E293B] font-medium">
                    {favorite.location.name}
                  </span>
                </Link>
                <button
                  onClick={() => removeFavorite(favorite.id)}
                  className="p-2 rounded-full hover:bg-[#FCA5A5]/10 text-[#94A3B8] hover:text-[#FCA5A5] transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}
