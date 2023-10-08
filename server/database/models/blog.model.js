/* Créer un modèle mongoose qui est un ORM (permettant de modéliser et valider les objets sauvegardés en base) pour MongoDB */
const mongoose = require("mongoose");
/* Interface qui permet de définir la forme de nos objets et permet de les valider avant de les sauvegarder en base. */
const Schema = mongoose.Schema;

const blogSchema = Schema({
  id: Number,
  titre: String,
  image: String,
  content: String,
  category: String,
  created_at: { type: Date, default: Date.now },
});

blogSchema.index({ content: "text", title: "text" }); // Ajoutez cet index pour prendre en charge les requêtes de recherche

/* Nous créons et exportons ensuite notre modelUser.
Vous remarquez que nous avons un Schema et un model. */
const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;

/* Un Schema est un objet qui définit la structure des documents qui vont être enregistrés dans votre collection mongoDB. Il permet de définir des types et des validateurs pour tous les objets sauvegardés.

Un Model est un objet qui permet d'accéder facilement à une collection nommée (ici User). 
Il permet de faire des requêtes sur cette collection et d'utiliser le Schema pour valider les sauvegardes des documents dans la collection. 
Un Model est créé par la combinaison d'un Schema, 
d'une Connection à la base de données MongoDB et d'un nom de collection. */
