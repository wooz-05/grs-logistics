import { Reveal } from "./reveal";

const PARTNERS = [
  "METINVEST",
  "Beiersdorf",
  "SONY",
  "KERNEL",
  "ŠKODA",
  "ArcelorMittal",
];

export const Partners = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
    <Reveal blur={false}>
      <p className="mb-8 text-center font-medium text-neutral-400 text-xs uppercase tracking-[0.2em]">
        Trusted by global brands
      </p>
    </Reveal>
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-between">
      {PARTNERS.map((partner, index) => (
        <Reveal key={partner} delay={index * 0.07} blur={false}>
          <li className="font-semibold text-lg text-neutral-400 tracking-wide grayscale transition-colors hover:text-neutral-600">
            {partner}
          </li>
        </Reveal>
      ))}
    </ul>
  </section>
);
