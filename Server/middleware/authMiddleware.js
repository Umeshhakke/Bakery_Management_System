const jwt = require("jsonwebtoken");

const protect = async (req , res , next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token , process.env.JWT_TOKEN);

            req.user = {
                id:decode.id
            };
            next();
        }catch(error){
            return res.status(401).json({error:"User not Authorized"});
        }
    }
    if (!token){
        return res.status(401).json({error:"Not Authorized"});
    }
}

module.exports = {protect};