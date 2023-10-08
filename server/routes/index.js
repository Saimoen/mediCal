const router = require("express").Router();
const user = require("./users.routes");
const auth = require("./auth.routes");
const blog = require("./blog.routes");
const comment = require("./comment.routes");

router.use("/api/user", user);
router.use("/api/auth", auth);
router.use("/api/blog", blog);
router.use("/api/comment", comment);

module.exports = router;
