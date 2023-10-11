
# MédiCal

En tant que développeur Web et Web Mobile, dans l'idéal, le médecin voudrait :

- Se connecter à son espace
- Créer ses rendez-vous avec ses patients et le motif de la visite
- Visualiser le planning de sa journée, de sa semaine et de la semaine suivante.
- Lorsque le patient accède à son site sans être connecté, il peut voir le planning de la semaine actuelle ou suivante sans voir ce que sont les rendez-vous.
- Le patient peut prendre rendez-vous depuis la plateforme.
- Deux rendez-vous ne peuvent pas se chevaucher.

## Installation

Le projet fonctionne avec Angular et NodeJS, il vous faudra tout d'abord installer NodeJS via le lien ci-joint : https://nodejs.org/en/download


1. Clonez ce dépôt GitHub ou dezipper le fichier fourni :

```bash
  git clone https://github.com/Saimoen/mediCal
```

2. Installez les dépendances pour le frontend (Angular):
```bash
  cd client
  npm install
```

3. Installez les dépendances pour le backend (Node.js & Express):
```bash
  cd server
  npm install
```

4. Configurez votre base de données MySQL en créant une base de données et en mettant à jour les fichiers de configuration appropriés, un fichier .sql vous sera fourni, vous n'aurez plus qu'a executer le script.
    
## Utilisation

Pour lancer le projet en local :

- I. Ouvrez un terminal et acceder au dossier client :
```bash
  cd client
  npm start
```

- II. Acceder maintenant au dossier server :
```bash
  cd server
  mkdir rsa
  cd rsa
  ssh-keygen -t rsa -b 4096 -m PEM -f key
  ssh-keygen -e -m PEM -f key > key.pub
```
Ces commandes sont importantes pour avoir une authentification JWT fonctionnels.
Une fois que vous avez vos clés, il suffit de lancer le serveur :
```bash
  cd client
  npm start
```

- III. Ouvrez votre navigateur préféré et acceder à l'adresse http://localhost:4200, l'application devrait y être.
