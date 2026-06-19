import { Truck, Warehouse, Workflow, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./section-header";

const SERVICES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Freight Forwarding",
    description:
      "End-to-end cargo management by air, sea, and land. We coordinate customs clearance, documentation, and last-mile delivery so your shipments arrive on time, every time.",
    icon: Truck,
  },
  {
    title: "Warehousing & Storage",
    description:
      "Climate-controlled facilities with 24/7 security, flexible short and long-term storage, and real-time inventory visibility through our digital management platform.",
    icon: Warehouse,
  },
  {
    title: "Supply Chain Management",
    description:
      "Strategic logistics consulting that maps, optimises, and scales your entire supply chain — cutting costs, reducing lead times, and building resilience into every link.",
    icon: Workflow,
  },
];

export const Services = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
    <SectionHeader
      tag="What We Offer"
      heading={<>Full-spectrum logistics, <span className="text-[#EE1C4D]">built around</span> your business</>}
    />
    <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-0">
      {SERVICES.map((service, index) => (
        <div
          key={service.title}
          className={`flex flex-col gap-4 sm:px-8 ${
            index > 0 ? "sm:border-neutral-200 sm:border-l" : ""
          } ${index === 0 ? "sm:pl-0" : ""}`}
        >
          <span className="flex size-12 items-center justify-center rounded-xl bg-[#EE1C4D]/10 text-[#EE1C4D]">
            <service.icon className="size-6" strokeWidth={1.75} />
          </span>
          <h3 className="font-bold text-[#242527] text-lg">{service.title}</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
