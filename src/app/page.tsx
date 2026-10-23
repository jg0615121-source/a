import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/ui/Marquee";
import { MobileApplyBar } from "@/components/ui/MobileApplyBar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Marquee />
        <ProgramSection type="sowhat" />
        <ProgramSection type="whatso" />
        <Gallery />
        <Marquee tone="amber" tilt={1.5} />
        <Contact />
      </main>
      <Footer />
      <MobileApplyBar />
    </>
  );
}
