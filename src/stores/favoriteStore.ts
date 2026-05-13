import { create } from "zustand";
import { Favorite, Location } from "@/src/types/weather";

interface FavoriteState {
  favorites: Favorite[];
  addFavorite: (location: Location) => void;
  removeFavorite: (id: string) => void;
  reorderFavorites: (favorites: Favorite[]) => void;
  isFavorite: (nx: number, ny: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  addFavorite: (location) => {
    const { favorites } = get();
    if (favorites.some((f) => f.location.nx === location.nx && f.location.ny === location.ny)) {
      return;
    }
    const newFavorite: Favorite = {
      id: `${location.nx}-${location.ny}-${Date.now()}`,
      location,
      order: favorites.length,
    };
    set({ favorites: [...favorites, newFavorite] });
  },
  removeFavorite: (id) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((f) => f.id !== id) });
  },
  reorderFavorites: (favorites) => {
    set({ favorites: favorites.map((f, i) => ({ ...f, order: i })) });
  },
  isFavorite: (nx, ny) => {
    return get().favorites.some((f) => f.location.nx === nx && f.location.ny === ny);
  },
}));
