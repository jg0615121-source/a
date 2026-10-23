import { brand } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 pt-12 pb-28 md:px-8 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="어쩔저쩔" className="h-12 w-auto" loading="lazy" />
          <p className="mt-4 text-sm text-mute">{brand.slogan}</p>
        </div>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {brand.name} · {brand.region} 청년 커뮤니티
        </p>
      </div>
    </footer>
  );
}
