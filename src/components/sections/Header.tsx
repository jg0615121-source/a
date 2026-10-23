"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ApplyButton } from "@/components/ui/ApplyButton";

export const NAV = [
  { href: "#about", label: "브랜드 소개" },
  { href: "#sowhat", label: "SOWHAT?_활동" },
  { href: "#whatso", label: "WHATSO!_모임" },
  { href: "#contact", label: "문의 및 협업" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" aria-label="어쩔저쩔 처음으로" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="어쩔저쩔" className="h-10 w-auto md:h-14" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[15px] font-bold text-white/90 transition-colors hover:text-neon"
            >
              {n.label}
            </a>
          ))}
          <ApplyButton className="h-11 px-6 text-base" />
        </nav>

        <button
          type="button"
          className="relative grid size-11 place-items-center md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] bg-ink/95 px-6 pt-6 md:hidden"
            aria-label="모바일 메뉴"
          >
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-5 text-2xl font-bold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <ApplyButton className="mt-8 h-14 w-full text-lg" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
