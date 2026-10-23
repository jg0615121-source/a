"use client";

import { useEffect, useState } from "react";
import { programs, type Program } from "@/content/site";

/** 오늘 날짜(한국 시간) "YYYY-MM-DD" */
export function todayKST(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** 빌드 시점이 아닌 브라우저에서 날짜를 판정한다. 첫 렌더(서버)에서는 null. */
export function useToday(): string | null {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayKST()), []);
  return today;
}

export const isClosed = (p: Program, today: string | null) =>
  today !== null && p.date < today;

const byDateAsc = (a: Program, b: Program) => a.date.localeCompare(b.date);

export function usePrograms() {
  const today = useToday();
  const upcoming = programs.filter((p) => !isClosed(p, today)).sort(byDateAsc);
  const past = programs
    .filter((p) => isClosed(p, today))
    .sort((a, b) => byDateAsc(b, a));
  return { today, upcoming, past, next: upcoming[0] ?? null };
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-10-28" → "10.28 (수)" */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${m}.${String(d).padStart(2, "0")} (${wd})`;
}

export const posterAlt = (p: Program) =>
  `${p.title} 포스터 — ${p.date.replaceAll("-", ".")}`;
