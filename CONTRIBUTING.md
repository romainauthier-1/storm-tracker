# Contribuer à storm-tracker-frontend

SPA Expo / React Native de StormTracker (suivi de balades de chien). Ce document
décrit **comment on travaille ensemble** (Romain + Claude). Les conventions
d'écriture du code sont dans [`conventions.md`](conventions.md).

## Rôles

|                            | Romain                     | Claude (Claude Code)                  |
| -------------------------- | -------------------------- | ------------------------------------- |
| Décisions produit / métier | **décide**                 | propose un plan, jamais de choix seul |
| Implémentation             | relit, peut coder          | code sur une branche dédiée           |
| Ouverture de PR            | —                          | **ouvre** la PR, applique la revue    |
| Merge                      | **merge** (jamais délégué) | ne merge jamais                       |
| Déploiement                | déclenche / valide         | prépare, documente                    |

Claude s'identifie : chaque commit porte les trailers `Co-Authored-By: Claude …`
et `Claude-Session: …` ; le corps de PR se termine par
`🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Cycle de contribution

**1 lot cohérent = 1 branche = 1 PR.** Un lot se relit et se valide d'un bloc
(un correctif, une fonctionnalité, une passe de refacto ciblée). Si la
description de la PR a besoin d'un « et aussi », c'est deux lots.

1. Partir de `master` à jour (`git checkout master && git pull --ff-only`).
2. Brancher : `type/kebab-topic`, `type` ∈ `feat` · `fix` · `chore` · `refactor`
   · `docs`.
3. Commits en [Conventional Commits](https://www.conventionalcommits.org) avec
   scope : `feat(walks): …`, `fix(forms): …`. Corps = quoi / pourquoi + liste des
   changements + ligne de vérification.
4. Ouvrir la PR quand le lot est complet et la [définition de « terminé »](#définition-de--terminé-)
   remplie.
5. Romain relit et merge. **Jamais de merge sans son accord explicite.**

Les lots peuvent être **empilés** (une branche part de la précédente non encore
mergée) quand ils touchent les mêmes fichiers ; le préciser dans la PR et les
merger dans l'ordre.

## Définition de « terminé »

Une PR est prête quand, en local :

- [ ] `yarn lint` — 0 erreur (warnings résiduels tolérés, on n'en ajoute pas)
- [ ] `yarn format:check` vert
- [ ] `yarn test` vert
- [ ] `yarn build` vert (`expo export -p web`)
- [ ] `expo export -p ios` vert si du code natif est touché
- [ ] navigation manuelle sur les écrans touchés (web + PWA iPhone si pertinent)
- [ ] données via `api/` (jamais de `fetch` direct) ; styles via `theme/`
- [ ] aucun secret en clair ; `.env` gitignoré

## Mise en place locale

```bash
yarn install
cp .env.example .env   # renseigner EXPO_PUBLIC_BACKEND_URL
yarn start             # ou yarn web
```

Front + back se **déploient ensemble** quand le contrat d'API change.
