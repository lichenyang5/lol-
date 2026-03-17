import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "海克斯大乱斗攻略",
  description: "英雄联盟海克斯大乱斗英雄强化攻略网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased min-h-screen">
        <nav className="border-b border-[#1e2a3a] bg-[#0d1117] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-[#c89b3c] font-bold text-lg tracking-wide">
              ⚔ 海克斯大乱斗
            </Link>
            <div className="flex gap-6 text-sm text-[#f0e6d3]">
              <Link href="/" className="hover:text-[#c89b3c] transition-colors">英雄</Link>
              <Link href="/augments" className="hover:text-[#c89b3c] transition-colors">海克斯强化</Link>
              <Link href="/builds" className="hover:text-[#c89b3c] transition-colors">出装推荐</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
