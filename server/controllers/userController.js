const User=require('../models/userModel.js');
const cookieToken=require('../utils/cookieToken.js');
const bcrypt=require('bcryptjs');
const cloudinary=require('cloudinary').v2;
exports.register=async(req,res,next)=>{
    try{
        const{
            name,email,password
        }=req.body;
         if(!name || !email || !password){
            return res.status(400).json({
                message:"all the three fiels are mandatory"
            });
         }
         let user=await User.findOne({email});
         if(User){
            return res.status(400).json({
                message:"User already exists"
            });
         }
         user=await User.create({
            name,
            email,
            password
         });
         cookieToken(user,res);
    }catch(err){
        next(err);
    }
   
}
//login
exports.login=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Please provide email and password"
            });
        }
        const user=User.findOne({email}).select("-password");
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        cookieToken(user,res);

    }catch(err){
        next(err);
    }
}
//google login
exports.gooleLogin=async(req,res,next)=>{
    try{
        const{name,email}=req.body;
        if(!name || !email){
            return res.status(400).json({
                message:"Please provide name and email"
            });
        }

        //check if user is alreaady registered
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({
                name,
                email,
                password:bcrypt.hash(Math.random().toString(36).slice(-8),10)
            });
        }
        cookieToken(user,res);
    }catch{
        next(err);
    }
}
//folder for picture upload
exports.uploadPicture=async(req,res,next)=>{
    try{
        let result=await cloudinary.uploader.upload(req.file.path,{ folders:'Airbnb/Users'});
        res.status(200).json({
            success:true,
            picture:result.secure_url
        });
    }catch(err){
        next(err);
}
}
//update the user details
exports.updateUserDetails=async(req,res,next)=>{
   try{
    const {name,password,email,picture}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }
    //user can pdate the name password and picture or any of them
     user.name=name ;
     if(picture && !password){
        user.picture=picture;
     }else if(password && !picture){
        user.password=password;
     }else{
        user.picture=picture;
        user.password=password;
     }
     const updatedUser=await user.save();
     cookieToken(updatedUser,res);
   }catch(err){
    next(err);
   }
}
//logout
exports.logout=async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
            secure:true,
            sameSite:'none'
        });
        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        });
    }catch(err){
        next(err);
    }
}