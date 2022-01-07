const mongoose  = require("mongoose")
const mongoUri = "mongodb+srv://samkit:samkit123@cluster0.7zv2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = ()=>{
    mongoose.connect(mongoUri,(err)=>{
        if(!err){

            console.log("Connected To Mongo Successfully");
        }else{
            console.log(err);
        }
    });
}

module.exports = connectToMongo;