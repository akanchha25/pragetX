const router = require("express").Router();
const orderController = require("./orderController");
const authenticate = require("../../middleware/auth");

// order routes:
router.post("/orders", authenticate, orderController.createOrder);
router.get("/orders", authenticate, orderController.getAllOrders);
router.get("/order/:id", authenticate, orderController.getOrderById);

module.exports = router;
