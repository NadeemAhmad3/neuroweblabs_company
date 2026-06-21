import Hero from "@/components/Hero";
import TechAlliances from "@/components/TechAlliance";
import Capabilities from "@/components/Capabilities";
import Industries from "@/components/Industries";
import ActionCTA from "@/components/ActionCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[var(--color-islamabad-bg)]">
      <Hero />
      <TechAlliances />
      <Capabilities />
      <Industries />
      
      <ActionCTA />
      <Contact />
      <Footer />
    </main>
  );
}