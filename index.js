const express = require('express')
const connectToMongo = require("./db");
const cors  = require('cors');
const PORT = process.env.PORT;
connectToMongo();

const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./Routes/auth"))
app.use("/api/notes",require("./Routes/notes"))
app.get("/",(req,res)=>{
    res.json("App Working fine");
})
app.listen(PORT || 5000,(req,res)=>{
    console.log(`Inotebook Backend Server Started successfully at ${PORT}`);
})