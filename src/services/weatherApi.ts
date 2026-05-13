import { CurrentWeather, HourlyForecast, DailyForecast } from "@/src/types/weather";

interface ApiItem {
  category: string;
  obsrValue: string;
  fcstValue: string;
  fcstDate: string;
  fcstTime: string;
}

async function fetchWithRetry(url: string, options?: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(url, { 
        ...options, 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) return response;
      if (i === retries - 1) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
  throw new Error("Max retries exceeded");
}

function parseCurrentWeather(items: ApiItem[]): CurrentWeather | null {
  if (!items || items.length === 0) return null;
  
  const result: Partial<CurrentWeather> = {};

  items.forEach((item) => {
    const value = item.obsrValue;
    switch (item.category) {
      case "T1H":
        result.temperature = parseFloat(value);
        break;
      case "RN1":
        result.precipitation = value === "강수없음" ? 0 : parseFloat(value);
        break;
      case "REH":
        result.humidity = parseFloat(value);
        break;
      case "PTY":
        result.precipitationType = parseInt(value);
        break;
      case "VEC":
        result.windDirection = parseFloat(value);
        break;
      case "WSD":
        result.windSpeed = parseFloat(value);
        break;
    }
  });

  // 필수 필드가 없으면 null 반환
  if (result.temperature === undefined) return null;

  result.skyCondition = result.skyCondition ?? 1;
  result.precipitationType = result.precipitationType ?? 0;
  result.observedAt = new Date().toISOString();
  
  return result as CurrentWeather;
}

function parseHourlyForecast(items: ApiItem[]): HourlyForecast[] {
  if (!items || items.length === 0) return [];
  
  const grouped = new Map<string, Partial<HourlyForecast>>();

  items.forEach((item) => {
    const key = item.fcstTime;
    if (!grouped.has(key)) {
      grouped.set(key, { time: key });
    }
    const entry = grouped.get(key)!;

    switch (item.category) {
      case "T1H":
        entry.temperature = parseFloat(item.fcstValue);
        break;
      case "SKY":
        entry.skyCondition = parseInt(item.fcstValue);
        break;
      case "PTY":
        if (item.fcstValue !== "0") {
          entry.skyCondition = 4;
        }
        break;
      case "RN1":
        entry.precipitation = item.fcstValue === "강수없음" ? 0 : parseFloat(item.fcstValue);
        break;
      case "POP":
        entry.precipitationProbability = parseInt(item.fcstValue);
        break;
    }
  });

  return Array.from(grouped.values()) as HourlyForecast[];
}

function parseDailyForecast(items: ApiItem[]): DailyForecast[] {
  if (!items || items.length === 0) return [];
  
  const grouped = new Map<string, Partial<DailyForecast>>();

  items.forEach((item) => {
    const key = item.fcstDate;
    if (!grouped.has(key)) {
      grouped.set(key, { date: key });
    }
    const entry = grouped.get(key)!;

    switch (item.category) {
      case "TMX":
        entry.maxTemp = parseFloat(item.fcstValue);
        break;
      case "TMN":
        entry.minTemp = parseFloat(item.fcstValue);
        break;
      case "POP":
        if (item.fcstTime <= "1200") {
          entry.amPrecipitation = parseInt(item.fcstValue);
        } else {
          entry.pmPrecipitation = parseInt(item.fcstValue);
        }
        break;
      case "SKY":
        if (item.fcstTime <= "1200") {
          entry.amSky = parseInt(item.fcstValue);
        } else {
          entry.pmSky = parseInt(item.fcstValue);
        }
        break;
    }
  });

  return Array.from(grouped.values()) as DailyForecast[];
}

export async function getCurrentWeather(nx: number, ny: number): Promise<CurrentWeather | null> {
  try {
    const response = await fetchWithRetry(`/api/weather/current?nx=${nx}&ny=${ny}`);
    const data = (await response.json()) as {
      response?: { body?: { items?: { item?: ApiItem[] } }; header?: { resultCode?: string; resultMsg?: string } };
    };

    if (data.response?.header?.resultCode !== "00") {
      console.error("API error:", data.response?.header);
      return null;
    }

    const items = data.response?.body?.items?.item || [];
    return parseCurrentWeather(items);
  } catch (error) {
    console.error("Failed to get current weather:", error);
    return null;
  }
}

export async function getHourlyForecast(nx: number, ny: number): Promise<HourlyForecast[]> {
  try {
    const response = await fetchWithRetry(`/api/weather/hourly?nx=${nx}&ny=${ny}`);
    const data = (await response.json()) as {
      response?: { body?: { items?: { item?: ApiItem[] } }; header?: { resultCode?: string; resultMsg?: string } };
    };

    if (data.response?.header?.resultCode !== "00") {
      console.error("Hourly API error:", {
        code: data.response?.header?.resultCode,
        msg: data.response?.header?.resultMsg,
      });
      return [];
    }

    const items = data.response?.body?.items?.item || [];
    if (!items || items.length === 0) {
      console.warn("Hourly API returned no data");
      return [];
    }
    return parseHourlyForecast(items);
  } catch (error) {
    console.error("Failed to get hourly forecast:", error);
    return [];
  }
}

export async function getDailyForecast(nx: number, ny: number): Promise<DailyForecast[]> {
  try {
    const response = await fetchWithRetry(`/api/weather/forecast?nx=${nx}&ny=${ny}`);
    const data = (await response.json()) as {
      response?: { body?: { items?: { item?: ApiItem[] } }; header?: { resultCode?: string; resultMsg?: string } };
    };

    if (data.response?.header?.resultCode !== "00") {
      console.error("Daily API error:", {
        code: data.response?.header?.resultCode,
        msg: data.response?.header?.resultMsg,
      });
      return [];
    }

    const items = data.response?.body?.items?.item || [];
    if (!items || items.length === 0) {
      console.warn("Daily API returned no data");
      return [];
    }
    return parseDailyForecast(items);
  } catch (error) {
    console.error("Failed to get daily forecast:", error);
    return [];
  }
}
