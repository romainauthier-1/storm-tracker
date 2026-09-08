# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Une entrée par lot mergé, sous la version en préparation.

## [Non publié]

### Ajouté

- Outillage : ESLint (`eslint-config-expo`), Prettier (tabs), Jest
  (`jest-expo` + `@testing-library/react-native`), scripts `lint` / `format` /
  `test` / `build`, `vercel.json`, CI GitHub Actions, `.env.example`.
- `theme/` — design tokens (colors, spacing, radius, shadows, typography, layout).
- `components/ui/` — primitives partagées : `Card`, `ScreenLayout`,
  `ScreenTitle`, `EmptyState`, `Fab`, `ChipGroup`, `Field`.
- `api/` — client HTTP unique (`request`, `ApiError`) + helpers `authApi` /
  `dogsApi` / `walksApi` ; hooks `useDogs` / `useWalks`.
- `components/fields/DateField` — champ date/heure multi-plateforme (variante
  `.web.jsx` avec `<input>` DOM, le picker natif n'a pas de build web).
- `components/forms/` — `FormModal` éclaté en `AddDogForm` / `AddWalkForm` /
  `OptionPickerModal` ; `constants/walk.js` ; `lib/format.js`.

### Modifié

- Largeur du contenu bornée (`maxContentWidth`) pour le rendu desktop web.
- Validation des formulaires avant envoi ; erreurs backend affichées en toast.

### Corrigé

- Picker date/heure invisible sur la PWA (iOS) ; dates futures désormais bloquées.
- `reducers/user.js` : `logout` réinitialise bien tout l'état.
- Couleurs héritées d'un template dans `public/index.html`.

### Retiré

- `MIGRATION.md` (hérité d'un autre projet) ; dépendances `cors`, `dotenv`,
  `react-native-use-form` (non utilisées) ; `components/Card.js` (mort).

## Backlog produit (décisions = Romain)

- Éditer / supprimer une balade et un chien ; écran détail d'une balade.
- Feature « rencontres » (`WalkCard` référençait déjà `walk.meetings`).
- Statistiques sur l'accueil (totaux hebdo, séries, durée cumulée).
- Filtre des balades par chien / par date.
- Ré-activer `redux-persist` proprement (monter `PersistGate`) pour l'offline PWA.
- Auth : le login ne renvoie pas de token / session — à durcir.
- Notifications push (VAPID key déjà dans `.env`, `serviceWorker.js` présent,
  reducer `activateNotif` prêt).
- Thème sombre (aujourd'hui `userInterfaceStyle: light` forcé).
