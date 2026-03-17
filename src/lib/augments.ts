// 海克斯强化数据 - 按强度分级
export type AugmentTier = "S" | "A" | "B" | "C";
export type AugmentRarity = "金色" | "银色" | "棱彩";

export interface Augment {
  id: string;
  name: string;
  description: string;
  tier: AugmentTier;
  rarity: AugmentRarity;
  tags: string[];
}

export const AUGMENTS: Augment[] = [
  {
    id: "celestial-blessing",
    name: "天界祝福",
    description: "治疗效果提升20%，护盾值提升20%",
    tier: "S",
    rarity: "金色",
    tags: ["治疗", "护盾", "坦克"],
  },
  {
    id: "knife-edge",
    name: "刀锋",
    description: "攻击力提升15点，暴击率提升10%",
    tier: "A",
    rarity: "银色",
    tags: ["攻击", "暴击", "ADC"],
  },
  {
    id: "spellweavers",
    name: "法术编织者",
    description: "每次施放技能后，下次技能伤害提升10%，最多叠加5层",
    tier: "S",
    rarity: "金色",
    tags: ["法术", "AP", "叠层"],
  },
  {
    id: "guardian-angel",
    name: "守护天使",
    description: "首次死亡时复活，恢复50%生命值",
    tier: "A",
    rarity: "金色",
    tags: ["生存", "复活"],
  },
  {
    id: "cash-back",
    name: "返现",
    description: "每次购买装备返还10金币",
    tier: "B",
    rarity: "银色",
    tags: ["经济", "装备"],
  },
  {
    id: "infernal-soul",
    name: "地狱之魂",
    description: "每次击杀敌人获得一层灵魂，每层提升2%全属性",
    tier: "S",
    rarity: "棱彩",
    tags: ["击杀", "叠层", "全能"],
  },
  {
    id: "lightning-strikes",
    name: "闪电打击",
    description: "每隔3次普攻释放一道闪电，造成150%攻击力的魔法伤害",
    tier: "A",
    rarity: "银色",
    tags: ["攻击", "魔法伤害"],
  },
  {
    id: "vampiric-scepter",
    name: "吸血权杖",
    description: "生命偷取提升15%",
    tier: "B",
    rarity: "银色",
    tags: ["生命偷取", "持续战斗"],
  },
  {
    id: "big-brain",
    name: "大脑袋",
    description: "技能急速提升20点",
    tier: "B",
    rarity: "银色",
    tags: ["技能急速", "AP"],
  },
  {
    id: "prismatic-barrier",
    name: "棱彩屏障",
    description: "每5秒获得一个护盾，吸收相当于最大生命值8%的伤害",
    tier: "S",
    rarity: "棱彩",
    tags: ["护盾", "坦克", "生存"],
  },
];

export const TIER_COLORS: Record<AugmentTier, string> = {
  S: "text-yellow-400 border-yellow-400",
  A: "text-orange-400 border-orange-400",
  B: "text-blue-400 border-blue-400",
  C: "text-gray-400 border-gray-400",
};

export const RARITY_COLORS: Record<AugmentRarity, string> = {
  棱彩: "bg-purple-900/40 border-purple-500",
  金色: "bg-yellow-900/40 border-yellow-600",
  银色: "bg-gray-800/40 border-gray-500",
};
