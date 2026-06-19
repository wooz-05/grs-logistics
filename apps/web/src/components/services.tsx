import { Truck, Warehouse, Workflow, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./section-header";

const SERVICES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Freight Forwarding",
    description:
      "Reliable transportation of goods by air, land, or sea. We handle logistics, customs clearance, and delivery.",
    icon: Truck,
  },
  {
    title: "Warehousing and Storage",
    description:
      "Secure, climate-controlled storage with flexible options and real-time inventory management.",
    icon: Warehouse,
  },
  {
    title: "Supply Chain Management",
    description:
      "Customized logistics solutions to optimize your supply chain, reduce costs, and improve efficiency.",
    icon: Workflow,
  },
];

export const Services = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
    <SectionHeader tag="Types of Transport" />
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
