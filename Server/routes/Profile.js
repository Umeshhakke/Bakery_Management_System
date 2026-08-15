const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.get('/',async(req , res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');

        if (!user){
            return res.status(404).json({message: "User not Found"});
        }

        res.status(200).json({user});
    }catch(error){
        return res.status(404).json({message: "User not Found"});
    }
})

module.exports = router;