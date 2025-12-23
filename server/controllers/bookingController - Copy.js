const Booking=require("../models/bookingModel.js");
const Place=require("../models/placeModel.js");

//create a new booking
exports.createBooking=async(req,res,next)=>{
    try{
        const userData=req.user;
        const{
            place,checkIn,
            numOfGuests,name,phone,price
        }=req.body;

        const booking=await Booking.create({
            user:userData._id,
            place,
            checkIn,
            numOfGuests,
            name,
            phone,
            price
        });

        res.status(200).json({
            success:true,
            message:booking
        });
    }catch(err){
        next(err);
    }
}
exports.getBookings=async(req,res,next)=>{
    try{
        const userData=req.user;
        if(!userData){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
        const bookings=await Booking.find({user:userData._id}).populate("place");

        res.status(200).json({
            success:true,
            bookings
        });
    }catch(err){
        next(err);
    }
}
