import { create } from "zustand";
import { Location } from "@/src/types/weather";
import { latLngToGrid } from "@/src/lib/coordinate";

interface LocationState {
  currentLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: Location) => void;
  setCurrentLocationByCoords: (lat: number, lng: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  isLoading: false,
  error: null,
  setLocation: (location) => set({ currentLocation: location, error: null }),
  setCurrentLocationByCoords: (lat, lng) => {
    const { nx, ny } = latLngToGrid(lat, lng);
    set({
      currentLocation: {
        name: "현재 위치",
        nx,
        ny,
        lat,
        lng,
      },
      error: null,
    });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
