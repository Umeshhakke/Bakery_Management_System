const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "name required"],
        trim: true
    },
    username: { 
        type: String, 
        required: [true, "Username Required"], // Standard format for custom error messages
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, "Password Required"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email Required"], 
        unique: true, // Prevents duplicate email accounts in MongoDB
        trim: true, 
        lowercase: true 
    },
    phone: { 
        type: String, // String prevents dropping leading zeroes (e.g., 094239...)
    },
    address:{
        type:String
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
