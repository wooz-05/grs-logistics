import Image from "next/image";
import { SectionHeader } from "./section-header";

const TRANSPORT = [
  { title: "Sea Transport", src: "/transport/sea.png" },
  { title: "Ground Transport", src: "/transport/ground.png" },
  { title: "Rail Transport", src: "/transport/rail.png" },
  { title: "Air Transport", src: "/transport/air.png" },
];

const TransportCard = ({ title, src }: { title: string; src: string }) => (
  <article className="group relative flex h-full min-h-[220px] items-start overflow-hidden rounded-2xl bg-neutral-200 p-6">
    <Image
      src={src}
      alt={title}
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/30"
    />
    <h3 className="relative font-semibold text-white text-xl drop-shadow-md">
      {title}
    </h3>
  </article>
);

export const TransportTypes = () => (
  <section className="mx-auto flex min-h-dvh w-[min(1180px,calc(100%-2rem))] flex-col py-16">
    <SectionHeader
      tag="How We Move"
      heading={<>Move anything, <span className="text-[#EE1C4D]">anywhere</span> — by any mode</>}
    />
    <div className="mt-10 grid flex-1 gap-5 sm:grid-cols-2 sm:grid-rows-2">
      {TRANSPORT.map(({ title, src }) => (
        <TransportCard key={title} title={title} src={src} />
      ))}
    </div>
  </section>
);
