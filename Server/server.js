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
const ProductsRoute = require("./routes/Products");
const AdminUsersRoute = require("./routes/AdminUsers");
const OrdersRoute = require("./routes/Orders");

app.use(express.json());
app.use('/api/auth',RegisterUser);
app.use('/api/profile',protect,Profile);
app.use('/api/products',ProductsRoute);
app.use('/api/admin/users', AdminUsersRoute);
app.use('/api/orders', OrdersRoute);

app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`Server started at port localhost:${process.env.PORT}`);


})