import { Location } from "@/src/types/weather";

export const BASE_URL =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

export const MID_BASE_URL =
  "https://apis.data.go.kr/1360000/MidFcstInfoService";

export const PRECIPITATION_TYPE: Record<number, string> = {
  0: "없음",
  1: "비",
  2: "비/눈",
  3: "눈",
  4: "소나기",
  5: "빗방울",
  6: "빗방울/눈날림",
  7: "눈날림",
};

export const SKY_CONDITION: Record<number, string> = {
  1: "맑음",
  3: "구름많음",
  4: "흐림",
};

export const CATEGORY_MAP: Record<string, string> = {
  TMP: "temperature",
  TMN: "minTemp",
  TMX: "maxTemp",
  UUU: "windU",
  VVV: "windV",
  VEC: "windDirection",
  WSD: "windSpeed",
  SKY: "skyCondition",
  PTY: "precipitationType",
  POP: "precipitationProbability",
  PCP: "precipitation",
  REH: "humidity",
  SNO: "snow",
};

export const DEFAULT_LOCATIONS: Location[] = [
  { name: "김해", nx: 95, ny: 77, lat: 35.2342, lng: 128.8811 },
  { name: "서울", nx: 60, ny: 127, lat: 37.5665, lng: 126.978 },
  { name: "부산", nx: 98, ny: 76, lat: 35.1796, lng: 129.0756 },
  { name: "대구", nx: 89, ny: 90, lat: 35.8714, lng: 128.6014 },
  { name: "인천", nx: 55, ny: 124, lat: 37.4563, lng: 126.7052 },
  { name: "광주", nx: 58, ny: 74, lat: 35.1595, lng: 126.8526 },
  { name: "대전", nx: 67, ny: 100, lat: 36.3504, lng: 127.3845 },
  { name: "울산", nx: 102, ny: 84, lat: 35.5384, lng: 129.3114 },
  { name: "세종", nx: 66, ny: 103, lat: 36.48, lng: 127.289 },
  { name: "수원", nx: 60, ny: 121, lat: 37.2636, lng: 127.0286 },
  { name: "제주", nx: 52, ny: 38, lat: 33.4996, lng: 126.5312 },
];
