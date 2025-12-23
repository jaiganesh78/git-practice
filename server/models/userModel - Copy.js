const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg'
    }
});
// Hash password before saving
userSchema.pre("Save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
    
});
//cerate JWT token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}
//validate password
userSchema.methods.validatePassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model("User",userSchema);
module.exports=User;
