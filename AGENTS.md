# Instructions for AI collaborators — nullrelay_

Before editing the website, read **[GAME_DESIGN.md](./GAME_DESIGN.md)**. It is the authoritative living design reference for the terminal game, fiction, and UI rules.

## Non-negotiable continuity
- Brand is `nullrelay_` (lowercase, trailing underscore).
- Preserve the functional portal and direct game shortcuts. The CLI is optional exploration, not a gate.
- Maintain stable PIDs across terminal, cards, and shortcuts: 091 Hello World; 112 Pokémon TCG; 097 suspended posix_terminal; 043 protected noxengine. Black Signal has no assigned PID.
- Noxengine and voidsync **never use contractions**.
- Noxengine's rare `I` is yellow; voidsync's rare `we` is magenta. Use sparingly and do not explain the convention in the site.
- Their voices are terse, clinical, ambiguous. No lengthy lore dumps.
- Keep the intro in the interactive terminal on every page load; keep a separate game-launch animation.
- Game launch navigation stays in the same tab for iPad Safari compatibility.
- Never turn fictional CLI commands into arbitrary system command execution.

## Development workflow
- Source: `src/main.ts`, `src/games.ts`, `src/style.css`.
- Validate TypeScript/build where possible (`npm run build`).
- Update `GAME_DESIGN.md` when changing established rules, processes, or planned vs implemented status.
- Do not silently promote speculative lore or planned features into established canon.
