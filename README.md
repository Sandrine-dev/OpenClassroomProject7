# Installation

Copier ce repository, puis :

## *configuration DataBase*

- Allez dans le fichier config, puis config.json
- renseignez les identifiants
    host
    user
    password

- Ouvrez le terminale sur le dossier Backend et écrivez la commande suivant (vous devez au préalable avoir mySQL sur votre ordinateur):
    'sequelize db:create'
- Puis la commande suivante:
    'sequelize db:migrate'

## *Backend*

- Ouvrez le terminal sur dossier Backend et écrivez la commande:
    'npm install'
- Une fois intallé, écrivez la commande:
    'nodemon server'
- Gardez ce terminal ouvert

## *Frontend*

- Ouvrez le terminal sur dossier frontend et écrivez la commande:
    'npm install'
- Une fois intallé, écrivez la commande:
    'npm run serve'
- Gardez ce terminal ouvert

## *Application*

    Ouvrez l'application sur http://localhost:8080/
