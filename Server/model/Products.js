const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Enter the product name"],
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number,
        required:[true , "Enter the product price"],
    }
},{timestamps:true});

const Product = mongoose.model('Product' , ProductsSchema );
exports.model = Product;