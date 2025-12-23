const mongoose=require("mongoose");

const connectWithDB=async()=>{
    try{
    mongoose.set('strictQuery',false);
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log("Connected to MongoDB successfully");
}

catch(err){
    console.error("Error connecting to MongoDB:",err.message);
    process.exit(1);
}
}
module.export=connectWithDB;