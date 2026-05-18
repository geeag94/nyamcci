"use client";

import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon";
import { HourlyForecast } from "@/src/types/weather";
import { getWeatherCondition } from "@/src/lib/utils";

interface HourlyForecastListProps {
  forecasts: HourlyForecast[];
}

export default function HourlyForecastList({ forecasts }: HourlyForecastListProps) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">시간별 예보</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
        {forecasts.slice(0, 12).map((forecast, index) => {
          const condition = getWeatherCondition(forecast.skyCondition || 1, 0);
          const timeStr = `${forecast.time.slice(0, 2)}:${forecast.time.slice(2)}`;

          return (
            <motion.div
              key={forecast.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center gap-2 w-[68px] py-3 px-2 rounded-2xl bg-background"
            >
              <span className="text-xs text-text-muted dark:text-gray-400">{timeStr}</span>
              <WeatherIcon condition={condition} size={36} animated={false} />
              <span className="text-sm font-semibold text-foreground dark:text-white">{forecast.temperature}°</span>
              {forecast.precipitationProbability !== undefined && forecast.precipitationProbability > 0 && (
                <span className="text-[10px] text-primary">{forecast.precipitationProbability}%</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
