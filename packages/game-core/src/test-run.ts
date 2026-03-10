import { starterParty } from "./data/characters.js";
import { goblinPack } from "./data/enemies.js";
import { runEncounter } from "./sim/runEncounter.js";

const result = runEncounter(starterParty, goblinPack);

console.log("Victory:", result.victory);
console.log("Duration:", result.durationMs);
console.log("Party alive:", result.survivingPartyMembers);
console.log("Enemies alive:", result.survivingEnemies);
console.log("Events:", result.events.slice(0, 10));