import type { Enemy } from "../models/types.js";

export const goblinPack: Enemy[] = [
  {
    id: "goblin_1",
    name: "Goblin Fighter",
    stats: {
      maxHp: 90,
      attack: 14,
      defense: 6,
      speed: 10,
      critChance: 0.03,
      critDamage: 1.5
    }
  },
  {
    id: "goblin_2",
    name: "Goblin Fighter",
    stats: {
      maxHp: 90,
      attack: 14,
      defense: 6,
      speed: 10,
      critChance: 0.03,
      critDamage: 1.5
    }
  }
];