# Application de Citations

Application web pour gérer et afficher des citations avec authentification utilisateur.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- npm

### Installation et démarrage

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd citation
```

2. **Installation et démarrage automatique**
```bash
# Installer les dépendances backend
cd backend
npm install

# Démarrer le backend
npm run dev

# Dans un nouveau terminal, installer les dépendances frontend
cd frontendWeb
npm install

# Démarrer le frontend
npm run dev
```

## 📊 Accès aux services

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🗄️ Base de données

### Configuration SQLite
- **Type**: SQLite (fichier local)
- **Fichier**: `backend/data/citation.db`
- **Création automatique**: Les tables sont créées automatiquement au premier démarrage

### Tables créées automatiquement
- `users` - Authentification des utilisateurs
- `quotes` - Citations avec timestamps

## 🔧 Variables d'environnement

Le fichier `.env` dans le dossier `backend` contient :
```env
JWT_SECRET=votre_secret_jwt_tres_long_et_complexe_ici_123456789
PORT=3000
NODE_ENV=development
```

## 📋 Fonctionnalités

### API Endpoints
- `GET /api/quotes` - Récupérer toutes les citations
- `GET /api/quotes/random` - Citation aléatoire
- `POST /api/quotes` - Ajouter une citation
- `PUT /api/quotes/:id` - Modifier une citation
- `DELETE /api/quotes/:id` - Supprimer une citation
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Frontend
- Vue.js 3 avec Composition API
- Tailwind CSS pour le style
- Vue Router pour la navigation
- Gestion d'état avec Composition API

## 🛠️ Commandes utiles

```bash
# Démarrer le backend
cd backend
npm run dev

# Démarrer le frontend
cd frontendWeb
npm run dev

# Voir la base de données SQLite
# Utilisez un outil comme DB Browser for SQLite
```

## 🔍 Dépannage

### Problème de connexion à la base de données
1. Vérifier que le dossier `backend/data` existe
2. Vérifier les permissions d'écriture
3. Vérifier les logs du serveur

### Problème de ports
Si les ports 3000 ou 5173 sont occupés, modifier les ports dans les configurations

### Réinitialiser la base de données
```bash
# Supprimer le fichier de base de données
rm backend/data/citation.db

# Redémarrer le serveur (la base sera recréée automatiquement)
```

## ✅ Avantages de SQLite

- ✅ Pas besoin d'installer de serveur de base de données
- ✅ Fichier unique, facile à sauvegarder
- ✅ Fonctionne immédiatement
- ✅ Parfait pour le développement et les petits projets
- ✅ Pas de configuration complexe 