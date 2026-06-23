import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaBand, PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";
import { WorldMapSection } from "@/components/world-map";

const REGIONS = [
  { name: "North America", hubs: "New York, Los Angeles, Chicago", lanes: 42 },
  { name: "Latin America", hubs: "São Paulo, Mexico City, Bogotá", lanes: 28 },
  { name: "Europe", hubs: "Rotterdam, Hamburg, London", lanes: 56 },
  { name: "Middle East & Africa", hubs: "Dubai, Johannesburg, Nairobi", lanes: 31 },
  { name: "Asia Pacific", hubs: "Shanghai, Singapore, Tokyo", lanes: 64 },
  { name: "Oceania", hubs: "Sydney, Auckland, Melbourne", lanes: 19 },
];

const LANES = [
  { from: "Shanghai", to: "Rotterdam", mode: "Sea", days: "26 days" },
  { from: "Los Angeles", to: "Tokyo", mode: "Air", days: "2 days" },
  { from: "Frankfurt", to: "Dubai", mode: "Air", days: "1 day" },
  { from: "New York", to: "São Paulo", mode: "Sea", days: "18 days" },
  { from: "Singapore", to: "Sydney", mode: "Sea", days: "12 days" },
  { from: "London", to: "New York", mode: "Air", days: "1 day" },
];

export default function DirectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Directions"
          title="Reaching every market, on every continent"
          subtitle="A connected network of hubs and trade lanes that moves your cargo between 150+ countries with real-time visibility."
          image="/cards/project.jpg"
        />

        <WorldMapSection />

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow label="Coverage" />
            <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              Six regions, one network
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.06} blur={false}>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-200 p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-[#242527] text-lg">{r.name}</h3>
                    <span className="font-bold text-[#EE1C4D] text-sm tabular-nums">{r.lanes} lanes</span>
                  </div>
                  <p className="mt-2 text-neutral-500 text-sm leading-relaxed">{r.hubs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-white p-3 sm:p-4">
          <div className="overflow-hidden rounded-[28px] bg-neutral-50 px-6 py-16 sm:px-12">
            <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
              <Reveal>
                <SectionEyebrow label="Popular Lanes" />
                <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
                  Trusted trade lanes, ready to book
                </h2>
              </Reveal>
              <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {LANES.map((lane, i) => (
                  <Reveal key={`${lane.from}-${lane.to}`} delay={(i % 6) * 0.04} blur={false}>
                    <div className={`flex items-center justify-between gap-4 px-5 py-4 ${i > 0 ? "border-neutral-100 border-t" : ""}`}>
                      <div className="flex items-center gap-2 font-medium text-[#242527] text-sm sm:text-base">
                        {lane.from}
                        <span className="text-neutral-300">to</span>
                        {lane.to}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="rounded-full bg-[#EE1C4D]/10 px-2.5 py-1 font-medium text-[#EE1C4D] text-xs">{lane.mode}</span>
                        <span className="w-16 text-right text-neutral-500 tabular-nums">{lane.days}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="pt-16 sm:pt-20">
          <CtaBand
            title="Need a route we have not listed?"
            text="Our team builds custom lanes for any origin and destination worldwide."
            primaryLabel="Talk to our team"
            primaryHref="/contacts"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
