"use client";

import { usePrograms } from "@/lib/programs";

/** 가장 가까운 예정 활동의 신청 링크. 예정 활동이 없으면 활동 섹션으로 이동. */
export function ApplyButton({
  className = "",
  children = "신청하기",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { next } = usePrograms();
  const base = `btn-apply inline-flex items-center justify-center rounded-full bg-neon font-bold text-black ${className}`;

  if (!next) {
    return (
      <a href="#sowhat" className={base}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={next.formUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      aria-label={`${next.title} 신청하기 (새 창)`}
    >
      {children}
    </a>
  );
}
