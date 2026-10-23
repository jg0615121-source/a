"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { gallery } from "@/content/site";
import { usePrograms } from "@/lib/programs";
import { PosterCard } from "@/components/ui/PosterCard";
import { Reveal, Stagger, staggerChild } from "@/components/ui/Reveal";

/** 지난 활동: 활동 사진 + 마감된 포스터. 둘 다 없으면 섹션을 숨긴다. */
export function Gallery() {
  const { past } = usePrograms();
  if (gallery.length === 0 && past.length === 0) return null;

  return (
    <section id="past" className="scroll-mt-16 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black tracking-tight">지난 활동</h2>
          <p className="mt-2 text-mute">어쩔저쩔이 함께 만든 시간들</p>
        </Reveal>

        {gallery.length > 0 && (
          <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {gallery.map((g) => (
              <motion.li
                key={g.src}
                variants={staggerChild}
                className="relative aspect-square overflow-hidden rounded-lg bg-ink-2"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </motion.li>
            ))}
          </Stagger>
        )}

        {past.length > 0 && (
          <Stagger
            as="ul"
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6"
          >
            {past.map((p) => (
              <PosterCard key={p.poster + p.date} p={p} closed />
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
