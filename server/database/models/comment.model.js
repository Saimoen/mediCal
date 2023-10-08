/* Créer un modèle mongoose qui est un ORM (permettant de modéliser et valider les objets sauvegardés en base) pour MongoDB */
const mongoose = require("mongoose");
/* Interface qui permet de définir la forme de nos objets et permet de les valider avant de les sauvegarder en base. */
const Schema = mongoose.Schema;

const commentSchema = Schema({
  id: Number,
  content: String,
  created_at: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: "blog" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

/* Nous créons et exportons ensuite notre modelUser.
Vous remarquez que nous avons un Schema et un model. */
const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
