"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/src/components/layout/MainLayout";
import CurrentWeatherCard from "@/src/components/weather/CurrentWeatherCard";
import HourlyForecastList from "@/src/components/weather/HourlyForecastList";
import DailyForecastList from "@/src/components/weather/DailyForecastList";
import PushNotificationToggle from "@/src/components/common/PushNotificationToggle";
import SkeletonCard, { SkeletonForecast, SkeletonDaily } from "@/src/components/common/SkeletonCard";
import FadeIn from "@/src/components/common/FadeIn";
import { getCurrentWeather, getHourlyForecast, getDailyForecast } from "@/src/services/weatherApi";
import { DEFAULT_LOCATIONS } from "@/src/constants/weather";
import { latLngToGrid } from "@/src/lib/coordinate";
import type { CurrentWeather, HourlyForecast, DailyForecast, Location } from "@/src/types/weather";

const STORAGE_KEY = "nyamcci-location-v2";

function getStoredLocation(): Location | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 저장된 위치가 DEFAULT_LOCATIONS에 있으면 그대로 사용
      const exists = DEFAULT_LOCATIONS.find(
        (loc) => loc.nx === parsed.nx && loc.ny === parsed.ny
      );
      if (exists) return exists;
      // 없으면 (예: 이전에 서울 등이 저장됨) null 반환
    }
  } catch {
    // ignore
  }
  return null;
}

function saveLocation(location: Location) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch {
    // ignore
  }
}

export default function Home() {
  const [location, setLocationState] = useState<Location | null>(null);
  const [pageState, setPageState] = useState<"init" | "loading" | "error" | "ready">("init");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);

  // 초기 위치 설정 (useLayoutEffect로 hydration 전에 실행)
  useLayoutEffect(() => {
    // 1. localStorage에서 읽기 (DEFAULT_LOCATIONS에 없으면 null)
    const stored = getStoredLocation();
    if (stored) {
      setLocationState(stored);
      return;
    }
    
    // 2. GPS 시도
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { nx, ny } = latLngToGrid(position.coords.latitude, position.coords.longitude);
          const loc: Location = {
            name: "현재 위치",
            nx,
            ny,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocationState(loc);
          saveLocation(loc);
        },
        () => {
          // GPS 실패 시 김해 (DEFAULT_LOCATIONS[0])
          setLocationState(DEFAULT_LOCATIONS[0]);
          saveLocation(DEFAULT_LOCATIONS[0]);
        },
        { timeout: 5000, maximumAge: 60000 }
      );
    } else {
      setLocationState(DEFAULT_LOCATIONS[0]);
      saveLocation(DEFAULT_LOCATIONS[0]);
    }
  }, []);

  // 위치 변경 시 날씨 데이터 패칭
  useEffect(() => {
    if (!location) return;

    let cancelled = false;

    const fetchData = async () => {
      setPageState("loading");

      try {
        const [current, hourly, daily] = await Promise.all([
          getCurrentWeather(location.nx, location.ny),
          getHourlyForecast(location.nx, location.ny),
          getDailyForecast(location.nx, location.ny),
        ]);

        if (cancelled) return;

        if (current) {
          setCurrentWeather(current);
          setHourlyForecast(hourly);
          setDailyForecast(daily);
          setPageState("ready");
        } else {
          setPageState("error");
        }
      } catch (err) {
        if (!cancelled) {
          setPageState("error");
        }
      }
    };

    fetchData();

    // 10분마다 갱신
    const interval = setInterval(() => {
      if (!cancelled) {
        fetchData();
      }
    }, 10 * 60 * 1000);
    
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [location?.nx, location?.ny]);

  const hasWeather = currentWeather && location;

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4"
      >
        {(pageState === "init" || pageState === "loading") && !hasWeather && (
          <>
            <SkeletonCard />
            <SkeletonForecast />
            <SkeletonDaily />
          </>
        )}
        
        {pageState === "error" && !hasWeather && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 rounded-3xl bg-card shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <p className="text-text-muted dark:text-gray-300 text-lg">날씨 정보를 불러올 수 없어요</p>
            <p className="text-sm text-text-muted dark:text-gray-400 mt-2">잠시 후 다시 시도해주세요</p>
          </motion.div>
        )}

        {hasWeather && (
          <>
            <FadeIn>
              <CurrentWeatherCard
                weather={currentWeather!}
                locationName={location!.name}
              />
            </FadeIn>

            {hourlyForecast.length > 0 && (
              <FadeIn delay={0.1}>
                <HourlyForecastList forecasts={hourlyForecast} />
              </FadeIn>
            )}

            {dailyForecast.length > 0 && (
              <FadeIn delay={0.2}>
                <DailyForecastList forecasts={dailyForecast} />
              </FadeIn>
            )}
          </>
        )}

        <FadeIn delay={0.3}>
          <PushNotificationToggle />
        </FadeIn>
      </motion.div>
    </MainLayout>
  );
}
