const User = require("../model/User");

const adminProtect = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Not Authorized" });
        }
        
        const user = await User.findById(req.user.id);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(401).json({ error: "Not Authorized as Admin" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { adminProtect };
