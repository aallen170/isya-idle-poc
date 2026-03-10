import type { Character, CombatUnit, Enemy, EncounterResult } from "../models/types.js";
import { buildEncounterResult, tickCombat } from "../systems/combat.js";

function toPartyUnit(character: Character): CombatUnit {
  return {
    id: character.id,
    name: character.name,
    side: "party",
    role: character.role,
    currentHp: character.stats.maxHp,
    stats: { ...character.stats },
    abilities: [...character.abilities],
    routine: [...character.routine],
    cooldowns: Object.fromEntries(character.abilities.map((a) => [a.id, 0])),
    alive: true
  };
}

function toEnemyUnit(enemy: Enemy): CombatUnit {
  return {
    id: enemy.id,
    name: enemy.name,
    side: "enemy",
    currentHp: enemy.stats.maxHp,
    stats: { ...enemy.stats },
    abilities: [
      {
        id: "enemy_attack",
        name: "Enemy Attack",
        cooldownMs: 2200,
        target: "front-enemy",
        effect: { type: "damage", power: 1.0 }
      }
    ],
    routine: [{ abilityId: "enemy_attack", condition: { type: "always" } }],
    cooldowns: { enemy_attack: 0 },
    alive: true
  };
}

export function runEncounter(
  party: Character[],
  enemies: Enemy[],
  maxDurationMs = 60_000,
  deltaMs = 500
): EncounterResult {
  const partyUnits = party.map(toPartyUnit);
  const enemyUnits = enemies.map(toEnemyUnit);
  const events = [];

  let timeMs = 0;

  while (timeMs < maxDurationMs) {
    const partyAlive = partyUnits.some((unit) => unit.alive);
    const enemiesAlive = enemyUnits.some((unit) => unit.alive);

    if (!partyAlive || !enemiesAlive) break;

    tickCombat(partyUnits, enemyUnits, timeMs, deltaMs, events);
    timeMs += deltaMs;
  }

  return buildEncounterResult(partyUnits, enemyUnits, events, timeMs);
}