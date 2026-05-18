"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/src/components/layout/MainLayout";
import { DEFAULT_LOCATIONS } from "@/src/constants/weather";
import { useFavoriteStore } from "@/src/stores/favoriteStore";
import { useLocationStore } from "@/src/stores/locationStore";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const { setLocation } = useLocationStore();

  const filteredLocations = DEFAULT_LOCATIONS.filter((loc) =>
    loc.name.includes(query)
  );

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="도시 이름을 검색하세요"
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border-2 border-transparent focus:border-primary outline-none text-foreground dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          {filteredLocations.map((loc, index) => {
            const fav = isFavorite(loc.nx, loc.ny);
            return (
              <motion.div
                key={`${loc.nx}-${loc.ny}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
              >
                <Link
                  href="/"
                  onClick={() => setLocation(loc)}
                  className="flex items-center gap-3 flex-1"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">{loc.name}</span>
                </Link>
                <button
                  onClick={() =>
                    fav ? removeFavorite(`${loc.nx}-${loc.ny}`) : addFavorite(loc)
                  }
                  className={`p-2 rounded-full transition-colors ${
                    fav
                      ? "bg-danger/10 text-danger"
                      : "bg-background text-text-muted hover:text-danger"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${fav ? "fill-current" : ""}`} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </MainLayout>
  );
}
