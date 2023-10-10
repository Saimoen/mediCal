const router = require("express").Router();
const connection = require("../app"); // Assurez-vous d'importer votre connexion MySQL ici

router.post("/", async (req, res) => {
  try {
    const { titre, image, content, category } = req.body;
    const query = "INSERT INTO medecin (titre, image, content, category) VALUES (?, ?, ?, ?)"; // Remplacez "medecin" par le nom de votre table MySQL
    connection.query(query, [titre, image, content, category], (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la création du médecin :", error);
        return res.status(500).json({ message: "Erreur lors de la création du médecin" });
      }
      const newMedecin = { id: results.insertId, titre, image, content, category };
      res.status(201).json(newMedecin);
    });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
