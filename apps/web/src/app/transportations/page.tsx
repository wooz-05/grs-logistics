import { Check } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaBand, PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";

const MODES = [
  {
    title: "Sea Freight",
    image: "/transport/sea.png",
    text: "Cost-effective ocean shipping for high-volume cargo, with FCL and LCL options on every major trade lane.",
    points: ["Full and less-than container load", "Reefer and out-of-gauge cargo", "Port-to-port and door-to-door"],
  },
  {
    title: "Ground Transport",
    image: "/transport/ground.png",
    text: "Flexible road freight for regional and cross-border moves, backed by a vetted carrier network.",
    points: ["FTL and LTL trucking", "Cross-border customs handling", "Live GPS tracking on every load"],
  },
  {
    title: "Rail Freight",
    image: "/transport/rail.png",
    text: "Sustainable, reliable long-haul rail that balances cost and transit time across continents.",
    points: ["Intermodal rail and road", "Block trains for high volume", "Lower-emission corridors"],
  },
  {
    title: "Air Freight",
    image: "/transport/air.png",
    text: "Time-critical air cargo when speed matters most, with priority and charter options worldwide.",
    points: ["Next-flight-out priority", "Charter and on-board courier", "Temperature-sensitive handling"],
  },
];

export default function TransportationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Transportations"
          title="Move anything, anywhere, by any mode"
          subtitle="Sea, ground, rail, and air, combined into one seamless network so your cargo always takes the smartest route."
          image="/transport/sea.png"
        />

        <section className="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col gap-20 py-20 sm:gap-28 sm:py-28">
          {MODES.map((mode, i) => (
            <Reveal key={mode.title} blur={false}>
              <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[28px] border border-neutral-200">
                  <img src={mode.image} alt={mode.title} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div>
                  <SectionEyebrow label={`0${i + 1} Mode`} />
                  <h2 className="mt-4 font-bold text-3xl text-[#242527] leading-tight tracking-tight sm:text-4xl">
                    {mode.title}
                  </h2>
                  <p className="mt-4 max-w-md text-neutral-500 leading-relaxed">{mode.text}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {mode.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[#242527] text-sm">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#EE1C4D]/10 text-[#EE1C4D]">
                          <Check className="size-3.5" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <CtaBand
          title="One network, every mode"
          text="Let us design the fastest, most cost-effective route for your next shipment."
          primaryLabel="Request a quote"
          primaryHref="/contacts"
          secondaryLabel="See our services"
          secondaryHref="/services"
        />
      </main>
      <Footer />
    </div>
  );
}
