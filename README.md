# Estimateur Toitures Boréal

Exercice technique full-stack — estimateur de soumission en ligne pour un couvreur de la Rive-Nord.

## Liens

- **App déployée** : https://travaux-toit-boreal.vercel.app
- **Page réalisations (WordPress API)** : https://travaux-toit-boreal.vercel.app/realisations

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Neon (Postgres) + Vercel.

## Setup local

```bash
npm install
npm run dev
```

Variables d'environnement nécessaires (`.env.local`) :

```bash
DATABASE_URL=postgresql://...-pooler.region.aws.neon.tech/neondb?sslmode=require
WEBHOOK_URL=https://webhook.site/ton-url
ADMIN_USER=admin
ADMIN_PASSWORD=ton-mot-de-passe
```

## Ce que j'aurais fait ensuite pour le plugin

- vérifié pourquoi ça prenait pas toute la largeur, je pense c'est en lien avec le thème que j'ai utilisé pour le site WP
- testé la version mobile, puis vérifier si l'iframe est bien fonctionnel / renvoie bien les infos côté serveur