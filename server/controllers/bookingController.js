const Booking=require("../models/bookingModel.js");
//controller to create a booking
exports.createBooking=async(req,res)=>{

    try{
    const userData=req.user;
    const{
        place,
        checkIn,
        checkOut,
        name,
        phone,
        price,
        numOfGuests
 }=req.body;

const booking=await Booking.create({
    user:userData._id,
    place,
    checkIn,
    checkOut,
    name,
    price,
    phone,
    numOfGuests

    });
    res.status(200).json({
        success:true,
        message:booking
    });
}catch(err){
   const error=new Error(err.message);
   res.status(500);
   throw error;
}
};


exports.getBookings=async(req,res)=>{
    try{
        const userData=req.user;
        if(!userData){
            return res.status(401).json({error:"youre not allowed to access this page"});
        }
        const booking=await Booking.find({user:userData._id}).populate('place');
        res.status(200).json({success:true,message:booking});
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error",
            error:err,
        })
    }
}