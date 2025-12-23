require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectWithDB=require("./config/db.js");
const cookieSession=require("cookie-session");
const cookieParser=require("cookie-parser");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const errorHandler = require("./middlewares/errorHandlingMiddleware.js");
connectWithDB();
//cloudinary configuration
cloudinart.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const app=express();

app.use(cookieParser());;
app.use(cookieSession({
    name:"session",
    maxAge:process.env.COOKIE_TIME*24*60*60*1000,
    keys:[process.env.SESSION_SECRET],
    secure:true,
    httpOnly:true,
    sameSite:"none"
}));

app.use(express.json());

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use("/",require("./routes"));
app.use(errorHandler);
app.listen(process.env.PORT ||8000,(err)=>{
    if(err){
        console.log("Error starting server:",err.message);  

    }
    else{
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    }
});
module.exports=app;

