export type Role = "tank" | "healer" | "support" | "dps";

export type StatBlock = {
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number;
  critDamage: number;
};

export type EffectType = "damage" | "heal" | "buff";

export type TargetType =
  | "self"
  | "lowest-ally-hp"
  | "highest-threat-enemy"
  | "front-enemy"
  | "all-enemies";

export type AbilityEffect = {
  type: EffectType;
  power: number;
};

export type Ability = {
  id: string;
  name: string;
  cooldownMs: number;
  target: TargetType;
  effect: AbilityEffect;
};

export type RoutineCondition =
  | { type: "always" }
  | { type: "self-hp-below"; value: number }
  | { type: "ally-hp-below"; value: number };

export type RoutineStep = {
  abilityId: string;
  condition: RoutineCondition;
};

export type Character = {
  id: string;
  name: string;
  role: Role;
  stats: StatBlock;
  abilities: Ability[];
  routine: RoutineStep[];
};

export type Enemy = {
  id: string;
  name: string;
  stats: StatBlock;
};

export type CombatUnit = {
  id: string;
  name: string;
  side: "party" | "enemy";
  role?: Role;
  currentHp: number;
  stats: StatBlock;
  abilities: Ability[];
  routine: RoutineStep[];
  cooldowns: Record<string, number>;
  alive: boolean;
};

export type CombatLogEvent = {
  timeMs: number;
  sourceId: string;
  targetId: string;
  abilityId: string;
  effectType: EffectType;
  amount: number;
};

export type EncounterResult = {
  victory: boolean;
  durationMs: number;
  events: CombatLogEvent[];
  survivingPartyMembers: number;
  survivingEnemies: number;
};