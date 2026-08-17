const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");

// Get all users (Admin Only)
router.get("/", protect, adminProtect, async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update user role (Admin Only)
router.put("/:id/role", protect, adminProtect, async (req, res) => {
    try {
        const { isAdmin, isDeliveryPerson } = req.body;
        const user = await User.findById(req.params.id);
        
        if (user) {
            if (isAdmin !== undefined) user.isAdmin = isAdmin;
            if (isDeliveryPerson !== undefined) user.isDeliveryPerson = isDeliveryPerson;
            await user.save();
            res.json({ message: "Role updated", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
