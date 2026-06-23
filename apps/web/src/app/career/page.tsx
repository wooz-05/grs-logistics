import {
  GraduationCap,
  HeartHandshake,
  type LucideIcon,
  Plane,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaBand, PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";

const BENEFITS: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: TrendingUp, title: "Real growth", text: "Clear progression and the budget to learn new skills every year.", tint: "bg-[#d2e6f8] text-[#2474b8]" },
  { icon: Plane, title: "Global team", text: "Work alongside colleagues across hubs on six continents.", tint: "bg-[#d3eee0] text-[#2f8f59]" },
  { icon: HeartHandshake, title: "People first", text: "Flexible hours, strong benefits, and a culture that has your back.", tint: "bg-[#fbdce5] text-[#e04a72]" },
  { icon: GraduationCap, title: "Learn the trade", text: "Mentorship from logistics veterans who built our network.", tint: "bg-[#e5d9f6] text-[#7649be]" },
];

const ROLES = [
  { title: "Freight Operations Coordinator", location: "New York, US", type: "Full-time" },
  { title: "Warehouse Supervisor", location: "Rotterdam, NL", type: "Full-time" },
  { title: "Customs Broker", location: "Singapore", type: "Full-time" },
  { title: "Fleet Dispatcher", location: "Dubai, UAE", type: "Full-time" },
  { title: "Software Engineer, Platform", location: "Remote", type: "Full-time" },
  { title: "Account Manager", location: "London, UK", type: "Full-time" },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Careers"
          title="Build the future of logistics with us"
          subtitle="We are always looking for people who love solving hard problems and moving the world forward."
          image="/cards/tracking.jpg"
        />

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow label="Why GRS" />
            <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              A place to do the best work of your career
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 0.08} blur={false}>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-200 p-6">
                  <span className={`flex size-12 items-center justify-center rounded-xl ${b.tint}`}>
                    <b.icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-bold text-[#242527] text-lg">{b.title}</h3>
                  <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-white p-3 sm:p-4">
          <div className="overflow-hidden rounded-[28px] bg-neutral-50 px-6 py-16 sm:px-12">
            <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
              <Reveal>
                <SectionEyebrow label="Open Roles" />
                <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
                  Find your next role
                </h2>
              </Reveal>
              <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {ROLES.map((role, i) => (
                  <Reveal key={role.title} delay={(i % 6) * 0.04} blur={false}>
                    <Link
                      href="/contacts"
                      className="group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between"
                      style={i > 0 ? { borderTop: "1px solid #f5f5f5" } : undefined}
                    >
                      <div>
                        <h3 className="font-bold text-[#242527] text-base transition-colors group-hover:text-[#EE1C4D]">{role.title}</h3>
                        <p className="mt-0.5 text-neutral-500 text-sm">{role.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-neutral-400 text-sm">{role.type}</span>
                        <span className="font-medium text-[#EE1C4D] text-sm">Apply</span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="pt-16 sm:pt-20">
          <CtaBand
            title="Do not see the right role?"
            text="Send us your details anyway. We are always glad to meet great people."
            primaryLabel="Send an open application"
            primaryHref="/contacts"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
