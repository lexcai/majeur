# PROJET MAJEUR

Ce projet utilise Next.js.

Pour le backend, il utilise MongoDB avec Mongoose, Bcrypt, et l'authentification JWT avec cookie. Une documentation API Swagger est disponible à /api/docs.

Pour l'interface utilisateur, il utilise le framework MaterialUI.

Pour les requêtes HTTP, utilisation de Node Fetch.

Testé avec Jest.

## Fonctionnalités

User registration

User login

User logout

User authentication with JWT and cookie

User liked movies/series ( Route ok mais pas implémenter)

Movies/series Toprated

Movies/series Discover

Movie/series Details

Movie/series like/unlike ( Route ok mais pas implémenter)

## Prérequis

Pour exécuter ce projet, vous aurez besoin de :

- Node.js
- npm

## Installation

Clonez le dépôt :

git clone <https://github.com/lexcai/majeur.git>

Installez les dépendances :

```
npm install
```

D'abord, ajoutez un fichier .env.local dans le répertoire racine avec le contenu suivant :

```
cp .env.example .env.local
```

```
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret
DATA_API_URL=https://api.themoviedb.org/3
DATA_API_KEY=votre_clé_api
```

Ensuite, installez les dépendances :

```
npm install
```

ou

```
yarn install
```

## Ensuite, lancez le serveur de développement :

```
npm run dev
```

ou

```
yarn dev
```

Ouvrez http://localhost:3000 avec votre navigateur pour voir le résultat.

La page se met à jour automatiquement lorsque vous modifiez un fichier.

## Tests

Pour exécuter les tests :

```
npm run test:coverage
```

## Structure du projet

- src/ : Contient le code source du projet.
- tests/ : Contient les tests unitaires.
- public/ : Contient les fichiers publics comme les images, les styles, etc.
- pages/ : Contient les composants de page pour Next.js.
- models/ : Contient les modèles de données.
- lib/ : Contient les bibliothèques utilitaires.
- services/ : Contient les services, comme les services de configuration.

## En savoir plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

[Documentation de Next.js](https://nextjs.org/docs) - apprenez-en plus sur les fonctionnalités et l'API de Next.js.
[Apprenez Next.js](https://nextjs.org/learn) - un tutoriel interactif sur Next.js.

Déployer sur Vercel La façon la plus simple de déployer votre application Next.js est d'utiliser [la plateforme Vercel](https://vercel.com), créée par les créateurs de Next.js.
