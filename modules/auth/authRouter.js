const router = require("express").Router();
const authController = require("./authController");
const authenticate = require("../../middleware/auth");

// order routes:
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
