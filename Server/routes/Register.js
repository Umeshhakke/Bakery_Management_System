const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
    try {
        const {
            name,
            username,
            password,
            email,
            phone
        } = req.body;

        // Check required fields
        if (
            !name ||
            !username ||
            !password ||
            !email ||
            !phone
        ) {
            return res.status(400).json({
                message:
                    "Name, Username, Password, Email and Phone are required."
            });
        }

        // Check whether email already exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message:
                    "Email already registered. Please login instead."
            });
        }

        // Check whether username already exists
        const existingUsername = await User.findOne({
            username
        });

        if (existingUsername) {
            return res.status(400).json({
                message:
                    "Username already exists. Please choose another username."
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(
            password,
            salt
        );

        // Create new user
        const newUser = new User({
            name,
            username,
            password: hashpassword,
            email,
            phone,
            address: null
        });

        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: "30d"
            }
        );

        // Send response
        return res.status(201).json({
            message: "User added successfully",

            token: token,

            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );

        // MongoDB duplicate-key error
        if (error.code === 11000) {

            const duplicateField =
                Object.keys(error.keyPattern || {})[0];

            return res.status(400).json({
                message:
                    `${duplicateField} already exists. Please use a different value.`
            });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        // Validate fields
        if (!username || !password) {
            return res.status(400).json({
                message:
                    "Username and password are required."
            });
        }

        // Find user
       const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Compare password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: "30d"
            }
        );

        // Don't send password
        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        };

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: userWithoutPassword
        });

    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


module.exports = router;