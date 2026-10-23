import { brand } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const c = brand.contact;
  return (
    <section id="contact" className="scroll-mt-16 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,7vw,4.5rem)] leading-none font-black tracking-tight">
            문의 및 협업
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{c.collaboration}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {c.instagram ? (
            <a
              href={c.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-white px-6 py-6 transition-colors hover:border-neon hover:bg-neon hover:text-black md:px-10 md:py-8"
            >
              <span>
                <span className="block text-sm font-bold tracking-[0.2em] opacity-70">INSTAGRAM</span>
                <span className="mt-1 block text-2xl font-black md:text-4xl">
                  {c.instagramHandle || "인스타그램"}
                </span>
              </span>
              <span className="text-3xl transition-transform group-hover:translate-x-1 md:text-5xl">
                →
              </span>
            </a>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-white/20 px-6 py-6 md:px-10 md:py-8">
              <span className="block text-sm font-bold tracking-[0.2em] text-mute">INSTAGRAM</span>
              <span className="mt-1 block text-2xl font-black text-white/60 md:text-4xl">준비 중</span>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
