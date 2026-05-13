/**
 * 기상청 격자 좌표 변환 유틸리티
 * WGS84(위도/경도) ↔ 기상청 격자좌표(nx, ny)
 */

const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기준점 Y좌표(GRID)

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180.0;
}

function rad2deg(rad: number): number {
  return (rad * 180.0) / Math.PI;
}

export function latLngToGrid(lat: number, lng: number): { nx: number; ny: number } {
  const re = RE / GRID;
  const slat1 = deg2rad(SLAT1);
  const slat2 = deg2rad(SLAT2);
  const olon = deg2rad(OLON);
  const olat = deg2rad(OLAT);

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + deg2rad(lat) * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);

  let theta = lng - OLON;
  if (theta > 180.0) theta -= 360.0;
  if (theta < -180.0) theta += 360.0;
  theta = sn * deg2rad(theta);

  const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
}

export function gridToLatLng(nx: number, ny: number): { lat: number; lng: number } {
  const re = RE / GRID;
  const slat1 = deg2rad(SLAT1);
  const slat2 = deg2rad(SLAT2);
  const olon = deg2rad(OLON);
  const olat = deg2rad(OLAT);

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  const xn = nx - XO;
  const yn = ro - ny + YO;

  let ra = Math.sqrt(xn * xn + yn * yn);
  if (sn < 0.0) ra = -ra;

  let alat = Math.pow((re * sf) / ra, 1.0 / sn);
  alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

  let theta = 0.0;
  if (Math.abs(xn) <= 0.0) {
    theta = 0.0;
  } else {
    theta = Math.atan2(xn, yn);
  }

  const alon = theta / sn + olon;

  return {
    lat: rad2deg(alat),
    lng: rad2deg(alon),
  };
}
