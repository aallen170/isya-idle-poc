import type { CombatUnit, RoutineCondition, RoutineStep } from "../models/types.js";

function hpRatio(unit: CombatUnit): number {
  return unit.currentHp / unit.stats.maxHp;
}

function conditionMet(
  actor: CombatUnit,
  allies: CombatUnit[],
  condition: RoutineCondition
): boolean {
  switch (condition.type) {
    case "always":
      return true;
    case "self-hp-below":
      return hpRatio(actor) < condition.value;
    case "ally-hp-below":
      return allies.some((ally) => ally.alive && hpRatio(ally) < condition.value);
    default:
      return false;
  }
}

export function chooseRoutineStep(
  actor: CombatUnit,
  allies: CombatUnit[]
): RoutineStep | null {
  for (const step of actor.routine) {
    const cooldownReady = (actor.cooldowns[step.abilityId] ?? 0) <= 0;
    if (!cooldownReady) continue;
    if (conditionMet(actor, allies, step.condition)) {
      return step;
    }
  }
  return null;
}