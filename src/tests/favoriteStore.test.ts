import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavoriteStore } from "@/src/stores/favoriteStore";

describe("FavoriteStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useFavoriteStore());
    act(() => {
      result.current.favorites.forEach((f) => result.current.removeFavorite(f.id));
    });
  });

  it("즐겨찾기를 추가한다", () => {
    const { result } = renderHook(() => useFavoriteStore());

    act(() => {
      result.current.addFavorite({
        name: "서울",
        nx: 60,
        ny: 127,
        lat: 37.5665,
        lng: 126.978,
      });
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].location.name).toBe("서울");
  });

  it("중복 즐겨찾기를 추가하지 않는다", () => {
    const { result } = renderHook(() => useFavoriteStore());
    const location = {
      name: "서울",
      nx: 60,
      ny: 127,
      lat: 37.5665,
      lng: 126.978,
    };

    act(() => {
      result.current.addFavorite(location);
      result.current.addFavorite(location);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("즐겨찾기를 제거한다", () => {
    const { result } = renderHook(() => useFavoriteStore());
    const location = {
      name: "서울",
      nx: 60,
      ny: 127,
      lat: 37.5665,
      lng: 126.978,
    };

    act(() => {
      result.current.addFavorite(location);
    });

    const id = result.current.favorites[0].id;

    act(() => {
      result.current.removeFavorite(id);
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it("즐겨찾기 여부를 확인한다", () => {
    const { result } = renderHook(() => useFavoriteStore());
    const location = {
      name: "서울",
      nx: 60,
      ny: 127,
      lat: 37.5665,
      lng: 126.978,
    };

    expect(result.current.isFavorite(60, 127)).toBe(false);

    act(() => {
      result.current.addFavorite(location);
    });

    expect(result.current.isFavorite(60, 127)).toBe(true);
  });
});
