"use client";

import WorldMap from "@/components/ui/world-map";
import { SectionHeader } from "./section-header";

const ROUTES = [
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 51.5074, lng: -0.1278 } },   // Kyiv → London
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 48.8566, lng: 2.3522 } },    // Kyiv → Paris
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 52.52, lng: 13.405 } },      // Kyiv → Berlin
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 41.0082, lng: 28.9784 } },   // Kyiv → Istanbul
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 25.2048, lng: 55.2708 } },   // Kyiv → Dubai
  { start: { lat: 50.4501, lng: 30.5234 }, end: { lat: 1.3521, lng: 103.8198 } },   // Kyiv → Singapore
];

export const WorldMapSection = () => (
  <section className="bg-white p-3 sm:p-4">
    <div className="relative flex h-[calc(100dvh-1.5rem)] min-h-[600px] flex-col overflow-hidden rounded-[28px] bg-[#1c1d1f] px-6 py-10 sm:h-[calc(100dvh-2rem)] sm:px-12 sm:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
        <SectionHeader tag="Global Network" light />
      </div>
      <div className="mt-auto flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
          <WorldMap dots={ROUTES} lineColor="#EE1C4D" />
        </div>
      </div>
    </div>
  </section>
);
