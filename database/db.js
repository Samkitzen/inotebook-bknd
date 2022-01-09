const mongoose  = require("mongoose")
const mongoUri = ;//Mongo Url Should be places=d here

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
