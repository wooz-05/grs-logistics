import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";

const OFFICES = [
  { city: "New York", role: "Global HQ", address: "Pier 17, Harbor Bay, NY 10004", phone: "+1 (555) 018-2200" },
  { city: "Rotterdam", role: "Europe", address: "Waalhaven 12, 3088 Rotterdam", phone: "+31 10 555 0190" },
  { city: "Singapore", role: "Asia Pacific", address: "9 Keppel Rd, Singapore 089084", phone: "+65 6555 0142" },
  { city: "Dubai", role: "Middle East", address: "Jebel Ali Free Zone, Dubai", phone: "+971 4 555 0177" },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Contacts"
          title="We are here to help you ship"
          subtitle="Questions, quotes, or partnerships, reach the GRS team and we will get back to you within one business day."
          image="/shop/shelving.jpg"
        />

        <Contact />

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-20 sm:pb-28">
          <Reveal>
            <SectionEyebrow label="Our Offices" />
            <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              Find us around the world
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <Reveal key={o.city} delay={(i % 4) * 0.08} blur={false}>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-200 p-6">
                  <span className="font-medium text-[11px] text-[#EE1C4D] uppercase tracking-wider">{o.role}</span>
                  <h3 className="mt-1 font-bold text-[#242527] text-lg">{o.city}</h3>
                  <p className="mt-2 text-neutral-500 text-sm leading-relaxed">{o.address}</p>
                  <p className="mt-3 font-medium text-[#242527] text-sm">{o.phone}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
