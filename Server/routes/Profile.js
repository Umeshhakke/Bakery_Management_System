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

router.put('/', async(req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address !== undefined) user.address = address;
        
        await user.save();
        res.status(200).json({ user, message: "Profile updated successfully" });
    } catch(error) {
        return res.status(500).json({ message: "Server error updating profile" });
    }
});

module.exports = router;