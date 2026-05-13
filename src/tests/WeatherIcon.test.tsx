import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherIcon from "@/src/components/weather/WeatherIcon";
import type { WeatherCondition } from "@/src/types/weather";

describe("WeatherIcon", () => {
  const conditions: WeatherCondition[] = [
    "sunny",
    "cloudy",
    "overcast",
    "rain",
    "snow",
    "shower",
    "thunder",
  ];

  conditions.forEach((condition) => {
    it(`${condition} 아이콘을 렌더링한다`, () => {
      render(<WeatherIcon condition={condition} size={64} />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  it("기본 크기로 렌더링된다", () => {
    render(<WeatherIcon condition="sunny" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "64");
    expect(svg).toHaveAttribute("height", "64");
  });

  it("커스텀 크기로 렌더링된다", () => {
    render(<WeatherIcon condition="sunny" size={120} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "120");
    expect(svg).toHaveAttribute("height", "120");
  });
});
