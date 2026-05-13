export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}${minutes}`;
}

export function getBaseDateTime(): { baseDate: string; baseTime: string } {
  const now = new Date();
  const baseDate = formatDate(now);

  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 초단기예보: 매 10분마다 갱신
  const roundedMinutes = Math.floor(minutes / 10) * 10;
  const baseTime = `${String(hours).padStart(2, "0")}${String(roundedMinutes).padStart(2, "0")}`;

  return { baseDate, baseTime };
}

export function getShortTermBaseDateTime(): { baseDate: string; baseTime: string } {
  const now = new Date();
  const hours = now.getHours();

  // 단기예보 발표 시각: 02, 05, 08, 11, 14, 17, 20, 23
  const announcementHours = [2, 5, 8, 11, 14, 17, 20, 23];
  let baseHour = announcementHours[0];

  for (let i = announcementHours.length - 1; i >= 0; i--) {
    if (hours >= announcementHours[i]) {
      baseHour = announcementHours[i];
      break;
    }
  }

  const baseDate = formatDate(now);
  const baseTime = `${String(baseHour).padStart(2, "0")}00`;

  return { baseDate, baseTime };
}

export function getSkyConditionText(code: number): string {
  const map: Record<number, string> = {
    1: "맑음",
    3: "구름많음",
    4: "흐림",
  };
  return map[code] || "알 수 없음";
}

export function getPrecipitationTypeText(code: number): string {
  const map: Record<number, string> = {
    0: "없음",
    1: "비",
    2: "비/눈",
    3: "눈",
    4: "소나기",
    5: "빗방울",
    6: "빗방울/눈날림",
    7: "눈날림",
  };
  return map[code] || "알 수 없음";
}

export function getWeatherCondition(
  sky: number,
  pty: number
): import("@/src/types/weather").WeatherCondition {
  if (pty === 1) return "rain";
  if (pty === 2) return "snow";
  if (pty === 3) return "snow";
  if (pty === 4) return "shower";
  if (sky === 1) return "sunny";
  if (sky === 3) return "cloudy";
  if (sky === 4) return "overcast";
  return "sunny";
}
