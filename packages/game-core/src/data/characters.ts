import type { Character } from "../models/types.js";
import { strike, tauntSlash, heal, firebolt } from "./abilities.js";

export const starterParty: Character[] = [
  {
    id: "tank_1",
    name: "Knight",
    role: "tank",
    stats: {
      maxHp: 180,
      attack: 18,
      defense: 12,
      speed: 10,
      critChance: 0.05,
      critDamage: 1.5
    },
    abilities: [tauntSlash, strike],
    routine: [
      { abilityId: "taunt_slash", condition: { type: "always" } },
      { abilityId: "strike", condition: { type: "always" } }
    ]
  },
  {
    id: "healer_1",
    name: "Priest",
    role: "healer",
    stats: {
      maxHp: 110,
      attack: 10,
      defense: 6,
      speed: 10,
      critChance: 0.03,
      critDamage: 1.5
    },
    abilities: [heal, strike],
    routine: [
      { abilityId: "heal", condition: { type: "ally-hp-below", value: 0.7 } },
      { abilityId: "strike", condition: { type: "always" } }
    ]
  },
  {
    id: "dps_1",
    name: "Mage",
    role: "dps",
    stats: {
      maxHp: 100,
      attack: 24,
      defense: 5,
      speed: 11,
      critChance: 0.08,
      critDamage: 1.6
    },
    abilities: [firebolt, strike],
    routine: [
      { abilityId: "firebolt", condition: { type: "always" } },
      { abilityId: "strike", condition: { type: "always" } }
    ]
  }
];