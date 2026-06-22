"use client";

import WorldMap from "@/components/ui/world-map";
import { SectionHeader } from "./section-header";

// Major logistics hubs
const NYC       = { lat: 40.7128,  lng: -74.006,   label: "New York",     country: "United States" };
const LA        = { lat: 34.0522,  lng: -118.2437, label: "Los Angeles",  country: "United States" };
const LONDON    = { lat: 51.5074,  lng: -0.1278,   label: "London",       country: "United Kingdom" };
const FRANKFURT = { lat: 50.1109,  lng: 8.6821,    label: "Frankfurt",    country: "Germany" };
const DUBAI     = { lat: 25.2048,  lng: 55.2708,   label: "Dubai",        country: "UAE" };
const SINGAPORE = { lat: 1.3521,   lng: 103.8198,  label: "Singapore",    country: "Singapore" };
const SHANGHAI  = { lat: 31.2304,  lng: 121.4737,  label: "Shanghai",     country: "China" };
const SYDNEY    = { lat: -33.8688, lng: 151.2093,  label: "Sydney",       country: "Australia" };
const SAOPAULO  = { lat: -23.5505, lng: -46.6333,  label: "São Paulo",    country: "Brazil" };
const JOHANNESBURG = { lat: -26.2041, lng: 28.0473, label: "Johannesburg", country: "South Africa" };

const ROUTES = [
  // NYC spokes
  { start: NYC, end: LONDON },
  { start: NYC, end: FRANKFURT },
  { start: NYC, end: SAOPAULO },
  { start: NYC, end: DUBAI },
  { start: NYC, end: { lat: 19.4326, lng: -99.1332, label: "Mexico City", country: "Mexico" } },
  { start: NYC, end: { lat: -34.6037, lng: -58.3816, label: "Buenos Aires", country: "Argentina" } },

  // LA spokes
  { start: LA, end: SHANGHAI },
  { start: LA, end: SINGAPORE },
  { start: LA, end: { lat: 35.6762, lng: 139.6503, label: "Tokyo",   country: "Japan" } },
  { start: LA, end: { lat: -33.8688, lng: 151.2093, label: "Sydney", country: "Australia" } },
  { start: LA, end: NYC },

  // London spokes
  { start: LONDON, end: DUBAI },
  { start: LONDON, end: { lat: 30.0444, lng: 31.2357, label: "Cairo",     country: "Egypt" } },
  { start: LONDON, end: { lat: 48.8566, lng: 2.3522,  label: "Paris",     country: "France" } },
  { start: LONDON, end: JOHANNESBURG },
  { start: LONDON, end: FRANKFURT },

  // Frankfurt spokes
  { start: FRANKFURT, end: DUBAI },
  { start: FRANKFURT, end: { lat: 55.7558, lng: 37.6173, label: "Moscow",   country: "Russia" } },
  { start: FRANKFURT, end: { lat: 59.3293, lng: 18.0686, label: "Stockholm", country: "Sweden" } },
  { start: FRANKFURT, end: SINGAPORE },

  // Dubai spokes
  { start: DUBAI, end: SINGAPORE },
  { start: DUBAI, end: { lat: 28.6139, lng: 77.209,  label: "New Delhi", country: "India" } },
  { start: DUBAI, end: { lat: -1.2921, lng: 36.8219, label: "Nairobi",   country: "Kenya" } },
  { start: DUBAI, end: JOHANNESBURG },
  { start: DUBAI, end: SHANGHAI },

  // Singapore spokes
  { start: SINGAPORE, end: SHANGHAI },
  { start: SINGAPORE, end: SYDNEY },
  { start: SINGAPORE, end: { lat: 35.6762, lng: 139.6503, label: "Tokyo",  country: "Japan" } },
  { start: SINGAPORE, end: { lat: 22.3193, lng: 114.1694, label: "Hong Kong", country: "China" } },

  // Shanghai spokes
  { start: SHANGHAI, end: { lat: 35.6762, lng: 139.6503, label: "Tokyo",   country: "Japan" } },
  { start: SHANGHAI, end: SYDNEY },

  // São Paulo spokes
  { start: SAOPAULO, end: JOHANNESBURG },
  { start: SAOPAULO, end: LONDON },
  { start: SAOPAULO, end: { lat: 4.711, lng: -74.0721, label: "Bogotá", country: "Colombia" } },
];

export const WorldMapSection = () => (
  <section className="bg-white p-3 sm:p-4">
    <div className="relative flex h-[calc(100dvh-1.5rem)] min-h-[600px] flex-col overflow-hidden rounded-[28px] bg-[#242527] px-6 py-10 sm:h-[calc(100dvh-2rem)] sm:px-12 sm:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
        <SectionHeader
          tag="Global Network"
          heading={<>Connecting <span className="text-[#EE1C4D]">markets</span> across every continent</>}
          light
        />
      </div>
      <div className="mt-auto flex flex-1 flex-col justify-center gap-4">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
          <WorldMap dots={ROUTES} lineColor="#EE1C4D" />
        </div>
        <p className="mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))] text-center text-neutral-500 text-sm leading-relaxed">
          GRS Logistics operates across <span className="text-neutral-300">150+ countries</span>, connecting major trade hubs through
          sea, air, rail, and road, with real-time visibility at every step of the journey.
        </p>
      </div>
    </div>
  </section>
);
