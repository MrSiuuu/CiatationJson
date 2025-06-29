# Utilise une image Node officielle
FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm ci --omit=dev

# Copie le reste du code
COPY . .

# Expose le port de l'API
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"] 