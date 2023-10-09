const router = require("express").Router();
const User = require("../database/models/medecin.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // L'adresse de votre serveur MySQL
  user: "root",
  password: "root",
  database: "medical",
});

const RSA_PUB = fs.readFileSync("./rsa/key.pub");
const RSA_PRIVATE = fs.readFileSync("./rsa/key");

router.post("/connexion", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherchez l'utilisateur par son email
    const query = "SELECT * FROM medecin WHERE email = ? LIMIT 1"; // Remplacez "medecin" par le nom de votre table MySQL
    const [user] = await connection.promise().query(query, [email]);

    if (user.length > 0 && bcrypt.compareSync(password, user[0].mot_de_passe)) {
      const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
        subject: user[0].medecin_id.toString(),
        algorithm: "RS256",
        expiresIn: 60 * 60 * 24 * 30 * 6,
      });
      res.cookie("token", token, { httpOnly: true });
      return res.json(user[0]);
    } else {
      return res.status(401).json("Mauvais email ou mot de passe");
    }
  } catch (e) {
    console.error(e);
    return res.status(401).json("Mauvais email ou mot de passe");
  }
});

router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.end();
});

router.get("/currentuser", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, RSA_PUB);
      if (decodedToken) {
        const userId = decodedToken.sub;

        // Récupérez l'utilisateur par son ID
        const query = "SELECT id, nom, prenom, email FROM medecin WHERE id = ?"; // Remplacez "medecin" par le nom de votre table MySQL
        const [user] = await connection.promise().query(query, [userId]);

        if (user.length > 0) {
          res.json(user[0]);
        } else {
          res.json(null);
        }
      } else {
        res.json(null);
      }
    } catch (e) {
      console.error(e);
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

module.exports = router;
