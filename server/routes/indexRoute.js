const express = require('express');
const router=express.Router();
const cloudinary=require('cloudinary').v2;
const multer=require('multer');
//multer setup
const upload=multer({dest:'tmp/'});

router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"vanakam da mapla from AirBNB backend"
    });
});

//upload photo using image url
router.post('/upload-by-link',async(req,res)=>{
  try{
    const {link}=req.body;
    let result=await cloudinary.uploader.upload(link,{
        folder:'Airbnb/places'
    });
    res.status(200).json({
        success:true,
        url:result.secure_url
    });
  }catch(err){
    next(err);
  }
});

//upload image from local device
router.post('/upload',upload.array('photos',100),async(req,res,next)=>{
    try{
        let imageArray=[];
        for(const file of req.files){
            let result=await cloudinary.uploader.upload(file.path,{
                folder:'Airbnb/places'
            });
            imageArray.push(result.secure_url);
        }
        res.status(200).json({
            success:true,
            urls:imageArray
        });
    }catch(err){
        next(err);
    }
});

router.use('/users',require('./userRoute.js'));
router.use('/places',require('./placeRoute.js'));
router.use('/bookings',require('./bookingRoute.js'));
module.exports=router;