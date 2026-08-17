const express = require("express");
const router = express.Router();

const Order = require("../model/Order");
const { protect } = require("../middleware/authMiddleware");


// =====================================================
// CREATE ORDER
// =====================================================

router.post("/", protect, async (req, res) => {

    try {

        const {
            customer,
            items,
            total
        } = req.body;


        // Validate order
        if (
            !customer ||
            !customer.name ||
            !customer.phone ||
            !customer.address
        ) {
            return res.status(400).json({
                message: "Customer details are required."
            });
        }


        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item."
            });
        }


        // Create order
        const order = new Order({

            customer: {
                userId: req.user._id,

                name: customer.name,
                phone: customer.phone,
                address: customer.address
            },

            items: items,

            total: total,

            status: "Pending"
        });


        await order.save();


        return res.status(201).json({

            message: "Order placed successfully.",

            order: order

        });

    }

    catch (error) {

        console.error(
            "ORDER CREATION ERROR:",
            error
        );

        return res.status(500).json({
            message: "Failed to place order."
        });

    }

});


// =====================================================
// GET ALL ORDERS
// =====================================================

router.get("/", protect, async (req, res) => {

    try {

        const orders = await Order
            .find()
            .sort({ createdAt: -1 });


        return res.status(200).json({
            orders: orders
        });

    }

    catch (error) {

        console.error(
            "GET ORDERS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch orders."
        });

    }

});


module.exports = router;