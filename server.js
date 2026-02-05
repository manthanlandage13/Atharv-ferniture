const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
}));

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ success: true });
});

app.get("/products", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
