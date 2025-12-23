const mongoose=require("mongoose");


//define place schema
const placeSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    photos:{
        type:String,
    },
    description:{
        type:String
    },
    perks:{
        type:String
    },
    extraInfo:{
        type:String
    },
    maxGuest:{
        type:Number,
        required:true,
    },
    price:{
       type:Number,
       required:true,    
    }

});

const Place=mongoose.model("Place",placeSchema);
module.exports=Place;