"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Champion } from "@/lib/ddragon";

const TAG_LABELS: Record<string, string> = {
  Fighter: "战士",
  Tank: "坦克",
  Mage: "法师",
  Assassin: "刺客",
  Support: "辅助",
  Marksman: "射手",
};

interface Props {
  champions: Champion[];
  version: string;
}

export default function ChampionGrid({ champions, version }: Props) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("全部");

  const allTags = ["全部", ...Object.keys(TAG_LABELS)];

  const filtered = champions.filter((c) => {
    const matchSearch =
      c.name.includes(search) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchTag =
      activeTag === "全部" || c.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div>
      {/* 搜索栏 */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c89b3c] w-4 h-4" />
        <input
          type="text"
          placeholder="搜索英雄..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111827] border border-[#1e2a3a] rounded-lg pl-10 pr-4 py-2 text-[#f0e6d3] placeholder-gray-500 focus:outline-none focus:border-[#c89b3c]"
        />
      </div>

      {/* 职业筛选 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              activeTag === tag
                ? "bg-[#c89b3c] border-[#c89b3c] text-black font-semibold"
                : "border-[#1e2a3a] text-[#f0e6d3] hover:border-[#c89b3c]"
            }`}
          >
            {TAG_LABELS[tag] ?? tag}
          </button>
        ))}
      </div>

      {/* 英雄网格 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filtered.map((champ) => (
          <Link
            key={champ.id}
            href={`/champions/${champ.id}`}
            className="group flex flex-col items-center bg-[#111827] border border-[#1e2a3a] rounded-lg p-2 hover:border-[#c89b3c] transition-colors"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
              alt={champ.name}
              width={64}
              height={64}
              className="rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="mt-1 text-xs text-center text-[#f0e6d3] leading-tight">
              {champ.name}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-12">没有找到匹配的英雄</p>
      )}
    </div>
  );
}
