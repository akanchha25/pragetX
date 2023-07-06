const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose
           .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           })
           .then(() => {
              console.log("Connected to MongoDB")
           })
           .catch((error) => {
              console.log("Error connecting to MongoDB", error)
              process.exit(1)
           })

    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
        process.exit(1)
    }
}

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Connection to MongoDB closed");
  } catch (error) {
    console.log("Failed to close MongoDB connection:", error);
    throw error;
  }
};

module.exports = { connectDB, closeDB };







