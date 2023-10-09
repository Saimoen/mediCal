const router = require("express").Router();
const user = require("./users.routes");
const auth = require("./auth.routes");
const medecin = require("./medecin.routes");
const comment = require("./comment.routes");

router.use("/api/user", user);
router.use("/api/auth", auth);
router.use("/api/blog", medecin);
router.use("/api/comment", comment);

module.exports = router;
