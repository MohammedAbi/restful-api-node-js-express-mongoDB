// Import the required modules: Express and Mongoose
const express = require("express"); // Used to create the web server
const mongoose = require("mongoose"); // Used to interact with the MongoDB database
const Product = require("./model/productModel"); // Import the Product model from the productModel.js file
require("dotenv").config(); // Load environment variables from .env file

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json()); // This allows the server to handle JSON payloads in requests
app.use(express.urlencoded({ extended: false })); // This allows the server to handle URL-encoded data

// Route handler for GET requests to fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); // Use the Product model to fetch all products from the database
    res.status(200).json(products); // Respond with the fetched products in JSON format
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors that occur during the fetch
  }
});

// Route handler for GET requests to fetch a specific product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await Product.findById(id); // Use the Product model to fetch the product by ID from the database
    res.status(200).json(product); // Respond with the fetched product in JSON format
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors that occur during the fetch
  }
});

// Route handler for POST requests to create a new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); // Use the Product model to create a new product with the request body data
    res.status(200).json(product); // Respond with the created product in JSON format
  } catch (error) {
    console.log(error.message); // Log any errors to the console
    res.status(500).json({ message: error.message }); // Respond with an error message
  }
});

// Route handler for PUT requests to update an existing product by ID
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    }); // Use the Product model to find and update the product by ID with the request body data

    // Check if the product exists
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` }); // Respond with a 404 status if the product is not found
    }

    res.status(200).json(product); // Respond with the updated product in JSON format
  } catch (error) {
    console.log(error.message); // Log any errors to the console
    res.status(500).json({ message: error.message }); // Respond with an error message
  }
});

// Route handler for DELETE requests to delete an existing product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await Product.findByIdAndDelete(id); // Use the Product model to find and delete the product by ID

    // Check if the product exists
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` }); // Respond with a 404 status if the product is not found
    }

    res.status(200).json({ message: `Product with ID ${id} has been deleted` }); // Respond with a success message
  } catch (error) {
    console.log(error.message); // Log any errors to the console
    res.status(500).json({ message: error.message }); // Respond with an error message
  }
});

// Set Mongoose to use the strictQuery option for better query performance
mongoose.set("strictQuery", false);

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!"); // Log a success message once connected to the database
    app.listen(3000, () => {
      // Start the Express server on port 3000
      console.log(`Node API app is running on port 3000`); // Log a message indicating that the server is running
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error); // Log any errors that occur during the connection to the database
  });
