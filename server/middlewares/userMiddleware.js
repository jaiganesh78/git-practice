const jwt=require("jsonwebtoken");
const User=require("../models/userModel.js");

exports.isLoggedIn=async(req,res,next)=>{
   const token=req.cookies.token || req.header('Authorization') && req.header('Authorization').replace('Bearer ','');
   if(!token){
    return res.status(401).json({
        success:false,
        message:"Login first to access this resource"
    });
   }
   try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next();
   }catch(err){
    const error=new Error("JWT verification error,invalid token maybe ");
    error.statusCode=401;
    next(error);
   }
}