import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaBand, PageHero, SectionEyebrow } from "@/components/page-parts";
import { Reveal } from "@/components/reveal";

const ARTICLES = [
  { category: "Guide", title: "Incoterms 2020, explained simply", read: "6 min read", image: "/cards/customs.jpg" },
  { category: "Insight", title: "Choosing the right freight mode for your cargo", read: "5 min read", image: "/transport/air.png" },
  { category: "Checklist", title: "Customs documentation, the complete checklist", read: "4 min read", image: "/shop/labels.jpg" },
  { category: "Playbook", title: "Cutting supply chain costs without cutting corners", read: "8 min read", image: "/shop/shelving.jpg" },
  { category: "Guide", title: "Cold chain best practices for perishables", read: "7 min read", image: "/cards/coldchain.jpg" },
  { category: "Insight", title: "Planning ahead for peak shipping season", read: "5 min read", image: "/shop/forklift.jpg" },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PageHero
          eyebrow="Resources"
          title="Guides, tools, and insights for smarter shipping"
          subtitle="Practical know-how from our logistics specialists to help you move cargo faster, cheaper, and with fewer surprises."
          image="/cards/customs.jpg"
        />

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow label="Latest" />
            <h2 className="mt-4 max-w-2xl font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              From the GRS knowledge base
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06} blur={false}>
                <Link
                  href="/resources"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-colors hover:border-[#EE1C4D]"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-medium text-[11px] text-[#EE1C4D] uppercase tracking-wider">{a.category}</span>
                    <h3 className="mt-1.5 font-bold text-[#242527] text-lg leading-snug">{a.title}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-neutral-400 text-xs">{a.read}</span>
                      <ArrowUpRight className="size-4 text-neutral-400 transition-colors group-hover:text-[#EE1C4D]" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand
          title="Get logistics insights in your inbox"
          text="Join thousands of shippers who get our monthly guides and market updates."
          primaryLabel="Contact us to subscribe"
          primaryHref="/contacts"
        />
      </main>
      <Footer />
    </div>
  );
}
