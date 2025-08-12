const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }

    ,
    
    email:{ 
        type:String,
    }

    ,

    password:{
        type:String,
    }

    ,

    age:{
        type:Number,
    }
    ,
    education:{
        type:String,
    }
    ,
    contry:{
        type:String,
    }
})

module.exports = mongoose.model("User",userSchema);