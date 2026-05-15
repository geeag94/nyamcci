"use client";

import { motion } from "framer-motion";
import CatCharacter from "@/src/components/common/CatCharacter";
import { CurrentWeather } from "@/src/types/weather";
import { getWeatherCondition, getSkyConditionText, getPrecipitationTypeText } from "@/src/lib/utils";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  locationName: string;
}

export default function CurrentWeatherCard({ weather, locationName }: CurrentWeatherCardProps) {
  const condition = getWeatherCondition(weather.skyCondition, weather.precipitationType);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-visible rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/10 via-transparent to-[#F9A8D4]/10 rounded-3xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.h2 
          className="text-xl font-bold text-[#1E293B] mb-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {locationName}
        </motion.h2>
        
        {/* 고양이 캐릭터 - 크게 표시 */}
        <div className="w-full flex justify-center -mt-4 -mb-6">
          <CatCharacter condition={condition} size={220} />
        </div>
        
        <motion.div 
          className="text-center mt-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-5xl font-bold text-[#1E293B] tracking-tight">
            {weather.temperature}°
          </div>
          <div className="mt-1 text-base text-[#64748B] font-medium">
            {weather.precipitationType > 0
              ? getPrecipitationTypeText(weather.precipitationType)
              : getSkyConditionText(weather.skyCondition)}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full mt-4 pt-4 border-t border-[#F0F9FF]">
          <motion.div 
            className="text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-xs text-[#64748B]">습도</div>
            <div className="text-base font-semibold text-[#1E293B]">{weather.humidity}%</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-xs text-[#64748B]">풍속</div>
            <div className="text-base font-semibold text-[#1E293B]">{weather.windSpeed}m/s</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-xs text-[#64748B]">강수량</div>
            <div className="text-base font-semibold text-[#1E293B]">{weather.precipitation}mm</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
