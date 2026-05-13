import { describe, it, expect } from "vitest";
import {
  getSkyConditionText,
  getPrecipitationTypeText,
  getWeatherCondition,
} from "@/src/lib/utils";
import type { WeatherCondition } from "@/src/types/weather";

describe("Weather Utils", () => {
  describe("getSkyConditionText", () => {
    it("맑음 코드를 반환한다", () => {
      expect(getSkyConditionText(1)).toBe("맑음");
    });

    it("구름많음 코드를 반환한다", () => {
      expect(getSkyConditionText(3)).toBe("구름많음");
    });

    it("흐림 코드를 반환한다", () => {
      expect(getSkyConditionText(4)).toBe("흐림");
    });

    it("알 수 없는 코드를 반환한다", () => {
      expect(getSkyConditionText(999)).toBe("알 수 없음");
    });
  });

  describe("getPrecipitationTypeText", () => {
    it("없음 코드를 반환한다", () => {
      expect(getPrecipitationTypeText(0)).toBe("없음");
    });

    it("비 코드를 반환한다", () => {
      expect(getPrecipitationTypeText(1)).toBe("비");
    });

    it("알 수 없는 코드를 반환한다", () => {
      expect(getPrecipitationTypeText(999)).toBe("알 수 없음");
    });
  });

  describe("getWeatherCondition", () => {
    it("비가 오면 rain을 반환한다", () => {
      expect(getWeatherCondition(1, 1)).toBe("rain" as WeatherCondition);
    });

    it("맑으면 sunny를 반환한다", () => {
      expect(getWeatherCondition(1, 0)).toBe("sunny" as WeatherCondition);
    });

    it("흐리면 overcast를 반환한다", () => {
      expect(getWeatherCondition(4, 0)).toBe("overcast" as WeatherCondition);
    });
  });
});
