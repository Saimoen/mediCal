const mongoose = require("mongoose");

/* Permet la connexion à la base de donnée */
mongoose
  .connect(
    "mongodb+srv://GreksO:Gregsaimoen12@meanapp.u4r8eht.mongodb.net/meanApp",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connexion opened to mongodb!");
  })
  .catch((error) => {
    console.log(error);
  });
