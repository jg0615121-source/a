"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Program } from "@/content/site";
import { formatDate, posterAlt } from "@/lib/programs";
import { staggerChild } from "@/components/ui/Reveal";

const BRACKET = "pointer-events-none absolute size-7 border-amber opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100";

/** 포스터 모서리 [+] 초점 프레임 */
function FocusFrame() {
  return (
    <>
      <span className={`${BRACKET} top-5 left-5 border-t-2 border-l-2 group-hover:top-3 group-hover:left-3`} />
      <span className={`${BRACKET} top-5 right-5 border-t-2 border-r-2 group-hover:top-3 group-hover:right-3`} />
      <span className={`${BRACKET} bottom-5 left-5 border-b-2 border-l-2 group-hover:bottom-3 group-hover:left-3`} />
      <span className={`${BRACKET} right-5 bottom-5 border-r-2 border-b-2 group-hover:right-3 group-hover:bottom-3`} />
      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-2xl leading-none font-light text-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        +
      </span>
    </>
  );
}

export function PosterCard({ p, closed }: { p: Program; closed: boolean }) {
  const reduce = useReducedMotion();

  const poster = (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-2">
      <Image
        src={p.poster}
        alt={posterAlt(p)}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
        className={`object-cover transition-transform duration-500 ${
          closed ? "grayscale" : "group-hover:scale-[1.04]"
        }`}
      />
      {closed ? (
        <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-sm font-bold">
          마감
        </span>
      ) : (
        <>
          <FocusFrame />
          <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-black/90 to-transparent px-5 pt-10 pb-4 font-bold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <span className="text-amber">신청하기 →</span>
          </span>
        </>
      )}
    </div>
  );

  const info = (
    <div className="mt-4 px-1">
      <p className={`text-sm font-bold ${closed ? "text-mute" : "text-amber"}`}>
        {formatDate(p.date)}
        {p.time && ` · ${p.time.replace("-", " ~ ")}`}
      </p>
      <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
      {p.summary && <p className="mt-1 text-[15px] text-mute">{p.summary}</p>}
      {p.place && <p className="mt-1 text-sm text-white/50">{p.place}</p>}
    </div>
  );

  if (closed) {
    return (
      <motion.li variants={staggerChild} className="opacity-50" aria-disabled>
        {poster}
        {info}
      </motion.li>
    );
  }

  return (
    <motion.li variants={staggerChild}>
      <motion.a
        href={p.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.title} 신청하기 (새 창)`}
        className="group block rounded-xl outline-none"
        whileHover={reduce ? undefined : { rotate: -1.2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {poster}
        {info}
      </motion.a>
    </motion.li>
  );
}
