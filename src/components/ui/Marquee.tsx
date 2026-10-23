const ITEMS = ["SO WHAT?", "WHATSO!", "어쩔저쩔"];

/** 섹션 구분용 무한 흐름 띠 */
export function Marquee({
  tone = "neon",
  tilt = -2,
}: {
  tone?: "neon" | "amber";
  tilt?: number;
}) {
  const row = Array.from({ length: 4 }, () => ITEMS).flat();
  const bg = tone === "neon" ? "bg-neon" : "bg-amber";
  return (
    <div
      aria-hidden
      className="relative -mx-4 overflow-hidden py-6"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className={`${bg} border-y-2 border-black py-3 text-black`}>
        <div className="marquee-track flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {row.map((t, i) => (
                <span
                  key={i}
                  className="flex items-center whitespace-nowrap px-5 text-xl font-black tracking-tight md:text-3xl"
                >
                  {t}
                  <span className="ml-10 text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
