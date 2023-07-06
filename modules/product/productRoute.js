const router = require("express").Router();
const productController = require("./productController");
const authenticate = require("../../middleware/auth");

//product routes:
router.post("/products", authenticate, productController.addProduct);
router.put("/product/:id", authenticate, productController.updateProduct);
router.delete("/product/:id", authenticate, productController.deleteProduct);
router.get("/products", authenticate, productController.getAllProducts);
router.get("/product/:id", authenticate, productController.getProductById);

module.exports = router;
