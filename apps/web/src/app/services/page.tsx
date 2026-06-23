import {
  FileCheck,
  type LucideIcon,
  MapPin,
  Snowflake,
  Truck,
  Warehouse,
  Workflow,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaBand, PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";

const SERVICES: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: Truck, title: "Freight Forwarding", text: "End-to-end cargo management by air, sea, and land, coordinated from pickup to final delivery.", tint: "bg-[#d2e6f8] text-[#2474b8]" },
  { icon: Warehouse, title: "Warehousing & Storage", text: "Climate-controlled facilities with 24/7 security and real-time inventory visibility.", tint: "bg-[#d3eee0] text-[#2f8f59]" },
  { icon: Workflow, title: "Supply Chain Management", text: "Strategic consulting that maps, optimises, and scales your entire supply chain.", tint: "bg-[#e5d9f6] text-[#7649be]" },
  { icon: FileCheck, title: "Customs Clearance", text: "In-house brokerage handling documentation, duties, and compliance across every border.", tint: "bg-[#fbdce5] text-[#e04a72]" },
  { icon: Snowflake, title: "Cold Chain Logistics", text: "Temperature-controlled transport for pharmaceuticals, food, and sensitive cargo.", tint: "bg-[#fbe3cd] text-[#e5732b]" },
  { icon: MapPin, title: "Last-Mile Delivery", text: "Reliable final-leg distribution that gets your goods to the right hands on time.", tint: "bg-[#f8edc2] text-[#ce9e28]" },
];

const STEPS = [
  { n: "01", title: "Plan", text: "We map your route, mode, and timeline and quote it transparently." },
  { n: "02", title: "Book", text: "Confirm online and get instant access to your shipment dashboard." },
  { n: "03", title: "Move", text: "Your cargo moves with live tracking and proactive milestone alerts." },
  { n: "04", title: "Deliver", text: "Final-mile delivery with proof of delivery and full documentation." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Services"
          title="Logistics services built around your cargo"
          subtitle="From a single pallet to a full supply chain, GRS handles every detail so your freight keeps moving."
          image="/cards/tracking.jpg"
        />

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow label="What We Offer" />
            <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              A full-spectrum logistics partner
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06} blur={false}>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-200 p-6">
                  <span className={`flex size-12 items-center justify-center rounded-xl ${s.tint}`}>
                    <s.icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-bold text-[#242527] text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-white p-3 sm:p-4">
          <div className="overflow-hidden rounded-[28px] bg-neutral-50 px-6 py-16 sm:px-12">
            <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
              <Reveal>
                <SectionEyebrow label="How We Work" />
                <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
                  Four steps from quote to doorstep
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step, i) => (
                  <Reveal key={step.n} delay={(i % 4) * 0.08} blur={false}>
                    <div className="border-[#EE1C4D] border-t-2 pt-5">
                      <span className="font-bold text-[#EE1C4D] text-sm tabular-nums">{step.n}</span>
                      <h3 className="mt-1 font-bold text-[#242527] text-lg">{step.title}</h3>
                      <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">{step.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="pt-16 sm:pt-20">
          <CtaBand
            title="Not sure which service you need?"
            text="Tell us about your shipment and our team will recommend the right solution."
            primaryLabel="Request a quote"
            primaryHref="/contacts"
            secondaryLabel="Browse the store"
            secondaryHref="/ecommerce"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
