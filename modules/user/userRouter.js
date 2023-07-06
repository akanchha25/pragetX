const router = require("express").Router();
const userController = require("./userController");
const authenticate = require("../../middleware/auth");

router.get("/orders", userController.getAllOrders);
router.get("/orders/:id", userController.getOrderById);
router.get("products", userController.getAllProductsBySearch);

module.exports = router;
