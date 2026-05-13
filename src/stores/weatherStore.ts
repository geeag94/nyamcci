import { create } from "zustand";
import { CurrentWeather, HourlyForecast, DailyForecast } from "@/src/types/weather";

interface WeatherState {
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  isLoading: boolean;
  error: string | null;
  setCurrentWeather: (weather: CurrentWeather | null) => void;
  setHourlyForecast: (forecast: HourlyForecast[]) => void;
  setDailyForecast: (forecast: DailyForecast[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  isLoading: false,
  error: null,
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setHourlyForecast: (forecast) => set({ hourlyForecast: forecast }),
  setDailyForecast: (forecast) => set({ dailyForecast: forecast }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
