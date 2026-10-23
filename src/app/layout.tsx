import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { brand } from "@/content/site";
import "./globals.css";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.meta.url),
  title: brand.meta.title,
  description: brand.meta.description,
  openGraph: {
    title: brand.meta.title,
    description: brand.meta.description,
    siteName: brand.name,
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.meta.title,
    description: brand.meta.description,
    images: ["/brand/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
