import type { Ability } from "../models/types.js";

export const strike: Ability = {
  id: "strike",
  name: "Strike",
  cooldownMs: 2000,
  target: "front-enemy",
  effect: { type: "damage", power: 1.0 }
};

export const tauntSlash: Ability = {
  id: "taunt_slash",
  name: "Taunt Slash",
  cooldownMs: 4000,
  target: "front-enemy",
  effect: { type: "damage", power: 0.8 }
};

export const heal: Ability = {
  id: "heal",
  name: "Heal",
  cooldownMs: 3000,
  target: "lowest-ally-hp",
  effect: { type: "heal", power: 1.4 }
};

export const firebolt: Ability = {
  id: "firebolt",
  name: "Firebolt",
  cooldownMs: 2500,
  target: "front-enemy",
  effect: { type: "damage", power: 1.3 }
};