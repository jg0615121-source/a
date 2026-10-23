"use client";

import { usePrograms, formatDate } from "@/lib/programs";
import { ApplyButton } from "@/components/ui/ApplyButton";

/** 모바일 하단 고정 신청 바 */
export function MobileApplyBar() {
  const { next } = usePrograms();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          {next ? (
            <>
              <p className="text-xs font-bold text-neon">{formatDate(next.date)}</p>
              <p className="truncate text-[15px] font-bold">{next.title}</p>
            </>
          ) : (
            <p className="text-[15px] font-bold">곧 새로운 활동이 올라와요</p>
          )}
        </div>
        <ApplyButton className="h-12 shrink-0 px-7 text-base" />
      </div>
    </div>
  );
}
