require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db.js");
const cloudinary=require("cloudinary").v2;
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session");
const errorHandler = require("./middlewares/errorHandlingMiddleware.js");

// Connect to database
connectDB();
//cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const app=express();

app.use(cookieParser());

app.use(cookieSession({
    name: 'session',
    maxAge:process.env.COOKIE_TIME*24*60*60*1000,
    keys:[process.env.SESSION_SECRET],
    secure:true,
    sameSite:'none',
    httpOnly:true
}));

app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));

app.use("/",require("./routes"));
app.use(errorHandler);

app.listen(process.env.PORT || 8000,(err)=>{
    if(err) throw err;
    console.log("Server is running on port",process.env.PORT || 8000);
});

module.exports=app;

