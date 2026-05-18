"use client";

import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon";
import { DailyForecast } from "@/src/types/weather";
import { getWeatherCondition } from "@/src/lib/utils";

interface DailyForecastListProps {
  forecasts: DailyForecast[];
}

export default function DailyForecastList({ forecasts }: DailyForecastListProps) {
  const getDayName = (dateStr: string) => {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = parseInt(dateStr.slice(6, 8));
    const date = new Date(year, month, day);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) return "오늘";
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "내일";
    
    return `${month + 1}/${day} (${days[date.getDay()]})`;
  };

  return (
    <div className="rounded-3xl bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">주간 예보</h3>
      <div className="flex flex-col gap-2">
        {forecasts.slice(0, 5).map((forecast, index) => {
          const amCondition = getWeatherCondition(forecast.amSky || 1, 0);
          const pmCondition = getWeatherCondition(forecast.pmSky || 1, 0);

          return (
            <motion.div
              key={forecast.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-3 items-center py-3 px-4 rounded-2xl bg-background"
            >
              <span className="text-sm font-medium text-foreground dark:text-white">
                {getDayName(forecast.date)}
              </span>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5">
                  <WeatherIcon condition={amCondition} size={28} animated={false} />
                  <span className="text-xs text-text-muted dark:text-gray-400 whitespace-nowrap">오전</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <WeatherIcon condition={pmCondition} size={28} animated={false} />
                  <span className="text-xs text-text-muted dark:text-gray-400 whitespace-nowrap">오후</span>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="font-semibold text-foreground dark:text-white">{forecast.maxTemp}°</span>
                <span className="text-text-muted dark:text-gray-400">{forecast.minTemp}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
