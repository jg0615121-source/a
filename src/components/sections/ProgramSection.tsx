"use client";

import { brand, type Program } from "@/content/site";
import { usePrograms } from "@/lib/programs";
import { PosterCard } from "@/components/ui/PosterCard";
import { Reveal, Stagger } from "@/components/ui/Reveal";

/** SOWHAT?_활동 / WHATSO!_모임 공용 포스터 그리드 */
export function ProgramSection({ type }: { type: Program["type"] }) {
  const { upcoming } = usePrograms();
  const items = upcoming.filter((p) => p.type === type);
  const s = brand.sections[type];
  const cinema = type === "whatso";

  return (
    <section
      id={type}
      className={`relative scroll-mt-16 overflow-hidden px-4 py-24 md:px-8 md:py-32 ${
        cinema ? "grain bg-[#120f0a]" : ""
      }`}
    >
      {cinema && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 70% 30%, rgb(232 194 122 / 0.12), transparent 70%)",
          }}
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2
            className={`text-[clamp(2.25rem,7vw,4.5rem)] leading-none font-black tracking-tight ${
              cinema ? "text-amber" : ""
            }`}
          >
            {s.title}
          </h2>
          <p className="text-base text-mute md:text-lg">{s.description}</p>
        </Reveal>

        {items.length === 0 ? (
          <Reveal className="mt-12">
            <div
              className={`flex aspect-[2/1] max-h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center sm:aspect-[3/1] ${
                cinema ? "border-amber/40" : "border-white/20"
              }`}
            >
              <p className="text-xl font-bold md:text-2xl">곧 새로운 활동이 올라와요</p>
              <p className="mt-2 text-mute">인스타그램에서 가장 먼저 소식을 받아 보세요.</p>
            </div>
          </Reveal>
        ) : (
          <Stagger
            as="ul"
            className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((p) => (
              <PosterCard key={p.poster + p.date} p={p} closed={false} />
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
