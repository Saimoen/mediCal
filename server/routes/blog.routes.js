const router = require("express").Router();
const Blog = require("../database/models/blog.model");

router.get("/get", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    // Récupérer l'article correspondant à l'ID fourni
    const blog = await Blog.findById(req.params.id);

    // Vérifier si l'article existe
    if (!blog) {
      // Si l'article n'est pas trouvé, renvoyer une réponse avec le code d'état 404 et un message d'erreur
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // Renvoyer l'article trouvé dans la réponse
    res.json(blog);
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse avec le code d'état 500 et un message d'erreur
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.search; // Récupérez le terme de recherche à partir des paramètres de requête

    // Utilisez le terme de recherche pour effectuer la recherche dans votre base de données
    const blogs = await Blog.find({ $text: { $search: searchTerm } });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog({
      id: req.body.id,
      titre: req.body.titre,
      image: req.body.image,
      content: req.body.content,
      category: req.body.category,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
