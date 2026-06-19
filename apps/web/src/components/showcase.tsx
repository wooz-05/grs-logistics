import { Placeholder } from "./placeholder";

const CARDS = ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"];

export const Showcase = () => (
  <section className="relative overflow-hidden">
    {/* Faint chevron watermark behind the left column */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-[0.04]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(115deg, #242527 0 2px, transparent 2px 26px)",
      }}
    />
    <div className="relative mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-12 py-16 lg:grid-cols-2">
      <div className="lg:pt-4">
        <h2 className="max-w-xl text-pretty font-bold text-3xl text-[#242527] leading-tight tracking-tight sm:text-4xl">
          From <span className="text-[#EE1C4D]">cargo transit</span> to every
          unparallelled support
        </h2>
        <p className="mt-6 max-w-sm text-neutral-500 text-sm leading-relaxed">
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
          Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {CARDS.map((label, index) => (
          <article
            key={`${label}-${index}`}
            className="flex flex-col gap-3"
          >
            <h3 className="font-semibold text-[#242527] text-lg">{label}</h3>
            <Placeholder className="aspect-[16/6] w-full rounded-2xl" />
          </article>
        ))}
      </div>
    </div>
  </section>
);
