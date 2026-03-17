import { getChampions, getLatestVersion } from "@/lib/ddragon";
import Image from "next/image";
import Link from "next/link";

// 简单的出装推荐数据
const BUILDS = [
  {
    championId: "Jinx",
    role: "ADC",
    items: ["无尽之刃", "狂暴之力", "飓风", "血饮", "守护天使"],
    augments: ["刀锋", "闪电打击", "天界祝福"],
    winRate: 58.3,
    tier: "S",
  },
  {
    championId: "Lux",
    role: "法师",
    items: ["卢登回声", "虚空法杖", "冰霜之心", "暗影火焰", "贤者之书"],
    augments: ["法术编织者", "大脑袋", "棱彩屏障"],
    winRate: 55.1,
    tier: "A",
  },
  {
    championId: "Darius",
    role: "战士",
    items: ["黑色切割者", "死亡之舞", "斯特拉克的挑战", "守护天使", "血饮"],
    augments: ["天界祝福", "棱彩屏障", "地狱之魂"],
    winRate: 56.7,
    tier: "A",
  },
  {
    championId: "Thresh",
    role: "辅助",
    items: ["月石更新者", "骑士誓约", "冰霜之心", "暖心", "守护天使"],
    augments: ["天界祝福", "棱彩屏障", "守护天使"],
    winRate: 53.2,
    tier: "B",
  },
];

const TIER_COLORS: Record<string, string> = {
  S: "text-yellow-400",
  A: "text-orange-400",
  B: "text-blue-400",
};

export default async function BuildsPage() {
  const [champions, version] = await Promise.all([
    getChampions(),
    getLatestVersion(),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#c89b3c] mb-1">出装推荐</h1>
        <p className="text-gray-400 text-sm">基于高胜率玩家数据整理的推荐出装路线</p>
      </div>

      <div className="flex flex-col gap-4">
        {BUILDS.map((build) => {
          const champ = champions[build.championId];
          if (!champ) return null;
          return (
            <div key={build.championId} className="bg-[#111827] border border-[#1e2a3a] rounded-lg p-4 hover:border-[#c89b3c] transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <Link href={`/champions/${build.championId}`}>
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                    alt={champ.name}
                    width={56}
                    height={56}
                    className="rounded-lg border border-[#1e2a3a]"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Link href={`/champions/${build.championId}`} className="font-bold text-[#f0e6d3] hover:text-[#c89b3c]">
                      {champ.name}
                    </Link>
                    <span className="text-xs px-2 py-0.5 border border-[#1e2a3a] rounded-full text-gray-400">{build.role}</span>
                    <span className={`text-sm font-bold ${TIER_COLORS[build.tier]}`}>{build.tier} Tier</span>
                  </div>
                  <p className="text-sm text-green-400 mt-0.5">胜率 {build.winRate}%</p>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-xs text-gray-400 mb-1">推荐出装</p>
                <div className="flex gap-2 flex-wrap">
                  {build.items.map((item, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-[#0a0e1a] border border-[#1e2a3a] rounded text-[#f0e6d3]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">推荐强化</p>
                <div className="flex gap-2 flex-wrap">
                  {build.augments.map((aug, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-yellow-900/30 border border-yellow-700/50 rounded text-yellow-300">
                      {aug}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
