const Order = require("../../models/orderModel");
const Product = require("../../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Validation: Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Validation: Check if the requested quantity is available
    if (quantity > product.productQuantity) {
      return res
        .status(400)
        .json({ error: "Requested quantity exceeds available quantity" });
    }

    // Calculate the total price of the order
    const totalPrice = quantity * product.productPrice;

    // Create a new order
    const order = new Order({
      productId,
      userId,
      quantity,
      totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Update the available quantity of the product
    product.productQuantity -= quantity;
    await product.save();

    // Return success response with the created order
    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Return success response with the array of orders
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the order ID from the request parameters

    // Find the order by ID
    const order = await Order.findById(id);

    // Validation: Check if the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Return success response with the order
    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
