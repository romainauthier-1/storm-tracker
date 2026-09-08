# storm-tracker (frontend) — CLAUDE.md

SPA Expo / React Native de StormTracker (suivi de balades de chien), distribuée
en **web / PWA** (bundle Metro), utilisée surtout sur iPhone.

**À lire avant de coder :**

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — branches, PR, revue, définition de
  « terminé ».
- [`conventions.md`](conventions.md) — stack, arborescence (structure **plate**),
  règles d'import, design tokens (`theme/`), tooling, déploiement.
- [`README.md`](README.md) — démarrage, stack.

## Rappels rapides

- Structure **plate** : `api/`, `hooks/`, `lib/`, `theme/`, `constants/`,
  `components/{ui,fields,forms}/`, `screens/`, `reducers/`. Pas de `src/`.
- Données via `api/` (`request()` + helpers `authApi` / `dogsApi` / `walksApi`),
  ou les hooks `useDogs` / `useWalks`. **Jamais de `fetch` direct** vers l'API.
- Styles via `theme/` (`colors`, `spacing`, `radius`, `shadows`, `fontSize`).
- `DateField` a une variante `.web.jsx` (le picker natif n'existe pas sur web) —
  toucher les deux si on change son API.
- Avant PR : `yarn lint` (0 erreur) + `format:check` + `test` + `build` verts.

## Outillage Claude (`.claude/`)

- `agents/reviewer.md` — relit un diff selon `conventions.md`.
- `skills/deploy` — mise en prod Vercel + vérif.
