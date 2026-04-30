# MVP Scope — Isya Idle POC

**ISYAIDLE-8 Deliverable**  
*MVP scope document outlining the first playable version.*

---

## Goal

The MVP is a browser-deployable POC that can be shared with friends for playtesting. A player should be able to experience the full core loop: build a party, configure ability routines, run dungeons, collect loot, level up, and return to find idle progress accumulated while they were away.

The MVP validates the strategic heart of the game — the feeling of building and optimizing a party — without requiring every long-term system to be present.

---

## In-Scope Systems

### 1. Combat
The tick-based combat simulation. Party characters and enemies execute ability routines on a shared timeline. Damage, healing, and cooldowns resolve each tick. The outcome (victory or defeat) is determined by party composition, gear, and the quality of the player's routines.

The core simulation is already implemented in `packages/game-core`.

**Definition of done:** A dungeon run executes fully — party fights enemies, abilities fire according to routines, and a result (win/loss + combat log) is returned.

---

### 2. Class Selection
Players choose a class for each party member when adding them to the roster. Classes define the character's role, starting stats, and ability pool. The MVP includes four classes aligned with classic MMO roles:

- **Tank** — high defense, threat-focused abilities, keeps enemies targeting them
- **Healer** — restores HP to allies, essential for sustaining longer fights
- **Support** — buffs allies or debuffs enemies, amplifies the party
- **DPS** — high damage output, the primary threat-clearing role

Class choice is permanent per character in the MVP (no respec).

**Definition of done:** Player can create a new character by selecting a class. Each class has distinct starting stats and a defined ability pool.

---

### 3. Ability Routine Builder
Each character has a routine — an ordered list of up to 6–10 ability slots the player configures. During combat, the character scans their routine from top to bottom and fires the first ability whose condition is met and cooldown is ready.

Players decide which abilities to include, what order to prioritize them, and what conditions should gate each ability (e.g. "use Heal only when an ally is below 40% HP").

This is the primary strategic layer of the game. A well-built routine will outperform a stronger party with a poor one.

**Definition of done:** Player can open a character's routine editor, add/remove/reorder ability slots, set conditions on each slot, and save the routine. The saved routine drives that character's behavior in combat.

---

### 4. Party Building
The player manages a roster of characters and assembles a party from them. The party is the unit that farms, runs dungeons, and accumulates progress.

MVP scope:
- Party size: up to 4 characters
- Players can add characters to the party from their roster
- Party composition (which roles are represented) affects combat outcomes
- No party member is locked in — players can swap freely

**Definition of done:** Player can build a party of up to 4 characters, view each member's role, stats, and equipped gear, and change composition between runs.

---

### 5. Mob Drops
Enemies drop loot when defeated. Loot consists of gear items and raw resources (gold, materials). Drop rates vary by enemy type and dungeon tier. For the MVP, crafting is deferred — gear enters the player's inventory exclusively through drops.

**Definition of done:** Dungeon runs produce gear and resource drops. Drops are added to inventory and visible after a run completes.

---

### 6. Gear Equipping
Characters have equipment slots (e.g. weapon, armour, accessory). Players assign gear from their inventory to characters. Equipped gear modifies the character's stat block directly — a stronger weapon increases attack, better armour increases defense.

Gear has a rarity tier (common → rare → epic) that determines stat magnitude. For the MVP, gear has no level requirement — any character can equip any item.

**Definition of done:** Player can open a character's gear screen, see their current equipment, and swap items from inventory into slots. Stats update immediately on equip.

---

### 7. Leveling
Characters earn XP through combat and idle farming. Reaching an XP threshold causes a level-up, which increases base stats and may unlock a new ability (see below). The player sees a level-up notification on return.

MVP scope:
- XP earned from dungeon kills and idle farming
- Each level-up increases stats automatically (no manual stat allocation in MVP)
- Level cap is not defined for the POC — players can level continuously

