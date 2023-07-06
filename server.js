require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const { connectDB, closeDB } = require("./configurations/DbConfig");
const userRoute = require("./modules/user/userRouter");
const orderRoute = require("./modules/order/orderRouter");
const productRoute = require("./modules/product/productRoute");
const authRoute = require("./modules/auth/authRouter");
connectDB();
app.use(express.json());
app.use("/user", userRoute);
app.use("/", orderRoute);
app.use("/", productRoute);
app.use("/", authRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
