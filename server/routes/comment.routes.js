const router = require("express").Router();
const Comment = require("../database/models/comment.model");

router.post("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.userId; // Récupérer l'ID de l'utilisateur connecté depuis la session

    const comment = new Comment({
      content: req.body.comment,
      postId, // Associez l'ID du post au champ postId
      userId
    });

    await comment.save();

    res.status(201).json(comment);
  }  catch (err) {
    console.error(err); // Affichez l'erreur dans la console du serveur
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ postId });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
