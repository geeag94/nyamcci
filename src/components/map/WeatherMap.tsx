"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_LOCATIONS } from "@/src/constants/weather";
import { useLocationStore } from "@/src/stores/locationStore";
import Link from "next/link";

const customIcon = new Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function WeatherMap() {
  const { setLocation } = useLocationStore();

  return (
    <div className="rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <MapContainer
        center={[36.5, 127.5]}
        zoom={7}
        style={{ height: "60vh", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {DEFAULT_LOCATIONS.map((loc) => (
          <Marker
            key={`${loc.nx}-${loc.ny}`}
            position={[loc.lat, loc.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-[#1E293B]">{loc.name}</p>
                <Link
                  href="/"
                  onClick={() => setLocation(loc)}
                  className="text-sm text-[#60A5FA] hover:underline"
                >
                  날씨 보기
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