**Definition of done:** Characters gain XP, reach level thresholds, and their stats increase on level-up. Level and XP are visible on the character screen.

---

### 8. Ability Unlocking on Level-Up
When a character levels up, they may unlock a new ability — expanding the pool of abilities available for their routine. This creates a natural progression arc where early characters have limited, simple routines and later characters have richer, more nuanced options.

Examples of abilities that unlock through leveling:
- Tank: *Shield Slam*, *Taunt*, *Fortify*
- Healer: *Heal*, *Group Mend*, *Barrier*
- Support: *Rally*, *Weaken*, *Haste*
- DPS: *Bash*, *Triple Slice*, *Execute*

Ability unlocks are predetermined per class — the player doesn't choose which ability they receive, but decides whether and how to incorporate it into their routine.

**Definition of done:** Characters unlock new abilities at defined level milestones. Newly unlocked abilities appear in the routine builder for that character.

---

### 9. Offline Progress
While the player is away, the party continues farming in their designated zone. Resources and XP accumulate. If a dungeon is set to auto-repeat, it runs continuously — and halts permanently if the party wipes.

On return, the player sees a summary screen showing:
- Time elapsed
- Resources and XP earned
- Dungeon clears completed (if any)
- Any interruptions (party death, materials exhausted)

**Accumulation cap:** 48 hours (subject to playtesting adjustment).

**Definition of done:** Closing and reopening the game after a period of time shows an offline summary with correct resource and XP gains. Party state reflects the elapsed time.

---

### 10. Save System
Game state is saved to `localStorage` in the browser. Saves are automatic — the game writes state at meaningful events (level-up, dungeon complete, gear change, routine update) and on a periodic autosave interval.

No account system is required for the MVP. Progress is tied to the player's browser.

**Definition of done:** Closing and reopening the browser preserves all game state — party, inventory, routines, levels, and idle progress.

---

## Deferred Features (Post-MVP)

The following systems are intentionally out of scope for the POC. They will be scoped and scheduled in future tasks.

| Feature | Reason for deferral |
|---|---|
| Crafting system | Gear drops cover the loot loop for POC; crafting adds meaningful UI/logic complexity |
| Quest / objectives system | Players can orient themselves without guided quests for a small POC |
| Skill point allocation | Stats auto-assign on level-up to reduce friction in early play |
| Zone selection UI | Idle farming defaults to the last dungeon zone; explicit zone picker deferred |
| The Gauntlet (endgame) | Requires balanced endgame content; not relevant for initial validation |
| Prestige / reset system | Long-term retention mechanic; not needed at POC stage |
| Achievement system | Nice-to-have polish; deferred |
| Account system / cloud saves | Phase 2 (Supabase); LocalStorage sufficient for POC |
| Social features / leaderboards | Post-launch consideration |
| Multiple parties | Single party sufficient for POC |
| AOE kiting mechanics | Design still being defined; will be incorporated when ready |

---

## Tech Stack

### Phase 1 — POC (this milestone)

| Layer | Choice |
|---|---|
| Frontend framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Game logic | `packages/game-core` (existing) |
| State management | Plain TypeScript / React state; Zustand if needed |
| Persistence | `localStorage` |
| Hosting | Vercel |

The existing monorepo structure (`packages/game-core`, `apps/web`) is the right foundation. The `apps/web` Vite app imports `game-core` as a local workspace package. No backend is required for this phase.

### Phase 2 — Online saves & accounts (post-POC)

| Layer | Choice |
|---|---|
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| API | Supabase Edge Functions |
| Server state | TanStack Query |

---

## Definition of Done for ISYAIDLE-8

The MVP scope is complete when:

- [ ] All 10 in-scope systems are documented above ✅
- [ ] Tech stack is confirmed ✅
- [ ] Deferred features are explicitly listed ✅
- [ ] The document has been reviewed and agreed upon
- [ ] Implementation tasks have been created in Jira for each in-scope system
