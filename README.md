# Apolo Dog Training — Site vitrine

Site vitrine une page pour **Apolo Dog Training** (Frédéric, éducateur & comportementaliste canin à Bordeaux).

- **Stack** : Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
- **Police** : Poppins · **Couleur** : `#36A9E1`
- **Sections** : Accueil · À propos · Services · Avis Google · Contact

## Développement local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Contenu

Tout le texte, les coordonnées et les services sont centralisés dans **`lib/site.ts`**.
Les images sont dans `public/photos/` et `public/logo/` (remplaçables à l'identique).

## Avis Google (automatiques)

Sans configuration, le site affiche des avis de repli + le badge « 5/5 · 22 avis ».
Pour brancher les **vrais avis en direct** :

1. Console Google Cloud → nouveau projet → activer **Places API (New)**
2. Créer une **clé API**
3. Ajouter la clé dans les variables d'environnement (voir `.env.example`) :
   - en local : fichier `.env.local` → `GOOGLE_MAPS_API_KEY=...`
   - sur Vercel : Settings → Environment Variables

Les avis sont mis en cache 24 h (`revalidate: 86400`).

## Déploiement Vercel

1. Pousser ce dossier sur un dépôt GitHub
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importer le dépôt
3. Framework détecté automatiquement (Next.js) → **Deploy**
4. (Optionnel) ajouter la variable `GOOGLE_MAPS_API_KEY`
5. Domaine : Settings → Domains → ajouter `apolodogtraining.fr`
