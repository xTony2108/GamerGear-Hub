const express = require("express");
const { Product } = require("../../db");
const app = express.Router();

/**
 * @path /api/products
 */

app.get("/", async (_, res) => {
  try {
    const products = await Product.find({}, "", { lean: true });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    return res.status(201).json(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = app;
