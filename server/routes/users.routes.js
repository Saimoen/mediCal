const router = require("express").Router();
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require('../database/models/medecin.model')

const sequelize = new Sequelize("mysql://root:root@localhost/medical");

router.post("/", async (req, res) => {
  try {
    const { email, prenom, name, password } = req.body;

    // Vérifiez si l'utilisateur avec l'email donné existe déjà en SQL
    const [existingUser] = await sequelize.query(
      "SELECT * FROM medecin WHERE email = ? LIMIT 1",
      {
        replacements: [email],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser) {
      return res.status(400).json("L'utilisateur existe déjà.");
    }

    // Hash du mot de passe
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

    // Créez un nouvel utilisateur dans la base de données MySQL
    const [newUser] = await sequelize.query(
      "INSERT INTO medecin (email, nom, prenom, mot_de_passe) VALUES (?, ?, ?, ?)",
      {
        replacements: [email, name, prenom, hashedPassword], // Ajoutez une chaîne vide pour la colonne 'prenom'
        type: Sequelize.QueryTypes.INSERT,
      }
    );

    res.json("Inscription réussie !");
  } catch (error) {
    console.error(error);
    res.status(400).json("L'inscription a échoué");
  }
});


module.exports = router;