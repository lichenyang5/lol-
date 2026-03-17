import { getChampions, getLatestVersion } from "@/lib/ddragon";
import ChampionGrid from "@/components/ChampionGrid";

export default async function Home() {
  const [champions, version] = await Promise.all([
    getChampions(),
    getLatestVersion(),
  ]);

  const championList = Object.values(champions).sort((a, b) =>
    a.name.localeCompare(b.name, "zh")
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#c89b3c] mb-1">英雄图鉴</h1>
        <p className="text-gray-400 text-sm">共 {championList.length} 位英雄，点击查看海克斯强化推荐</p>
      </div>
      <ChampionGrid champions={championList} version={version} />
    </div>
  );
}
