const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Fas').then(()=>{
    console.log("Database connect successfull")
}).catch((err)=>{
    console.log("Database not connect")
})

const kittiScema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    address:String,
    email:String,
    text:String,
    date:{
        type:Date,
        default:Date.now
    }
})

const sendData = mongoose.model("message",kittiScema)
module.exports = sendData;