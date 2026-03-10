import type {
  Ability,
  CombatLogEvent,
  CombatUnit,
  EncounterResult
} from "../models/types.js";
import { chooseRoutineStep } from "./routine.js";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function aliveUnits(units: CombatUnit[]): CombatUnit[] {
  return units.filter((unit) => unit.alive);
}

function lowestAlly(allies: CombatUnit[]): CombatUnit | null {
  const alive = aliveUnits(allies);
  if (alive.length === 0) return null;
  return alive.reduce((lowest, current) =>
    current.currentHp / current.stats.maxHp < lowest.currentHp / lowest.stats.maxHp
      ? current
      : lowest
  );
}

function frontEnemy(enemies: CombatUnit[]): CombatUnit | null {
  return aliveUnits(enemies)[0] ?? null;
}

function findAbility(actor: CombatUnit, abilityId: string): Ability | null {
  return actor.abilities.find((ability) => ability.id === abilityId) ?? null;
}

function resolveDamage(attacker: CombatUnit, defender: CombatUnit, power: number): number {
  const raw = attacker.stats.attack * power;
  const reduced = raw - defender.stats.defense;
  return Math.max(1, Math.floor(reduced));
}

function resolveHeal(source: CombatUnit, target: CombatUnit, power: number): number {
  const amount = Math.max(1, Math.floor(source.stats.attack * power));
  const missing = target.stats.maxHp - target.currentHp;
  return Math.min(amount, missing);
}

export function tickCombat(
  party: CombatUnit[],
  enemies: CombatUnit[],
  timeMs: number,
  deltaMs: number,
  events: CombatLogEvent[]
): void {
  const allUnits = [...party, ...enemies];

  for (const unit of allUnits) {
    for (const key of Object.keys(unit.cooldowns)) {
      unit.cooldowns[key] = Math.max(0, unit.cooldowns[key] - deltaMs);
    }
  }

  for (const actor of allUnits) {
    if (!actor.alive) continue;

    const allies = actor.side === "party" ? party : enemies;
    const opponents = actor.side === "party" ? enemies : party;

    if (aliveUnits(opponents).length === 0) continue;

    const step = chooseRoutineStep(actor, allies);
    if (!step) continue;

    const ability = findAbility(actor, step.abilityId);
    if (!ability) continue;

    if ((actor.cooldowns[ability.id] ?? 0) > 0) continue;

    if (ability.effect.type === "damage") {
      const target = frontEnemy(opponents);
      if (!target) continue;

      const amount = resolveDamage(actor, target, ability.effect.power);
      target.currentHp = clamp(target.currentHp - amount, 0, target.stats.maxHp);
      if (target.currentHp <= 0) target.alive = false;

      events.push({
        timeMs,
        sourceId: actor.id,
        targetId: target.id,
        abilityId: ability.id,
        effectType: "damage",
        amount
      });
    }

    if (ability.effect.type === "heal") {
      const target = lowestAlly(allies);
      if (!target) continue;

      const amount = resolveHeal(actor, target, ability.effect.power);
      target.currentHp = clamp(target.currentHp + amount, 0, target.stats.maxHp);

      events.push({
        timeMs,
        sourceId: actor.id,
        targetId: target.id,
        abilityId: ability.id,
        effectType: "heal",
        amount
      });
    }

    actor.cooldowns[ability.id] = ability.cooldownMs;
  }
}

export function buildEncounterResult(
  party: CombatUnit[],
  enemies: CombatUnit[],
  events: CombatLogEvent[],
  durationMs: number
): EncounterResult {
  const survivingPartyMembers = aliveUnits(party).length;
  const survivingEnemies = aliveUnits(enemies).length;

  return {
    victory: survivingPartyMembers > 0 && survivingEnemies === 0,
    durationMs,
    events,
    survivingPartyMembers,
    survivingEnemies
  };
}