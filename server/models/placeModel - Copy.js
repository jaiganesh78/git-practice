const mongoose=require("mongoose");

const placeSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    photos:[{type:String}],
    description:{
        type:String,
    },
    perks:[{type:String}],

    maxGuests:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
const Place=mongoose.model("Place",placeSchema);
module.exports=Place;