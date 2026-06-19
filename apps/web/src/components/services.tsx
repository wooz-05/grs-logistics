import { SectionHeader } from "./section-header";

const SERVICES = [
  {
    title: "Freight Forwarding",
    description:
      "Reliable transportation of goods by air, land, or sea. We handle logistics, customs clearance, and delivery.",
  },
  {
    title: "Warehousing and Storage",
    description:
      "Secure, climate-controlled storage with flexible options and real-time inventory management.",
  },
  {
    title: "Supply Chain Management",
    description:
      "Customized logistics solutions to optimize your supply chain, reduce costs, and improve efficiency.",
  },
];

export const Services = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
    <SectionHeader tag="Types of Transport" />
    <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-0">
      {SERVICES.map((service, index) => (
        <div
          key={service.title}
          className={`flex flex-col gap-3 sm:px-8 ${
            index > 0 ? "sm:border-neutral-200 sm:border-l" : ""
          } ${index === 0 ? "sm:pl-0" : ""}`}
        >
          <span className="h-2 w-10 rounded-sm bg-[#EE1C4D]/30" />
          <h3 className="font-bold text-[#242527] text-lg">{service.title}</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
