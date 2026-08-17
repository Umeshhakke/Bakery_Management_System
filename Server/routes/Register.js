const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

// 📝 REGISTER ROUTE
router.post('/register' , async(req,res)=>{
    try{
        const{name, username , password , email, phone } = req.body;

        if(!username || !password || !email || !phone || !name){
            return res.status(400).json({message:"Email , Password, Phone , Username Required"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            name,
            username, 
            password : hashpassword,
            email,
            phone,
            address:null,
        })
        await newUser.save();

        let token = jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{
            expiresIn:'30d',
        });
        
        res.status(200).json({message: "User Added sucessfully" , token : token,
            user: {id:newUser._id , username:newUser.username , email:newUser.email, phone:newUser.phone}
        });
    }
    catch(error){
        res.status(500).json({error: "Error encountered"})
    }

});

// 🚚 DELIVERY REGISTER ROUTE
router.post('/register-delivery' , async(req,res)=>{
    try{
        const{name, username , password , email, phone } = req.body;

        if(!username || !password || !email || !phone || !name){
            return res.status(400).json({message:"Email , Password, Phone , Username Required"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            name,
            username, 
            password : hashpassword,
            email,
            phone,
            address:null,
            isDeliveryPerson: true
        })
        await newUser.save();

        let token = jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{
            expiresIn:'30d',
        });
        
        res.status(200).json({message: "Delivery User Added sucessfully" , token : token,
            user: {id:newUser._id , username:newUser.username , email:newUser.email, phone:newUser.phone, isDeliveryPerson: true}
        });
    }
    catch(error){
        res.status(500).json({error: "Error encountered"})
    }

});

// 🔑 LOGIN ROUTE
router.post('/login' , async (req,res)=>{
    try{
        const {username , password } = req.body;
        
        // ✨ FIXED: Changed 'username' to '{ username }' so Mongoose searches correctly
        const user = await User.findOne({ username });
        
        if(!user) {
           return res.status(404).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(isMatch){

            let token = jwt.sign({id:user._id},process.env.JWT_TOKEN,{
                expiresIn:'30d',
            });
            
            // Clean up: Hidden password from the user response for security
            const userWithoutPassword = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            };

            return res.status(200).json({message: "Login Sucessfull" , token : token , user: userWithoutPassword});
        }
        else{
            return res.status(400).json({message: "Invalid Credentials"});
        }
    }catch(error){
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;    
