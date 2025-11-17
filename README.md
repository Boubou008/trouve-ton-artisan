# 🛠️ Trouve Ton Artisan

Application web permettant de rechercher des artisans par catégorie,
spécialité et ville.\
Ce projet utilise **React (Vite)** pour le front-end et **Node.js /
Express** pour le back-end.\
Les données sont servies depuis des **fichiers JSON**, car MySQL est
indisponible (voir explication plus bas).

Ce **README unique** couvre : - le **front-end (React / Vite)** - le
**back-end (Node.js / Express)** - la **structure prévue MySQL** -
l'installation et le lancement des **deux environnements**

------------------------------------------------------------------------

## 📌 1. Prérequis

### 🔧 Outils nécessaires

-   **Node.js ≥ 18**
-   **npm ≥ 8**
-   **Git**
-   (Optionnel) MySQL Workbench ou phpMyAdmin

### 📦 Technologies utilisées

#### Front-end :

-   React
-   React Router
-   Bootstrap
-   Sass
-   Axios

#### Back-end :

-   Node.js / Express
-   Nodemon
-   CORS

------------------------------------------------------------------------

## 📁 2. Structure du projet

    trouve-ton-artisan/
    │
    ├── server/                     → API Node.js (Express)
    │   ├── src/
    │   │   ├── routes/            → Routes API
    │   │   ├── db.js              → Accès aux fichiers JSON
    │   │   └── index.js           → Point d’entrée serveur
    │   ├── package.json
    │   └── .env
    │
    ├── src/                        → Front-end React
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── data/
    │   ├── App.jsx
    │   ├── router.jsx
    │   └── main.jsx
    │
    ├── vite.config.js
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## 🚀 3. Installation & lancement

### 🔵 3.1 Installer et lancer le front-end (React)

Dans la racine du projet :

    npm install
    npm run dev

Le site s'ouvre automatiquement sur :\
➡️ http://localhost:5173

------------------------------------------------------------------------

### 🟢 3.2 Installer et lancer le back-end (API Node.js)

    cd server
    npm install
    npm run dev

Serveur disponible sur :\
➡️ http://localhost:3000

------------------------------------------------------------------------

## 🔌 4. Proxy Vite & CORS

### Proxy (vite.config.js)

Permet d'appeler `/api/...` directement depuis le front :

    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      }
    }

### CORS (back-end)

    import cors from "cors";
    app.use(cors());

------------------------------------------------------------------------

## 🌐 5. Routes API disponibles

  Méthode   Route                 Description
  --------- --------------------- -------------------------
  GET       /api/health           Test API
  GET       /api/categories       Liste des catégories
  GET       /api/artisans         Liste des artisans
  GET       /api/artisans/:slug   Artisan par slug
  POST      /api/contact          Envoi de message (mock)

L'API lit les données via :

    server/src/data/categories.json
    server/src/data/artisans.json

(Miroir de vos données MySQL)

------------------------------------------------------------------------

## 🗄️ 6. Structure MySQL prévue (NON utilisée)

### ❌ Pourquoi MySQL n'est pas utilisé ?

Le serveur MySQL plante au démarrage avec cette erreur :

    Erreur my sql : Error: MySQL shutdown unexpectedly.
08:52:17  [mysql] 	This may be due to a blocked port, missing dependencies, 
08:52:17  [mysql] 	improper privileges, a crash, or a shutdown by another method.
08:52:17  [mysql] 	Press the Logs button to view error logs and check
08:52:17  [mysql] 	the Windows Event Viewer for more clues
08:52:17  [mysql] 	If you need more help, copy and post this
08:52:17  [mysql] 	entire log window on the forums

➡️ Impossible d'ouvrir phpMyAdmin\
➡️ Impossible de démarrer MySQL via XAMPP\
➡️ Donc la base MySQL n'a pas pu être mise en place

Les données sont donc servies via **des fichiers JSON**

------------------------------------------------------------------------

## 🗃️ Structure SQL prévue si MySQL fonctionnait

### Base

    CREATE DATABASE trouve_ton_artisan;

### Tables

    categories (id, name, slug)
    specialities (id, name, slug, category_id)
    artisans (
      id, name, slug, speciality_id,
      city, rating, email, website_url,
      is_featured, featured_rank
    )
    contact_messages (id, artisan_id, name, email, subject, message)

------------------------------------------------------------------------

## 🐞 8. Dépannage (FAQ)

### ❌ Page blanche au chargement

→ Vérifier la console navigateur\
→ Vérifier le serveur front (`npm run dev`)\
→ Vérifier l'import des composants

### ❌ L'API retourne 500

→ Vérifier que `server` est lancé\
→ Vérifier les fichiers JSON\
→ Vérifier vite.config proxy

### ❌ MySQL inaccessible

→ C'est normal dans ce projet\
→ Le backend n'utilise pas MySQL mais des fichiers JSON

------------------------------------------------------------------------

## 📚 9. Auteur

Projet réalisé par Feck François-Xavier dans le cadre du **CEF**\
TP : *Trouve ton artisan*

------------------------------------------------------------------------
