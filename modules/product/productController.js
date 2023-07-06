const Product = require("../../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    let user = await req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized access` });
    }
    const { productName, productDescription, productPrice, productQuantity } =
      req.body;

    // Validation: Check if all required fields are provided
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validation: Check if the product name is unique
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ error: "Product name already exists" });
    }

    // Create a new product instance
    const product = new Product({
      productName,
      productDescription,
      productPrice,
      productQuantity,
    });

    // Save the product to the database
    await product.save();

    // Return success response with the created product
    return res
      .status(201)
      .json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    let user = await req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized access` });
    }
    const { productName, productDescription, productPrice, productQuantity } =
      req.body;

    // Validation: Check if all required fields are provided
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // Validation: Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product fields
    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = productPrice;
    product.productQuantity = productQuantity;

    // Save the updated product to the database
    await product.save();

    // Return success response with the updated product
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    let user = await req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized access` });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    console.log(product);

    // Validation: Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product from the database
    await Product.deleteOne({ _id: id });

    // Return success response with a message
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let user = await req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized access` });
    }
    // Fetch all products from the database
    const products = await Product.find();

    // Return success response with the array of products
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    let user = await req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized access` });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // Validation: Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return success response with the product
    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error in getProductById:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
