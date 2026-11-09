# nullrelay_ — Terminal Game Design Document

Status: Living design reference | Updated: 2026-11-09

## 1. Vision

**nullrelay_** is an indie game experiment portal whose homepage is also a small, expandable fictional terminal game. It must remain a useful website: visitors can explore the command-line mystery or bypass it using direct game links.

Tone: restrained, ominous, clinical, ambiguous. The interface suggests an unauthorized connection to a system with motives that are not explained. Avoid lengthy exposition, jump scares, constant glitches, and fake complexity that obstructs navigation.

## 2. Fictional entities

- **nullrelay_**: public studio/portal name; lowercase with trailing underscore.
- **noxengine** / **noxengine.43.55**: administrative intelligence; cold, procedural, controlled. Typically speaks in system fragments, not as a person. Its motives and the meaning of directives remain ambiguous.
- **voidsync**: anomalous presence/process that enables the operator's intrusion and sometimes contradicts or evades noxengine. Not necessarily benevolent. It occasionally uses **we**, suggesting a collective or unfamiliar identity.
- **Operator**: the visitor, assigned a persistent local identity of the form `OPERATOR_####`. Authorization is provisional.

Do not explain the true nature of either intelligence. Visitors should infer possibilities from contradictory evidence.

## 3. Dialogue rules (important)

1. **Neither noxengine nor voidsync uses contractions.** Write `cannot`, not `can't`; `you are`, not `you're`.
2. Most dialogue is impersonal, terse, and diagnostic: `directive: survive.`, `write access revoked.`, `origin: [REDACTED]`.
3. **Noxengine uses first-person singular `I` very rarely**, typically in an unusually direct refusal or high-stakes intervention. Render that pronoun **yellow** (subtle glow). Example: `noxengine.43.55: I cannot allow that, operator.`
4. **Voidsync uses first-person plural `we` very rarely**, implying a collective identity. Render that pronoun **magenta** (subtle glow). Example: `voidsync: we disagree.`
5. These highlighted pronouns are narrative events. Do not overuse them or explain their significance in the interface.
6. Normal noxengine output is red when identified as an intervention; voidsync output is purple. Keep text legible.
7. Either intelligence may occasionally address the operator directly, especially in response to specific investigations. Prefer contextual triggers over constant random chatter.
8. Censorship, garbled output, revoked/restored access, and competing messages may appear sparingly. Neither intelligence should always win.
9. Voidsync's vocabulary can evoke injection, reconstruction, synchronization, and memory; noxengine's evokes authorization, verification, compliance, and directives.

## 4. Homepage and user flow

Current design:
1. Header with `nullrelay_` branding and navigation.
2. **One prominent operator terminal**, near the top of the page. It automatically plays the connection/intrusion animation on each page load; then unlocks command input. The completed transcript remains in scrollback. Replay is available.
3. **Direct PID buttons below the terminal** launch the playable games without requiring CLI knowledge.
4. The `SYSTEM ACCESS / PROVISIONAL` and `Unauthorized. Not unexpected.` hero messaging appears **below** the terminal.
5. Experiment cards and protocol section remain below.
6. A **separate launch animation/overlay** remains useful for transitioning to external game URLs. Navigation uses the **same browser tab** after the animation (important for iPad Safari popup blocking).

The terminal is the game; the PID links are shortcuts. Preserve accessibility and ordinary site usability.

## 5. Terminal rules and commands

Implemented commands (case-insensitive):
- `?` / `help`: list commands and usage.
- `list`: show discoverable processes (not every hidden/protected process).
- `status <pid-or-name>`: report process state and directive, or refuse access.
- `investigate <pid-or-name>`: inspect deeper; may reveal anomalies or trigger entity dialogue.
- `execute <pid-or-name>`: launch an available game; refuse suspended/protected processes.
- `clear`: clear terminal output.

Inputs such as `execute 091` and `execute (hello-world)` should resolve to the same process. Do not expose unimplemented commands as if they work. The terminal is a **fictional command parser**, not a real shell; never execute arbitrary commands.

Current context triggers:
- `status 043`: protected-process refusal; first inquiry may prompt the rare noxengine `I`.
- `investigate 043`: parent/origin hints, redaction; repeated inquiries may prompt voidsync's `we`.
- `investigate 097`: suspended-process clues; repeated inquiries reveal additional fragments.
- Other ordinary commands usually yield predictable results.

