# 🐕 Storm Tracker — Frontend

Application mobile et web (PWA) pour suivre les balades de ses chiens : qui a été promené, quand, combien de temps, et comment ça s'est passé.

**Démo :** [storm-tracker-blush.vercel.app](https://storm-tracker-blush.vercel.app) · **API :** [storm-tracker-backend](https://github.com/romainauthier-1/storm-tracker-backend)

[![CI](https://github.com/romainauthier-1/storm-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/romainauthier-1/storm-tracker/actions/workflows/ci.yml)
![Expo](https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)

---

## Fonctionnalités

- **Compte utilisateur** : inscription, connexion, déconnexion ; session conservée entre deux ouvertures de l'app
- **Chiens** : liste de ses chiens, ajout (nom, date de naissance, sexe, races)
- **Balades** : historique trié par date, ajout d'une balade avec date, heure, durée, chien promené, besoins, humeur du chien et de l'humain, notes
- **Accueil** : date du jour et nombre de balades déjà faites aujourd'hui
- **Multi-plateforme** : une seule base de code pour iOS, Android et le web (déployé en PWA installable)

## Stack technique

| Domaine          | Choix                                                             |
| ---------------- | ----------------------------------------------------------------- |
| Framework        | Expo 57, React Native 0.86, React 19, react-native-web            |
| État             | Redux Toolkit + redux-persist (AsyncStorage)                      |
| Navigation       | React Navigation 6 (onglets + stack)                              |
| UI               | Composants maison + design tokens (`theme/`), Lucide icons        |
| Qualité          | ESLint, Prettier, Jest + Testing Library                          |
| CI / Déploiement | GitHub Actions (lint, format, tests, build) · Vercel (export web) |

## Points techniques

- **Couche API unique** (`api/client.js`) : un seul point d'entrée `request()` qui préfixe l'URL du backend, gère le JSON, déballe l'enveloppe `{ result, message }` de l'API et lève une `ApiError` avec un message lisible par l'utilisateur. Les appels métier sont regroupés par domaine (`api/auth.js`, `dogs.js`, `walks.js`).
- **Hooks d'écran** (`hooks/useDogs`, `useWalks`) : chargement et mise en cache dans le store, réutilisés d'un écran à l'autre.
- **Design system léger** : primitives partagées (`Card`, `Field`, `ChipGroup`, `Fab`, `ScreenLayout`…) et tokens (couleurs, espacements, rayons, typographie).
- **Composants spécifiques à la plateforme** : `DateField.jsx` / `DateField.web.jsx` pour un sélecteur de date natif sur mobile et HTML sur le web.
- **Tests unitaires** sur les helpers de formatage, le client API et les composants UI.

## Installation

Prérequis : Node.js 18+, Yarn, et l'[API Storm Tracker](https://github.com/romainauthier-1/storm-tracker-backend) lancée en local (ou l'URL déployée).

```bash
git clone https://github.com/romainauthier-1/storm-tracker.git
cd storm-tracker
yarn install
cp .env.example .env    # renseigner EXPO_PUBLIC_BACKEND_URL
yarn start              # puis : scanner le QR code avec Expo Go, ou touche "w" pour le web
```

| Variable                  | Rôle                                       |
| ------------------------- | ------------------------------------------ |
| `EXPO_PUBLIC_BACKEND_URL` | URL de l'API (ex. `http://localhost:3000`) |

| Script       | Rôle                          |
| ------------ | ----------------------------- |
| `yarn start` | serveur de dev Expo           |
| `yarn web`   | lancement direct en web       |
| `yarn test`  | tests Jest                    |
| `yarn lint`  | ESLint                        |
| `yarn build` | export web statique (`dist/`) |

## Structure

```
App.js            store Redux, providers, navigation
api/              client HTTP + appels par domaine
hooks/            useDogs, useWalks
screens/          Welcome, Login, Dog, Walk, LogOut
components/       ui/ (primitives), fields/, forms/, cartes chien / balade
theme/            design tokens
lib/ constants/   helpers purs, options des formulaires
__tests__/        tests Jest
```

---

Romain Authier — [GitHub](https://github.com/romainauthier-1)
