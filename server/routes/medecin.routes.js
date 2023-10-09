const router = require("express").Router();
const connection = require("../app"); // Assurez-vous d'importer votre connexion MySQL ici

router.get("/get", async (req, res) => {
  try {
    const query = "SELECT * FROM medecin"; // Remplacez "medecin" par le nom de votre table MySQL
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la récupération des médecins :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des médecins" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM medecin WHERE id = ?"; // Remplacez "medecin" par le nom de votre table MySQL
    connection.query(query, [id], (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la récupération du médecin :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération du médecin" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Médecin non trouvé" });
      }
      res.json(results[0]);
    });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ message: err.message });
  }
});

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

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM medecin WHERE id = ?"; // Remplacez "medecin" par le nom de votre table MySQL
    connection.query(query, [id], (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la suppression du médecin :", error);
        return res.status(500).json({ message: "Erreur lors de la suppression du médecin" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Médecin non trouvé" });
      }
      res.json({ message: "Médecin supprimé avec succès" });
    });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
