import mongoose from "mongoose";


const userSchema  = new mongoose.Schema({
    //structure of users or this is  how it looks like 
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true,

    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    //TOKENS
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

})

const User = mongoose.models.users || mongoose.model
("users",userSchema); //takes two parameters : 1. what do you want to call it in the database and 2. how does it looks like (Schema/structure)



export default User;  