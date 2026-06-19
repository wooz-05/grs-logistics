import { SectionHeader } from "./section-header";

export const WorldMap = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-8">
    <div className="relative overflow-hidden rounded-[28px] bg-[#1c1d1f] px-8 py-10 sm:px-12 sm:py-12">
      <div className="relative z-10">
        <SectionHeader tag="Types of Transport" light />
      </div>
      {/* Dotted world-map placeholder (connected-dots illustration to follow) */}
      <div
        aria-hidden
        className="pointer-events-none mt-8 h-[360px] w-full opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.35) 1.1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 45%, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 45%, black 35%, transparent 80%)",
        }}
      />
    </div>
  </section>
);
