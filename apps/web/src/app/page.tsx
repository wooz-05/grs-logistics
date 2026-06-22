import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { TransportTypes } from "@/components/transport-types";
import { WorldMapSection } from "@/components/world-map";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main>
      <Hero />
      <Partners />
      <TransportTypes />
      <WorldMapSection />
      <Services />
      <Showcase />
      <Faq />
      <Contact />
    </main>
    <Footer />
  </div>
);
