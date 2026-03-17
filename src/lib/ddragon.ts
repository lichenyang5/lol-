// Riot Data Dragon API 工具函数
const DDRAGON_BASE = "https://ddragon.leagueoflegends.com";

export async function getLatestVersion(): Promise<string> {
  const res = await fetch(`${DDRAGON_BASE}/api/versions.json`, {
    next: { revalidate: 86400 }, // 每天刷新
  });
  const versions = await res.json();
  return versions[0];
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  image: { full: string };
  tags: string[];
  stats: Record<string, number>;
}

export async function getChampions(): Promise<Record<string, Champion>> {
  const version = await getLatestVersion();
  const res = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/zh_CN/champion.json`,
    { next: { revalidate: 86400 } }
  );
  const data = await res.json();
  return data.data;
}

export async function getChampionDetail(id: string): Promise<Champion & {
  skins: { id: string; name: string; num: number }[];
  spells: { id: string; name: string; description: string; image: { full: string } }[];
  passive: { name: string; description: string; image: { full: string } };
}> {
  const version = await getLatestVersion();
  const res = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/zh_CN/champion/${id}.json`,
    { next: { revalidate: 86400 } }
  );
  const data = await res.json();
  return data.data[id];
}

export function getChampionImageUrl(version: string, imageFull: string) {
  return `${DDRAGON_BASE}/cdn/${version}/img/champion/${imageFull}`;
}

export function getSpellImageUrl(version: string, imageFull: string) {
  return `${DDRAGON_BASE}/cdn/${version}/img/spell/${imageFull}`;
}

export function getPassiveImageUrl(version: string, imageFull: string) {
  return `${DDRAGON_BASE}/cdn/${version}/img/passive/${imageFull}`;
}
