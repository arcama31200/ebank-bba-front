# frontend/Dockerfile
# Utilisation de l'image Node.js 20.14.0 avec Alpine
FROM node:20.14.0-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie de tout le code source dans le conteneur
COPY . .

# Exposer le port 4200 utilisé par Angular
EXPOSE 4200

# Commande pour démarrer l'application Angular en mode développement
CMD ["npm", "start"]
