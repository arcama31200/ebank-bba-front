# Utilisation de l'image de base Node.js
FROM node:20.14.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Exposer le port 4200
EXPOSE 4200

# Commande par défaut pour démarrer l'application Angular avec le mode watch
CMD ["npm", "start"]
