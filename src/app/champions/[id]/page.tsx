import Image from "next/image";
import { getChampionDetail, getLatestVersion } from "@/lib/ddragon";
import { AUGMENTS, TIER_COLORS, RARITY_COLORS } from "@/lib/augments";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChampionPage({ params }: Props) {
  const { id } = await params;
  const version = await getLatestVersion();

  let champion;
  try {
    champion = await getChampionDetail(id);
  } catch {
    notFound();
  }

  // 根据英雄职业推荐相关强化（简单示例逻辑）
  const recommended = AUGMENTS.filter((a) => a.tier === "S" || a.tier === "A").slice(0, 6);

  return (
    <div>
      {/* 英雄头部信息 */}
      <div className="flex gap-6 mb-8 items-start">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={96}
          height={96}
          className="rounded-lg border border-[#c89b3c]"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#c89b3c]">{champion.name}</h1>
          <p className="text-gray-400 text-sm mb-2">{champion.title}</p>
          <div className="flex gap-2">
            {champion.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs border border-[#1e2a3a] rounded-full text-[#f0e6d3]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 技能 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#c89b3c] mb-3">技能</h2>
        <div className="flex gap-3 flex-wrap">
          {/* 被动 */}
          <div className="flex items-center gap-2 bg-[#111827] border border-[#1e2a3a] rounded-lg p-2 w-48">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`}
              alt={champion.passive.name}
              width={40}
              height={40}
              className="rounded"
            />
            <div>
              <p className="text-xs text-[#c89b3c]">被动</p>
              <p className="text-xs text-[#f0e6d3]">{champion.passive.name}</p>
            </div>
          </div>
          {/* 主动技能 */}
          {champion.spells.map((spell, i) => (
            <div key={spell.id} className="flex items-center gap-2 bg-[#111827] border border-[#1e2a3a] rounded-lg p-2 w-48">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                alt={spell.name}
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <p className="text-xs text-[#c89b3c]">{["Q", "W", "E", "R"][i]}</p>
                <p className="text-xs text-[#f0e6d3]">{spell.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 推荐海克斯强化 */}
      <section>
        <h2 className="text-lg font-semibold text-[#c89b3c] mb-3">推荐海克斯强化</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {recommended.map((aug) => (
            <div key={aug.id} className={`rounded-lg border p-3 ${RARITY_COLORS[aug.rarity]}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#f0e6d3]">{aug.name}</span>
                <span className={`text-xs font-bold border px-1.5 rounded ${TIER_COLORS[aug.tier]}`}>
                  {aug.tier}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{aug.description}</p>
              <div className="flex gap-1 flex-wrap">
                {aug.tags.map((t) => (
                  <span key={t} className="text-xs px-1.5 py-0.5 bg-black/30 rounded text-gray-300">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
