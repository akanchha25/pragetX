const Order = require("../../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch orders associated with the user ID
    const orders = await Order.find({ userId });

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
    const { userId } = req.body;

    // Find the order by ID
    const order = await Order.findById(id);

    // Validation: Check if the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Validation: Check if the user is authorized to access the order
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized access to order" });
    }

    // Return success response with the order
    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProductsBySearch = async (req, res) => {
  try {
    const { search, page, limit, sort } = req.query;

    // Create a regular expression pattern from the search term for case-insensitive matching
    const searchPattern = new RegExp(search, "i");

    // Set default values for pagination and sorting if not provided
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const sortBy = sort || "productName";

    // Construct the query object with search and pagination parameters
    const query = {
      $or: [
        { productName: searchPattern },
        { productDescription: searchPattern },
      ],
    };

    // Get the total count of matching products
    const totalCount = await Product.countDocuments(query);

    // Calculate the number of pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Apply sorting to the query
    query.sort = sortBy;

    // Apply pagination to the query
    query.skip = (pageNumber - 1) * itemsPerPage;
    query.limit = itemsPerPage;

    // Find products that match the search term with pagination and sorting
    const products = await Product.find(query);

    // Return success response with the paginated products and metadata
    return res.status(200).json({
      products,
      totalPages,
      currentPage: pageNumber,
      totalCount,
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
