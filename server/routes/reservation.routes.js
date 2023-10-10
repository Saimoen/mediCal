const router = require("express").Router();
const Comment = require("../database/models/rendezvous.model");
const mysql = require('mysql2/promise');

// Configuration de la connexion à la base de données MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'medical',
};

router.post('/post', async (req, res) => {
  try {
    const nomPrenom = req.body.patient;
    const date = req.body.date;
    const motif = req.body.motif;
    const connection = await mysql.createConnection(dbConfig)
    // Insérer le rendez-vous dans la table "rendezvous"
    const insertQuery = 'INSERT INTO rendezvous (patient, date_et_heure, motif) VALUES (?, ?, ?)';
  

    connection.query(insertQuery, [nomPrenom, date, motif], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'insertion du rendez-vous: ' + error);
        res.status(500).json({ message: 'Une erreur s\'est produite.' });
      } else {
        // Envoi d'une réponse réussie
        res.status(201).json({ message: 'Rendez-vous ajouté avec succès.' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur s\'est produite.' });
  }
});

router.get("/", async (req, res) => {
  try {
    // Établissement d'une connexion à la base de données
    const connection = await mysql.createConnection(dbConfig);

    // Remplacez ceci par votre requête SQL pour récupérer les commentaires
    const [comments] = await connection.execute('SELECT * FROM rendezvous');

    // Fermez la connexion après avoir récupéré les données
    connection.end();

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
