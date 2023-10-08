const router = require("express").Router();
const User = require("../database/models/user.model");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
  });
  newUser
    .save()
    .then(() => {
      res.json("Inscription ok !");
    })
    .catch((err) => {
      res.status(400).json("L'inscription a échoué");
    });
});

module.exports = router;

/* Nous utilisons notre modèle pour créer un User 
auquel nous passons les propriétés que nous avions 
définies avec les valeurs envoyées par le client dans le body des requêtes req. 
L'utilisation de hashSync permet d'effectuer le hachage de façon synchrone et l'utilisation de bcrypt.genSaltSync(8) (qui est optionnel) permet de définir le nombre de passes, c'est-à-dire la complexité du chiffrement (par défaut ce nombre est de 10).

Enfin, nous sauvegardons notre utilisateur dans notre base de données grâce à la méthode save() disponible sur les objets mongoose.

Nous envoyons au client soit un statut de 200 si la sauvegarde s'est bien passée, 
ou un statut de 500 en cas d'erreur durant la sauvegarde.

*/
