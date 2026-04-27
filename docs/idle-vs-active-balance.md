# Idle vs Active Gameplay Balance

**ISYAIDLE-7 Deliverable**  
*Document explaining idle mechanics vs active gameplay.*

---

## Core Design Tension

The central challenge of any idle game is calibrating the gap between passive and active play. Too much automation and the game plays itself; too little and it stops being idle. Isya Idle resolves this tension through a deliberate **power differential**: active play is always more effective than idle play, but idle play is always meaningful.

The key lever is the **ability routine slot cap** (target: 6–10 slots per character). Characters have far more skills than any routine can hold, so a static loadout will never match a player who is actively swapping skills for the fight at hand. This creates a natural ceiling on idle performance — not through artificial restriction, but through the inherent limitations of any fixed strategy.

This also defines content lifecycle. A dungeon that demands manual intervention today becomes routine-automatable tomorrow, and fully idle-farmable once the party has outleveled it. Every piece of content moves through this arc.

---

## System Classification

Systems fall into three categories: **fully automatic**, **player-initiated then automatic**, and **always active**.

### Fully Automatic
These systems run continuously without any player input.

- **Idle zone farming** — The party farms enemies in the last zone the player designated. Generates XP, gold, and crafting materials at all times, including offline. This is the always-on resource engine that feeds every other system.
- **Combat execution** — During dungeon runs, the ability routine fires automatically. The player configures the logic; the party executes it.
- **XP and leveling** — Characters gain experience and level up passively through farming and combat.

### Player-Initiated, Then Automatic
These systems require the player to set them up, then run on their own until interrupted.

- **Crafting** — The player selects a recipe and it repeats indefinitely as long as materials are available. When materials run out, it halts and waits. One active recipe at a time. *(A queue system may be explored in the future as a balance consideration.)*
- **Dungeon auto-repeat** — After clearing a dungeon, the player can enable auto-repeat. The dungeon then runs continuously, including offline. If the party dies, all rewards stop accumulating for that offline session — the failure is intentional feedback on routine design.

### Always Active (Require Player Input)
These systems never act on their own and always wait for a deliberate player decision.

- **Zone selection** — The player always chooses where the party farms.
- **Ability routine building** — Players design and edit their routines manually. Routines are static until changed.
- **Skill point allocation** — Spent manually when a character levels up.
- **Gear equipping** — All gear management is manual. The game never auto-equips.
- **Party & build management** — Role assignment, composition changes, and synergy decisions all belong to the player.
- **Dungeon selection** — Players choose which dungeon to run and when.
- **Crafting initiation** — The player selects the recipe to queue.

---

## The Idle/Active Power Differential

Idle and active play are intentionally unequal in power output:

**Active play is stronger.** A player actively managing a dungeon run — swapping skills, reacting to enemy weaknesses, adjusting the rotation mid-fight — will always outperform a static routine. The routine slot cap (6–10 skills) means no loadout can account for every situation a full skill pool could handle.

**Idle play is always meaningful.** Even at lower efficiency, the party is always making progress. Offline hours still produce materials, XP, and dungeon clears. The game never punishes a player for not being present.

**Content difficulty is the natural regulator.** Dungeons near the party's current level will likely require manual intervention to clear efficiently — the routine won't be optimized yet, and enemy mechanics may need active responses. As the party outlevels content, the same dungeons become automatable, then idle-farmable. This progression arc is intentional:

> **Challenge → Manageable with a good routine → Fully automatable → Idle farming source**

Note that overleveling alone does not guarantee automation. A player who has never visited a dungeon may still need to run it manually first to understand enemy weaknesses and build an effective routine — even if their party is significantly stronger. Automation is earned through familiarity, not just power.

---

## Offline Progress Rules

Offline progress runs on the same systems as online idle play, with the following rules:

| System | Offline Behavior |
|---|---|
| Zone farming | Continues in last designated zone |
| Dungeon auto-repeat | Continues; halts permanently if party dies |
| Crafting | Continues until materials run out |
| Manual dungeon runs | Not available |
| Routine editing / gear / skill points | Not available |

**Accumulation cap:** 48 hours. After 48 hours offline, progress stops accumulating. This is a starting value and will be adjusted based on playtesting.

**Resource stacks:** No cap on resource quantities. Item stacks are stored as a single number per item type, so large quantities carry no performance cost.

**Return summary:** When a player returns after offline time, a summary screen shows what was earned — resources gathered, dungeon clears completed, crafting output — and flags any interruptions (party death, materials exhausted). This screen closes the offline loop and prompts the player's next decisions.

---

## Intended Player Engagement Patterns

The game is designed to feel rewarding across three distinct session types. These are design targets, not hard constraints — actual patterns will emerge through playtesting and may differ.

### Check-In Session *(5–15 minutes)*
The player returns after time away. They review the offline summary, collect rewards, restart crafting if materials ran out, revive and review the party if there was a wipe, and redirect the farming zone if needed. Short, purposeful, always satisfying.

### Active Session *(30–60 minutes)*
The player runs dungeons, evaluates loot, equips new gear, spends skill points, and tunes routines based on what they've learned. This is the primary loop — the session type where most progression decisions happen.

### Deep Optimization Session *(1–2+ hours)*
The player theory-crafts builds, experiments with skill loadouts for new content, hunts for ability synergies, and pushes into the Gauntlet. This session type rewards mastery over time investment and is the long-term engagement driver for experienced players.

All three session types coexist without friction. A player who only ever has 10 minutes at a time will still make meaningful progress. A player who sinks hours into a session will find depth to reward that investment.

---

## Design Notes

- **The queue system for crafting** (queuing multiple recipes in sequence) was considered and deferred. It represents a meaningful balance lever — adding it shifts the game toward more automation. Will be revisited once core systems are testable.
- **Engagement pattern targets** are preliminary. The real distribution of how players engage will only be understood through playtesting and should not be treated as fixed.
- **The offline death rule** (party dies → all offline rewards stop) is intentional. It creates stakes around routine design and treats failure as information, not punishment.
