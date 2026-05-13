import { describe, it, expect } from "vitest";
import { latLngToGrid, gridToLatLng } from "@/src/lib/coordinate";

describe("Coordinate Utils", () => {
  describe("latLngToGrid", () => {
    it("서울 좌표를 기상청 격자 좌표로 변환한다", () => {
      const result = latLngToGrid(37.5665, 126.978);
      expect(result.nx).toBe(60);
      expect(result.ny).toBe(127);
    });

    it("부산 좌표를 기상청 격자 좌표로 변환한다", () => {
      const result = latLngToGrid(35.1796, 129.0756);
      expect(result.nx).toBe(98);
      expect(result.ny).toBe(76);
    });
  });

  describe("gridToLatLng", () => {
    it("격자 좌표를 위도/경도로 변환한다", () => {
      const result = gridToLatLng(60, 127);
      expect(result.lat).toBeCloseTo(37.5665, 0);
      expect(result.lng).toBeCloseTo(126.978, 0);
    });
  });
});
