"use client";

import { useState } from "react";
import { AUGMENTS, TIER_COLORS, RARITY_COLORS, AugmentTier, AugmentRarity } from "@/lib/augments";

const TIERS: AugmentTier[] = ["S", "A", "B", "C"];
const RARITIES: AugmentRarity[] = ["棱彩", "金色", "银色"];

export default function AugmentsPage() {
  const [activeTier, setActiveTier] = useState<AugmentTier | "全部">("全部");
  const [activeRarity, setActiveRarity] = useState<AugmentRarity | "全部">("全部");

  const filtered = AUGMENTS.filter((a) => {
    const matchTier = activeTier === "全部" || a.tier === activeTier;
    const matchRarity = activeRarity === "全部" || a.rarity === activeRarity;
    return matchTier && matchRarity;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#c89b3c] mb-1">海克斯强化</h1>
        <p className="text-gray-400 text-sm">共 {AUGMENTS.length} 个强化，按强度分级</p>
      </div>

      {/* 筛选器 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400">强度：</span>
          {(["全部", ...TIERS] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTier(t)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                activeTier === t
                  ? "bg-[#c89b3c] border-[#c89b3c] text-black font-semibold"
                  : "border-[#1e2a3a] text-[#f0e6d3] hover:border-[#c89b3c]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400">稀有度：</span>
          {(["全部", ...RARITIES] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRarity(r)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                activeRarity === r
                  ? "bg-[#c89b3c] border-[#c89b3c] text-black font-semibold"
                  : "border-[#1e2a3a] text-[#f0e6d3] hover:border-[#c89b3c]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 强化列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((aug) => (
          <div key={aug.id} className={`rounded-lg border p-4 ${RARITY_COLORS[aug.rarity]}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#f0e6d3]">{aug.name}</span>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-400">{aug.rarity}</span>
                <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${TIER_COLORS[aug.tier]}`}>
                  {aug.tier}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3">{aug.description}</p>
            <div className="flex gap-1 flex-wrap">
              {aug.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 bg-black/30 rounded text-gray-400">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-12">没有匹配的强化</p>
      )}
    </div>
  );
}
