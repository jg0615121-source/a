"use client";

import { motion } from "motion/react";
import { brand } from "@/content/site";
import { Reveal, Stagger, staggerChild } from "@/components/ui/Reveal";

export function About() {
  const a = brand.about;
  return (
    <section id="about" className="scroll-mt-16 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.2em] text-neon">{a.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(2rem,6.4vw,4.5rem)] leading-[1.15] font-extrabold tracking-tight">
            <span className="block text-mute">{a.headline[0]}</span>
            <span className="block">{a.headline[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal delay={0.1}>
            <div className="space-y-2 text-lg leading-relaxed md:text-xl">
              {a.lead.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <p className="mt-8 inline-block -rotate-1 border-2 border-white px-4 py-3 text-base font-bold md:text-lg">
              {a.recruit}
            </p>
          </Reveal>

          <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
            {a.keywords.map((k) => (
              <motion.li
                key={k.title}
                variants={staggerChild}
                className="group rounded-2xl border border-white/15 bg-white/[0.03] p-6 transition-colors hover:border-neon/70"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-neon">{k.tag}</p>
                <h3 className="mt-3 text-xl font-bold">{k.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{k.body}</p>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
