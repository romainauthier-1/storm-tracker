# Conventions — storm-tracker-frontend

Conventions d'écriture et d'organisation du code. À lire avant toute
contribution. Le « comment on travaille ensemble » est dans
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Stack

- **Expo SDK 57** (workflow managé), **React Native 0.86**, **React 19**.
- **React Navigation v6** (`native-stack` + `bottom-tabs`) — pas d'Expo Router.
- **Redux Toolkit** + `react-redux` + `redux-persist` (AsyncStorage).
- **react-native-web** — l'app est distribuée en **web / PWA** (bundle Metro,
  `expo export -p web` → `dist/`), c'est la cible principale (iPhone).
- `lucide-react-native` (icônes), `react-native-flash-message` (toasts).

Toujours la **dernière version stable** compatible avec le SDK Expo courant
(`npx expo install <paquet>` quand c'est un paquet qu'Expo connaît).

## Arborescence (structure plate, pas de `src/`)

```
App.js                 point d'entrée : store, providers, navigation
index.js               registerRootComponent

api/                   client HTTP unique + helpers par domaine
  client.js            request() : URL de base, JSON, contrat { result, message }
  auth.js dogs.js walks.js
hooks/                 useXxx.js — logique d'écran réutilisable (useDogs, useWalks)
lib/                   helpers purs (format.js : dates, listes, libellés)
theme/                 design tokens (colors, spacing, radius, shadows, typography)
constants/             listes d'options figées (walk.js)
components/
  ui/                  primitives génériques (Card, Fab, ChipGroup, Field, …)
  fields/              DateField (+ .web.jsx) — variantes par plateforme
  forms/               AddDogForm, AddWalkForm, OptionPickerModal
  DogCard.jsx WalkCard.jsx FormModal.jsx
screens/               un écran par onglet / état d'auth
reducers/              slices Redux (user.js)
utils.js               capitalize + toLocalDateString/TimeString + ré-export colors
__tests__/             tests Jest
```

## Règles d'import

- **Données** : toujours via `api/` (jamais de `fetch` direct vers l'API
  applicative). Les écrans consomment `hooks/useDogs`, `hooks/useWalks`, ou
  appellent `authApi` / `dogsApi` / `walksApi`.
- **Couleurs / espacements / rayons** : depuis `theme/` (ou `colors` via
  `utils`). Pas de hex ni de nombre magique en dur dans les `StyleSheet`.
- Alias `@/*` → racine du repo (lu par Metro via `jsconfig.json`). Utilisable
  pour éviter les `../../`.
- Un `export default` par composant.

## Nommage

- Composants : `PascalCase.jsx`.
- Hooks : `useXxx.js`. Helpers : `camelCase.js`, fonctions **pures**.
- **Langue** : texte affiché à l'utilisateur en **français** ; noms de code et
  commentaires en **anglais**. Le code historique mélange encore un peu — on ne
  rajoute pas de mélange.

## Design tokens (`theme/`)

Palette (`theme/colors.js`) :

| Rôle        | Hex         | Token                   |
| ----------- | ----------- | ----------------------- |
| Vert foncé  | `#33715F`   | `primary`               |
| Vert vif    | `#4FB064`   | `secondary`             |
| Bleu foncé  | `#336471`   | `accent` / `background` |
| Blanc cassé | `#ebebeb`   | `darkWhite`             |
| Gris clair  | `#cfcfcf`   | `lightGray`             |
| Texte foncé | `#16312A`   | `text`                  |
| Gris bleu   | `#8692a7d1` | `muted`                 |
| Rouge       | `#ca0d0d`   | `destructive`           |
| Ombres      | `#000000`   | `shadow`                |

Aussi : `spacing` (échelle 4→40), `radius` (`sm`/`md`/`lg`/`xl`/`pill`/`round`),
`shadows` (`card` / `floating`), `fontSize` + `fontWeight` + `screenTitle`,
`maxContentWidth` (480 — borne la largeur du contenu en desktop web).

Police : système (pas de `fontFamily` custom pour l'instant).

## Tooling

`yarn install`, puis `cp .env.example .env`.

- `yarn start` / `yarn web` — dev (Expo).
- `yarn lint` — ESLint (flat config, `eslint-config-expo`). **0 erreur** ; les
  warnings résiduels (`react-hooks/set-state-in-effect` des hooks de fetch) sont
  tolérés, on **n'en ajoute pas**.
- `yarn format` / `yarn format:check` — Prettier, **indentation tabulation**.
- `yarn test` — Jest (`jest-expo` + `@testing-library/react-native`).
- `yarn build` — `expo export -p web` (produit `dist/`).

## Déploiement

- `vercel.json` : `buildCommand` `expo export -p web`, `outputDirectory` `dist`,
  rewrite SPA `/(.*) → /index.html` (**ne pas supprimer**, sinon les routes
  profondes renvoient un 404).
- `EXPO_PUBLIC_*` est inliné au build : un changement de variable d'env impose un
  redeploy.
- Front + back se déploient **ensemble** quand le contrat d'API change.

## Sécurité

- Aucun secret en clair. `.env*` gitignoré (sauf `.env.example`).
- RGPD : pas de donnée personnelle loggée sans raison.
