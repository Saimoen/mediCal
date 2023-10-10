const router = require("express").Router();
const user = require("./users.routes");
const auth = require("./auth.routes");
const medecin = require("./medecin.routes");
const reservation = require("./reservation.routes");

router.use("/api/user", user);
router.use("/api/auth", auth);
router.use("/api/medecin", medecin);
router.use("/api/reservation", reservation);

module.exports = router;
