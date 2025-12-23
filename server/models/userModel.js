const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//define user schema
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
        required:true,
        default:"https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"
   }
});
//encrypting the password
userSchema.pre("save",async function (next){
    this.password=await bcrypt.hash(this.password,10);
    next();
});

//create and return the token(jwt)
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
}
    );
}
userSchema.methods.isValidatedPassword=async function(userSentPassword){
    return await bcrypt.compare(userSentPassword,this,password);

}

const User=mongoose.model("User",userSchema);
module.exports=User;