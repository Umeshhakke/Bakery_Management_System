const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const User = require("../model/User");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");

// Create Order (Protected)
router.post("/", protect, async (req, res) => {
    try {
        const { customer, items, total } = req.body;
        const order = new Order({ customer, items, total, user: req.user.id });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating order" });
    }
});

// Get My Orders
router.get("/myorders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Get all orders
router.get("/", protect, adminProtect, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("deliveryPerson", "name phone").sort("-createdAt");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// Admin: Confirm order
router.put("/:id/confirm", protect, adminProtect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.status === "Pending") {
            order.status = "Confirmed";
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found or not pending" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Assign order to delivery person
router.put("/:id/assign", protect, adminProtect, async (req, res) => {
    try {
        const { deliveryPersonId } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.deliveryPerson = deliveryPersonId;
            order.status = "Assigned";
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Get delivery personnel
router.get("/delivery-personnel", protect, adminProtect, async (req, res) => {
    try {
        const deliveryStaff = await User.find({ isDeliveryPerson: true }).select("name phone");
        res.json(deliveryStaff);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delivery: Get assigned orders
router.get("/delivery", protect, async (req, res) => {
    try {
        // check if delivery person
        const user = await User.findById(req.user.id);
        if (!user || !user.isDeliveryPerson) {
            return res.status(403).json({ message: "Not a delivery person" });
        }
        
        const orders = await Order.find({ deliveryPerson: req.user.id }).sort("-createdAt");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delivery: Update order status & payment
router.put("/:id/status", protect, async (req, res) => {
    try {
        const { status, paymentStatus, paymentMethod } = req.body;
        const user = await User.findById(req.user.id);
        if (!user || !user.isDeliveryPerson) {
            return res.status(403).json({ message: "Not a delivery person" });
        }
        
        const order = await Order.findById(req.params.id);
        if (order && order.deliveryPerson.toString() === req.user.id) {
            if (status) order.status = status;
            if (paymentStatus) order.paymentStatus = paymentStatus;
            if (paymentMethod) order.paymentMethod = paymentMethod;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found or unauthorized" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delivery: Report Issue
router.put("/:id/issue", protect, async (req, res) => {
    try {
        const { issue } = req.body;
        const user = await User.findById(req.user.id);
        if (!user || !user.isDeliveryPerson) {
            return res.status(403).json({ message: "Not a delivery person" });
        }
        
        const order = await Order.findById(req.params.id);
        if (order && order.deliveryPerson.toString() === req.user.id) {
            order.status = "Issue Reported";
            order.deliveryIssue = issue;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found or unauthorized" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get single order (Protected)
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("deliveryPerson", "name phone");
        if (order && (order.user.toString() === req.user.id || req.user.isAdmin)) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
