const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const app = express();
app.use(cors());

connectDB();



const RegisterUser = require("./routes/Register");
const {protect} = require("./middleware/authMiddleware");
const Profile = require("./routes/Profile");
const Order = require("./routes/Order");


app.use(express.json());
app.use('/api/auth',RegisterUser);
app.use('/api/profile',protect,Profile)
app.use("/api/orders", Order);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at port localhost:${PORT}`);
});