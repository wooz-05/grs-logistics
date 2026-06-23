import { Eye, Handshake, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

const GrsArrow = () => (
  <svg width="14" height="12" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill="#fff" />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill="#fff" />
  </svg>
);

const STATS = [
  { value: "14+", label: "Years moving freight" },
  { value: "150+", label: "Countries served" },
  { value: "20K+", label: "Shipments a year" },
  { value: "99.2%", label: "On-time delivery" },
];

const VALUES = [
  { icon: Target, title: "Precision", text: "Every detail handled with care, from documentation to the final mile.", tint: "bg-[#d2e6f8] text-[#2474b8]" },
  { icon: ShieldCheck, title: "Reliability", text: "On-time delivery you can plan your entire business around.", tint: "bg-[#d3eee0] text-[#2f8f59]" },
  { icon: Eye, title: "Transparency", text: "Real-time tracking and clear pricing, with no surprises.", tint: "bg-[#e5d9f6] text-[#7649be]" },
  { icon: Handshake, title: "Partnership", text: "A dedicated team that treats your cargo like our own.", tint: "bg-[#fbdce5] text-[#e04a72]" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white p-3 sm:p-4">
          <div className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#242527] px-6 py-12 sm:min-h-[640px] sm:px-12 sm:py-16">
            <img src="/shop/shelving.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242527] via-[#242527]/70 to-[#242527]/30" />
            <div className="relative z-10 mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
              <span className="inline-flex items-center gap-1.5 font-medium text-sm text-white/70">
                <GrsArrow />
                About GRS
              </span>
              <h1 className="mt-4 max-w-2xl text-balance font-bold text-4xl text-white leading-[1.05] tracking-tight sm:text-6xl">
                Moving the world forward, one shipment at a time.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
                Founded in 2010, GRS Logistics has grown into a global freight partner trusted by thousands of businesses to move cargo by sea, air, rail, and road, with precision and care at every step.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-20 sm:py-28">
          <SectionHeader
            tag="Our Story"
            heading={<>Built on reliability, <span className="text-[#EE1C4D]">driven by people</span></>}
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-neutral-600 text-lg leading-relaxed">
                GRS started with a single truck and a simple promise: get every shipment where it needs to be, on time. More than a decade later, that promise still drives everything we do across our network of hubs on six continents.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Today our team blends seasoned logistics expertise with a modern digital platform, giving customers real-time visibility, transparent pricing, and a dedicated partner for shipments of any size or complexity.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white p-3 sm:p-4">
          <div className="overflow-hidden rounded-[28px] bg-[#242527] py-14">
            <div className="mx-auto grid w-[min(1180px,calc(100%-3rem))] grid-cols-2 gap-y-10 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={(i % 4) * 0.08} blur={false}>
                  <div className={`px-2 sm:px-6 ${i > 0 ? "lg:border-white/10 lg:border-l" : ""}`}>
                    <div className="font-bold text-4xl text-white tracking-tight sm:text-5xl">{s.value}</div>
                    <div className="mt-2 text-sm text-white/60">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
            <SectionHeader
              tag="What We Stand For"
              heading={<>The principles behind <span className="text-[#EE1C4D]">every shipment</span></>}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={(i % 4) * 0.08} blur={false}>
                  <div className="flex h-full flex-col rounded-3xl border border-neutral-200 p-6">
                    <span className={`flex size-12 items-center justify-center rounded-xl ${v.tint}`}>
                      <v.icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-bold text-[#242527] text-lg">{v.title}</h3>
                    <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white p-3 sm:p-4">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#EE1C4D]">
            <svg
              aria-hidden
              viewBox="0 0 30 25"
              fill="currentColor"
              className="pointer-events-none absolute -right-6 -bottom-10 h-72 w-auto text-white/10"
            >
              <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" />
              <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" />
            </svg>
            <div className="relative z-10 mx-auto flex w-[min(1180px,calc(100%-3rem))] flex-col items-start gap-6 py-16 sm:items-center sm:text-center">
              <h2 className="max-w-xl font-bold text-3xl text-white leading-tight tracking-tight sm:text-4xl">
                Ready to move your cargo forward?
              </h2>
              <p className="max-w-md text-white/80 leading-relaxed">
                Tell us about your shipment and our team will build the right logistics solution for your business.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-white px-7 font-medium text-[#EE1C4D] text-sm transition-colors hover:bg-neutral-100">
                  Get in touch
                </Link>
                <Link href="/ecommerce" className="inline-flex h-12 items-center rounded-full border border-white/60 px-7 font-medium text-sm text-white transition-colors hover:bg-white hover:text-[#EE1C4D]">
                  Explore the store
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
