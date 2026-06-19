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
    <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
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
