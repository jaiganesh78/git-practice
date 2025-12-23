const Place=require("../models/placeModel.js");

//create a new place
exports.addPlace=async(req,res,next)=>{
    try{
        const userData=req.user;
        const{
            title,address,photos,description,perks,
            maxGuests,price
        }=req.body;
        const place =await Place.create({
            owner:userData._id,
            title,
            address,
            photos:photos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price
        });
        res.status(200).json({
            success:true,
            place
        });
    }catch(err){
        next(err);
    }
};

//get places of logged in user
exports.userPlaces=async(req,res,next)=>{
    try{
        const userData=req.user;
        const id=userData.id;
        const places=await Place.find({owner:id});  
        res.status(200).json({
            success:true,
            places
        });
    }catch(err){
        next(err);
    }
}
//update a place
exports.updatePlace=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const{
            id,title,address,photos,description,perks,extraInfo,
            maxGuests,price
        }=req.body;
        const place=await place.findById(id);
        if(userId==place.owner.toString()){
            place.set({
                title,
                address,
                photos,
                description,
                perks,extraInfo,
                maxGuests,
                price
            });
            await place.save();
            res.status(200).json({
                success:true,
                message:"Place updated successfully",
                place
            });
        }
            }catch(err){
        next(err);
            } 
}
//return all the places in DB
exports.getPlaces=async(req,res,next)=>{
    try{
        const places=await Place.find();
        res.status(200).json({
            success:true,
            places
        });
    }catch(err){
        next(err);
    }
}
//return a single place by id
exports.singlePlace=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const place=await Place.findById(id);
        if(!place){
            res.send(400).json({
                success:false,
                message:"Place not found"
            });
        }
        res.status(200).json({
            success:true,
            place
        });
    }catch(err){
        next(err);
    }
}
//searching the places in the db
exports.searchPlace= async(req,res,next) =>{
    try{
        const searchword=req.params.key;
        if(searchword === ''){
            return res.status(200).json(
                await Place.find()
            );
        }
        const searchmatches=await Place.find({address:{$regex: searchword,$options:"i"}});
        res.status(200).json(searchmatches);
    }catch(err){
        next(err);
    }
}
