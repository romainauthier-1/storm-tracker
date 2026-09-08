---
name: deploy
description: Déployer le frontend storm-tracker sur Vercel et vérifier la prod. À utiliser quand un lot est mergé et prêt à partir.
---

# deploy — mise en prod (frontend web / PWA)

Le front est un export web statique (`expo export -p web` → `dist/`) servi par
Vercel. Backend séparé : `storm-tracker-backend.vercel.app`.

## Étapes

1. **Ne jamais merger sans l'accord explicite de Romain.**
2. Après merge sur `master`, Vercel redéploie seul (`buildCommand` +
   `outputDirectory` dans `vercel.json`). Vérifier que le déploiement est parti.
3. **Si le contrat d'API a changé** : déployer front + back **ensemble**.
4. **`EXPO_PUBLIC_*` est inliné au build** : si une variable d'env a changé
   (`EXPO_PUBLIC_BACKEND_URL`, `EXPO_PUBLIC_VAPID_PUBLIC_KEY`), forcer un
   **redeploy** (un simple redéploiement de commit identique ne suffit pas si
   Vercel a mis en cache).
5. **Smoke test prod** :
   - `/` et un deep-link (ex. `/balades`) → **200** (sinon le rewrite SPA de
     `vercel.json` a sauté).
   - `theme-color` de la page = `#33715F`.
   - login + liste des balades OK contre le backend prod.
   - sur iPhone (PWA) : ouvrir « Ajouter une balade », vérifier que le champ
     date/heure s'affiche et qu'une date future est refusée.

## Pièges

- `vercel.json` : rewrite `/(.*) → /index.html` — **ne pas supprimer**.
- `EXPO_PUBLIC_BACKEND_URL` = origine du backend prod (sans `/` final).
- `public/index.html` porte les couleurs PWA (`theme-color`, fond) : garder
  aligné sur `theme/colors.js` (`primary`).
