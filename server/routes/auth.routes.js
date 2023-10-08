const router = require("express").Router();
const User = require("../database/models/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

const RSA_PUB = fs.readFileSync("./rsa/key.pub");
const RSA_PRIVATE = fs.readFileSync("./rsa/key");

router.post("/connexion", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
        subject: user._id.toString(),
        algorithm: "RS256",
        expiresIn: 60 * 60 * 24 * 30 * 6,
      });
      res.cookie("token", token, { httpOnly: true });
      return res.json(user);
    } else {
      return res.status(401).json("Mauvais email ou mot de passe");
    }
  } catch (e) {
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
        const user = await User.findById(decodedToken.sub)
          .select("-password -__v")
          .exec();
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      } else {
        res.json(null);
      }
    } catch (e) {
      console.log(e);
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

module.exports = router;
