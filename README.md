# Calis Tracker

Calis Tracker est une Progressive Web App (PWA) de suivi de séances de sport qui permet d’ajouter et de marquer vos séances dans un calendrier interactif, de planifier vos entraînements, de définir des objectifs et de chronométrer vos exercices. Conçue pour mobile, l’interface n’est pas optimisée pour un affichage desktop ; je vous conseille donc de réduire la fenêtre de votre navigateur ou d’utiliser un smartphone pour une expérience optimale.

---

## Aperçu

> **ℹ️ Pour une expérience optimale, utilisez Calis Tracker en affichage mobile (taille d’écran réduite) ou directement sur votre téléphone.**

---

## Fonctionnalités principales

- **Calendrier de suivi**  
  Ajouter chaque séance, marquer “faite” ou “ratée” avec une icône colorée.

- **Planificateur de séances**  
  Créer un planning hebdomadaire : définir les exercices ainsi que leur nombre de répétitions.

- **Liste d’objectifs**  
  Définir et consulter des objectifs personnels (ex : atteindre 50 tractions).

- **Chronomètre intégré**  
  Chronométrer ses temps de maintien, de repos ou les différentes phases d’un exercice directement dans l’app.

- **Authentification sécurisée**  
  Système login/signup avec JWT et mots de passe hachés (bcrypt).

- **Menu de navigation**  
  Accessible depuis n’importe quelle page : calendrier, séances, objectifs, paramètres.

---

## Stack technique

- **Frontend :** React, Tailwind CSS  
- **Backend :** Node.js, Express, JWT, bcrypt  
- **Base de données :** MySQL (Hostinger)  
- **PWA :** `manifest.json`, service worker, stratégies de cache (en cours d’optimisation)  
- **Déploiement :**  
  - Base de données : Hostinger  
  - Frontend/PWA : Netlify / Vercel

---

## Installation et lancement

1. **Cloner ce dépôt**  

2. **Démarrer le serveur (backend)**

   - cd backend
   - npm install        # (si ce n’est pas déjà fait)
   - node server.js
  
3. **Démarrer le frontend**

   - cd ../frontend
   - npm install        # (si ce n’est pas déjà fait)
   - npm run start
