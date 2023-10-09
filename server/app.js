/* Imports nécessaire à mon app Express */
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const routes = require("./routes");

/* Middleware nécessaire à mon app Express */
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

/* Permet de répondre à toutes les requêtes sur notre API. */
app.use(routes);

/* Permet la connexion à la base de donnée */
const connection = mysql.createConnection({
  host: "localhost", // L'adresse de votre serveur MySQL
  user: "root",
  password: "root",
  database: "medical",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL : " + err.stack);
    return;
  }
  console.log("Connecté à MySQL en tant qu'ID " + connection.threadId);
});

module.exports = connection;

/* Requête get => return index.html */
app.get("*", (req, res) => {
  /* Envoi l'application Angular en réponse */
  res.sendFile(path.join(__dirname, "../client/src/app/app.component.html"));
});

module.exports = app;
