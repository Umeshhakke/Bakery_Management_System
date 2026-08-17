const express = require("express");
const router = express.Router();
const { model: Product } = require("../model/Products");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");

// Get all products (Public)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new product (Admin Only)
router.post("/", protect, adminProtect, async (req, res) => {
    try {
        const { name, quantity, price, category, image, unit } = req.body;
        const newProduct = new Product({
            name,
            quantity,
            price,
            category,
            image,
            unit
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update a product (Admin Only)
router.put("/:id", protect, adminProtect, async (req, res) => {
    try {
        const { name, quantity, price, category, image, unit } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.quantity = quantity !== undefined ? quantity : product.quantity;
            product.price = price !== undefined ? price : product.price;
            product.category = category || product.category;
            product.image = image || product.image;
            if (unit !== undefined) product.unit = unit;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a product (Admin Only)
router.delete("/:id", protect, adminProtect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