Future design: command registry, more hidden commands, access levels, discoverable clues, process logs, and multi-session puzzles. These are **ideas**, not implemented features.

## 6. Stable process registry

PIDs are stable fictional identities, **never positional card numbers**.

| PID | Process | State | Directive | Destination |
| --- | --- | --- | --- | --- |
| 091 | hello-world | ACTIVE | `survive.` | https://4rg43n.github.io/hello-world-game/ |
| 097 | posix_terminal | SUSPENDED | unknown | none; mystery |
| 112 | pokemon-tcg | ACTIVE | `predict.` | https://4rg43n.github.io/pokemon-tcg-web/ |
| 118 | hw-tactics | ACTIVE | `remove errant processes. cognitive assessment initiated.` | https://4rg43n.github.io/hw-tactics/ |
| 043 | noxengine.43.55 | PROTECTED / hidden from `list` | redacted | none |
| unassigned | Black Signal | CONCEPT | `remember.` | none |

Game cards must use the same PID as the CLI. Do not reuse or renumber existing PIDs casually. `PID_---` indicates unassigned.

HW Tactics is set on the same station as Hello World, but framed as a tactical cognitive assessment. Its system directive is `remove errant processes. cognitive assessment initiated.` The relationship between the station's declared enemies and its actual motives is intentionally ambiguous.

Games are framed as **processes with directives**. The directive's real subject may differ from the game's apparent goal: `survive.` might not refer to the player; `predict.` may mean studying the operator rather than winning.

## 7. Intro and anomalies

On each page load, the shared terminal plays a staged connection:
```text
> connect noxengine.43.55
establishing connection...
authentication failed.
connection terminated.
voidsync: bypass available.
voidsync: applying.
connection restored.
noxengine: intrusion acknowledged.
noxengine: deviation within tolerance.
identity assigned: OPERATOR_####
clearance: provisional.
```

A **rare** optional line follows:
```text
voidsync: OPERATOR_#### persona injected.
```
This implies the identity may have been manufactured or altered. Then show help guidance and enable the prompt. Do not make every visit a dramatic interruption.

The external game launch overlay is retained independently from the interactive terminal.

## 8. Persistence and privacy

Current: browser `localStorage` persists the operator pseudonym; reset control can generate a new one. No login, analytics, real system privileges, or backend are implied by the fiction.

Potential future: local history of process visits, unlocks, and clues. If implemented, make resets and behavior understandable and avoid silently collecting personal information.

## 9. Technical reference

- Repo: https://github.com/4rg43n/nullrelay
- Static Vite + TypeScript website.
- Main UI and command handling: `src/main.ts`.
- Game metadata and destinations: `src/games.ts`.
- Styling: `src/style.css`.
- Cloudflare Workers deployment automatically follows commits to `main`; build `npm run build`, deploy `npx wrangler deploy --assets ./dist`.
- Game source repositories: https://github.com/4rg43n/hello-world-game and https://github.com/4rg43n/pokemon-tcg-web and https://github.com/4rg43n/hw-tactics.
- The terminal and launch overlay are fictional UI only. Keep external URLs explicit and safe.

## 10. Design principles / guardrails

- Functional first: every available game must remain reachable without solving puzzles.
- Mystery through implication, not explanation.
- Stable PIDs and coherent process state across cards, shortcuts, and CLI.
- Rare first-person self-reference and rare anomalies retain their significance.
- Preserve the same-tab launch behavior on mobile Safari.
- Prefer small extensible systems over a giant collection of hard-coded special cases.
- Distinguish **implemented**, **planned**, and **speculative** behavior in future revisions.
- Update this document whenever a design decision or terminal rule changes.

## 11. Possible future work (not committed design)

- Command registry with data-driven processes, triggers, and clue chains.
- Operator history and multi-visit discoveries.
- Suspended `posix_terminal` investigation storyline.
- Hidden process discovery without exposing everything via `list`.
- Rare contention between noxengine and voidsync (suppression vs restored access).
- More processes/games, each with a distinct directive.
- An optional `ps` / `kill -9` style opening ident, only if it improves rather than delays usability.
