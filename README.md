# 🐕 Storm Tracker — Frontend

> **Une application mobile pour suivre les balades de vos chiens** — Une interface React Native/Expo qui permet aux utilisateurs de gérer leurs chiens, leurs balades et de visualiser leurs statistiques.

---

[![Expo](https://img.shields.io/badge/Expo-54.0.33-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Redux](https://img.shields.io/badge/Redux-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![React Navigation](https://img.shields.io/badge/React_Navigation-6-673AB7?style=for-the-badge)](https://reactnavigation.org/)
[![Lucide React Native](https://img.shields.io/badge/Lucide_React_Native-1.7.0-3B82F6?style=for-the-badge)](https://lucide.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📜 À propos du projet

**Storm Tracker Frontend** est une **application mobile cross-platform** développée avec **Expo** et **React Native**. Elle offre une expérience utilisateur immersive pour :

- **Gérer vos chiens** – Ajouter, modifier, supprimer vos compagnons
- **Enregistrer vos balades** – Suivre chaque promenade avec date, durée et distance
- **Visualiser vos statistiques** – Voir l'historique de vos balades
- **Naviguer facilement** – Interface intuitive avec onglets
- **Recevoir des notifications** – Alertes pour les nouvelles fonctionnalités

L'application est conçue pour être simple, rapide et agréable à utiliser au quotidien.

---

## 🔧 Stack Technique

| Catégorie | Technologie | Version | Rôle |
|----------|-------------|---------|------|
| **Framework** | [Expo](https://expo.dev/) | 54.0.33 | Framework React Native |
| **Librairie UI** | [React Native](https://reactnative.dev/) | 0.81.5 | Construction de l'interface mobile |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) | 2.11.2 | Gestion centralisée de l'état |
| **Persistance** | [Redux Persist](https://github.com/rt2zz/redux-persist) | 6.0.0 | Sauvegarde du state dans AsyncStorage |
| **Navigation** | [React Navigation](https://reactnavigation.org/) | 6 | Navigation entre écrans |
| **Icons** | [Lucide React Native](https://lucide.dev/) | 1.7.0 | Bibliothèque d'icônes |
| **Storage** | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | 2.2.0 | Stockage local |
| **DateTime Picker** | [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) | 8.4.4 | Sélecteur de dates |
| **Flash Messages** | [react-native-flash-message](https://github.com/luggit/react-native-flash-message) | 0.4.2 | Notifications toast |
| **PWA** | [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) | - | Notifications push |
| **Déploiement** | [Expo EAS](https://docs.expo.dev/eas/) | - | Build et déploiement |

---

## ✨ Fonctionnalités

### 📱 **Interface Mobile**
-  **Navigation par onglets** – Bottom Tab Navigator avec icônes personnalisées
-  **Design moderne** – Interface fluide et intuitive
-  **Responsive** – Adaptation à toutes les tailles d'écran
-  **Thème personnalisé** – Couleurs et styles cohérents
-  **Animations** – Transitions fluides entre les écrans

### 👤 **Authentification**
-  **Connexion** – Formulaire de login avec validation
-  **Gestion de token** – Stockage sécurisé dans AsyncStorage
-  **État de connexion** – Maintien de la session
-  **Déconnexion** – Suppression du token

### 🐕 **Gestion des Chiens**
-  **Liste des chiens** – Affichage de tous vos chiens
-  **Ajout de chien** – Formulaire pour ajouter un nouveau chien
-  **Détails du chien** – Visualisation des informations complètes
-  **Modification** – Édition des informations d'un chien
-  **Suppression** – Retrait d'un chien de votre liste

### 🚶 **Gestion des Balades**
-  **Liste des balades** – Historique de toutes vos balades
-  **Ajout de balade** – Enregistrement d'une nouvelle promenade
-  **Détails de la balade** – Date, durée, distance, chien associé


### 🎨 **Écrans**
-  **WelcomeScreen** – Écran d'accueil avec présentation
-  **LoginScreen** – Connexion à l'application
-  **DogScreen** – Liste et gestion des chiens
-  **WalkScreen** – Liste et gestion des balades
-  **LogOutScreen** – Déconnexion

### 📝 **Composants**
-  **Card.js** – Carte générique réutilisable
-  **DogCard.jsx** – Carte spécifique pour les chiens
-  **WalkCard.jsx** – Carte spécifique pour les balades
-  **FormModal.jsx** – Modal de formulaire pour l'ajout/édition

---

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optionnel pour le développement)
- [Storm Tracker Backend](https://github.com/dankysten/storm-tracker-backend) **en cours d'exécution**

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/dankysten/storm-tracker-frontend.git
   cd storm-tracker-frontend
   ```

2. **Installer les dépendances**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` à la racine avec la variable suivante :
   ```env
   EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
   ```

4. **Lancer l'application**
   ```bash
   # Mode développement
   yarn start
   # ou
   npm start
   
   # Sur Android
   yarn android
   # ou
   npm run android
   
   # Sur iOS
   yarn ios
   # ou
   npm run ios
   
   # Sur Web
   yarn web
   # ou
   npm run web
   ```

5. **Accéder à l'application**
   - Scannez le QR code avec l'application **Expo Go** (mobile)
   - Ou ouvrez `http://localhost:19006` dans votre navigateur (web)

---

## 📁 Structure du Projet

```
storm-tracker-frontend/
├── App.js                     # Point d'entrée principal
├── index.js                  # Registration Expo
├── package.json              # Dépendances et scripts
├── app.json                  # Configuration Expo
├── .env                      # Variables d'environnement
├── .gitignore                # Fichiers ignorés par Git
│
├── assets/                   # Ressources statiques
│
├── public/                   # Fichiers publics
│   └── apple-touch-icon.png  # Icône pour PWA
│
├── components/               # Composants réutilisables
│   ├── Card.js               # Carte générique
│   ├── DogCard.jsx           # Carte chien
│   ├── WalkCard.jsx          # Carte balade
│   └── FormModal.jsx         # Modal de formulaire
│
├── screens/                  # Écrans de l'application
│   ├── LoginScreen.jsx      # Écran de connexion
│   ├── WelcomeScreen.jsx    # Écran d'accueil
│   ├── DogScreen.jsx         # Écran des chiens
│   └── WalkScreen.jsx        # Écran des balades
│
├── reducers/                 # Store Redux
│   └── user.js               # Reducer utilisateur
│
├── utils.js                  # Fonctions utilitaires
│
└── node_modules/             # Dépendances installées
```

---

## 🔌 Configuration Backend

L'application nécessite un backend fonctionnel. Par défaut, elle se connecte à :
```
http://localhost:3000
```

**Pour utiliser un backend déployé :**
1. Lancer le [Storm Tracker Backend](../backend/README.md) ou utiliser l'URL déployée
2. Mettre à jour `.env` :
   ```env
   EXPO_PUBLIC_BACKEND_URL=https://storm-tracker-backend.vercel.app
   ```

---

## 🎨 Personnalisation

### Thème
Le thème principal est défini dans `utils.js` avec :
- **Couleur primaire** : Définie dans les variables de couleur
- **Couleur secondaire** : Utilisée pour la barre de navigation
- **Couleurs des onglets** : Actif/inactif personnalisables

Tu peux modifier ces valeurs pour adapter le thème à ton style.

### Navigation
La configuration de la barre de navigation est dans `App.js`. Tu peux y modifier :
- Les onglets affichés
- Les icônes utilisées (HeartHandshake, PawPrint, Footprints, SquareArrowRightExit)
- Les couleurs de la barre
- Les styles des labels

### Carte des balades
Le composant `WalkCard.jsx` affiche :
- Date de la balade
- Durée
- Distance
- Chien associé
- Options d'édition/suppression

---

## 📱 Déploiement (PWA)

### Avec Expo EAS
1. Configurer `app.json` avec les bonnes informations
2. Lancer le build :
   ```bash
   eas build --platform all
   ```
3. Déployer sur les stores ou comme PWA

### En tant que PWA
1. Builder l'application web :
   ```bash
   yarn web
   ```
2. Déployer le dossier `dist/` sur un hébergement statique (Vercel, Netlify, etc.)
3. Configurer le **Service Worker** pour les notifications push

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- **Ouvrir une issue** pour signaler un bug ou proposer une amélioration
- **Forker le projet** et soumettre une Pull Request

---

## 📜 Licence

Ce projet est sous licence **[MIT](https://opensource.org/licenses/MIT)**.

---

## 👤 Auteur

📌 **Romain Authier**  
📧 [dankysten](https://github.com/dankysten)  
💼 Développeur Fullstack junior (et papa de Storm 🐾)

---

> *"Marchez, respirez, profitez. Votre chien sait déjà comment faire."* ✨
