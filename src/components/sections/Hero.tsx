"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { brand } from "@/content/site";

// 화면 비율 기준 위치(%)와 크기. m* = 모바일(가장자리로 비켜 둠), mobile=false면 모바일에서 숨김
const BURSTS = [
  { src: 1, left: "-6%", top: "30%", ml: "-14%", mt: "10%", size: "clamp(120px,16vw,220px)", depth: 30, rot: -8, dur: 9 },
  { src: 2, left: "18%", top: "36%", ml: "0", mt: "0", size: "clamp(56px,7vw,100px)", depth: 14, rot: 12, dur: 7, mobile: false },
  { src: 3, left: "10%", top: "64%", ml: "-10%", mt: "80%", size: "clamp(100px,14vw,190px)", depth: 22, rot: 6, dur: 11 },
  { src: 4, left: "78%", top: "28%", ml: "74%", mt: "12%", size: "clamp(110px,15vw,200px)", depth: 26, rot: -10, dur: 10 },
  { src: 2, left: "73%", top: "68%", ml: "0", mt: "0", size: "clamp(60px,8vw,110px)", depth: 12, rot: 18, dur: 8, mobile: false },
  { src: 1, left: "86%", top: "72%", ml: "78%", mt: "78%", size: "clamp(130px,17vw,240px)", depth: 34, rot: 4, dur: 12 },
];

function Burst({
  b,
  i,
  mx,
  my,
  reduce,
}: {
  b: (typeof BURSTS)[number];
  i: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(mx, (v) => v * b.depth);
  const y = useTransform(my, (v) => v * b.depth);
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-[var(--mt)] left-[var(--ml)] w-[min(var(--s),28vw)] md:top-[var(--t)] md:left-[var(--l)] md:w-[var(--s)] ${
        b.mobile === false ? "max-md:hidden" : ""
      }`}
      style={
        {
          "--l": b.left,
          "--t": b.top,
          "--ml": b.ml,
          "--mt": b.mt,
          "--s": b.size,
        } as React.CSSProperties
      }
    >
      <motion.div
        style={{ x, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.5 + i * 0.08, duration: 0.6 }}
      >
        <motion.img
          src={`/brand/burst-${b.src}.svg`}
          alt=""
          className="w-full"
          style={{ rotate: b.rot }}
          animate={
            reduce
              ? undefined
              : { y: [0, -14, 0], rotate: [b.rot, b.rot + 8, b.rot] }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduce = !!useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  const words = brand.slogan.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 55% at 50% 48%, #2a2a2a 0%, #161616 45%, #0b0b0b 100%)",
      }}
    >
      {BURSTS.map((b, i) => (
        <Burst key={i} b={b} i={i} mx={mx} my={my} reduce={reduce} />
      ))}

      <div className="relative z-10 flex flex-col items-center pt-12 text-center">
        <h1 className="sr-only">어쩔저쩔 — So Whaaat</h1>
        <motion.img
          src="/brand/so-whaaat.svg"
          alt="So Whaaat"
          className="w-[min(78vw,460px)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.3, rotate: -12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={
            reduce
              ? { duration: 0.4 }
              : { type: "spring", stiffness: 260, damping: 13, mass: 0.9 }
          }
        />
        <p className="mt-6 flex flex-wrap justify-center gap-x-[0.3em] text-xl font-bold tracking-tight md:mt-8 md:text-3xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0.2 : 0.55 + i * 0.07, duration: 0.45 }}
            >
              {w}
            </motion.span>
          ))}
        </p>
      </div>

      <motion.a
        href="#about"
        aria-label="아래로 스크롤"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.3em] text-mute md:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        SCROLL ↓
      </motion.a>
    </section>
  );
}
